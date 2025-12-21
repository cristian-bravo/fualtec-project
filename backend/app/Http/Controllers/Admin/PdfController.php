<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pdf;
use App\Services\PdfService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PdfController extends Controller
{
    private const MAX_FILES_PER_REQUEST = 100;
    private const MAX_FILE_SIZE_KB = 20480; // 20 MB
    private const DAILY_UPLOAD_LIMIT = 300;

    public function __construct(private readonly PdfService $pdfService)
    {
    }

    /**
     * Listar PDFs con grupos (1 o varios)
     */
    public function index(Request $request): JsonResponse
    {
        $status = $request->query('status', 'all'); // all | grouped | ungrouped
        $search = $request->query('search');

        $query = Pdf::with('groups')->latest();

        // 🔹 Filtro por estado
        if ($status === 'grouped') {
            $query->whereHas('groups');
        }

        if ($status === 'ungrouped') {
            $query->whereDoesntHave('groups');
        }

        // 🔹 Búsqueda
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                ->orWhere('filename', 'like', "%{$search}%")
                ->orWhereHas('groups', function ($g) use ($search) {
                    $g->where('name', 'like', "%{$search}%");
                });
            });
        }

        $pdfs = $query->paginate(20);

        // 🔹 Mantener TU formato actual
        $pdfs->getCollection()->transform(function (Pdf $pdf) {

            $groupNames = $pdf->groups->pluck('name');

            return [
                'id'           => $pdf->id,
                'title'        => $pdf->title,
                'filename'     => $pdf->filename,
                'storage_path' => $pdf->storage_path,
                'grupo'        => $groupNames->isNotEmpty()
                    ? $groupNames->implode(', ')
                    : null,
                'vigente'      => $groupNames->isNotEmpty(),
            ];
        });

        return response()->json($pdfs);
    }


    /**
     * Subir PDFs
     */
    public function upload(Request $request): JsonResponse
    {
        $request->validate(
            [
                'files' => ['required', 'array', 'min:1', 'max:' . self::MAX_FILES_PER_REQUEST],
                'files.*' => ['required', 'file', 'mimes:pdf', 'max:' . self::MAX_FILE_SIZE_KB],
            ],
            [
                'files.required' => 'Debes seleccionar al menos un PDF.',
                'files.array' => 'El campo files debe ser un arreglo de PDFs.',
                'files.min' => 'Debes seleccionar al menos un PDF.',
                'files.max' => 'No puedes subir mas de ' . self::MAX_FILES_PER_REQUEST . ' PDFs por solicitud.',
                'files.*.file' => 'Todos los archivos deben ser PDFs validos.',
                'files.*.mimes' => 'Solo se permiten archivos PDF.',
                'files.*.max' => 'Cada PDF debe pesar menos de 20 MB.',
            ]
        );

        $files = $request->file('files', []);
        $incomingCount = is_array($files) ? count($files) : 0;

        if ($incomingCount === 0) {
            return response()->json([
                'message' => 'Debes seleccionar al menos un PDF.',
                'errors' => [
                    'files' => ['Debes seleccionar al menos un PDF.'],
                ],
            ], 422);
        }

        $dailyCount = Pdf::where('uploaded_by', $request->user()->id)
            ->whereBetween('created_at', [now()->startOfDay(), now()->endOfDay()])
            ->count();

        if ($dailyCount + $incomingCount > self::DAILY_UPLOAD_LIMIT) {
            return response()->json([
                'message' => 'Has alcanzado el limite diario de subida (' . self::DAILY_UPLOAD_LIMIT . ' PDFs).',
                'errors' => [
                    'daily_limit' => [
                        'Has alcanzado el limite diario de subida (' . self::DAILY_UPLOAD_LIMIT . ' PDFs).',
                    ],
                ],
            ], 429);
        }

        $uploaded = [];

        foreach ($files as $file) {
            if (! $file->isValid()) {
                return response()->json([
                    'message' => 'Uno de los PDFs no se pudo subir.',
                    'errors' => [
                        'files' => ['El archivo no se pudo subir.'],
                    ],
                ], 422);
            }

            $pdf = $this->pdfService->storePdf(
                $file,
                $request->user(),
                [
                    'title' => pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME),
                ]
            );

            $uploaded[] = $pdf;
        }

        return response()->json([
            'message' => 'PDFs subidos correctamente',
            'data'    => $uploaded,
        ], 201);
    }

    /**
     * Descargar PDF
     */
    public function download(Pdf $pdf, Request $request)
    {
        return $this->pdfService->streamForUser($pdf, $request->user());
    }

    /**
     * Eliminar PDF
     */
    public function destroy(Pdf $pdf): JsonResponse
    {
        $this->pdfService->deletePdf($pdf);

        return response()->json([
            'message' => 'PDF eliminado correctamente'
        ]);
    }

    /**
     * Eliminación múltiple
     */
    public function bulkDestroy(Request $request): JsonResponse
    {
        $ids = $request->validate([
            'ids'   => ['required', 'array'],
            'ids.*' => ['integer', 'exists:pdfs,id'],
        ])['ids'];

        $pdfs = Pdf::whereIn('id', $ids)->get();

        foreach ($pdfs as $pdf) {
            $this->pdfService->deletePdf($pdf);
        }

        return response()->json([
            'message' => 'PDFs eliminados correctamente.'
        ]);
    }
}

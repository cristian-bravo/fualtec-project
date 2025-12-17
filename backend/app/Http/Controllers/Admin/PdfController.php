<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pdf;
use App\Services\PdfService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PdfController extends Controller
{
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
        $data = $request->validate([
            'files'   => ['required', 'array'],
            'files.*' => ['required', 'file', 'mimes:pdf', 'max:20480'],
            'grupo'   => ['required', 'string', 'max:120'],
        ]);

        $uploaded = [];

        foreach ($request->file('files') as $file) {
            $pdf = $this->pdfService->storePdf(
                $file,
                $request->user(),
                [
                    'title' => pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME),
                    'grupo' => $data['grupo'],
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

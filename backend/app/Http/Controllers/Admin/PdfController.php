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

    public function index(Request $request): JsonResponse
    {
        $pdfs = Pdf::query()
            ->when(
                $request->get('grupo'),
                fn ($q, $grupo) => $q->where('grupo', $grupo)
            )
            ->when(
                $request->filled('vigente'),
                function ($q) use ($request) {
                    $vigente = filter_var(
                        $request->get('vigente'),
                        FILTER_VALIDATE_BOOL,
                        FILTER_NULL_ON_FAILURE
                    );

                    if (!is_null($vigente)) {
                        $q->where('vigente', $vigente);
                    }
                }
            )
            ->latest()
            ->paginate(20);

        return response()->json($pdfs);
    }


    /**
     * Subir varios PDF en una sola petición (batch).
     */
    public function upload(Request $request): JsonResponse
    {
        $data = $request->validate([
            'files'   => ['required', 'array'],
            'files.*' => ['required', 'file', 'mimes:pdf', 'max:20480'],

            'grupo' => ['required', 'string', 'max:120'],

            'titles'   => ['nullable', 'array'],
            'titles.*' => ['nullable', 'string', 'max:255'],
        ]);

        $uploaded = [];

        foreach ($request->file('files', []) as $index => $file) {

            $pdf = $this->pdfService->storePdf(
                $file,
                $request->user(),
                [
                    'title' => $data['titles'][$index]
                        ?? pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME),
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


    public function assign(Request $request, Pdf $pdf): JsonResponse
    {
        $data = $request->validate([
            'userIds'   => ['array'],
            'userIds.*' => ['integer', 'exists:users,id'],
            'cedulas'   => ['array'],
            'cedulas.*' => ['string'],
        ]);

        $count = 0;

        if (!empty($data['userIds'])) {
            $count += $this->pdfService->assignToUsers($pdf, $data['userIds']);
        }

        if (!empty($data['cedulas'])) {
            $count += $this->pdfService->assignByCedulas($pdf, $data['cedulas']);
        }

        return response()->json(['assigned' => $count]);
    }


    public function download(Pdf $pdf, Request $request)
    {
        $user = $request->user();

        if (!$user->hasRole('admin')) {
            $isAssigned = $pdf->assignedClients()
                ->where('users.id', $user->id)
                ->exists();

            if (!$isAssigned) {
                return response()->json(['message' => 'No autorizado'], 403);
            }
        }

        return $this->pdfService->streamForUser($pdf, $user);
    }


    public function destroy(Pdf $pdf, Request $request): JsonResponse
    {
        $user = $request->user();

        if (!$user->hasRole('admin')) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $this->pdfService->deletePdf($pdf);

        return response()->json(['message' => 'PDF eliminado correctamente']);
    }
}

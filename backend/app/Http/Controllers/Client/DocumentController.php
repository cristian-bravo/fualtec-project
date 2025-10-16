<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Download;
use App\Models\Pdf;
use App\Services\PdfService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    public function __construct(private readonly PdfService $pdfService)
    {
    }

    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        $pdfs = Pdf::query()
            ->whereHas('assignedClients', fn ($q) => $q->where('users.id', $user->id))
            ->with('groups:id,name,periodo,published_at')
            ->orderByDesc('updated_at')
            ->get()
            ->map(function (Pdf $pdf) {
                $group = $pdf->groups->first();

                return [
                    'id' => $pdf->id,
                    'title' => $pdf->title,
                    'categoria' => $pdf->categoria,
                    'group' => $group ? $group->only(['id', 'name', 'periodo']) : null,
                    'publicado_en' => $group?->published_at,
                    'vigente' => $pdf->vigente,
                ];
            });

        return response()->json($pdfs);
    }

    public function download(Request $request, Pdf $pdf)
    {
        $user = $request->user();

        abort_unless($pdf->assignedClients()->where('users.id', $user->id)->exists(), 403);

        Download::create([
            'user_id' => $user->id,
            'pdf_id' => $pdf->id,
            'ip' => $request->ip(),
            'user_agent' => (string) $request->userAgent(),
            'downloaded_at' => now(),
        ]);

        return $this->pdfService->streamForUser($pdf, $user);
    }
}

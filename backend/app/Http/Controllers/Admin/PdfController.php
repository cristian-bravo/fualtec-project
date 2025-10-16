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
            ->when($request->get('categoria'), fn ($q, $categoria) => $q->where('categoria', $categoria))
            ->when($request->get('tag'), fn ($q, $tag) => $q->whereJsonContains('tags', $tag))
            ->when($request->filled('vigente'), fn ($q) => $q->where('vigente', filter_var($request->get('vigente'), FILTER_VALIDATE_BOOL)))
            ->latest()
            ->paginate(20);

        return response()->json($pdfs);
    }

    public function upload(Request $request): JsonResponse
    {
        $data = $request->validate([
            'file' => ['required', 'file', 'mimes:pdf', 'max:20480'],
            'title' => ['nullable', 'string', 'max:255'],
            'categoria' => ['required', 'string', 'max:120'],
            'tags' => ['array'],
            'tags.*' => ['string'],
            'version' => ['nullable', 'string', 'max:50'],
        ]);

        $pdf = $this->pdfService->storePdf($request->file('file'), $request->user(), $data);

        return response()->json($pdf, 201);
    }

    public function assign(Request $request, Pdf $pdf): JsonResponse
    {
        $data = $request->validate([
            'userIds' => ['array'],
            'userIds.*' => ['integer', 'exists:users,id'],
            'cedulas' => ['array'],
            'cedulas.*' => ['string'],
        ]);

        $count = 0;
        if (! empty($data['userIds'])) {
            $count += $this->pdfService->assignToUsers($pdf, $data['userIds']);
        }
        if (! empty($data['cedulas'])) {
            $count += $this->pdfService->assignByCedulas($pdf, $data['cedulas']);
        }

        return response()->json(['assigned' => $count]);
    }
}

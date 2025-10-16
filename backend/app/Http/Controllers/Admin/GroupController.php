<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PdfGroup;
use App\Services\PdfService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    public function __construct(private readonly PdfService $pdfService)
    {
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'periodo' => ['nullable', 'string', 'max:50'],
        ]);

        $group = $this->pdfService->createGroup($data, $request->user());

        return response()->json(['id' => $group->id], 201);
    }

    public function addItems(Request $request, PdfGroup $group): JsonResponse
    {
        $data = $request->validate([
            'pdfIds' => ['required', 'array'],
            'pdfIds.*' => ['integer', 'exists:pdfs,id'],
        ]);

        $added = $this->pdfService->attachPdfs($group, $data['pdfIds']);

        return response()->json(['added' => $added]);
    }

    public function publish(PdfGroup $group): JsonResponse
    {
        $group = $this->pdfService->publishGroup($group);

        return response()->json(['published_at' => $group->published_at]);
    }
}

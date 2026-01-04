<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ComplaintSubmission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ComplaintSubmissionController extends Controller
{
    public function index(): JsonResponse
    {
        $submissions = ComplaintSubmission::query()
            ->latest()
            ->get();

        return response()->json($submissions);
    }

    public function downloadAttachment(ComplaintSubmission $complaint)
    {
        if (! $complaint->documento_path) {
            abort(404, 'No hay documento adjunto.');
        }

        $filename = $complaint->documento_nombre ?: 'documento';

        $disk = str_starts_with($complaint->documento_path, 'complaints/')
            ? 'local'
            : 'public';

        return Storage::disk($disk)->download($complaint->documento_path, $filename);
    }

    public function update(Request $request, ComplaintSubmission $complaint): JsonResponse
    {
        $data = $request->validate([
            'is_resolved' => ['required', 'boolean'],
        ]);

        try {
            $complaint->update($data);
        } catch (\Throwable $exception) {
            report($exception);
            return response()->json([
                'message' => 'No se pudo actualizar el estado.',
            ], 500);
        }

        return response()->json([
            'id' => $complaint->id,
            'is_resolved' => $complaint->is_resolved,
            'message' => 'Estado actualizado.',
        ]);
    }
}

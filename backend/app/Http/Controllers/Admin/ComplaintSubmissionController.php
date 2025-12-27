<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ComplaintSubmission;
use Illuminate\Http\JsonResponse;
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

        return Storage::disk('local')->download($complaint->documento_path, $filename);
    }
}

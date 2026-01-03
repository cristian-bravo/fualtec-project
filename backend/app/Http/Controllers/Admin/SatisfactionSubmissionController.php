<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SatisfactionSubmission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SatisfactionSubmissionController extends Controller
{
    public function index(): JsonResponse
    {
        $submissions = SatisfactionSubmission::query()
            ->latest()
            ->get();

        return response()->json($submissions);
    }

    public function update(Request $request, SatisfactionSubmission $satisfactionSubmission): JsonResponse
    {
        $data = $request->validate([
            'is_resolved' => ['required', 'boolean'],
        ]);

        try {
            $satisfactionSubmission->update($data);
        } catch (\Throwable $exception) {
            report($exception);
            return response()->json([
                'message' => 'No se pudo actualizar el estado.',
            ], 500);
        }

        return response()->json([
            'id' => $satisfactionSubmission->id,
            'is_resolved' => $satisfactionSubmission->is_resolved,
            'message' => 'Estado actualizado.',
        ]);
    }
}

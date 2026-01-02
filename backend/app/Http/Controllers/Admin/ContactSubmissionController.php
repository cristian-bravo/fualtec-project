<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactSubmissionController extends Controller
{
    public function index(): JsonResponse
    {
        $submissions = ContactSubmission::query()
            ->latest()
            ->get();

        return response()->json($submissions);
    }

    public function update(Request $request, ContactSubmission $contactSubmission): JsonResponse
    {
        $data = $request->validate([
            'is_resolved' => ['required', 'boolean'],
        ]);

        try {
            $contactSubmission->update($data);
        } catch (\Throwable $exception) {
            report($exception);
            return response()->json([
                'message' => 'No se pudo actualizar el estado.',
            ], 500);
        }

        return response()->json([
            'id' => $contactSubmission->id,
            'is_resolved' => $contactSubmission->is_resolved,
            'message' => 'Estado actualizado.',
        ]);
    }
}

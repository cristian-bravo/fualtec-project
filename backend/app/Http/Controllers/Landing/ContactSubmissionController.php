<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactSubmissionController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'nombre' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'asunto' => ['required', 'string', 'max:255'],
            'mensaje' => ['required', 'string', 'max:2000'],
        ]);

        $submission = ContactSubmission::create($data);

        return response()->json([
            'id' => $submission->id,
            'message' => 'Solicitud recibida.',
        ], 201);
    }
}

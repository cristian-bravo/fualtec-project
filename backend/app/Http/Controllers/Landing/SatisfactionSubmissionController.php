<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Models\SatisfactionSubmission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SatisfactionSubmissionController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'nombre' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'servicio' => ['required', 'string', 'max:255'],
            'p1' => ['required', 'integer', 'between:1,5'],
            'p2' => ['required', 'integer', 'between:1,5'],
            'p3' => ['required', 'integer', 'between:1,5'],
            'p4' => ['required', 'integer', 'between:1,5'],
            'p5' => ['required', 'integer', 'between:1,5'],
            'comentarios' => ['nullable', 'string', 'max:2000'],
            'mensaje_final' => ['nullable', 'string', 'max:2000'],
        ]);

        $promedio = round(($data['p1'] + $data['p2'] + $data['p3'] + $data['p4'] + $data['p5']) / 5, 2);

        $submission = SatisfactionSubmission::create([
            ...$data,
            'promedio' => $promedio,
        ]);

        return response()->json([
            'id' => $submission->id,
            'message' => 'Evaluacion recibida.',
        ], 201);
    }
}

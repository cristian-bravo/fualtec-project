<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Models\ContactSubmission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

class ContactSubmissionController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $rateKey = $this->buildRateLimitKey($request);
        if (RateLimiter::tooManyAttempts($rateKey, 100)) {
            return response()->json([
                'message' => 'Se alcanzo el limite diario de 100 envios. Intente mas tarde.',
            ], 429);
        }
        RateLimiter::hit($rateKey, 86400);

        $data = $request->validate([
            'nombre' => ['required', 'string', 'min:2', 'max:120'],
            'email' => ['required', 'email', 'max:255'],
            'asunto' => ['required', 'string', 'min:3', 'max:150'],
            'mensaje' => ['required', 'string', 'min:10', 'max:2000'],
        ]);

        $data = $this->sanitizeSubmission($data);

        try {
            $submission = ContactSubmission::create($data);
        } catch (\Throwable $exception) {
            report($exception);
            return response()->json([
                'message' => 'No se pudo procesar la solicitud. Intente nuevamente.',
            ], 500);
        }

        return response()->json([
            'id' => $submission->id,
            'message' => 'Solicitud recibida.',
        ], 201);
    }

    private function buildRateLimitKey(Request $request): string
    {
        $date = now()->toDateString();

        return "contact-submission:{$date}";
    }

    private function sanitizeSubmission(array $data): array
    {
        return [
            'nombre' => $this->sanitizeText($data['nombre']),
            'email' => strtolower(trim($data['email'])),
            'asunto' => $this->sanitizeText($data['asunto']),
            'mensaje' => $this->sanitizeText($data['mensaje']),
        ];
    }

    private function sanitizeText(string $value): string
    {
        return trim(strip_tags($value));
    }
}

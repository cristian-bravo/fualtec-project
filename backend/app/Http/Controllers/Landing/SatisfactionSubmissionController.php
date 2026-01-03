<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Models\SatisfactionSubmission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Validator;

class SatisfactionSubmissionController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        // Global rate limit per day to prevent abuse.
        $rateKey = $this->buildRateLimitKey();
        if (RateLimiter::tooManyAttempts($rateKey, 100)) {
            return response()->json([
                'message' => 'Se alcanzo el limite diario de 100 envios. Intente mas tarde.',
            ], 429);
        }
        RateLimiter::hit($rateKey, 86400);

        $validator = Validator::make($request->all(), [
            'nombre' => ['required', 'string', 'min:2', 'max:120'],
            'email' => ['required', 'email', 'max:255'],
            'servicio' => ['required', 'string', 'max:150'],
            'p1' => ['required', 'integer', 'between:1,5'],
            'p2' => ['required', 'integer', 'between:1,5'],
            'p3' => ['required', 'integer', 'between:1,5'],
            'p4' => ['required', 'integer', 'between:1,5'],
            'p5' => ['required', 'integer', 'between:1,5'],
            'comentarios' => ['nullable', 'string', 'max:500'],
            'mensaje_final' => ['nullable', 'string', 'max:500'],
        ]);

        if ($validator->fails()) {
            $errors = [];
            foreach ($validator->errors()->messages() as $field => $messages) {
                $errors[$field] = $messages[0] ?? 'Valor invalido.';
            }
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $errors,
            ], 422);
        }

        $data = $validator->validated();
        $data = $this->sanitizeSubmission($data);
        $promedio = round(
            ($data['p1'] + $data['p2'] + $data['p3'] + $data['p4'] + $data['p5']) / 5,
            2
        );

        try {
            $submission = SatisfactionSubmission::create([
                ...$data,
                'promedio' => $promedio,
            ]);
        } catch (\Throwable $exception) {
            report($exception);
            return response()->json([
                'message' => 'No se pudo procesar la solicitud. Intente nuevamente.',
            ], 500);
        }

        return response()->json([
            'id' => $submission->id,
            'message' => 'Evaluacion recibida.',
        ], 201);
    }

    private function buildRateLimitKey(): string
    {
        $date = now()->toDateString();

        return "satisfaction-submission:{$date}";
    }

    private function sanitizeSubmission(array $data): array
    {
        return [
            'nombre' => $this->sanitizeText($data['nombre']),
            'email' => strtolower(trim($data['email'])),
            'servicio' => $this->sanitizeText($data['servicio']),
            'p1' => (int) $data['p1'],
            'p2' => (int) $data['p2'],
            'p3' => (int) $data['p3'],
            'p4' => (int) $data['p4'],
            'p5' => (int) $data['p5'],
            'comentarios' => $this->sanitizeOptional($data['comentarios'] ?? null),
            'mensaje_final' => $this->sanitizeOptional($data['mensaje_final'] ?? null),
        ];
    }

    private function sanitizeOptional(?string $value): ?string
    {
        if ($value === null) {
            return null;
        }

        $clean = $this->sanitizeText($value);

        return $clean === '' ? null : $clean;
    }

    private function sanitizeText(string $value): string
    {
        return trim(strip_tags($value));
    }
}

<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Models\ComplaintSubmission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ComplaintSubmissionController extends Controller
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
            'empresa' => ['required', 'string', 'max:255'],
            'nombre' => ['required', 'string', 'max:255'],
            'cargo' => ['required', 'string', 'max:255'],
            'telefono' => ['required', 'string', 'max:60'],
            'email' => ['required', 'email', 'max:255'],
            'direccion' => ['required', 'string', 'max:255'],
            'fecha' => ['required', 'date'],
            'tipo_queja' => ['required', Rule::in(['Servicio', 'Administrativo', 'Personal', 'Instalaciones', 'Otro'])],
            'tipo_inconformidad' => ['required', Rule::in(['Queja', 'Apelacion'])],
            'anexa_documento' => ['required', Rule::in(['SI', 'NO'])],
            'documento' => [
                'nullable',
                'file',
                'max:10240',
                'mimes:pdf,doc,docx,png,jpg,jpeg',
            ],
            'relato' => ['required', 'string', 'min:10', 'max:2000'],
        ], [
            'empresa.required' => 'Ingrese la empresa.',
            'empresa.max' => 'La empresa no debe superar 255 caracteres.',
            'nombre.required' => 'Ingrese el nombre.',
            'nombre.max' => 'El nombre no debe superar 255 caracteres.',
            'cargo.required' => 'Ingrese el cargo.',
            'cargo.max' => 'El cargo no debe superar 255 caracteres.',
            'telefono.required' => 'Ingrese el telefono.',
            'telefono.max' => 'El telefono no debe superar 60 caracteres.',
            'email.required' => 'Ingrese el correo.',
            'email.email' => 'Correo invalido.',
            'email.max' => 'El correo no debe superar 255 caracteres.',
            'direccion.required' => 'Ingrese la direccion.',
            'direccion.max' => 'La direccion no debe superar 255 caracteres.',
            'fecha.required' => 'Ingrese la fecha de presentacion.',
            'fecha.date' => 'Fecha invalida.',
            'tipo_queja.required' => 'Seleccione el tipo de queja.',
            'tipo_queja.in' => 'Seleccione un tipo de queja valido.',
            'tipo_inconformidad.required' => 'Seleccione el tipo de inconformidad.',
            'tipo_inconformidad.in' => 'Seleccione un tipo de inconformidad valido.',
            'anexa_documento.required' => 'Seleccione si adjunta documento.',
            'anexa_documento.in' => 'Seleccione una opcion valida.',
            'documento.file' => 'El documento adjunto no es valido.',
            'documento.mimes' => 'Formato de documento no permitido.',
            'documento.max' => 'El documento no debe superar 10 MB.',
            'relato.required' => 'Ingrese el relato.',
            'relato.min' => 'El relato debe contener al menos 10 caracteres.',
            'relato.max' => 'El relato no debe superar 2000 caracteres.',
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

        $data = $this->sanitizeSubmission($validator->validated());

        $documentoPath = null;
        $documentoNombre = null;
        $documentoMime = null;
        $documentoSize = 0;

        if ($request->hasFile('documento')) {
            try {
                $file = $request->file('documento');
                $documentoPath = $file->store('pdf', 'public');
                $documentoNombre = $this->sanitizeText($file->getClientOriginalName());
                $documentoMime = $file->getClientMimeType();
                $documentoSize = $file->getSize();
            } catch (\Throwable $exception) {
                report($exception);
            }
        }

        try {
            $submission = ComplaintSubmission::create([
                'empresa' => $data['empresa'],
                'nombre' => $data['nombre'],
                'cargo' => $data['cargo'],
                'telefono' => $data['telefono'],
                'email' => $data['email'],
                'direccion' => $data['direccion'],
                'fecha_presentacion' => $data['fecha'],
                'tipo_queja' => $data['tipo_queja'],
                'tipo_inconformidad' => $data['tipo_inconformidad'],
                'anexa_documento' => $data['anexa_documento'] === 'SI',
                'relato' => $data['relato'],
                'documento_path' => $documentoPath,
                'documento_nombre' => $documentoNombre,
                'documento_mime' => $documentoMime,
                'documento_size' => $documentoSize,
            ]);
        } catch (\Throwable $exception) {
            report($exception);
            return response()->json([
                'message' => 'No se pudo procesar la solicitud. Intente nuevamente.',
            ], 500);
        }

        return response()->json([
            'id' => $submission->id,
            'message' => 'Registro recibido.',
        ], 201);
    }

    private function buildRateLimitKey(): string
    {
        $date = now()->toDateString();

        return "complaint-submission:{$date}";
    }

    private function sanitizeSubmission(array $data): array
    {
        return [
            'empresa' => $this->sanitizeText($data['empresa']),
            'nombre' => $this->sanitizeText($data['nombre']),
            'cargo' => $this->sanitizeText($data['cargo']),
            'telefono' => $this->sanitizeText($data['telefono']),
            'email' => strtolower(trim($data['email'])),
            'direccion' => $this->sanitizeText($data['direccion']),
            'fecha' => $data['fecha'],
            'tipo_queja' => $data['tipo_queja'],
            'tipo_inconformidad' => $data['tipo_inconformidad'],
            'anexa_documento' => $data['anexa_documento'],
            'relato' => $this->sanitizeText($data['relato']),
        ];
    }

    private function sanitizeText(string $value): string
    {
        return trim(strip_tags($value));
    }
}

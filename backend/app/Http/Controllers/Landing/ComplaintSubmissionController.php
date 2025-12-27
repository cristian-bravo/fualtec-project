<?php

namespace App\Http\Controllers\Landing;

use App\Http\Controllers\Controller;
use App\Models\ComplaintSubmission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ComplaintSubmissionController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
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
                'required_if:anexa_documento,SI',
            ],
            'relato' => ['required', 'string', 'max:5000'],
        ]);

        $documentoPath = null;
        $documentoNombre = null;
        $documentoMime = null;
        $documentoSize = 0;

        if ($request->hasFile('documento')) {
            $file = $request->file('documento');
            $documentoPath = $file->store('complaints');
            $documentoNombre = $file->getClientOriginalName();
            $documentoMime = $file->getClientMimeType();
            $documentoSize = $file->getSize();
        }

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

        return response()->json([
            'id' => $submission->id,
            'message' => 'Registro recibido.',
        ], 201);
    }
}

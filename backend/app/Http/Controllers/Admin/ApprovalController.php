<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class ApprovalController extends Controller
{
    public function index(): JsonResponse
    {
        $pending = User::where('estado', 'pendiente')
            ->orderByDesc('created_at')
            ->get(['id', 'nombre', 'email', 'cedula', 'estado', 'email_verified_at']);

        return response()->json($pending);
    }

    public function approve(User $user): JsonResponse
    {
        if (! $user->email_verified_at) {
            return response()->json([
                'message' => 'El correo no ha sido verificado.',
            ], 422);
        }

        $user->update(['estado' => 'aprobado']);

        return response()->json(['status' => 'aprobado']);
    }

    public function reject(User $user): JsonResponse
    {
        $user->update(['estado' => 'rechazado']);

        return response()->json(['status' => 'rechazado']);
    }
}

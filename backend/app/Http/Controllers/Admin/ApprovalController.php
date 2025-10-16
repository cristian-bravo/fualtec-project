<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class ApprovalController extends Controller
{
    public function index(): JsonResponse
    {
        $pending = User::where('estado', 'pendiente')->get(['id', 'nombre', 'email', 'cedula', 'estado']);

        return response()->json($pending);
    }

    public function approve(User $user): JsonResponse
    {
        $user->update(['estado' => 'aprobado']);

        return response()->json(['status' => 'aprobado']);
    }

    public function reject(User $user): JsonResponse
    {
        $user->update(['estado' => 'rechazado']);

        return response()->json(['status' => 'rechazado']);
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $users = User::query()
            ->when($request->get('estado'), fn ($q, $estado) => $q->where('estado', $estado))
            ->when($request->get('rol'), fn ($q, $rol) => $q->where('rol', $rol))
            ->latest()
            ->get();

        return response()->json($users);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'nombre' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email'],
            'cedula' => ['required', 'string', 'unique:users,cedula'],
            'password' => ['nullable', 'string', 'min:8'],
            'rol' => ['required', Rule::in(['admin', 'cliente'])],
            'estado' => ['nullable', Rule::in(['pendiente', 'aprobado', 'rechazado', 'inactivo'])],
        ]);

        $user = User::create([
            'nombre' => $data['nombre'],
            'email' => $data['email'],
            'cedula' => $data['cedula'],
            'rol' => $data['rol'],
            'estado' => $data['estado'] ?? 'aprobado',
            'password' => Hash::make($data['password'] ?? 'Temporal#123'),
        ]);
        $user->syncRoles($data['rol']);

        return response()->json($user, 201);
    }

    public function update(Request $request, User $user): JsonResponse
    {
        $data = $request->validate([
            'estado' => ['nullable', Rule::in(['pendiente', 'aprobado', 'rechazado', 'inactivo'])],
            'password' => ['nullable', 'string', 'min:8'],
        ]);

        if (isset($data['estado'])) {
            $user->estado = $data['estado'];
        }

        if (! empty($data['password'])) {
            $user->password = Hash::make($data['password']);
        }

        $user->save();

        return response()->json($user);
    }
}

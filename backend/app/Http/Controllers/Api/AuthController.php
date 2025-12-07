<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $cred = $request->validate([
            'email'    => ['required','email'],
            'password' => ['required'],
        ]);

        if (! Auth::attempt($cred, true)) {
            return response()->json(['message' => 'Credenciales inválidas'], 422);
        }

        $request->session()->regenerate();

        // Devuelve el usuario con sus roles y permisos (si los usas)
        return response()->json(
            auth()->user()->load('roles', 'permissions')
        );
    }

    public function user(Request $request)
    {
        return response()->json(
            $request->user()->load('roles', 'permissions')
        );
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->noContent();
    }
}

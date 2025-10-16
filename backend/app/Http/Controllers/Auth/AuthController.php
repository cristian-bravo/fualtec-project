<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(private readonly AuthService $authService)
    {
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $user = $this->authService->register($request->validated());

        return response()->json([
            'id' => $user->id,
            'estado' => $user->estado,
        ], 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $payload = $this->authService->attemptLogin($request->validated());

        return response()->json([
            'user' => $payload['user'],
            'token' => $payload['token'],
        ]);
    }

    public function forgot(ForgotPasswordRequest $request): JsonResponse
    {
        $this->authService->sendPasswordReset($request->validated()['email']);

        return response()->json(['message' => 'Se ha enviado un enlace de recuperación.']);
    }

    public function reset(ResetPasswordRequest $request): JsonResponse
    {
        $data = $request->validated();
        $this->authService->resetPassword($data['token'], $data['password']);

        return response()->json(['message' => 'Contraseña actualizada correctamente.']);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json($request->user());
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()?->delete();

        return response()->json(['message' => 'Sesión finalizada']);
    }
}

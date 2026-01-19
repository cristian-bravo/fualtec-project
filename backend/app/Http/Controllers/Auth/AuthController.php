<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Http\Requests\VerifyEmailRequest;
use App\Services\AuthService;
use App\Services\CaptchaService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function __construct(
        private readonly AuthService $authService,
        private readonly CaptchaService $captchaService
    ) {
    }

    public function captcha(): JsonResponse
    {
        return response()->json($this->captchaService->generate());
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $data = $request->validated();
        $this->validateCaptcha($data['captcha_token'], $data['captcha_answer']);

        $user = $this->authService->register($data);

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
        $data = $request->validated();
        $this->validateCaptcha($data['captcha_token'], $data['captcha_answer']);

        $this->authService->sendPasswordReset($data['email']);

        return response()->json(['message' => 'Se ha enviado un enlace de recuperación.']);
    }

    public function reset(ResetPasswordRequest $request): JsonResponse
    {
        $data = $request->validated();
        $this->authService->resetPassword($data['token'], $data['email'], $data['password']);

        return response()->json(['message' => 'Contraseña actualizada correctamente.']);
    }

    public function verifyEmail(VerifyEmailRequest $request): JsonResponse
    {
        $this->authService->verifyEmailToken($request->validated()['token']);

        return response()->json(['message' => 'Correo verificado correctamente.']);
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

    private function validateCaptcha(string $token, string $answer): void
    {
        if (! $this->captchaService->verify($token, $answer)) {
            throw ValidationException::withMessages([
                'captcha' => ['Captcha inválido.'],
            ]);
        }
    }
}


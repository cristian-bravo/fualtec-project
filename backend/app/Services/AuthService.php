<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class AuthService
{
    public function register(array $data): User
    {
        return DB::transaction(function () use ($data) {
            $user = User::create([
                'nombre' => $data['nombre'],
                'email' => $data['email'],
                'cedula' => strtoupper($data['cedula']),
                'rol' => 'cliente',
                'estado' => 'pendiente',
                'password' => Hash::make($data['password']),
            ]);

            $user->assignRole('cliente');

            return $user;
        });
    }

    public function attemptLogin(array $credentials): array
    {
        $user = User::where('email', $credentials['email'])->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            throw new AuthenticationException('Credenciales inválidas');
        }

        if ($user->estado !== 'aprobado') {
            throw new AuthenticationException('Cuenta pendiente de aprobación');
        }

        $token = $user->createToken('portal-cliente')->plainTextToken;
        $user->update(['last_login_at' => now()]);

        return [
            'user' => $user->fresh(),
            'token' => $token,
        ];
    }

    public function sendPasswordReset(string $email): void
    {
        $status = Password::sendResetLink(['email' => $email]);

        if ($status !== Password::RESET_LINK_SENT) {
            throw ValidationException::withMessages([
                'email' => __($status),
            ]);
        }
    }

    public function resetPassword(string $token, string $password): void
    {
        $status = Password::reset(
            ['token' => $token, 'password' => $password, 'password_confirmation' => $password],
            function (User $user) use ($password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                ])->save();
            }
        );

        if ($status !== Password::PASSWORD_RESET) {
            throw ValidationException::withMessages([
                'token' => __($status),
            ]);
        }
    }
}

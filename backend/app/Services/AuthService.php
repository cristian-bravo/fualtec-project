<?php

namespace App\Services;

use App\Models\EmailVerificationToken;
use App\Models\User;
use App\Notifications\VerifyEmailNotification;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AuthService
{
    public function register(array $data): User
    {
        $user = DB::transaction(function () use ($data) {
            $email = $data['email'];
            $cedula = strtoupper($data['cedula']);
            $existingByEmail = User::where('email', $email)->first();

            if ($existingByEmail) {
                if ($existingByEmail->estado !== 'rechazado') {
                    throw ValidationException::withMessages([
                        'email' => ['El correo ya esta registrado.'],
                    ]);
                }

                $existingByEmail->forceFill([
                    'nombre' => $data['nombre'],
                    'email' => $email,
                    'cedula' => $cedula,
                    'rol' => 'cliente',
                    'estado' => 'pendiente',
                    'email_verified_at' => null,
                    'password' => Hash::make($data['password']),
                ])->save();

                $existingByEmail->assignRole('cliente');

                return $existingByEmail->fresh();
            }

            $user = User::create([
                'nombre' => $data['nombre'],
                'email' => $email,
                'cedula' => $cedula,
                'rol' => 'cliente',
                'estado' => 'pendiente',
                'password' => Hash::make($data['password']),
            ]);

            $user->assignRole('cliente');

            return $user;
        });

        // El registro no debe fallar si el correo de verificacion no se puede enviar.
        try {
            $this->sendEmailVerification($user);
        } catch (\Throwable $exception) {
            report($exception);
        }

        return $user;
    }

    public function attemptLogin(array $credentials): array
    {
        $user = User::where('email', $credentials['email'])->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            throw new AuthenticationException('Credenciales invalidas');
        }

        if ($user->estado === 'inactivo') {
            throw new AuthenticationException('Cuenta deshabilitada. Consulte con administracion.');
        }

        if ($user->estado !== 'aprobado') {
            throw new AuthenticationException('Cuenta pendiente de aprobacion');
        }

        if (! $user->email_verified_at) {
            throw new AuthenticationException('Correo no verificado');
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
        $exists = User::where('email', $email)->exists();

        if (! $exists) {
            throw ValidationException::withMessages([
                'email' => 'El correo no esta registrado. Registrese para continuar.',
            ]);
        }

        $status = Password::sendResetLink(['email' => $email]);

        if ($status !== Password::RESET_LINK_SENT) {
            throw ValidationException::withMessages([
                'email' => __($status),
            ]);
        }
    }

    public function resetPassword(string $token, string $email, string $password): void
    {
        $status = Password::reset(
            ['token' => $token, 'email' => $email, 'password' => $password, 'password_confirmation' => $password],
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

    public function verifyEmailToken(string $token): void
    {
        $hashed = hash('sha256', $token);
        $record = EmailVerificationToken::where('token', $hashed)->first();

        if (! $record) {
            throw ValidationException::withMessages([
                'token' => 'El enlace de verificacion no es valido.',
            ]);
        }

        if ($record->expires_at->isPast()) {
            $record->delete();
            throw ValidationException::withMessages([
                'token' => 'El enlace de verificacion ha expirado.',
            ]);
        }

        $user = User::find($record->user_id);
        if ($user && ! $user->email_verified_at) {
            $user->forceFill(['email_verified_at' => now()])->save();
        }
        // Mantener el token para permitir reintentos sin invalidar el enlace.
    }

    private function sendEmailVerification(User $user): void
    {
        if ($user->email_verified_at) {
            return;
        }

        EmailVerificationToken::where('user_id', $user->id)->delete();

        $rawToken = Str::random(64);
        EmailVerificationToken::create([
            'user_id' => $user->id,
            'token' => hash('sha256', $rawToken),
            'expires_at' => now()->addDay(),
        ]);

        $frontendUrl = rtrim(config('services.frontend.url'), '/');
        $verificationUrl = $frontendUrl . '/client-access/verify-email?token=' . $rawToken;

        $user->notify(new VerifyEmailNotification($verificationUrl));
    }
}


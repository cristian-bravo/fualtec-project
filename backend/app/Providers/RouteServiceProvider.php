<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    public const HOME = '/client-access/app';

    public function boot(): void
    {
        RateLimiter::for('upload-pdfs', function (Request $request) {
            $user = $request->user();
            $key = $user ? 'upload-pdfs:user:' . $user->id : 'upload-pdfs:ip:' . $request->ip();

            return Limit::perMinute(30)->by($key)->response(function (Request $request, array $headers) {
                return response()->json([
                    'message' => 'Has excedido el limite de solicitudes de subida. Intenta nuevamente en un minuto.',
                    'errors' => [
                        'rate_limit' => ['Has excedido el limite de solicitudes de subida. Intenta nuevamente en un minuto.'],
                    ],
                ], 429, $headers);
            });
        });

        RateLimiter::for('auth-emails', function (Request $request) {
            $email = strtolower((string) $request->input('email', ''));
            $key = 'auth-emails:' . $request->ip() . ':' . $email;

            return Limit::perDay(50)->by($key)->response(function (Request $request, array $headers) {
                return response()->json([
                    'message' => 'Limite diario alcanzado. Intenta nuevamente manana.',
                    'errors' => [
                        'rate_limit' => ['Limite diario alcanzado. Intenta nuevamente manana.'],
                    ],
                ], 429, $headers);
            });
        });

        Route::prefix('api')
            ->middleware('api')
            ->group(base_path('routes/api.php'));

        Route::middleware('web')
            ->group(base_path('routes/web.php'));
    }
}

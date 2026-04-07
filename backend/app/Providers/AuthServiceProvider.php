<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        // 'App\\Models\\Model' => 'App\\Policies\\ModelPolicy',
    ];

    public function boot(): void
    {
        $this->registerPolicies();

        Gate::define('admin-access', function ($user) {
            return $user->rol === 'admin' || $user->is_super_admin === true;
        });

        Gate::define('super-admin-access', function ($user) {
            return $user->is_super_admin === true
                ? Response::allow()
                : Response::deny('Solo el superadmin puede eliminar grupos.');
        });

        Gate::define('estado-aprobado', function ($user) {
            return $user->estado === 'aprobado';
        });
    }
}

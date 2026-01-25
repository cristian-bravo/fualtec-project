<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
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

        Gate::define('estado-aprobado', function ($user) {
            return $user->estado === 'aprobado';
        });
    }
}

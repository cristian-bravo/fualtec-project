<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Login;
use App\Models\User;

class UpdateLastLoginAt
{
    public function handle(Login $event): void
    {
        /** @var User $user */
        $user = $event->user;

        $user->forceFill([
            'last_login_at' => now(),
        ])->save();
    }
}

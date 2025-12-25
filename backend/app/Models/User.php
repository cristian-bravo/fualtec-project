<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use App\Notifications\ResetPasswordNotification;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles, SoftDeletes;

    protected $guard_name = 'web';

    protected $fillable = [
        'nombre',
        'email',
        'cedula',
        'rol',
        'estado',
        'password',
        'last_login_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'last_login_at' => 'datetime',
    ];

    public function pdfs()
    {
        return $this->belongsToMany(Pdf::class, 'client_pdfs');
    }

    public function publications()
    {
        return $this->hasMany(Publication::class);
    }

    public function sendPasswordResetNotification($token): void
    {
        $frontendUrl = rtrim(config('services.frontend.url'), '/');
        $url = $frontendUrl . '/client-access/reset?token=' . $token . '&email=' . urlencode($this->email);

        $this->notify(new ResetPasswordNotification($url));
    }
}

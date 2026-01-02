<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactSubmission extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'email',
        'asunto',
        'mensaje',
        'is_resolved',
    ];

    protected $casts = [
        'is_resolved' => 'boolean',
    ];
}

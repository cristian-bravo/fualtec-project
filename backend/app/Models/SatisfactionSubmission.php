<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SatisfactionSubmission extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'email',
        'servicio',
        'p1',
        'p2',
        'p3',
        'p4',
        'p5',
        'promedio',
        'comentarios',
        'mensaje_final',
    ];

    protected $casts = [
        'promedio' => 'decimal:2',
    ];
}

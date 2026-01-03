<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComplaintSubmission extends Model
{
    use HasFactory;

    protected $fillable = [
        'empresa',
        'nombre',
        'cargo',
        'telefono',
        'email',
        'direccion',
        'fecha_presentacion',
        'tipo_queja',
        'tipo_inconformidad',
        'anexa_documento',
        'relato',
        'documento_path',
        'documento_nombre',
        'documento_mime',
        'documento_size',
        'is_resolved',
    ];

    protected $casts = [
        'fecha_presentacion' => 'date',
        'anexa_documento' => 'boolean',
        'is_resolved' => 'boolean',
    ];
}

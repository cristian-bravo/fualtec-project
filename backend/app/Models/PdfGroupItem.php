<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PdfGroupItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'group_id',
        'pdf_id',
        'visible_desde',
        'visible_hasta',
    ];

    protected $casts = [
        'visible_desde' => 'datetime',
        'visible_hasta' => 'datetime',
    ];

    public function group()
    {
        return $this->belongsTo(PdfGroup::class, 'group_id');
    }

    public function pdf()
    {
        return $this->belongsTo(Pdf::class);
    }
}

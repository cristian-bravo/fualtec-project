<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientPdf extends Model
{
    use HasFactory;

    protected $fillable = [
        'pdf_id',
        'user_id',
    ];

    public function pdf()
    {
        return $this->belongsTo(Pdf::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

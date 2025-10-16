<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pdf extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'filename',
        'storage_path',
        'categoria',
        'tags',
        'version',
        'vigente',
        'checksum',
        'size_bytes',
        'uploaded_by',
    ];

    protected $casts = [
        'tags' => 'array',
        'vigente' => 'boolean',
    ];

    public function assignedClients()
    {
        return $this->belongsToMany(User::class, 'client_pdfs');
    }

    public function groups()
    {
        return $this->belongsToMany(PdfGroup::class, 'pdf_group_items');
    }

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PdfGroup extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'periodo',
        'publicado',
        'published_at',
        'created_by',
    ];

    protected $casts = [
        'publicado' => 'boolean',
        'published_at' => 'datetime',
    ];

    public function items()
    {
        return $this->hasMany(PdfGroupItem::class, 'group_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function publications()
    {
        return $this->hasMany(Publication::class, 'group_id');
    }
}

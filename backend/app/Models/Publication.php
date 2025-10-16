<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Publication extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'group_id',
        'user_id',
        'published_at',
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    public function group()
    {
        return $this->belongsTo(PdfGroup::class, 'group_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Comments extends Model
{
    protected $fillable = ['content'];
     /**
     * Get the parent commentable model (projects or tasks).
     */
    public function commentable(): MorphTo
    {
        return $this->morphTo();
    }

    public function user (): BelongsTo {
        return $this->belongsTo(User::class);
    }
}

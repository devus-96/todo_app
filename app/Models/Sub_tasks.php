<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Sub_tasks extends Model
{
    public function tasks (): BelongsTo
    {
        return $this->belongsTo(Tasks::class);
    }
}

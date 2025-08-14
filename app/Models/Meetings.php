<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Mettings extends Model
{
    /**
     * Get the user that make meetings.
     */
    public function user(): BelongsToMany
    {
        return $this->belongsToMany(User::class, "user_participant");
    }
}

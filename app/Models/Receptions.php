<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Receptions extends Model
{
    /**
     * Get the user's messages.
     */
    public function messages(): BelongsToMany
    {
        return $this->belongsToMany(Messages::class, "reception_message");
    }

    /**
     * Get the user associated with the reception.
     */
    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }
}

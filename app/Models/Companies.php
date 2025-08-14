<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Companies extends Model
{
    protected $fillable = [
        'name',
        'mission',
        'description',
        'author'
    ];

    /**
     * Get the all teams.
     */
    public function teams(): HasMany
    {
        return $this->hasMany(Teams::class);
    }

    public function roles(): MorphMany
    {
        return $this->morphMany(Role::class, 'roleable');
    }
}

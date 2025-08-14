<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Teams extends Model
{
    protected $fillable = [
        'name',
        'mission',
        'description',
        'author'
    ];
    
    public function company()
    {
        return $this->belongsTo(Companies::class);
    }

    public function projects()
    {
        return $this->hasMany(Projects::class);
    }

    public function roles(): MorphMany
    {
        return $this->morphMany(Role::class, 'roleable');
    }

    // Un projet peut avoir plusieurs tâches
    public function tasks(): MorphMany
    {
        return $this->morphMany(Tasks::class, 'taskable');
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author', 'id');
    }
    
}

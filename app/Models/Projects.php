<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Projects extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        "state",
        'priority',
        'description',
        'objectif',
        'start_date',
        'deadline',
        'author'
    ];

    /**
     * Get the team that owns the project.
     */
    public function teams(): BelongsTo
    {
        return $this->belongsTo(Teams::class);
    }

    public function roles(): MorphMany
    {
        return $this->morphMany(Role::class, 'roleable');
    }

    /**
     * Get all of the project's tasks.
     */
    public function tasks(): MorphMany
    {
        return $this->morphMany(Tasks::class, 'taskable');
    }

    /**
     * Get all of the project's comments.
     */
    public function comments(): MorphMany
    {
        return $this->morphMany(Comments::class, 'commentable');
    }
}

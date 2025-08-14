<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;

class Tasks extends Model
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
        'start_time',
        'end_time',
        'deadline',
        'author'
    ];

    public function user () : BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    // Relation polymorphique
    public function taskable(): MorphTo
    {
        return $this->morphTo();
    }

    public function roles(): MorphMany
    {
        return $this->morphMany(Role::class, 'roleable');
    }
    /**
     * Get all of the todo's comments.
     */
    public function comments(): MorphMany
    {
        return $this->morphMany(Comments::class, 'commentable');
    }

    /**
     * get all tasks substasks
     */

    public function subtasks(): HasMany
    {
        return $this->hasMany(Sub_tasks::class);
    }
}

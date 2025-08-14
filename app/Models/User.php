<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;


class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function roles(): HasMany
    {
        return $this->hasMany(Role::class);
    }

    public function tasks (): HasMany
    {
        return $this->hasMany(Tasks::class);
    }

    /**
     * Get the user's meetings.
     */
    public function meeting(): BelongsToMany
    {
        return $this->belongsToMany(Projects::class, "user_participant");
    }

    /**
     * Get the user's habits
     */
    public function habits(): HasMany
    {
        return $this->hasMany(Habits::class);
    }

     /**
     * Get the user's messages
     */
    public function messages(): HasMany
    {
        return $this->hasMany(Messages::class);
    }

    public function comments (): HasMany
    {
        return $this->hasMany(Comments::class);
    }

     /**
     * Get the user associated with the reception.
     */
    public function receptions(): HasOne
    {
        return $this->hasOne(Receptions::class);
    }

}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot; 

class Role extends Pivot 
{
    protected $table = 'roles';

    protected $fillable = [
        'user_id',
        "role_name"
    ];

    // Définissez les relations de la table pivot elle-même
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function team()
    {
        return $this->belongsTo(Teams::class);
    }
}
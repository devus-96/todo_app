<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Schedules extends Model
{
    /**
     * Get the task scheduled at.
     */
    public function todos(): MorphToMany
    {
        return $this->morphedByMany(Todos::class, 'scheduleable');
    }

     /**
     * Get the project scheduled at.
     */
    public function projects(): MorphToMany
    {
        return $this->morphedByMany(Projects::class, 'scheduleable');
    }
}

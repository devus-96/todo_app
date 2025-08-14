<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class Habits extends Model
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
}

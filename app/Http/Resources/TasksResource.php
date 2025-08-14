<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TasksResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "state" => $this->state,
            "priority" => $this->priority,
            "start_date" => $this->start_date,
            "deadline" => $this->deadline,
            "start_time" => $this->start_time,
            "end_time" => $this->end_time,
            "type" => $this->type
        ];
    }
}

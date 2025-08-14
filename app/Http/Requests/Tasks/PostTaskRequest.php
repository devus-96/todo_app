<?php

namespace App\Http\Requests\Tasks;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Rules\StatusRule;

class PostTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'state' => ['required', 'string', new StatusRule($this->start_date, $this->deadline)],
            'priority' => ['required', 'string', Rule::in('high', 'medium', 'low')],
            'description' => ['nullable', 'string'],
            'start_date' => ['required', 'string', Rule::date()],
            'deadline' => ['required', 'string', Rule::date()],
            'start_time' => ['nullable', 'string'],
            'end_time' => ['nullable', 'string'],
            'type' => ['string', Rule::in('task', 'habit')],
            'author' => ['author'],
        ];
    }
}

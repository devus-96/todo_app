<?php

namespace App\Http\Requests\Projects;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Rules\StatusRule;


class PatchProjectRequest extends FormRequest
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
            'name' => ['sometimes', 'nullable', 'string', 'max:255'],
            'state' => ['sometimes', 'nullable', 'string', new StatusRule($this->start_date, $this->deadline)],
            'priority' => ['sometimes', 'nullable', 'string', Rule::in('high', 'medium', 'low')],
            'description' => ['sometimes', 'nullable', 'string'],
            'objectif' => ['sometimes', 'nullable', 'string'],
            'start_date' => ['sometimes', 'nullable', 'string', Rule::date()],
            'deadline' => ['sometimes', 'nullable', 'string', Rule::date()],
        ];
    }
}

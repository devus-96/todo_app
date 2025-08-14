<?php

namespace App\Http\Requests\Projects;

use DateTime;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use App\Rules\StatusRule;

class ProjectPostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize()
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
            'objectif' => ['nullable', 'string'],
            'start_date' => ['required', 'string', Rule::date()],
            'deadline' => ['required', 'string', Rule::date(), 'after:start_date'],
            'author' => ['author']
        ];
    }
}

<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Carbon\Carbon;

class StatusRule implements ValidationRule
{
    protected $start_date;
    protected $deadline;

    public function __construct(string $start_date, string $deadline)
    {
        $this->start_date = Carbon::parse($start_date);
        $this->deadline = Carbon::parse($deadline);
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $now = Carbon::now();
        $isInProgress = $now->gt($this->start_date) && $now->lt($this->deadline);

        if ($value === 'not started' && $now->gt($this->start_date)) {
            $fail("The project cannot be set to 'not started' if its start date is in the past.");
        }
        
        if ($value === 'in progress' && $now->gt($this->deadline)) {
            $fail("The project cannot be set to 'in progress' if its deadline is in the past.");
        }

        if ($value === 'paused' && !$isInProgress) {
            $fail("The project cannot be 'paused' if it is not currently in progress.");
        }
    }
}

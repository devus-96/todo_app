<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Projects>
 */
class ProjectsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->word(),
            'state' => 'not started',
            'priority' => 'high',
            'description' => fake()->sentence(10),
            'start_date' => '2025-07-23',
            'deadline' => fake()->dateTimeBetween('-2 dsys', '+ 30 days'),
            'author' => 2,
            'objectif' => "[\"dskfnldsf adsflba dfdsfbsbfkjadbsfkjds fkjdsf dsakfjads gdskjgd gadgjb akdjg adfkgbjkadj gkdsabg\",\"dsbflbadsflkds gdsg dg fdsbgfds gsdfbgd fgldfsg dfgdglda gdslgkbd gladsg dfds gdsgds\",\"dfjsbgldsbglakdgb adgadf gadlgakdbsdsafbsLD FDS FbSF \"]"
        ];
    }
}


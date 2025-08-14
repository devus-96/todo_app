<?php

namespace App\Console\Commands;

use App\Models\Projects;
use Illuminate\Console\Command;
use Carbon\Carbon;

class UpdateProjectStatusCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'projects:update-status';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Updates project statuses automatically based on dates.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $now = Carbon::now();
        $updatedCount = 0;
        $this->info("Heure actuelle : {$now}");

        // Logique 1: Mettre à jour les projets "non démarrés" vers "en cours"
        // Condition: le projet est 'not started' et sa date de début est passée.
        $updatedInProgress = Projects::where('state', 'not started')
                                      ->whereDate('start_date', '<=', $now)
                                      ->update(['state' => 'in progress']);

        $this->info("{$updatedInProgress} projets ont été mis à jour avec le statut 'in progress'.");

        // ---

        // Logique 2 & 3: Mettre à jour les projets "en cours" vers "en attente" ou "annulé"
        // Nous devons récupérer les projets et les traiter un par un pour utiliser leur deadline
        $projectsToReview = Projects::whereIn('state', ['in progress', 'waitting'])
                                      ->whereNotNull('deadline')
                                      ->get();

        foreach ($projectsToReview as $project) {
            $deadline = Carbon::parse($project->deadline);

            // Si le projet est 'in progress' et que la deadline est dépassée de moins de 24h, on le met en 'waitting'
            if ($project->state === 'in progress' && $now->gt($deadline) && $now->lt($deadline->copy()->addHours(24))) {
                $project->state = 'waitting';
                $project->save();
                $updatedCount++;
            }
            
            // Si le projet est 'waitting' et que la deadline est dépassée de plus de 24h, on l'annule
            else if ($project->state === 'waitting' && $now->gt($deadline->copy()->addHours(24))) {
                $project->state = 'canceled';
                $project->save();
                $updatedCount++;
            }
        }

        $this->info("{$updatedCount} projets ont été mis à jour avec le statut 'waitting' ou 'canceled'.");
    }
}
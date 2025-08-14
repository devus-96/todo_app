<?php

namespace App\Policies;

use App\Models\Projects;
use Illuminate\Auth\Access\Response;
use App\Models\User;
use App\Models\Teams;
use App\Models\Companies; 

class TeamPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user, Teams $team, Companies $company): bool
    {
        // On récupère les rôles de l'utilisateur
        $role_team = $team->roles()->where('user_id', $user->id)->first();
        $role_company = $company->roles()->where('user_id', $user->id)->first();
        
        // Si l'utilisateur n'a pas de rôle dans l'équipe, on vérifie s'il est manager ou propriétaire de l'entreprise.
        return ($role_team && $role_team->role_name) ||
               ($role_company && in_array($role_company->role_name, ['owner', 'manager']));
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Projects $project, Teams $team, Companies $company): bool
    {
        // CAS 1: Projet personnel
        if ($project->teams_id === null) {
            return $project->author === $user->id;
        }

        // CAS 2: Projet d'équipe
        if ($project->teams_id !== null && $team && $company) {
            // Récupère les rôles de l'utilisateur
            $role_team = $team->roles()->where('user_id', $user->id)->first();
            $role_company = $company->roles()->where('user_id', $user->id)->first();
            
            // Vérifie les permissions (comme dans l'exemple précédent)
            return ($role_team && $role_team->role_name) ||
                   ($role_company && in_array($role_company->role_name, ['owner', 'manager']));
        }

        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, Teams $team): bool
    {
        // CAS 1: Création d'un projet d'équipe
        // La méthode est appelée avec une instance de Teams
        if ($team) {
            $role = $team->roles()->where('user_id', $user->id)->first();
           
            // On vérifie le rôle.
            // La condition est maintenant correcte.
            return ($role && in_array($role->role_name, ['administrator', 'owner']));
        }
        
        // CAS 2: Création d'un projet personnel
        // La méthode est appelée sans instance de Team
        return true;
    }
    /**
     * Determine whether the user can update the model.
     */
   
    public function update(User $user, Projects $project, Teams $team): bool
    {
        // CAS 1: Projet d'équipe
        if ($project->teams_id !== null) {
            // L'instance de Team est passée en paramètre
            if ($team) {
                $role = $team->roles()->where('user_id', $user->id)->first();
                
                // La condition est corrigée pour utiliser un tableau
                return ($role && in_array($role->role_name, ['administrator', 'owner']));
            }
            return false;
        }

        // CAS 2: Projet personnel
        // On vérifie que l'utilisateur est l'auteur du projet
        return $project->author === $user->id;
    }
    

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Projects $projects): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Projects $projects): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Projects $projects): bool
    {
        return false;
    }
}

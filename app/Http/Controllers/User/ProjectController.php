<?php

namespace App\Http\Controllers\User;

use App\Http\Resources\ProjectsResource;
use App\Models\Projects;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Projects\ProjectPostRequest;
use App\Http\Requests\Projects\PatchProjectRequest;
use App\Models\Companies;
use App\Models\Teams;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Gate;
use Illuminate\Auth\Access\AuthorizationException;

class ProjectController extends Controller
{
    public function show($id, $teamId = null, $projectId = null)
    {
        try {
            //get user id
            $user = Auth::user();
            // Récupère le projet
            $project = Projects::findOrFail($projectId);

            // Récupère l'équipe et l'entreprise si les IDs sont fournis
            $team = null;
            $company = null;
            $ids = [];
            if ($teamId || $id) {
                try {
                    $team = Teams::findOrFail($teamId);
                    // On peut chercher la compagnie via la relation de l'équipe
                    $company = Companies::findOrFail($id);
                    //ces infos sont envoyees au client pour identifier le type de task
                    $ids = ['teamId' => $teamId, 'projectId' => $projectId, 'companyId' => $id];
                } catch (ModelNotFoundException $e) {
                    return response()->json(['message' => 'Team or Company not found'], 404);
                }
            }

            // Autorisation via la Policy
            // On passe le projet et, si disponibles, l'équipe et l'entreprise à la Policy
            Gate::authorize('view-project', [$user, $project, $team, $company]);

            $tasks = $project->tasks()->get();

            return Inertia('user/projectItem', array_merge($ids, [
                'projectItem' => $project,
                'tasksData' => $tasks
            ]));
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Project not found.'], 404);
        }
        catch (AuthorizationException $e) {
            return response()->json(['message' => 'It seems you do not have the rights to perform this action.'], 403);
        }
    }

    public function index ($id=null, $teamId=null)
    {
        $user = Auth::user();

        if ($id && $teamId) {
            // Vérifie si l'équipe et la compagnie existent
            try {
                $team = Teams::findOrFail($teamId);
                $company = Companies::findOrFail($id);
            } catch (ModelNotFoundException $e) {
                // 403 pour une ressource non trouvée
                return response()->json(['message' => 'Team or Company not found'], 404);
            }

            // On appelle la Policy pour vérifier les permissions
            // La méthode `authorize` renvoie une exception 403 si l'autorisation échoue.
            // On passe les modèles à la Policy en tant que paramètres.
            Gate::authorize('views-projects', [$team, $company]);

            // Si l'autorisation réussit, on exécute la suite
            $projects = $team->projects()
                ->whereIn('state', ['in progress', 'paused', 'waiting', 'not started'])
                ->join('users', 'projects.author', 'users.id')
                ->orderBy('start_date', 'asc')
                ->get();
                
            $projectCollection = ProjectsResource::collection($projects);
            
            return Inertia("team/projects", [
                'project' => $projectCollection,
                'company_id' => $id,
                'team_id' => $teamId
            ]);
            
        } else {
            // Logique pour les projets personnels
            $projects = Projects::where('author', (int)$user->id)
                ->whereNull('teams_id')
                ->whereIn('state', ['in progress', 'paused', 'waiting', 'not started'])
                ->orderBy('start_date', 'asc')
                ->get();

            $projectCollection = ProjectsResource::collection($projects);

            return Inertia('user/projects', ['project' => $projectCollection]);
        }
    }

    public function create (Request $request, $id=null, $teamId=null) {
        if ($id && $teamId) {
            return Inertia::render('user/newProject', [
                'company_id' => $id,
                "team_id" => $teamId
            ]); 
        } else {
            return Inertia::render('user/newProject'); 
        }
    }

    public function store(ProjectPostRequest $request, $id, $teamId = null)
    {
        try {
            $user = Auth::user();
            $projectData = $request->validated();
            $projectData['author'] = $user->id;

            if ($id && $teamId) {
                // Crée un projet d'équipe
                try {
                    $team = Teams::findOrFail($teamId);
                } catch (ModelNotFoundException $e) {
                    return response()->json(['message' => 'teams not found.'], 404);
                }
    
                // Vérifie la permission via la Policy.
                // On passe l'instance de Team à la Policy.
                Gate::authorize('create-project', [$team]);
    
                $project = $team->projects()->create($projectData);

                foreach($request->input('assignee') as $menber) {
                    if ($menber === $request->input('isChief')) {
                        $project->roles()->create(['role_name' => 'chief', 'user_id' => $menber]);
                    } else {
                        $project->roles()->create(['role_name' => 'menber', 'user_id' => $menber]);
                    }
                }
    
                return redirect("/company/$id/team/$teamId/projects");
            } else {
                // Crée un projet personnel
                // On vérifie que l'utilisateur peut créer un projet personnel.
                // La Policy renverra toujours true dans ce cas.
                Gate::authorize('create', [null]); // On passe null pour la team
    
                Projects::create($projectData);
                return redirect('/user/projects');
            }
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Project not found.'], 404);
        }
        catch (AuthorizationException $e) {
            return response()->json(['message' => 'It seems you do not have the rights to perform this action.'], 403);
        }
       
    }

    public function update (PatchProjectRequest $request, $id, $teamId = null, $projectId = null)
    {
        $user = Auth::user();
        $projectData = $request->validated();
        
        // Gérer l'ID du projet 
        $projectToUpdateId = $projectId ?? $id;

        try {
            $project = Projects::findOrFail($projectToUpdateId);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'project not found.'], 404);
        }

        $team = null;
        if ($teamId) {
            try {
                $team = Teams::findOrFail($teamId);
            } catch (ModelNotFoundException $e) {
                return response()->json(['message' => 'Team not found.'], 404);
            }
        }
        
        // Autorisation via la Policy
        // On passe le projet et l'équipe (si elle existe) à la Policy
        // Laravel lèvera une exception 403 si la condition n'est pas remplie
        Gate::authorize('update-project', [$project, $team]);

        // Si on arrive ici, l'utilisateur est autorisé. On peut mettre à jour le projet.
        $project->update($projectData);

        return response()->json(['message' => 'project successfully updated.'], 200);
    }

    public function destroy (Request $request, $projectId) {
        //on recupere l'utilisateur
        $user = Auth::user();
        try {
            $project = Projects::findOrFail($projectId);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'project not found.'], 404);
        }

        if ($project->author !== $user->id) {
            return response()->json(['message' => "You do not have permission to update this project"], 403);
        }

        $project->delete();

        return response()->json(['message' => 'project successfully deleted.'], 200);
    }

    
}

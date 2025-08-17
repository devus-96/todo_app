<?php

namespace App\Http\Controllers\User;

use App\Models\Tasks;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\TasksResource;
use App\Http\Controllers\Controller;
use App\Models\Projects;
use App\Http\Requests\Tasks\UpdateTaskRequest;
use App\Http\Requests\Tasks\PostTaskRequest;
use App\Models\Companies;
use App\Models\Teams;
use Illuminate\Support\Facades\Gate;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TaskController extends Controller
{

    public function show ($id, $teamId=null, $projectId=null, $task_id) {
      try {
        $team = Teams::findOrFail($teamId);
        $company = Companies::findOrFail($id);
      }  catch (ModelNotFoundException $e) {
        return response()->json(['message' => 'Bad resquest'], 403);
      }
      //1.CAS ou les tasks sont relie a une teams 
      if ($teamId && $projectId=null) {
        Gate::authorize('views-tasks', [$team, $company]);

        $task = $team->tasks()->where('id', $task_id)->get();
        $subtasks = $task->subtasks()->get();

        return Inertia('company/taskDetails', [
          'task' => $task,
          'subtasks' => $subtasks
      ]);
      //2.CAS 2: ce sont des tasks contenues dans un projet
      } else if ($teamId & $projectId) {
        try {
          $project = Projects::findOrFail($projectId);
        } catch (ModelNotFoundException $e) {
          return response()->json(['message' => 'Bad resquest'], 403);
        }
        Gate::authorize('view-tasks-project', [$project, $team, $company]);

        $task = $project->tasks()->where('id', $task_id)->get();
        $subtasks = $task->subtasks()->get();

        return Inertia('company/taskDetails', [
          'task' => $task,
          'subtasks' => $subtasks
        ]);
      }
    }

    public function index ($id = null, $teamId = null) {
        $user = Auth::user();
        $route = '';
        $ids = [];

        if ($id && $teamId) {
          try {
            $team = Teams::findOrFail($teamId);
            $company = Companies::findOrFail($id);
          } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Bad resquest'], 403);
          }

         // On appelle la Policy pour vérifier les permissions
          // La méthode `authorize` renvoie une exception 403 si l'autorisation échoue.
          // On passe les modèles à la Policy en tant que paramètres.
          Gate::authorize('views-tasks', [$team, $company]);

          $task = $team->tasks()
                   ->whereIn('state', ['in progress', 'paused', 'waitting', 'not started'])
                   ->where('taskable_id', null)
                   ->where('taskable_type', null)
                   ->orderBy('start_date', 'asc')
                   ->get();
          $route = 'team/tasks'; 
          $ids = ['teamId' => $teamId, 'companyId' => $id];
        } else {
          $task = Tasks::where('author', (int)$user->id)
                   ->whereIn('state', ['in progress', 'paused', 'waitting', 'not started'])
                   ->where('taskable_id', null)
                   ->where('taskable_type', null)
                   ->orderBy('start_date', 'asc')
                   ->get();
          $route = 'user/tasks'; 
        }

        $taskCollection = TasksResource::collection($task);

        return Inertia($route, array_merge($ids, [
          'taskdata' => $taskCollection,
        ]));
    }

    public function store (PostTaskRequest $request, $id=null, $teamId=null, $projectId=null) {
      //on recupere les infos depuis le client 
      $taskData = $request->validated();
      //puis l'utilisateur actif
      $user = Auth::user();
      //CAS 1: on essaye de cree des tasks reliees a un projet utilsateur 
      if ($projectId && !$teamId) {
        try {
          $project = Projects::findOrFail($projectId);
        } catch (ModelNotFoundException $e) {
          return response()->json(['message' => 'project not found.'], 404);
        }
        //pour se faire on verifier que l'utilisateur est le proprietaire de projet
        if ($project->author !== $user->id) {
          //si non on il n'a pas les droits
          return response()->json(['message' => 'It seems you do not have the rights to perform this action.'], 403);
        }
        // si oui on poste la tasks
        $task = $project->tasks()->create([
            ...$taskData,
            'author' => $user->id,
        ]);
      //CAS 2: on essaye de creer une task dans un projet relier a une team
      } else if ($projectId && $teamId) {
        try {
          $team = Teams::findOrFail($teamId);
          $project = Projects::findOrFail($projectId);
        } catch (ModelNotFoundException $e) {
          return response()->json(['message' => 'Bad request.'], 403);
        }
        //on verifie que le use a bien les droits (il doit etre soit chef du projet soit administrateur de la team)
        Gate::authorize('create-tasks-project', [$project, $team]);
        //si oui on cree la task
        $project->tasks()->create([
          ...$taskData,
          'author' => $user->id,
        ]);
      //CAS 3: On essaye de cree une task mais relie directement a une teams
      } else if ($teamId && !$projectId) {
        try {
          $team = Teams::findOrFail($teamId);
        } catch (ModelNotFoundException $e) {
          return response()->json(['message' => 'task not found.'], 404);
        }
        //alors on doit etre un administrateur de la team
        $role_team = $team->roles()->where('user_id', $user->id)->first();
        if ($role_team !== 'administrator') {
          return response()->json(['message' => 'It seems you do not have the rights to perform this action.'], 403);
        }
        $team->tasks()->create([
          ...$taskData,
          'author' => $user->id,
        ]);
      } else {
        //CAS 4: on essaye de creer une task mais relier a un utilisateur, alors on le cree simplement avec comme auteur l'utilisateur 
          Tasks::create([
            ...$taskData,
            'author' => $user->id,
          ]);
      }
      // si il existe un champ assignee dans les inpts alors cree les roles correspondants
      if ($request->input('assignee')) {
          foreach($request->input('assignee') as $menber) {
            if ($menber === $request->input('isChief')) {
                $project->roles()->create(['role_name' => 'chief', 'user_id' => $menber]);
            } else {
                $project->roles()->create(['role_name' => 'menber', 'user_id' => $menber]);
            }
          }
      }
    }

    public function update (UpdateTaskRequest $request, $id=null, $teamId=null, $projectId=null, $taskId) {
      $user = Auth::user();
      //on recupere les infos les donnees depuis le formulaire et on les valides
      $taskData = $request->validated();
      try {
        $task = Tasks::findOrFail($taskId);
      } catch (ModelNotFoundException $e) {
        return response()->json(['message' => 'task not found.'], 404);
      }

      if ($teamId && !$projectId) {
        try {
          $team = Teams::findOrFail($teamId);
        } catch (ModelNotFoundException $e) {
          return response()->json(['message' => 'task not found.'], 404);
        }
         //alors on doit etre un administrateur de la team
         $role_team = $team->roles()->where('user_id', $user->id)->first();
         if ($role_team !== 'administrator') {
           return response()->json(['message' => 'It seems you do not have the rights to perform this action.'], 403);
         }
      } else if (!$teamId && $projectId) {
        try {
          $project = Projects::findOrFail($projectId);
        } catch (ModelNotFoundException $e) {
          return response()->json(['message' => 'project not found.'], 404);
        }
        //pour se faire on verifier que l'utilisateur est le proprietaire de projet
        if ($project->author !== $user->id) {
          //si non on il n'a pas les droits
          return response()->json(['message' => 'It seems you do not have the rights to perform this action.'], 403);
        }
      } else if ($teamId && $projectId) {
        try {
          $team = Teams::findOrFail($teamId);
          $project = Projects::findOrFail($projectId);
        } catch (ModelNotFoundException $e) {
          return response()->json(['message' => 'Bad request.'], 403);
        }
        //on verifie que le use a bien les droits (il doit etre soit chef du projet soit administrateur de la team)
        Gate::authorize('create-tasks-project', [$project, $team]);
      } else {
        if ($task->author !== $user->id) {
          return response()->json(['message' => "You do not have permission to delete this task"], 403);
        }
      }
      $task->update($taskData);

      return response()->json(['message' => 'Task successfully updated.'], 200);
    }

    public function destroy (Request $request, $id) {
        try {
          $task = Tasks::findOrFail($id);
        } catch (ModelNotFoundException $e) {
          return response()->json(['message' => 'task not found.'], 404);
        }

        $user = Auth::user();

        if ($task->author !== $user->id) {
          return response()->json(['message' => "You do not have permission to delete this task"], 403);
        }

        $task->delete();

        return response()->json(['message' => 'Task successfully deleted.'], 200);
    }
}

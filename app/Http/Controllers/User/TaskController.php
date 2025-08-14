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
      $user = Auth::user();
      if ($teamId && $projectId=null) {
        try {
          $team = Teams::findOrFail($teamId);
          $company = Companies::findOrFail($id);
        }  catch (ModelNotFoundException $e) {
          return response()->json(['message' => 'Bad resquest'], 403);
        }

        $role_team = $team->roles()->where('user_id', '=', $user->id)->first();
        $role_company = $company->roles()->where('user_id', '=', $user->id)->first();
        //si il n'a pas de role associe a la team on verifie si il est un manager ou le propretaire de la company
        //si non on retourne une erreur 403
        if (!$role_team->role_name && $role_company->role_name !== 'owner' && $role_company->role_name !== 'manager') {
          return response()->json(['message' => "You do not have permission to get these tasks"], 403);
        }
      } else if ($teamId & $projectId) {

      }
    }

    public function index ($id = null, $teamId = null) {
        $user = Auth::user();

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

        } else {
          $task = Tasks::where('author', (int)$user->id)
                   ->whereIn('state', ['in progress', 'paused', 'waitting', 'not started'])
                   ->where('taskable_id', null)
                   ->where('taskable_type', null)
                   ->orderBy('start_date', 'asc')
                   ->get();
        }

        $taskCollection = TasksResource::collection($task);

        return Inertia('user/tasks', [
            'tasks' => $taskCollection,
        ]);
    }

    public function store (PostTaskRequest $request, $id=null, $teamId=null, $projectId=null) {

      $taskData = $request->validated();

      $user = Auth::user();

      if ($projectId && !$teamId) {
        try {
          $project = Projects::findOrFail($request->input('project_id'));
        } catch (ModelNotFoundException $e) {
          return response()->json(['message' => 'task not found.'], 404);
        }
        $project->tasks()->create([
            ...$taskData,
            'author' => $user->id,
        ]);
      } else if ($projectId && $teamId) {

      } else if ($teamId && !$projectId) {
        try {
          $team = Teams::findOrFail($request->input('team_id'));
        } catch (ModelNotFoundException $e) {
          return response()->json(['message' => 'task not found.'], 404);
        }
        $team->tasks()->create([
          ...$taskData,
          'author' => $user->id,
      ]);
      } else {
          Tasks::create([
            ...$taskData,
            'author' => $user->id,
          ]);
      }

      return redirect('/user/tasks');
    }

    public function update (UpdateTaskRequest $request, $id) {
      $taskData = $request->validated();

      try {
        $task = Tasks::findOrFail($id);
      } catch (ModelNotFoundException $e) {
        return response()->json(['message' => 'task not found.'], 404);
      }

      $user = Auth::user();

      if ($task->author !== $user->id) {
        return response()->json(['message' => "You do not have permission to delete this task"], 403);
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

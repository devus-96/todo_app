<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Projects;
use App\Models\Tasks;

class CommentController extends Controller
{
    public function index (Request $request) {
        if ($request->input('project_id')) {
            $project = Projects::find((int)$request->input('project_id'));
            $comments = $project->comments()::all();
            return $comments;
        } else if ($request->input('task_id')) {
            $task = Tasks::find((int)$request->input('project_id'));
            $comments = $task->comments()::all();
            return $comments;
        }
    }


    public function store (Request $request)
    {
        $comment =  $request->validate([
            'content' => ['string']
        ]);
        
        if ($request->input('project_id')) {
            $project = Projects::find((int)$request->input('project_id'));
            $project->comments()->create($comment);
        } else if ($request->input('task_id')) {
            $task = Tasks::find((int)$request->input('task_id'));
            $task->comments()->create($comment);
        }
    }
}

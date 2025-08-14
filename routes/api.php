<?php 

use App\Http\Controllers\User\ProjectController;
use App\Http\Controllers\User\CommentController;
use App\Http\Controllers\User\TaskController;
use App\Http\Controllers\User\MessageController;
use App\Http\Controllers\User\CompanyController;
use App\Http\Controllers\User\HistoryController;
use App\Http\Controllers\Company\TeamController;
use Illuminate\Support\Facades\Route;

Route::prefix('/user')->middleware(['auth', 'verified'])->name('user.')->group(function() {
    //project
    Route::get('/project/new', [ProjectController::class, 'create'])->name('newproject');
    Route::get('/projects', [ProjectController::class, 'index'])->name('projects');
    Route::get('/projects/{id}', [ProjectController::class, 'show'])->name('projectItem');
    Route::patch('/project/update/{id}', [ProjectController::class, 'update'])->name('updateProject');
    Route::post('/project', [ProjectController::class, 'store']);
    Route::delete('/project/{projectId}', [ProjectController::class, 'destroy']);
    //tasks
    Route::get('/tasks', [TaskController::class, 'index']);
    Route::post('/tasks', [TaskController::class, 'store'])->name('newtask');
    Route::delete('/task/{id}', [TaskController::class, 'destroy'])->name('taskDelete');
    Route::patch('/task/{id}', [TaskController::class, 'update'])->name('taskUpdate');
    //comments 
    Route::post('/comment', [CommentController::class, 'store']);
    Route::get('/comment', [CommentController::class, 'index']);

    Route::get('/inbox', [MessageController::class, 'index']);
    //history
    Route::get('/history', [HistoryController::class, 'index']);
});

Route::prefix('/company')->middleware(['auth', 'verified'])->name('company.')->group(function() {
    Route::get('/', [CompanyController::class, 'index'])->name('all');
    Route::get('/{id}', [CompanyController::class, 'show']);
    Route::post('/', [CompanyController::class, 'store']);
    Route::patch('/{id}', [CompanyController::class, 'update']);
    Route::delete('/{id}', [CompanyController::class, 'delete']);
    Route::get('/new', [CompanyController::class, 'create'])->name('newcompany');
    //teams
    Route::get('/{id}/team/new', [TeamController::class, 'create']);
    Route::post('/{id}/team', [TeamController::class, 'store'])->name('newteam');
    Route::get('/{id}/teams', [TeamController::class, 'index']);
    Route::get('/{id}/team/{teamId}', [TeamController::class, 'show']);
    //projects
    Route::get('/{id}/team/{teamId}/project/new', [ProjectController::class, 'create']);
    Route::post('/{id}/team/{teamId}/project', [ProjectController::class, 'store']);
    Route::get('/{id}/team/{teamId}/projects', [ProjectController::class, 'index']);
    Route::patch('/{id}/team/{teamId}/projects/{projectId}', [ProjectController::class, 'update']);
    Route::get('/{id}/team/{teamId}/projects/{projectId}', [ProjectController::class, 'show']);
    Route::delete('/{id}/team/{teamId}/projects/{projectId}', [ProjectController::class, 'destroy']);
    //tasks
    Route::get('/{id}/team/{teamId}/task/{taskId}', [TaskController::class, 'show']);
    Route::get('/{id}/team/{teamId}/project/{projectId}/task/{taskId}', [TaskController::class, 'show']);
    Route::get('/{id}/team/{teamId}/task', [TaskController::class, 'index']);
    Route::post('/{id}/team/{teamId}/task',  [TaskController::class, 'store']);
    Route::post('/{id}/team/{teamId}/project/{projectId}/task',  [TaskController::class, 'store']);
    Route::patch('/{id}/team/{teamId}/tasks/{taskId}', [TaskController::class, 'update']);
    Route::patch('/{id}/team/{teamId}/project/{projectId}/tasks/{taskId}',  [TaskController::class, 'update']);
    Route::delete('/{id}/team/{teamId}/tasks/{taskId}', [TaskController::class, 'delete']);
});
?>
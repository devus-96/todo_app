<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/csrf-token', \App\Http\Controllers\RefreshCsrfTokenController::class);


/*Route::prefix('/user')->name('name.')->group(function() {
    Route::get('/task', function () {
        return Inertia::render('user/task'); 
    })->name('task');
    
    Route::get('/project/{id}', function () {
        return Inertia::render('user/projectItem'); 
    })->name('projectItem');
    
    Route::get('/historique', function () {
        return Inertia::render('user/historique'); 
    })->name('historique');
});*/

/*Route::prefix('/team')->name('team.')->group(function() {
    Route::get('/{id}/task', function () {
        return Inertia::render('team/task'); 
    })->name('task');
    Route::get('/{id}/project', function () {
        return Inertia::render('team/project'); 
    })->name('project');
    Route::get('/{id}/meeting', function() {
        return Inertia::render('team/meeting');
    })->name('meeting');
    Route::get('/{id}/menber', function() {
        return Inertia::render('team/menber');
    })->name('menber');
});*/



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/user', function () {
        return Inertia::render('user/home');
    })->name('user');
    
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/api.php';

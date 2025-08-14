<?php

namespace App\Providers;

use App\Models\Projects;
use App\Policies\ProjectPolicy;
use Illuminate\Support\ServiceProvider;
use App\Policies\TeamPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Middleware;

class AppServiceProvider extends ServiceProvider
{

    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //teams
        Gate::define('views-tasks', [TeamPolicy::class, 'viewAny']);
        //projects
        Gate::define('view-project', [TeamPolicy::class, 'view']);
        Gate::define('views-projects', [TeamPolicy::class, 'viewAny']);
        Gate::define('create-project', [TeamPolicy::class, 'create']);
        Gate::define('update-project', [TeamPolicy::class, 'update']);
        Gate::define('view-tasks-project', [TeamPolicy::class, 'view_project_task']);
        Gate::define('create-tasks-project', [TeamPolicy::class, 'create_project_task']);
    }
}

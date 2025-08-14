<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        // Activer la protection CSRF (activée par défaut)
        $middleware->web([
            \Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class,
        ]);

        // Exempter certaines routes (si nécessaire)
        $middleware->validateCsrfTokens(except: [
            'stripe/webhook',
            'api/webhook',
            // Ajoutez vos routes exemptées ici
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();

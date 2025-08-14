<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RefreshCsrfTokenController extends Controller
{
     /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $request->session()->regenerateToken(); // Regénère le token côté session
        $newToken = csrf_token(); // Récupère le nouveau token

        return response()->json(['csrf_token' => $newToken]);
    }
}

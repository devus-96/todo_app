<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index (Request $request) {
        return Inertia::render('user/inbox');
    }
}

<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;

class HistoryController extends Controller
{
    public function index () {
        return Inertia::render('user/historique');
    }
}

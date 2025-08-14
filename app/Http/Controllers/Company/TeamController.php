<?php

namespace App\Http\Controllers\Company;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Teams;
use Inertia\Inertia;
use App\Models\Companies;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TeamController extends Controller
{
    public function show (Request $request, $id, $teamId)
    {
        $user = Auth::user();
        try {
            $team = Teams::findOrFail($teamId);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => "this team do not exist"], 400);
        }

        $role = $team->roles()->where('user_id', $user->id)->first();

        if (!$role->role_name) {
            return response()->json(['message' => 'You do not have permission to get this team'], 403);
        }

        return Inertia::render('team/home', [
            'team' => $team,
            'userRole' => $role->role_name,
        ]);
    }

    public function index (Request $request) {
        $user = Auth::user();
        $teamIds = DB::table('roles')
                     ->where('roleable_type', 'App\Models\Teams')
                     ->where('user_id', $user->id)
                     ->pluck('roleable_id');
        $teams = Teams::whereIn('id', $teamIds)->with('author:id,email')->get();

        return response()->json([
            'teams' => $teams
        ]);
    }

    public function create (Request $request) {
        return Inertia::render('company/newTeams');
    }

    public function store (Request $request, $id) 
    {
        $user = Auth::user();

        $validatedteam = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'mission' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
        ]);

        try {
            $company = Companies::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'company not found'], 400);
        }

        $user_role = $company->roles()->where('user_id', $user->id)->first();

        if (!$user_role->role_name && ($user_role->role_name !== 'owner' && $user_role->role_name !== 'manager')) {
            return response()->json(['message' => 'You do not have permission to create this team'], 403);
        }

        $teams = DB::transaction(function () use ($validatedteam, $user, $company) {
            $teams =  $company->teams()->create([
                ...$validatedteam,
                'author' => $user->id,
                'companies_id' => $company->id
            ]);
    
            $teams->roles()->create([
                'user_id' => $user->id,
                'role_name' => 'administrator',
            ]);

           return $teams;
        });

        $teams->update([
            'companies_id' => $company->id
        ]);

        return redirect("/company/$company->id/team/$teams->id");
    }


}

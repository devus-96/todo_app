<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Companies;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CompanyController extends Controller
{   
    public function show (Request $request, $id) {
        $user = $request->user();
        try {
            $company = Companies::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'company not found.'], 404);
        }

        $role = $company->roles()->where('user_id', $user->id)->first();

        if (!$role->role_name) {
            return response()->json(['message' => 'You do not have permission to get this company'], 403);
        }

        return Inertia::render('company/home', [
            'company' => $company,
            'userRole' => $role->role_name,
        ]);

    }

    public function index (Request $request) {
        $user = Auth::user();

        $companyIds = DB::table('roles')
                     ->where('roleable_type', 'App\Models\Companies')
                     ->where('user_id', $user->id)
                     ->pluck('roleable_id');
        $companies = Companies::whereIn('id', $companyIds)->get();


        return response()->json([
            'companies' => $companies
        ], 200);
    }

    public function create () {
        return Inertia::render('company/newCompany');
    }

    public function store (Request $request) {
        $validatedcompany = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'mission' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
        ]);

        $user = Auth::user();

        $companies = DB::transaction(function () use ($validatedcompany, $user) {
            $companies = Companies::create([
                ...$validatedcompany,
                'author' => $user->id,
            ]);
    
            $companies->roles()->create([
                'user_id' => $user->id,
                'role_name' => 'owner',
            ]);

           return $companies;
        });

        return redirect("/company/$companies->id");

    }

    public function update (Request $request, $id) {
        $validatedcompany = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'mission' => ['sometimes', 'nullable', 'string'],
            'description' => ['sometimes', 'nullable', 'string'],
        ]);

        $user = Auth::user();

        $company = Companies::findOrFail($id);

        $role = $company->roles()->where('user_id', $user->id)->first();

        if ($role->role_name !== 'owner') {
            return response()->json(['message' => 'You do not have permission to update this company'], 403);
        }

        $company->update($validatedcompany);

        return response()->json([
            'message' => 'company has been update successfully',
        ], 200);
    }

    public function delete (Request $request, $id) {
        $user = Auth::user();

        $company  = Companies::findOrFail($id);

        $role = $company->roles()->where('user_id', $user->id)->first();

        if ($role->role_name !== 'owner') {
            return response()->json(['message' => 'You do not have permission to delete this company'], 403);
        }

        $company->delete();

        return response()->json(['message' => 'company successfully deleted.'], 200);

    }
}

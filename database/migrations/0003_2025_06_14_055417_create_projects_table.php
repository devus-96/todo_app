<?php

use App\Models\Projects;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->enum("state", ["not started", "paused", "canceled", "waitting", "in progress", "done"])->default("not started");
            $table->enum("priority", ["high", "medium", "low"]);
            $table->text('description')->nullable();
            $table->json('objectif')->nullable();
            $table->date("start_at")->nullable();
            $table->date('start_date');
            $table->date('deadline');
            $table->date("finish_at")->nullable();
            $table->string("tags")->nullable();
            $table->timestamps();
        });

        Schema::table('tasks', function (Blueprint $table) {
            $table->foreignIdFor(Projects::class)->nullable()->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project');
    }
};

<?php

use App\Models\Tasks;
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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->enum("state", ["not started", "paused", "cancel", "in progress", "done"])->default("not started");
            $table->enum("priority", ["high", "medium", "low"]);
            $table->text('description')->nullable();
            $table->string('start_time')->nullable();
            $table->string('end_time')->nullable();
            $table->date('start_date');
            $table->date('deadline');
            $table->enum('type', ['habit', 'task'])->default('task');
            $table->date("start_at")->nullable();
            $table->date("finish_at")->nullable();

            // Colonnes polymorphes pour lier la tâche à un parent (project ou team)
            $table->nullableMorphs('taskable');

            $table->softDeletes();

            $table->timestamps();
        });

        Schema::table('sub_tasks', function (Blueprint $table) {
            $table->foreignIdFor(Tasks::class)->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('task');
    }
};

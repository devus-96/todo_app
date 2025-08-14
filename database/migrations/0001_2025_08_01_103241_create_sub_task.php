<?php

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
        Schema::create('sub_tasks', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->morphs('taskable_id');
            $table->enum("state", ["not started", "paused", "canceled", "in progress", "done", 'waiting'])->default("not started");
            $table->enum("priority", ["high", "medium", "low"]);
            $table->text('description')->nullable();
            $table->string('start_time')->nullable();
            $table->string('end_time')->nullable();
            $table->date('start_date');
            $table->date('deadline');
            $table->enum('type', ['habit', 'task'])->default('task');
            $table->date("start_at")->nullable();
            $table->date("finish_at")->nullable();
            $table->string("author");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sub_task');
    }
};

<?php

use App\Models\Teams;
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
        Schema::create('teams', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->foreignId('author')->constrained('users');
            $table->string('image')->nullable();
            $table->string('mission')->nullable();
            $table->string('description')->nullable();
            $table->timestamps();
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->foreignIdFor(Teams::class)->nullable()->constrained()->onDelete('cascade');
        });
        
    }



    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teams');
        Schema::table('projects', function (Blueprint $table) {
            $table->dropForeignIdFor(Teams::class);
        });
    }
};

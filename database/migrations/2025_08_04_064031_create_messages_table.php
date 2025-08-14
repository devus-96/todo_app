<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Exécuter les migrations.
     */
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();

            // L'ID de l'expéditeur. On suppose que la table des utilisateurs est 'users'.
            // C'est une clé étrangère qui fait référence à l'ID d'un utilisateur.
            $table->foreignId('sender_id')->constrained('users');

            // L'ID du destinataire. C'est également une clé étrangère vers la table 'users'.
            $table->foreignId('receiver_id')->constrained('users');

            $table->string('subjects');

            // Le contenu du message.
            $table->text('content');

            // L'ID du message auquel on répond. Cet attribut est facultatif (nullable).
            // Si le message est une réponse, il contiendra l'ID du message original.
            $table->foreignId('response_id')->nullable()->constrained('messages');

            // Ajout d'un champ pour suivre l'état de lecture du message.
            $table->boolean('is_read')->default(false);

            // Ajout d'un champ pour permettre la suppression "douce" (soft delete).
            $table->softDeletes();

            $table->timestamps();
        });
    }

    /**
     * Annuler les migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};

<?php

namespace Database\Factories;

use App\Models\ChatbotConversation;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<ChatbotConversation>
 */
class ChatbotConversationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'lead_id' => null,
            'user_id' => null,
            'session_id' => (string) Str::uuid(),
            'status' => 'active',
            'handoff_requested_at' => null,
            'last_message_at' => now(),
            'summary' => fake()->sentence(),
        ];
    }
}

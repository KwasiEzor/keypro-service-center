<?php

namespace Database\Factories;

use App\Models\ChatbotConversation;
use App\Models\ChatbotMessage;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ChatbotMessage>
 */
class ChatbotMessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'conversation_id' => ChatbotConversation::factory(),
            'role' => fake()->randomElement(['user', 'assistant', 'tool']),
            'content' => fake()->paragraph(),
            'metadata' => ['tokens' => fake()->numberBetween(30, 300)],
        ];
    }
}

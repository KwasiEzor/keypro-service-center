<?php

namespace Database\Factories;

use App\Models\ActivityLog;
use App\Models\Lead;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ActivityLog>
 */
class ActivityLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'actor_id' => null,
            'subject_type' => Lead::class,
            'subject_id' => fake()->numberBetween(1, 50),
            'event' => fake()->randomElement(['lead.created', 'lead.updated', 'appointment.confirmed']),
            'description' => fake()->sentence(),
            'properties' => ['ip' => fake()->ipv4()],
        ];
    }
}

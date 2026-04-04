<?php

namespace Database\Factories;

use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = ucfirst(fake()->unique()->words(fake()->numberBetween(2, 3), true));

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'short_description' => fake()->sentence(10),
            'description' => fake()->paragraphs(2, true),
            'turnaround_time' => fake()->randomElement(['24h', '48h', '72h', 'Sous 5 jours']),
            'is_featured' => fake()->boolean(40),
            'is_active' => true,
            'sort_order' => fake()->numberBetween(1, 20),
        ];
    }
}

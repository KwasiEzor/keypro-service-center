<?php

namespace Database\Factories;

use App\Models\Testimonial;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Testimonial>
 */
class TestimonialFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'customer_name' => fake()->name(),
            'company' => fake()->company(),
            'role' => fake()->jobTitle(),
            'quote' => fake()->paragraphs(2, true),
            'rating' => fake()->numberBetween(4, 5),
            'is_featured' => fake()->boolean(50),
            'is_published' => true,
            'sort_order' => fake()->numberBetween(1, 20),
        ];
    }
}

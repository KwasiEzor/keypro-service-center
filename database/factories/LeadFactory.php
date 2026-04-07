<?php

namespace Database\Factories;

use App\Enums\LeadStatus;
use App\Models\Brand;
use App\Models\Lead;
use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Lead>
 */
class LeadFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'service_id' => Service::factory(),
            'brand_id' => Brand::factory(),
            'full_name' => fake()->name(),
            'email' => fake()->safeEmail(),
            'phone' => fake()->e164PhoneNumber(),
            'company' => fake()->company(),
            'device_model' => fake()->randomElement(['Toyota Corolla', 'Mercedes C200', 'BMW X5', 'Peugeot 3008']),
            'message' => fake()->paragraphs(2, true),
            'preferred_contact_method' => fake()->randomElement(['email', 'phone']),
            'status' => LeadStatus::New,
            'source' => 'website',
            'metadata' => ['urgency' => fake()->randomElement(['standard', 'urgent'])],
            'contacted_at' => null,
        ];
    }
}

<?php

namespace Database\Factories;

use App\Enums\AppointmentStatus;
use App\Models\Appointment;
use App\Models\Brand;
use App\Models\Lead;
use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Appointment>
 */
class AppointmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'lead_id' => Lead::factory(),
            'service_id' => Service::factory(),
            'brand_id' => Brand::factory(),
            'scheduled_for' => fake()->dateTimeBetween('+1 day', '+2 weeks'),
            'status' => fake()->randomElement([AppointmentStatus::Pending, AppointmentStatus::Confirmed]),
            'notes' => fake()->sentence(),
        ];
    }
}

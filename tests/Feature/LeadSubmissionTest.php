<?php

use App\Models\Brand;
use App\Models\Lead;
use App\Models\Service;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('visitors can submit a lead request', function () {
    $service = Service::factory()->create();
    $brand = Brand::factory()->create();

    $response = $this
        ->from(route('quote'))
        ->post(route('leads.store'), [
            'service_id' => $service->id,
            'brand_id' => $brand->id,
            'full_name' => 'Marie Bernard',
            'email' => 'marie@example.com',
            'phone' => '+33612345678',
            'company' => 'Atelier Bernard',
            'device_model' => 'MacBook Pro 14',
            'message' => 'Mon appareil ne demarre plus et j ai besoin d un diagnostic rapide.',
            'preferred_contact_method' => 'phone',
        ]);

    $response
        ->assertRedirect(route('quote'))
        ->assertSessionHas('status');

    $lead = Lead::query()->first();

    $this->assertModelExists($lead);

    expect($lead->service_id)->toBe($service->id)
        ->and($lead->brand_id)->toBe($brand->id)
        ->and($lead->status)->toBe('new')
        ->and($lead->source)->toBe('website')
        ->and($lead->preferred_contact_method)->toBe('phone');
});

test('lead submission is validated', function () {
    $response = $this
        ->from(route('quote'))
        ->post(route('leads.store'), []);

    $response
        ->assertRedirect(route('quote'))
        ->assertSessionHasErrors([
            'full_name',
            'email',
            'message',
            'preferred_contact_method',
        ]);

    expect(Lead::query()->count())->toBe(0);
});

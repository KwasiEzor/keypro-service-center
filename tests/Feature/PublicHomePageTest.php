<?php

use App\Models\Brand;
use App\Models\Faq;
use App\Models\Service;
use App\Models\Testimonial;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('public home page responds successfully', function () {
    $services = Service::factory(2)->create([
        'is_featured' => true,
    ]);

    $brands = Brand::factory(2)->create([
        'is_featured' => true,
    ]);

    foreach ($brands as $brand) {
        $brand->services()->attach($services->random(1)->modelKeys());
    }

    Faq::factory(2)->create();
    Testimonial::factory()->create([
        'is_featured' => true,
    ]);

    $response = $this->get(route('home'));

    $response->assertOk();
});

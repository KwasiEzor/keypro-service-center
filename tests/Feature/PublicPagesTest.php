<?php

use App\Models\Brand;
use App\Models\Faq;
use App\Models\Service;
use App\Models\Testimonial;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

beforeEach(function () {
    $services = Service::factory(3)->create([
        'is_featured' => true,
    ]);

    $brands = Brand::factory(3)->create([
        'is_featured' => true,
    ]);

    foreach ($brands as $brand) {
        $brand->services()->attach($services->random(2)->modelKeys());
    }

    Faq::factory(5)->create();
    Testimonial::factory(3)->create([
        'is_featured' => true,
    ]);
});

test('home page renders the service center foundation', function () {
    $response = $this->get(route('home'));

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('public/home')
            ->where('stats.services', 3)
            ->where('stats.brands', 3)
            ->where('stats.faqs', 5)
            ->has('services', 3)
            ->has('brands', 3)
            ->has('faqs', 4)
            ->has('testimonials', 3)
            ->has('leadOptions.services', 3)
            ->has('leadOptions.brands', 3)
        );
});

test('public catalogue pages render correctly', function (
    string $routeName,
    string $component,
    string $prop,
    int $count,
) {
    $response = $this->get(route($routeName));

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component($component)
            ->has($prop, $count)
        );
})->with([
    ['services.index', 'public/services', 'services', 3],
    ['brands.index', 'public/brands', 'brands', 3],
    ['faq.index', 'public/faq', 'faqs', 5],
    ['contact', 'public/contact', 'leadOptions.services', 3],
]);

test('new static public pages render correctly', function (string $routeName, string $component) {
    $response = $this->get(route($routeName));

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component($component)
        );
})->with([
    ['about', 'public/about'],
    ['mobile', 'public/mobile'],
    ['diagnostic', 'public/diagnostic'],
]);

<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLeadRequest;
use App\Models\Brand;
use App\Models\Faq;
use App\Models\Lead;
use App\Models\PricingPlan;
use App\Models\ProcessStep;
use App\Models\Project;
use App\Models\Service;
use App\Models\Testimonial;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class PublicPageController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('public/home', [
            'stats' => [
                'services' => Service::query()->where('is_active', true)->count(),
                'brands' => Brand::query()->where('is_active', true)->count(),
                'faqs' => Faq::query()->where('is_published', true)->count(),
            ],
            'services' => $this->servicesCollection(featuredOnly: true),
            'brands' => $this->brandsCollection(featuredOnly: true),
            'faqs' => $this->faqsCollection(limit: 4),
            'testimonials' => $this->testimonialsCollection(featuredOnly: true),
            'leadOptions' => $this->leadOptions(),
            'projects' => $this->projectsCollection(featuredOnly: true),
            'processSteps' => $this->processStepsCollection(),
            'pricingPlans' => $this->pricingPlansCollection(),
        ]);
    }

    public function services(): Response
    {
        return Inertia::render('public/services', [
            'services' => $this->servicesCollection(),
            'brands' => $this->brandsCollection(),
        ]);
    }

    public function brands(): Response
    {
        return Inertia::render('public/brands', [
            'brands' => $this->brandsCollection(),
        ]);
    }

    public function faq(): Response
    {
        return Inertia::render('public/faq', [
            'faqs' => $this->faqsCollection(),
        ]);
    }

    public function about(): Response
    {
        return Inertia::render('public/about');
    }

    public function mobile(): Response
    {
        return Inertia::render('public/mobile');
    }

    public function diagnostic(): Response
    {
        return Inertia::render('public/diagnostic');
    }

    public function contact(): Response
    {
        return Inertia::render('public/contact', [
            'leadOptions' => $this->leadOptions(),
            'services' => $this->servicesCollection(featuredOnly: true),
        ]);
    }

    public function storeLead(StoreLeadRequest $request): RedirectResponse
    {
        // Honeypot anti-spam: if the hidden "website" field is filled, silently reject
        if ($request->filled('website')) {
            return back()->with('status', 'Votre demande a bien ete recue. Un conseiller vous recontactera rapidement.');
        }

        Lead::create([
            ...$request->validated(),
            'status' => 'new',
            'source' => 'website',
        ]);

        return back()->with('status', 'Votre demande a bien ete recue. Un conseiller vous recontactera rapidement.');
    }

    /**
     * @return array<int, array{id: int, name: string, slug: string, short_description: ?string, description: ?string, turnaround_time: ?string, is_featured: bool, brands: array<int, array{name: string, slug: string}>}>
     */
    private function servicesCollection(bool $featuredOnly = false): array
    {
        $cacheKey = 'public.services'.($featuredOnly ? '.featured' : '.all');

        return Cache::remember($cacheKey, 300, fn () => Service::query()
            ->where('is_active', true)
            ->when($featuredOnly, fn ($query) => $query->where('is_featured', true))
            ->with(['brands:id,name,slug'])
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'name', 'slug', 'short_description', 'description', 'turnaround_time', 'is_featured'])
            ->map(fn (Service $service) => [
                'id' => $service->id,
                'name' => $service->name,
                'slug' => $service->slug,
                'short_description' => $service->short_description,
                'description' => $service->description,
                'turnaround_time' => $service->turnaround_time,
                'is_featured' => $service->is_featured,
                'brands' => $service->brands
                    ->map(fn (Brand $brand) => [
                        'name' => $brand->name,
                        'slug' => $brand->slug,
                    ])
                    ->all(),
            ])
            ->all());
    }

    /**
     * @return array<int, array{id: int, name: string, slug: string, headline: ?string, description: ?string, is_featured: bool, services: array<int, array{name: string, slug: string}>}>
     */
    private function brandsCollection(bool $featuredOnly = false): array
    {
        $cacheKey = 'public.brands'.($featuredOnly ? '.featured' : '.all');

        return Cache::remember($cacheKey, 300, fn () => Brand::query()
            ->where('is_active', true)
            ->when($featuredOnly, fn ($query) => $query->where('is_featured', true))
            ->with(['services:id,name,slug'])
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'name', 'slug', 'headline', 'description', 'is_featured'])
            ->map(fn (Brand $brand) => [
                'id' => $brand->id,
                'name' => $brand->name,
                'slug' => $brand->slug,
                'headline' => $brand->headline,
                'description' => $brand->description,
                'is_featured' => $brand->is_featured,
                'services' => $brand->services
                    ->map(fn (Service $service) => [
                        'name' => $service->name,
                        'slug' => $service->slug,
                    ])
                    ->all(),
            ])
            ->all());
    }

    /**
     * @return array<int, array{id: int, question: string, answer: string}>
     */
    private function faqsCollection(?int $limit = null): array
    {
        $cacheKey = 'public.faqs'.($limit !== null ? ".limit.{$limit}" : '.all');

        return Cache::remember($cacheKey, 300, fn () => Faq::query()
            ->where('is_published', true)
            ->orderBy('sort_order')
            ->orderBy('question')
            ->when($limit !== null, fn ($query) => $query->limit($limit))
            ->get(['id', 'question', 'answer'])
            ->map(fn (Faq $faq) => [
                'id' => $faq->id,
                'question' => $faq->question,
                'answer' => $faq->answer,
            ])
            ->all());
    }

    /**
     * @return array<int, array{id: int, customer_name: string, company: ?string, role: ?string, quote: string, rating: ?int}>
     */
    private function testimonialsCollection(bool $featuredOnly = false): array
    {
        return Testimonial::query()
            ->where('is_published', true)
            ->when($featuredOnly, fn ($query) => $query->where('is_featured', true))
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get(['id', 'customer_name', 'company', 'role', 'quote', 'rating'])
            ->map(fn (Testimonial $testimonial) => [
                'id' => $testimonial->id,
                'customer_name' => $testimonial->customer_name,
                'company' => $testimonial->company,
                'role' => $testimonial->role,
                'quote' => $testimonial->quote,
                'rating' => $testimonial->rating,
            ])
            ->all();
    }

    /**
     * @return array<int, array{id: int, title: string, slug: string, description: ?string, category: ?string, client_name: ?string, completion_date: ?string, image: ?string}>
     */
    private function projectsCollection(bool $featuredOnly = false): array
    {
        return Project::query()
            ->when($featuredOnly, fn ($query) => $query->where('is_featured', true))
            ->orderByDesc('completion_date')
            ->get(['id', 'title', 'slug', 'description', 'category', 'client_name', 'completion_date'])
            ->map(fn (Project $project) => [
                'id' => $project->id,
                'title' => $project->title,
                'slug' => $project->slug,
                'description' => $project->description,
                'category' => $project->category,
                'client_name' => $project->client_name,
                'completion_date' => $project->completion_date?->format('Y-m-d'),
                'image' => $project->getFirstMediaUrl('images'),
            ])
            ->all();
    }

    /**
     * @return array<int, array{id: int, title: string, description: ?string, icon: ?string}>
     */
    private function processStepsCollection(): array
    {
        return ProcessStep::query()
            ->orderBy('sort_order')
            ->get(['id', 'title', 'description', 'icon'])
            ->all();
    }

    /**
     * @return array<int, array{id: int, name: string, price: ?string, description: ?string, features: array<int, string>, is_featured: bool}>
     */
    private function pricingPlansCollection(): array
    {
        return PricingPlan::query()
            ->orderBy('sort_order')
            ->get(['id', 'name', 'price', 'description', 'features', 'is_featured'])
            ->all();
    }

    /**
     * @return array{services: array<int, array{id: int, name: string}>, brands: array<int, array{id: int, name: string}>}
     */
    private function leadOptions(): array
    {
        return Cache::remember('public.lead-options', 300, fn () => [
            'services' => Service::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->orderBy('name')
                ->get(['id', 'name'])
                ->map(fn (Service $service) => [
                    'id' => $service->id,
                    'name' => $service->name,
                ])
                ->all(),
            'brands' => Brand::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->orderBy('name')
                ->get(['id', 'name'])
                ->map(fn (Brand $brand) => [
                    'id' => $brand->id,
                    'name' => $brand->name,
                ])
                ->all(),
        ]);
    }
}

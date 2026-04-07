<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PublicPageController;
use Illuminate\Support\Facades\Route;

Route::controller(PublicPageController::class)->group(function () {
    Route::get('/', 'home')->name('home');
    Route::get('/services', 'services')->name('services.index');
    Route::get('/brands', 'brands')->name('brands.index');
    Route::get('/faq', 'faq')->name('faq.index');
    Route::get('/a-propos', 'about')->name('about');
    Route::get('/intervention-mobile', 'mobile')->name('mobile');
    Route::get('/diagnostic-technique', 'diagnostic')->name('diagnostic');
    Route::get('/contact', 'contact')->name('contact');
    Route::get('/quote', 'contact')->name('quote');
    Route::post('/quote', 'storeLead')->name('leads.store')->middleware('throttle:5,1');

    // Legal Pages
    Route::get('/mentions-legales', 'mentionsLegales')->name('legal.mentions');
    Route::get('/politique-confidentialite', 'privacyPolicy')->name('legal.privacy');
    Route::get('/conditions-generales-vente', 'cgv')->name('legal.cgv');
});

Route::middleware(['auth', 'verified'])->prefix('dashboard')->group(function () {
    Route::get('/', [DashboardController::class, 'dashboard'])->name('dashboard');
    Route::get('/interventions', [DashboardController::class, 'leads'])->name('dashboard.leads');
    Route::get('/rendez-vous', [DashboardController::class, 'appointments'])->name('dashboard.appointments');
});

require __DIR__.'/settings.php';

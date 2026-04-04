<?php

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
    Route::post('/quote', 'storeLead')->name('leads.store');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';

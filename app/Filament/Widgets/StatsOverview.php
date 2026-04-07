<?php

namespace App\Filament\Widgets;

use App\Models\Appointment;
use App\Models\Lead;
use App\Models\Service;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Demandes (Leads)', Lead::count())
                ->description('Toutes les demandes reçues')
                ->descriptionIcon('heroicon-m-user-group')
                ->chart([7, 2, 10, 3, 15, 4, 17])
                ->color('success'),
            Stat::make('Réparations en cours', Lead::whereIn('status', ['Nouveau', 'En cours', 'Diagnostic', 'Waiting Parts'])->count())
                ->description('Interventions actives')
                ->descriptionIcon('heroicon-m-wrench-screwdriver')
                ->color('warning'),
            Stat::make('Rendez-vous à venir', Appointment::where('scheduled_for', '>=', now())->count())
                ->description('Planning prochaines 24h/7j')
                ->descriptionIcon('heroicon-m-calendar-days')
                ->color('info'),
            Stat::make('Services Actifs', Service::where('is_active', true)->count())
                ->description('Catalogue en ligne')
                ->descriptionIcon('heroicon-m-rectangle-stack')
                ->color('primary'),
        ];
    }
}

<?php

namespace App\Filament\Widgets;

use App\Models\Lead;
use Filament\Widgets\ChartWidget;
use Flowframe\Trend\Trend;

class LeadTrendChart extends ChartWidget
{
    protected ?string $heading = 'Tendance des Demandes (30 derniers jours)';
    protected string $color = 'danger';

    protected function getData(): array
    {
        // Simple manual calculation for 30 days if Trend package is not installed
        $data = [];
        $labels = [];

        for ($i = 29; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $labels[] = $date->format('d M');
            $data[] = Lead::whereDate('created_at', $date->toDateString())->count();
        }

        return [
            'datasets' => [
                [
                    'label' => 'Nouvelles demandes',
                    'data' => $data,
                    'fill' => 'start',
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}

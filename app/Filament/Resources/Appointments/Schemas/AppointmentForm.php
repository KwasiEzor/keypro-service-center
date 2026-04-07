<?php

namespace App\Filament\Resources\Appointments\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class AppointmentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('lead_id')
                    ->relationship('lead', 'id'),
                Select::make('service_id')
                    ->relationship('service', 'name'),
                Select::make('brand_id')
                    ->relationship('brand', 'name'),
                DateTimePicker::make('scheduled_for'),
                TextInput::make('status')
                    ->required()
                    ->default('draft'),
                Textarea::make('notes')
                    ->columnSpanFull(),
            ]);
    }
}

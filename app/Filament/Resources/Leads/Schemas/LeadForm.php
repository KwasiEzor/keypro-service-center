<?php

namespace App\Filament\Resources\Leads\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class LeadForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('service_id')
                    ->relationship('service', 'name'),
                Select::make('brand_id')
                    ->relationship('brand', 'name'),
                TextInput::make('full_name')
                    ->required(),
                TextInput::make('email')
                    ->label('Email address')
                    ->email()
                    ->required(),
                TextInput::make('phone')
                    ->tel(),
                TextInput::make('company'),
                TextInput::make('device_model'),
                Textarea::make('message')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('preferred_contact_method')
                    ->required()
                    ->default('email'),
                TextInput::make('status')
                    ->required()
                    ->default('new'),
                TextInput::make('source')
                    ->required()
                    ->default('website'),
                Textarea::make('metadata')
                    ->columnSpanFull(),
                DateTimePicker::make('contacted_at'),
            ]);
    }
}

<?php

namespace App\Filament\Resources\Leads\Schemas;

use App\Enums\LeadStatus;
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
            ->columns(2)
            ->components([
                TextInput::make('full_name')
                    ->label('Nom complet')
                    ->required(),
                TextInput::make('email')
                    ->label('Email')
                    ->email()
                    ->required(),
                TextInput::make('phone')
                    ->label('Téléphone')
                    ->tel(),
                TextInput::make('company')
                    ->label('Entreprise'),
                Select::make('service_id')
                    ->label('Service')
                    ->relationship('service', 'name'),
                Select::make('brand_id')
                    ->label('Marque')
                    ->relationship('brand', 'name'),
                TextInput::make('device_model')
                    ->label('Modèle / Véhicule'),
                Select::make('preferred_contact_method')
                    ->label('Contact préféré')
                    ->options([
                        'email' => 'Email',
                        'phone' => 'Téléphone',
                        'whatsapp' => 'WhatsApp',
                    ])
                    ->default('email'),
                Textarea::make('message')
                    ->label('Description du problème')
                    ->required()
                    ->rows(4)
                    ->columnSpanFull(),
                Select::make('status')
                    ->label('Statut')
                    ->options(
                        collect(LeadStatus::cases())
                            ->mapWithKeys(fn (LeadStatus $s) => [$s->value => $s->label()])
                            ->all()
                    )
                    ->required()
                    ->default('new'),
                Select::make('source')
                    ->label('Source')
                    ->options([
                        'website' => 'Site web',
                        'phone' => 'Téléphone',
                        'walk_in' => 'Passage',
                        'referral' => 'Recommandation',
                        'social' => 'Réseaux sociaux',
                    ])
                    ->default('website'),
                DateTimePicker::make('contacted_at')
                    ->label('Date de contact'),
            ]);
    }
}

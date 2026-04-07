<?php

namespace App\Filament\Resources\Leads\Tables;

use App\Enums\LeadStatus;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class LeadsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                TextColumn::make('id')
                    ->label('Référence')
                    ->formatStateUsing(fn (int $state): string => 'KP-'.str_pad((string) $state, 5, '0', STR_PAD_LEFT))
                    ->sortable()
                    ->searchable(),
                TextColumn::make('full_name')
                    ->label('Client')
                    ->searchable()
                    ->weight('bold'),
                TextColumn::make('email')
                    ->label('Email')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('phone')
                    ->label('Téléphone')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('service.name')
                    ->label('Service')
                    ->searchable(),
                TextColumn::make('brand.name')
                    ->label('Marque')
                    ->searchable(),
                TextColumn::make('device_model')
                    ->label('Modèle')
                    ->searchable()
                    ->toggleable(),
                TextColumn::make('status')
                    ->label('Statut')
                    ->badge()
                    ->sortable(),
                TextColumn::make('source')
                    ->label('Source')
                    ->badge()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('contacted_at')
                    ->label('Contacté le')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('created_at')
                    ->label('Reçu le')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->label('Statut')
                    ->options(
                        collect(LeadStatus::cases())
                            ->mapWithKeys(fn (LeadStatus $s) => [$s->value => $s->label()])
                            ->all()
                    ),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}

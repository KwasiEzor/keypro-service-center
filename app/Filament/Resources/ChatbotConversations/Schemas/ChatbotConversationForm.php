<?php

namespace App\Filament\Resources\ChatbotConversations\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ChatbotConversationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('lead_id')
                    ->relationship('lead', 'id'),
                Select::make('user_id')
                    ->relationship('user', 'name'),
                TextInput::make('session_id')
                    ->required(),
                TextInput::make('status')
                    ->required()
                    ->default('active'),
                DateTimePicker::make('handoff_requested_at'),
                DateTimePicker::make('last_message_at'),
                Textarea::make('summary')
                    ->columnSpanFull(),
            ]);
    }
}

<?php

namespace App\Filament\Resources\ChatbotConversations;

use App\Filament\Resources\ChatbotConversations\Pages\CreateChatbotConversation;
use App\Filament\Resources\ChatbotConversations\Pages\EditChatbotConversation;
use App\Filament\Resources\ChatbotConversations\Pages\ListChatbotConversations;
use App\Filament\Resources\ChatbotConversations\Schemas\ChatbotConversationForm;
use App\Filament\Resources\ChatbotConversations\Tables\ChatbotConversationsTable;
use App\Models\ChatbotConversation;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ChatbotConversationResource extends Resource
{
    protected static ?string $model = ChatbotConversation::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return ChatbotConversationForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ChatbotConversationsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListChatbotConversations::route('/'),
            'create' => CreateChatbotConversation::route('/create'),
            'edit' => EditChatbotConversation::route('/{record}/edit'),
        ];
    }
}

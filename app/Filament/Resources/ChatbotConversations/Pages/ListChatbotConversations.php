<?php

namespace App\Filament\Resources\ChatbotConversations\Pages;

use App\Filament\Resources\ChatbotConversations\ChatbotConversationResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListChatbotConversations extends ListRecords
{
    protected static string $resource = ChatbotConversationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}

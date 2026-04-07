<?php

namespace App\Filament\Resources\ChatbotConversations\Pages;

use App\Filament\Resources\ChatbotConversations\ChatbotConversationResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditChatbotConversation extends EditRecord
{
    protected static string $resource = ChatbotConversationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}

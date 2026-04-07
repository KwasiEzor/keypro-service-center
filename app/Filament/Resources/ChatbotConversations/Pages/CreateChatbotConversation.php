<?php

namespace App\Filament\Resources\ChatbotConversations\Pages;

use App\Filament\Resources\ChatbotConversations\ChatbotConversationResource;
use Filament\Resources\Pages\CreateRecord;

class CreateChatbotConversation extends CreateRecord
{
    protected static string $resource = ChatbotConversationResource::class;
}

<?php

namespace App\Models;

use Database\Factories\ChatbotConversationFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['lead_id', 'user_id', 'session_id', 'status', 'handoff_requested_at', 'last_message_at', 'summary'])]
class ChatbotConversation extends Model
{
    /** @use HasFactory<ChatbotConversationFactory> */
    use HasFactory;

    public function lead(): BelongsTo
    {
        return $this->belongsTo(Lead::class);
    }

    public function messages(): HasMany
    {
        return $this->hasMany(ChatbotMessage::class, 'conversation_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'handoff_requested_at' => 'datetime',
            'last_message_at' => 'datetime',
        ];
    }
}

<?php

namespace App\Notifications;

use App\Models\Lead;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class LeadStatusChanged extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public Lead $lead) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $statusLabel = $this->lead->status->label();
        $reference = 'KP-'.str_pad((string) $this->lead->id, 5, '0', STR_PAD_LEFT);

        return (new MailMessage)
            ->subject("Mise à jour de votre dossier {$reference} — KeyPro")
            ->greeting("Bonjour {$this->lead->full_name},")
            ->line("Le statut de votre demande d'intervention **{$reference}** a été mis à jour.")
            ->line("Nouveau statut : **{$statusLabel}**")
            ->action('Suivre mon dossier', url('/dashboard/interventions'))
            ->line('Merci de faire confiance à KeyPro Service Center pour votre expertise technique.')
            ->salutation("L'équipe technique KeyPro");
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'lead_id' => $this->lead->id,
            'status' => $this->lead->status->value,
            'reference' => 'KP-'.str_pad((string) $this->lead->id, 5, '0', STR_PAD_LEFT),
        ];
    }
}

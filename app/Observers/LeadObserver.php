<?php

namespace App\Observers;

use App\Models\Lead;
use App\Notifications\LeadStatusChanged;
use Illuminate\Support\Facades\Notification;

class LeadObserver
{
    /**
     * Handle the Lead "created" event.
     */
    public function created(Lead $lead): void
    {
        // Notification for new lead could go here (e.g. to Admin)
    }

    /**
     * Handle the Lead "updated" event.
     */
    public function updated(Lead $lead): void
    {
        if ($lead->isDirty('status')) {
            // Notify the customer about status change
            Notification::route('mail', $lead->email)
                ->notify(new LeadStatusChanged($lead));
        }
    }
}

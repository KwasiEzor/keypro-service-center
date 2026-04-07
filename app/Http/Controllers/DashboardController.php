<?php

namespace App\Http\Controllers;

use App\Enums\LeadStatus;
use App\Models\Appointment;
use App\Models\Lead;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Helper to format lead data.
     *
     * @return array{id: int, reference: string, service_name: string, brand_name: string, device_model: string, status: string, status_label: string, status_color: string, status_step: int, created_at: string, message: ?string, phone: ?string, email: string}
     */
    protected function formatLead(Lead $lead): array
    {
        return [
            'id' => $lead->id,
            'reference' => 'KP-'.str_pad((string) $lead->id, 5, '0', STR_PAD_LEFT),
            'service_name' => $lead->service->name ?? 'Service Général',
            'brand_name' => $lead->brand->name ?? 'Toutes Marques',
            'device_model' => $lead->device_model ?? 'Non spécifié',
            'status' => $lead->status->value,
            'status_label' => $lead->status->label(),
            'status_color' => $lead->status->color(),
            'status_step' => $lead->status->stepNumber(),
            'created_at' => $lead->created_at->format('d/m/Y'),
            'message' => $lead->message,
            'phone' => $lead->phone,
            'email' => $lead->email,
        ];
    }

    /**
     * Helper to format appointment data.
     *
     * @return array{id: int, reference: string, service_name: string, brand_name: string, date: string, time: string, status: string, status_label: string, status_color: string, is_past: bool, notes: ?string, lead_reference: ?string}
     */
    protected function formatAppointment(Appointment $apt): array
    {
        return [
            'id' => $apt->id,
            'reference' => 'APT-'.str_pad((string) $apt->id, 4, '0', STR_PAD_LEFT),
            'service_name' => $apt->service->name ?? 'Intervention Technique',
            'brand_name' => $apt->brand->name ?? 'Toutes Marques',
            'date' => $apt->scheduled_for->format('d/m/Y'),
            'time' => $apt->scheduled_for->format('H:i'),
            'status' => $apt->status->value,
            'status_label' => $apt->status->label(),
            'status_color' => $apt->status->color(),
            'is_past' => $apt->scheduled_for->isPast(),
            'notes' => $apt->notes,
            'lead_reference' => $apt->lead ? 'KP-'.str_pad((string) $apt->lead->id, 5, '0', STR_PAD_LEFT) : null,
        ];
    }

    public function dashboard(Request $request): Response
    {
        $user = $request->user();

        $leads = Lead::where('email', $user->email)
            ->with(['service', 'brand'])
            ->orderBy('created_at', 'desc')
            ->get();

        $appointments = Appointment::whereHas('lead', function ($query) use ($user) {
            $query->where('email', $user->email);
        })
            ->with(['service', 'brand', 'lead'])
            ->orderBy('scheduled_for', 'asc')
            ->get();

        return Inertia::render('dashboard', [
            'leads' => $leads->map(fn (Lead $l) => $this->formatLead($l)),
            'appointments' => $appointments->map(fn (Appointment $a) => $this->formatAppointment($a)),
            'stats' => [
                'total_leads' => $leads->count(),
                'active_repairs' => $leads->filter(
                    fn (Lead $l) => ! in_array($l->status, [LeadStatus::Completed, LeadStatus::Cancelled])
                )->count(),
                'upcoming_appointments' => $appointments->where('scheduled_for', '>=', now())->count(),
            ],
            'statusTimeline' => collect(LeadStatus::cases())
                ->filter(fn (LeadStatus $s) => $s !== LeadStatus::Cancelled)
                ->map(fn (LeadStatus $s) => [
                    'value' => $s->value,
                    'label' => $s->label(),
                    'step' => $s->stepNumber(),
                ])
                ->values()
                ->all(),
        ]);
    }

    public function leads(Request $request): Response
    {
        $user = $request->user();
        $leads = Lead::where('email', $user->email)
            ->with(['service', 'brand'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('dashboard/leads', [
            'leads' => $leads->map(fn (Lead $l) => $this->formatLead($l)),
            'statusTimeline' => collect(LeadStatus::cases())
                ->filter(fn (LeadStatus $s) => $s !== LeadStatus::Cancelled)
                ->map(fn (LeadStatus $s) => [
                    'value' => $s->value,
                    'label' => $s->label(),
                    'step' => $s->stepNumber(),
                ])
                ->values()
                ->all(),
        ]);
    }

    public function appointments(Request $request): Response
    {
        $user = $request->user();
        $appointments = Appointment::whereHas('lead', function ($query) use ($user) {
            $query->where('email', $user->email);
        })
            ->with(['service', 'brand', 'lead'])
            ->orderBy('scheduled_for', 'asc')
            ->get();

        return Inertia::render('dashboard/appointments', [
            'appointments' => $appointments->map(fn (Appointment $a) => $this->formatAppointment($a)),
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Lead;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Helper to format lead data.
     */
    protected function formatLead($lead)
    {
        return [
            'id' => $lead->id,
            'reference' => 'KP-' . str_pad($lead->id, 5, '0', STR_PAD_LEFT),
            'service_name' => $lead->service->name ?? 'Service Général',
            'brand_name' => $lead->brand->name ?? 'Toutes Marques',
            'device_model' => $lead->device_model ?? 'Non spécifié',
            'status' => $lead->status ?? 'Nouveau',
            'created_at' => $lead->created_at->format('d/m/Y'),
            'message' => $lead->message,
        ];
    }

    /**
     * Helper to format appointment data.
     */
    protected function formatAppointment($apt)
    {
        return [
            'id' => $apt->id,
            'reference' => 'APT-' . str_pad($apt->id, 4, '0', STR_PAD_LEFT),
            'service_name' => $apt->service->name ?? 'Intervention Technique',
            'date' => $apt->scheduled_for->format('d/m/Y'),
            'time' => $apt->scheduled_for->format('H:i'),
            'status' => $apt->status,
            'is_past' => $apt->scheduled_for->isPast(),
        ];
    }

    public function index(Request $request): Response
    {
        $user = $request->user();

        // Fetch leads (quotes/repairs) linked to the user's email
        $leads = Lead::where('email', $user->email)
            ->with(['service', 'brand'])
            ->orderBy('created_at', 'desc')
            ->get();

        // Fetch appointments linked to those leads
        $appointments = Appointment::whereHas('lead', function ($query) use ($user) {
            $query->where('email', $user->email);
        })
            ->with(['service', 'brand'])
            ->orderBy('scheduled_for', 'asc')
            ->get();

        return Inertia::render('dashboard', [
            'leads' => $leads->map(fn($l) => $this->formatLead($l)),
            'appointments' => $appointments->map(fn($a) => $this->formatAppointment($a)),
            'stats' => [
                'total_leads' => $leads->count(),
                'active_repairs' => $leads->whereNotIn('status', ['Terminé', 'Annulée', 'Completed', 'Cancelled'])->count(),
                'upcoming_appointments' => $appointments->where('scheduled_for', '>=', now())->count(),
            ],
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
            'leads' => $leads->map(fn($l) => $this->formatLead($l)),
        ]);
    }

    public function appointments(Request $request): Response
    {
        $user = $request->user();
        $appointments = Appointment::whereHas('lead', function ($query) use ($user) {
            $query->where('email', $user->email);
        })
            ->with(['service', 'brand'])
            ->orderBy('scheduled_for', 'asc')
            ->get();

        return Inertia::render('dashboard/appointments', [
            'appointments' => $appointments->map(fn($a) => $this->formatAppointment($a)),
        ]);
    }
}

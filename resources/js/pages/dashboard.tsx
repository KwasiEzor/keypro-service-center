import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Activity, Calendar, FileText, ChevronRight, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { dashboard, contact } from '@/routes';
import { leads as leadsRoute, appointments as appointmentsRoute } from '@/routes/dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type Lead = {
    id: number;
    reference: string;
    service_name: string;
    brand_name: string;
    device_model: string;
    status: string;
    status_label: string;
    status_color: string;
    status_step: number;
    created_at: string;
    message: string | null;
};

type Appointment = {
    id: number;
    reference: string;
    service_name: string;
    brand_name: string;
    date: string;
    time: string;
    status: string;
    status_label: string;
    status_color: string;
    is_past: boolean;
    notes: string | null;
    lead_reference: string | null;
};

type StatusTimelineStep = {
    value: string;
    label: string;
    step: number;
};

function StatusTimeline({ currentStep, timeline }: { currentStep: number; timeline: StatusTimelineStep[] }) {
    return (
        <div className="flex items-center gap-1">
            {timeline.map((step, idx) => {
                const isActive = step.step <= currentStep;
                const isCurrent = step.step === currentStep;
                return (
                    <div key={step.value} className="flex items-center gap-1">
                        <div className="flex flex-col items-center">
                            <div
                                className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-black transition-all ${
                                    isCurrent
                                        ? 'bg-primary text-white ring-4 ring-primary/20'
                                        : isActive
                                          ? 'bg-emerald-500 text-white'
                                          : 'bg-slate-100 text-slate-400 dark:bg-white/10'
                                }`}
                            >
                                {isActive && !isCurrent ? '✓' : idx + 1}
                            </div>
                            <span className={`mt-1 text-[8px] font-bold uppercase tracking-wider ${isCurrent ? 'text-primary' : isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
                                {step.label}
                            </span>
                        </div>
                        {idx < timeline.length - 1 && (
                            <div className={`mb-4 h-0.5 w-4 sm:w-6 ${isActive ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-white/10'}`} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

const statusColorMap: Record<string, string> = {
    new: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    contacted: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    quoted: 'bg-violet-500/10 text-violet-600 border-violet-500/20',
    in_progress: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    completed: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    cancelled: 'bg-red-500/10 text-red-600 border-red-500/20',
    confirmed: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    pending: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    draft: 'bg-slate-500/10 text-slate-600 border-slate-500/20',
};

function getStatusColor(status: string): string {
    return statusColorMap[status] || 'bg-amber-500/10 text-amber-500 border-amber-500/20';
}

type Props = {
    leads: Lead[];
    appointments: Appointment[];
    stats: { total_leads: number; active_repairs: number; upcoming_appointments: number };
    statusTimeline: StatusTimelineStep[];
};

export default function Dashboard({ leads = [], appointments = [], stats = { total_leads: 0, active_repairs: 0, upcoming_appointments: 0 }, statusTimeline = [] }: Props) {
    return (
        <>
            <Head title="Portail Client — KeyPro" />
            <div className="flex h-full flex-1 flex-col gap-8 overflow-y-auto p-4 md:p-8">

                <div className="space-y-2">
                    <h1 className="font-display text-3xl font-bold uppercase tracking-tight">Vue d'ensemble</h1>
                    <p className="text-slate-500 dark:text-slate-400">Suivez l'état de vos interventions et devis en temps réel.</p>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <Link href={leadsRoute().url} className="block group">
                            <Card className="border-sidebar-border/70 dark:border-sidebar-border transition-colors group-hover:border-primary/50 group-hover:bg-slate-50/50 dark:group-hover:bg-white/5">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-500 group-hover:text-primary transition-colors">Demandes Totales</CardTitle>
                                    <FileText className="size-4 text-slate-400 group-hover:text-primary transition-colors" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-4xl font-display font-black">{stats.total_leads}</div>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <Link href={leadsRoute().url} className="block group">
                            <Card className="border-primary/20 bg-primary/5 dark:bg-primary/5 transition-colors group-hover:border-primary/50 group-hover:bg-primary/10">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-primary">Réparations Actives</CardTitle>
                                    <Activity className="size-4 text-primary" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-4xl font-display font-black text-primary">{stats.active_repairs}</div>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <Link href={appointmentsRoute().url} className="block group">
                            <Card className="border-sidebar-border/70 dark:border-sidebar-border transition-colors group-hover:border-primary/50 group-hover:bg-slate-50/50 dark:group-hover:bg-white/5">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-bold uppercase tracking-widest text-slate-500 group-hover:text-primary transition-colors">Rendez-vous</CardTitle>
                                    <Calendar className="size-4 text-slate-400 group-hover:text-primary transition-colors" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-4xl font-display font-black">{stats.upcoming_appointments}</div>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Leads / Interventions */}
                    <Card className="col-span-2 border-sidebar-border/70 dark:border-sidebar-border">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="font-display uppercase tracking-wide">Mes Interventions & Devis</CardTitle>
                                <CardDescription>Historique récent de vos demandes techniques.</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href={leadsRoute().url} className="gap-1 font-bold uppercase tracking-wider text-xs">
                                    Voir tout <ChevronRight className="size-3" />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            {leads.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500">
                                    <AlertCircle className="mb-4 size-8 opacity-50" />
                                    <p>Aucune demande en cours.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {leads.slice(0, 5).map((lead) => (
                                        <div key={lead.id} className="space-y-3 rounded-lg border border-slate-100 p-4 transition-colors hover:bg-slate-50 dark:border-white/5 dark:hover:bg-white/5">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-display font-bold uppercase">{lead.reference}</span>
                                                    <Badge variant="outline" className={getStatusColor(lead.status)}>{lead.status_label}</Badge>
                                                </div>
                                                <div className="hidden text-right text-sm text-slate-500 sm:block">
                                                    <div className="font-bold">{lead.created_at}</div>
                                                </div>
                                            </div>
                                            <div className="text-sm text-slate-500">
                                                {lead.service_name} — <span className="font-bold text-slate-700 dark:text-slate-300">{lead.brand_name} {lead.device_model}</span>
                                            </div>
                                            {statusTimeline.length > 0 && lead.status !== 'cancelled' && (
                                                <StatusTimeline currentStep={lead.status_step} timeline={statusTimeline} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Appointments */}
                    <Card className="border-sidebar-border/70 dark:border-sidebar-border">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="font-display uppercase tracking-wide">Rendez-vous</CardTitle>
                                <CardDescription>Vos prochaines visites.</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href={appointmentsRoute().url} className="gap-1 font-bold uppercase tracking-wider text-xs">
                                    Planning <ChevronRight className="size-3" />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            {appointments.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500">
                                    <Calendar className="mb-4 size-8 opacity-50" />
                                    <p>Aucun rendez-vous prévu.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {appointments.slice(0, 3).map((apt) => (
                                        <div key={apt.id} className={`relative block border-l-2 p-4 transition-colors hover:bg-slate-50 dark:hover:bg-white/5 ${apt.is_past ? 'border-slate-200 dark:border-white/10 opacity-60' : 'border-primary bg-primary/5 hover:bg-primary/10'}`}>
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white dark:bg-black border border-slate-100 dark:border-white/10">
                                                    {apt.is_past ? <CheckCircle2 className="size-5 text-slate-400" /> : <Clock className="size-5 text-primary" />}
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="font-display font-bold uppercase text-sm leading-tight">{apt.service_name}</p>
                                                    <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500 uppercase">
                                                        <Calendar className="size-3" /> {apt.date}
                                                        <span className="text-slate-300">•</span>
                                                        <Clock className="size-3" /> {apt.time}
                                                    </div>
                                                    <Badge variant="outline" className={`mt-2 text-[10px] ${getStatusColor(apt.status)}`}>{apt.status_label}</Badge>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Tableau de bord',
            href: dashboard(),
        },
    ],
};

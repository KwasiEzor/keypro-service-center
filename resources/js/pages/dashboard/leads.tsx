import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Wrench, AlertCircle } from 'lucide-react';
import { leads as leadsRoute } from '@/routes/dashboard';
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

type StatusTimelineStep = {
    value: string;
    label: string;
    step: number;
};

const statusColorMap: Record<string, string> = {
    new: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    contacted: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    quoted: 'bg-violet-500/10 text-violet-600 border-violet-500/20',
    in_progress: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    completed: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    cancelled: 'bg-red-500/10 text-red-600 border-red-500/20',
};

function getStatusColor(status: string): string {
    return statusColorMap[status] || 'bg-amber-500/10 text-amber-500 border-amber-500/20';
}

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
                                className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-black transition-all ${
                                    isCurrent
                                        ? 'bg-primary text-white ring-4 ring-primary/20'
                                        : isActive
                                          ? 'bg-emerald-500 text-white'
                                          : 'bg-slate-100 text-slate-400 dark:bg-white/10'
                                }`}
                            >
                                {isActive && !isCurrent ? '✓' : idx + 1}
                            </div>
                            <span className={`mt-1.5 text-[9px] font-bold uppercase tracking-wider max-w-[60px] text-center leading-tight ${isCurrent ? 'text-primary' : isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
                                {step.label}
                            </span>
                        </div>
                        {idx < timeline.length - 1 && (
                            <div className={`mb-5 h-0.5 w-6 sm:w-8 ${isActive ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-white/10'}`} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default function LeadsPage({ leads = [], statusTimeline = [] }: { leads: Lead[]; statusTimeline: StatusTimelineStep[] }) {
    return (
        <>
            <Head title="Mes Interventions — KeyPro" />
            <div className="flex h-full flex-1 flex-col gap-8 overflow-y-auto p-4 md:p-8">

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Wrench className="size-6 text-primary" />
                        <h1 className="font-display text-3xl font-bold uppercase tracking-tight">Mes Interventions</h1>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400">Gérez vos demandes de réparation, programmation et vente.</p>
                </div>

                <Card className="border-sidebar-border/70 dark:border-sidebar-border">
                    <CardHeader>
                        <CardTitle className="font-display uppercase tracking-wide">Liste des dossiers</CardTitle>
                        <CardDescription>Retrouvez l'historique complet de vos interactions techniques.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {leads.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center text-slate-500">
                                <AlertCircle className="mb-4 size-12 opacity-30 text-primary" />
                                <h3 className="text-lg font-bold">Aucune intervention</h3>
                                <p className="max-w-xs mx-auto">Vous n'avez pas encore de demande enregistrée sur notre plateforme.</p>
                            </div>
                        ) : (
                            <div className="grid gap-6">
                                {leads.map((lead, index) => (
                                    <motion.div
                                        key={lead.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="group relative rounded-xl border border-slate-100 p-6 transition-all hover:shadow-lg hover:border-primary/20 dark:border-white/5 dark:hover:bg-white/5"
                                    >
                                        <div className="space-y-4">
                                            {/* Header */}
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5 text-primary">
                                                        <Wrench className="size-5" />
                                                    </div>
                                                    <div>
                                                        <span className="block font-display text-lg font-black uppercase leading-none">{lead.reference}</span>
                                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Créé le {lead.created_at}</span>
                                                    </div>
                                                    <Badge variant="outline" className={getStatusColor(lead.status)}>{lead.status_label}</Badge>
                                                </div>
                                            </div>

                                            {/* Details */}
                                            <div className="pl-[52px] space-y-1">
                                                <p className="font-bold text-slate-800 dark:text-slate-200">{lead.service_name}</p>
                                                <p className="text-sm text-slate-500">{lead.brand_name} — {lead.device_model}</p>
                                                {lead.message && (
                                                    <p className="text-sm text-slate-500 line-clamp-2 mt-2 italic">"{lead.message}"</p>
                                                )}
                                            </div>

                                            {/* Timeline */}
                                            {statusTimeline.length > 0 && lead.status !== 'cancelled' && (
                                                <div className="pl-[52px] pt-2 border-t border-slate-100 dark:border-white/5">
                                                    <StatusTimeline currentStep={lead.status_step} timeline={statusTimeline} />
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

LeadsPage.layout = {
    breadcrumbs: [
        { title: 'Tableau de bord', href: '/dashboard' },
        { title: 'Interventions', href: leadsRoute().url },
    ],
};

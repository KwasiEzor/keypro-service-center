import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Activity, Calendar, FileText, ChevronRight, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { dashboard } from '@/routes';
import App from '@/actions/App';
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
    created_at: string;
    message: string;
};

type Appointment = {
    id: number;
    reference: string;
    service_name: string;
    date: string;
    time: string;
    status: string;
    is_past: boolean;
};

export default function Dashboard({ leads = [], appointments = [], stats = { total_leads: 0, active_repairs: 0, upcoming_appointments: 0 } }: { leads: Lead[], appointments: Appointment[], stats: any }) {
    
    const getStatusColor = (status: string) => {
        const s = status?.toLowerCase() || '';
        if (s.includes('termin') || s.includes('compl') || s.includes('confirm')) return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
        if (s.includes('annul') || s.includes('cancel')) return 'bg-red-500/10 text-red-500 border-red-500/20';
        if (s.includes('cours') || s.includes('process') || s.includes('réparation')) return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    };

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
                        <Link href={App.Http.Controllers.DashboardController.leads().url} className="block group">
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
                        <Link href={App.Http.Controllers.DashboardController.leads().url} className="block group">
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
                        <Link href={App.Http.Controllers.DashboardController.appointments().url} className="block group">
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
                                <Link href={App.Http.Controllers.DashboardController.leads().url} className="gap-1 font-bold uppercase tracking-wider text-xs">
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
                                        <Link key={lead.id} href={App.Http.Controllers.DashboardController.leads().url} className="flex items-center justify-between rounded-lg border border-slate-100 p-4 transition-colors hover:bg-slate-50 dark:border-white/5 dark:hover:bg-white/5">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-display font-bold uppercase">{lead.reference}</span>
                                                    <Badge variant="outline" className={getStatusColor(lead.status)}>{lead.status}</Badge>
                                                </div>
                                                <div className="text-sm text-slate-500">
                                                    {lead.service_name} — <span className="font-bold text-slate-700 dark:text-slate-300">{lead.brand_name} {lead.device_model}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="hidden text-right text-sm text-slate-500 sm:block">
                                                    <div>Demande du</div>
                                                    <div className="font-bold">{lead.created_at}</div>
                                                </div>
                                                <ChevronRight className="size-4 text-slate-300" />
                                            </div>
                                        </Link>
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
                                <Link href={App.Http.Controllers.DashboardController.appointments().url} className="gap-1 font-bold uppercase tracking-wider text-xs">
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
                                        <Link key={apt.id} href={App.Http.Controllers.DashboardController.appointments().url} className={`relative block border-l-2 p-4 transition-colors hover:bg-slate-50 dark:hover:bg-white/5 ${apt.is_past ? 'border-slate-200 dark:border-white/10 opacity-60' : 'border-primary bg-primary/5 hover:bg-primary/10'}`}>
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
                                                    <Badge variant="outline" className={`mt-2 text-[10px] ${getStatusColor(apt.status)}`}>{apt.status || 'Confirmé'}</Badge>
                                                </div>
                                            </div>
                                        </Link>
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

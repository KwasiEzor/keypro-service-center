import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Calendar, Clock, AlertCircle, CheckCircle2, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Appointment = {
    id: number;
    reference: string;
    service_name: string;
    date: string;
    time: string;
    status: string;
    is_past: boolean;
};

export default function AppointmentsPage({ appointments = [] }: { appointments: Appointment[] }) {
    
    const getStatusColor = (status: string) => {
        const s = status?.toLowerCase() || '';
        if (s.includes('termin') || s.includes('compl') || s.includes('confirm')) return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
        if (s.includes('annul') || s.includes('cancel')) return 'bg-red-500/10 text-red-500 border-red-500/20';
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    };

    return (
        <>
            <Head title="Mes Rendez-vous — KeyPro" />
            <div className="flex h-full flex-1 flex-col gap-8 overflow-y-auto p-4 md:p-8">
                
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Calendar className="size-6 text-primary" />
                        <h1 className="font-display text-3xl font-bold uppercase tracking-tight">Planning Atelier</h1>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400">Consultez et gérez vos prochaines visites chez KeyPro.</p>
                </div>

                <div className="grid gap-6">
                    {appointments.length === 0 ? (
                        <Card className="border-sidebar-border/70 dark:border-sidebar-border">
                            <CardContent className="flex flex-col items-center justify-center py-20 text-center text-slate-500">
                                <Calendar className="mb-4 size-12 opacity-30 text-primary" />
                                <h3 className="text-lg font-bold">Aucun rendez-vous</h3>
                                <p className="max-w-xs mx-auto">Vous n'avez aucun rendez-vous planifié pour le moment.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {appointments.map((apt, index) => (
                                <motion.div 
                                    key={apt.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className={`overflow-hidden border-2 transition-all ${apt.is_past ? 'opacity-60 grayscale-[0.5] border-transparent' : 'border-primary/20 shadow-md hover:shadow-xl hover:border-primary/40'}`}>
                                        <div className={`h-2 ${apt.is_past ? 'bg-slate-300' : 'bg-primary'}`} />
                                        <CardHeader className="pb-2">
                                            <div className="flex items-center justify-between">
                                                <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest">{apt.reference}</Badge>
                                                <Badge className={getStatusColor(apt.status)}>{apt.status}</Badge>
                                            </div>
                                            <CardTitle className="mt-4 font-display text-xl font-bold uppercase leading-tight">{apt.service_name}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="flex flex-col gap-2 rounded-lg bg-slate-50 p-4 dark:bg-white/5">
                                                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
                                                    <Calendar className="size-4 text-primary" />
                                                    <span className="text-sm font-bold uppercase tracking-tight">{apt.date}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
                                                    <Clock className="size-4 text-primary" />
                                                    <span className="text-sm font-bold uppercase tracking-tight">{apt.time}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
                                                    <MapPin className="size-4 text-primary" />
                                                    <span className="text-xs font-bold uppercase tracking-tight">Atelier KeyPro</span>
                                                </div>
                                            </div>
                                            
                                            {!apt.is_past && (
                                                <div className="flex items-center justify-center rounded-md bg-emerald-500/10 p-2 text-[10px] font-black uppercase tracking-widest text-emerald-600">
                                                    <CheckCircle2 className="mr-2 size-3" /> Confirmé
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

AppointmentsPage.layout = {
    breadcrumbs: [
        { title: 'Tableau de bord', href: '/dashboard' },
        { title: 'Rendez-vous', href: '/dashboard/rendez-vous' },
    ],
};

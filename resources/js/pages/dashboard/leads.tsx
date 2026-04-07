import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Wrench, ChevronRight, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import { dashboardLeads } from '@/routes';
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

export default function LeadsPage({ leads = [] }: { leads: Lead[] }) {
    
    const getStatusColor = (status: string) => {
        const s = status?.toLowerCase() || '';
        if (s.includes('termin') || s.includes('compl') || s.includes('confirm')) return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
        if (s.includes('annul') || s.includes('cancel')) return 'bg-red-500/10 text-red-500 border-red-500/20';
        if (s.includes('cours') || s.includes('process') || s.includes('réparation')) return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    };

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
                            <div className="grid gap-4 sm:grid-cols-1">
                                {leads.map((lead, index) => (
                                    <motion.div 
                                        key={lead.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="group relative flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-slate-100 p-5 transition-all hover:shadow-lg hover:border-primary/20 dark:border-white/5 dark:hover:bg-white/5"
                                    >
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5 text-primary">
                                                    <Wrench className="size-5" />
                                                </div>
                                                <div>
                                                    <span className="block font-display text-lg font-black uppercase leading-none">{lead.reference}</span>
                                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Créé le {lead.created_at}</span>
                                                </div>
                                                <Badge variant="outline" className={`ml-2 ${getStatusColor(lead.status)}`}>{lead.status}</Badge>
                                            </div>
                                            <div className="pl-12">
                                                <p className="font-bold text-slate-800 dark:text-slate-200">{lead.service_name}</p>
                                                <p className="text-sm text-slate-500">{lead.brand_name} {lead.device_model}</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center justify-end gap-4 sm:mt-0">
                                            <Button variant="outline" className="rounded-full font-bold uppercase tracking-widest text-[10px] group-hover:bg-primary group-hover:text-white transition-colors">
                                                Voir Détails
                                            </Button>
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
        { title: 'Interventions', href: '/dashboard/interventions' },
    ],
};

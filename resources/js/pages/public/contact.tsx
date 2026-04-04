import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Shield, 
    Zap, 
    Clock, 
    CheckCircle2, 
    Phone, 
    Mail, 
    MapPin 
} from 'lucide-react';
import LeadCaptureForm from '@/components/lead-capture-form';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { LeadOptions, PublicService } from '@/types';

type Props = {
    leadOptions: LeadOptions;
    services: PublicService[];
};

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
};

export default function Contact({ leadOptions, services }: Props) {
    return (
        <div className="flex flex-col gap-24 pb-24">
            <Head title="Diagnostic & Devis Technique" />

            {/* Header Section */}
            <section className="relative -mx-6 bg-[#131313] py-24 px-6 text-white lg:-mx-8 lg:px-8">
                <div className="absolute inset-0 z-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                </div>
                
                <div className="mx-auto max-w-7xl relative z-10 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="h-[2px] w-12 bg-primary" />
                        <span className="font-display text-sm font-bold uppercase tracking-[0.3em] text-primary">
                            Demande de Devis
                        </span>
                    </div>
                    <h1 className="font-display text-5xl font-extrabold uppercase tracking-tight sm:text-7xl">
                        Diagnostic <span className="text-primary italic">Expert.</span>
                    </h1>
                    <p className="max-w-2xl text-lg leading-relaxed text-slate-300">
                        Lancez votre demande de qualification. Nos experts analysent votre matériel et vous proposent une solution technique sous 24h.
                    </p>
                </div>
            </section>

            <section className="container mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
                    <div className="space-y-12">
                        {/* Status / Infrastructure info */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <Badge variant="outline" className="border-primary/20 text-primary">Infrastructure</Badge>
                                <h2 className="font-display text-3xl font-bold uppercase tracking-tight">Ce qui est déjà <span className="text-primary italic">opérationnel.</span></h2>
                            </div>
                            
                            <div className="grid gap-4">
                                {[
                                    { title: 'Validation Robuste', desc: 'Protocoles Laravel Form Request sécurisés.' },
                                    { title: 'Traçabilité Lead', desc: 'Enregistrement immédiat avec statut "New".' },
                                    { title: 'Base IA-Ready', desc: 'Schéma préparé pour l\'orchestration intelligente.' },
                                    { title: 'Support Multicanal', desc: 'Choix du canal de rappel privilégié.' },
                                ].map((item) => (
                                    <div key={item.title} className="flex gap-4 border-2 border-slate-100 p-6 dark:border-white/5">
                                        <CheckCircle2 className="size-6 shrink-0 text-primary" />
                                        <div className="space-y-1">
                                            <p className="font-display text-sm font-bold uppercase tracking-widest">{item.title}</p>
                                            <p className="text-xs text-slate-500">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Direct contact info */}
                        <div className="space-y-8 border-t-2 border-slate-100 pt-12 dark:border-white/5">
                            <h3 className="font-display text-xl font-bold uppercase tracking-tight">Canaux Directs</h3>
                            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
                                {[
                                    { icon: Phone, label: 'Lignes Techniques', value: '+225 72 11 44 44 / 98 48 88 44' },
                                    { icon: Mail, label: 'Support Email', value: 'garagelaredemption@gmail.com' },
                                    { icon: MapPin, label: 'Laboratoire Central', value: 'Abidjan, Côte d\'Ivoire' },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center gap-6 group">
                                        <div className="size-14 border-2 border-primary/20 bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                            <item.icon className="size-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{item.label}</p>
                                            <p className="font-display font-bold uppercase">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card className="border-primary/20 shadow-[30px_30px_0px_0px_rgba(0,0,0,0.03)] lg:p-8">
                            <CardHeader className="space-y-4 px-0">
                                <div className="flex items-center gap-3">
                                    <Badge variant="outline" className="border-primary/20 text-primary">Qualification</Badge>
                                    <div className="h-[2px] flex-1 bg-slate-100 dark:bg-white/5" />
                                </div>
                                <CardTitle className="text-4xl">Détails de l'incident</CardTitle>
                                <CardDescription className="text-base">
                                    Plus vos informations sont précises, plus notre diagnostic initial sera pertinent.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="px-0 pt-4">
                                <LeadCaptureForm 
                                    leadOptions={leadOptions} 
                                    submitLabel="Transmettre le dossier"
                                />
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* Specialties small list */}
            <section className="bg-slate-50 py-24 dark:bg-white/5">
                <div className="container mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mb-12 space-y-4 text-center">
                        <Badge variant="outline" className="border-primary/20 text-primary">Spécialités</Badge>
                        <h2 className="font-display text-3xl font-bold uppercase tracking-tight">Services couverts par ce formulaire</h2>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {services.map((service) => (
                            <div key={service.id} className="border-2 border-white bg-white p-6 shadow-sm dark:border-white/5 dark:bg-transparent">
                                <p className="font-display font-bold uppercase tracking-tight">{service.name}</p>
                                <p className="mt-2 text-xs text-slate-500 uppercase font-bold tracking-widest">{service.turnaround_time ?? 'Sur devis'}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

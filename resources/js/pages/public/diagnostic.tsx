import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Cpu, 
    Search, 
    Activity, 
    Database, 
    CheckCircle2
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { quote } from '@/routes';

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
};

export default function Diagnostic() {
    return (
        <div className="flex flex-col gap-24 pb-24">
            <Head title="Diagnostic Électronique & Expertise — KeyPro Service Center" />

            {/* Header Section */}
            <section className="relative -mx-6 bg-[#131313] py-24 px-6 text-white lg:-mx-8 lg:px-8">
                <div className="absolute inset-0 z-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                </div>
                
                <div className="mx-auto max-w-7xl relative z-10 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="h-[2px] w-12 bg-primary" />
                        <span className="font-display text-sm font-bold uppercase tracking-[0.3em] text-primary">
                            Analyse de Précision
                        </span>
                    </div>
                    <h1 className="font-display text-5xl font-extrabold uppercase tracking-tight sm:text-7xl">
                        Diagnostic <span className="text-primary italic">Technique.</span>
                    </h1>
                    <p className="max-w-2xl text-lg leading-relaxed text-slate-300">
                        Équipements de diagnostic de dernière génération pour identifier les pannes électroniques les plus complexes sur tous types de véhicules.
                    </p>
                </div>
            </section>

            {/* Expertise Areas */}
            <section className="container mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <Badge variant="outline" className="border-primary/20 text-primary uppercase">Expertises</Badge>
                            <h2 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
                                Comprendre la panne pour <span className="text-primary italic">mieux la traiter.</span>
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400">
                                Nous ne nous limitons pas à la lecture des codes erreurs. Nos techniciens analysent les flux de données en temps réel pour une précision chirurgicale.
                            </p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                            {[
                                { title: 'Électronique Embarquée', desc: 'Analyse des calculateurs et boitiers de gestion.' },
                                { title: 'Systèmes de Sécurité', desc: 'Diagnostic complet des antidémarrages et alarmes.' },
                                { title: 'Codage & Flashage', desc: 'Mise à jour logicielle et reprogrammation de modules.' },
                                { title: 'Rapport Détaillé', desc: 'Remise d\'un compte-rendu technique après chaque examen.' },
                            ].map((item) => (
                                <div key={item.title} className="space-y-2 border-l-2 border-primary/20 pl-6">
                                    <h3 className="font-display font-bold uppercase tracking-wide text-sm">{item.title}</h3>
                                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="aspect-square bg-[#131313] p-1 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1200" alt="Tech Diagnostic" className="h-full w-full object-cover grayscale opacity-70" />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-primary p-8 text-white">
                            <Cpu className="size-12" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Diagnostic Protocol */}
            <section className="bg-[#131313] py-24 text-white">
                <div className="container mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mb-16 flex flex-col items-center text-center space-y-4">
                        <Badge variant="outline" className="border-primary/50 text-primary uppercase">Méthodologie</Badge>
                        <h2 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">Protocole d'Expertise</h2>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            { icon: Search, title: 'Scan Systémique', desc: 'Interrogation complète de tous les modules de contrôle du véhicule.' },
                            { icon: Activity, title: 'Analyse de Flux', desc: 'Vérification des tensions et signaux des composants suspects.' },
                            { icon: Database, title: 'Historique Marque', desc: 'Comparaison avec les bases de données constructeurs pour les pannes connues.' },
                        ].map((item, idx) => (
                            <motion.div 
                                key={item.title}
                                {...fadeInUp}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white/5 p-10 border border-white/10 space-y-6"
                            >
                                <item.icon className="size-10 text-primary" />
                                <h3 className="font-display text-xl font-bold uppercase tracking-tight">{item.title}</h3>
                                <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="container mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                    <div className="space-y-6">
                        <h2 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-6xl">
                            Évitez les <span className="text-primary italic">changements inutiles.</span>
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400">
                            Un bon diagnostic permet d'identifier la pièce exacte en défaut, vous faisant économiser du temps et de l'argent.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button asChild size="lg" className="h-16 px-12 text-lg">
                                <Link href={quote()}>Réserver un examen</Link>
                            </Button>
                        </div>
                    </div>
                    <div className="grid gap-4">
                        {[
                            'Lecture et effacement des défauts (DTC)',
                            'Programmation de modules neufs ou occasion',
                            'Adaptation de clés et télécommandes',
                            'Réinitialisation des indicateurs de maintenance'
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-4 p-4 border-2 border-slate-100 dark:border-white/5 font-bold uppercase text-xs tracking-widest">
                                <CheckCircle2 className="size-5 text-primary shrink-0" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

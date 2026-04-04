import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Shield, 
    Zap, 
    CheckCircle2, 
    Target, 
    Eye, 
    Award,
    Clock,
    Wrench,
    Cpu,
    Smartphone,
    Users
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

export default function About() {
    return (
        <div className="flex flex-col gap-24 pb-24">
            <Head title="Qui Sommes-Nous — KeyPro Service Center" />

            {/* Header Section */}
            <section className="relative -mx-6 bg-[#131313] py-24 px-6 text-white lg:-mx-8 lg:px-8">
                <div className="absolute inset-0 z-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                </div>
                
                <div className="mx-auto max-w-7xl relative z-10 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="h-[2px] w-12 bg-primary" />
                        <span className="font-display text-sm font-bold uppercase tracking-[0.3em] text-primary">
                            Notre Identité
                        </span>
                    </div>
                    <h1 className="font-display text-5xl font-extrabold uppercase tracking-tight sm:text-7xl">
                        Expertise & <span className="text-primary italic">Innovation.</span>
                    </h1>
                    <p className="max-w-2xl text-lg leading-relaxed text-slate-300">
                        KEYPRO SERVICE CENTER est votre centre technique de référence, spécialisé dans les clés automobiles de haute sécurité et l'électronique embarquée.
                    </p>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="container mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid gap-16 lg:grid-cols-2">
                    <motion.div {...fadeInUp} className="space-y-8">
                        <div className="space-y-4">
                            <Badge variant="outline" className="border-primary/20 text-primary uppercase">Notre Mission</Badge>
                            <h2 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
                                Solutions Rapides, <span className="text-primary italic">Fiables & Accessibles.</span>
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400">
                                Fournir des réponses immédiates à tous les problèmes liés aux clés automobiles et aux systèmes électroniques complexes des véhicules modernes.
                            </p>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="flex gap-4">
                                <Target className="size-8 text-primary shrink-0" />
                                <div>
                                    <p className="font-display font-bold uppercase">Objectif</p>
                                    <p className="text-sm text-slate-500">Zéro immobilisation prolongée pour nos clients.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Award className="size-8 text-primary shrink-0" />
                                <div>
                                    <p className="font-display font-bold uppercase">Standard</p>
                                    <p className="text-sm text-slate-500">Qualité constructeur sur chaque intervention.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="space-y-8 bg-slate-50 p-8 dark:bg-white/5">
                        <div className="space-y-4">
                            <Badge variant="outline" className="border-primary/20 text-primary uppercase">Notre Vision</Badge>
                            <h3 className="font-display text-3xl font-bold uppercase tracking-tight">
                                Référence de l'assistance <span className="text-primary">intelligente.</span>
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400">
                                Devenir le leader local des services automobiles modernes en intégrant la digitalisation et l'IA dans l'assistance technique mobile.
                            </p>
                        </div>
                        <ul className="space-y-4">
                            {[
                                'Intervention mobile étendue',
                                'Orchestration digitale des flux',
                                'Technologie de programmation avancée',
                                'Expérience client simplifiée'
                            ].map((item) => (
                                <li key={item} className="flex items-center gap-3 text-sm font-bold uppercase tracking-wide">
                                    <CheckCircle2 className="size-5 text-primary" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-[#131313] py-24 text-white">
                <div className="container mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mb-16 text-center space-y-4">
                        <Badge variant="outline" className="border-primary/50 text-primary uppercase">Nos Valeurs</Badge>
                        <h2 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">Les piliers de KeyPro</h2>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            { icon: Wrench, title: 'Expertise Technique', desc: 'Savoir-faire pointu en électronique et mécanique de précision.' },
                            { icon: Zap, title: 'Rapidité', desc: 'Intervention urgente en atelier ou sur le site de votre choix.' },
                            { icon: Shield, title: 'Fiabilité', desc: 'Transparence totale sur les tarifs et garantie des prestations.' },
                            { icon: Smartphone, title: 'Innovation', desc: 'Digitalisation des interventions et solutions intelligentes.' },
                            { icon: Users, title: 'Service Multi-marques', desc: 'Compatibilité avec les véhicules Européens, Asiatiques et Américains.' },
                            { icon: Cpu, title: 'Technologie', desc: 'Outils de diagnostic et de programmation de dernière génération.' },
                        ].map((value, idx) => (
                            <motion.div 
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="border-2 border-white/5 bg-white/5 p-8 hover:border-primary/50 transition-colors"
                            >
                                <value.icon className="size-10 text-primary mb-6" />
                                <h3 className="font-display text-xl font-bold uppercase tracking-tight mb-4">{value.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="container mx-auto max-w-7xl px-6 lg:px-8 text-center space-y-12">
                <div className="mx-auto max-w-3xl space-y-6">
                    <h2 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-6xl">
                        Besoin d'une <span className="text-primary italic">intervention ?</span>
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                        Que ce soit pour une reproduction de clé en atelier ou un dépannage mobile, nos techniciens sont prêts.
                    </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                    <Button asChild size="lg" className="h-16 px-12 text-lg">
                        <Link href={quote()}>Diagnostic Immédiat</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="h-16 px-12 text-lg border-2">
                        <Link href={quote()}>Demander un Devis</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}

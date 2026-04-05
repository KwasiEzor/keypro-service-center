import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Truck, 
    MapPin, 
    Clock, 
    ShieldCheck
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

export default function Mobile() {
    return (
        <div className="flex flex-col gap-24 pb-24">
            <Head title="Intervention Mobile 24/7 — KeyPro Service Center" />

            {/* Header Section */}
            <section className="relative -mx-6 bg-primary py-24 px-6 text-white lg:-mx-8 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                </div>
                
                <div className="mx-auto max-w-7xl relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="h-[2px] w-12 bg-white" />
                            <span className="font-display text-sm font-bold uppercase tracking-[0.3em] text-white">
                                Service Hors-Atelier
                            </span>
                        </div>
                        <h1 className="font-display text-5xl font-extrabold uppercase tracking-tight sm:text-7xl">
                            Intervention <span className="italic underline underline-offset-8">Mobile.</span>
                        </h1>
                        <p className="max-w-xl text-xl leading-relaxed text-white/90">
                            Nous venons à vous. Nos techniciens équipés se déplacent à domicile, au bureau ou sur le lieu de votre panne pour toute urgence liée à vos clés auto.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button asChild size="lg" className="h-16 px-10 text-lg bg-black hover:bg-white hover:text-black transition-all">
                                <Link href={quote()}>Appeler un technicien</Link>
                            </Button>
                        </div>
                    </div>
                    <div className="relative hidden lg:block">
                        <Truck className="size-64 text-white/20 absolute -right-12 -top-12 rotate-12" />
                        <div className="relative z-10 border-4 border-white p-8 bg-black/10 backdrop-blur-sm">
                            <p className="font-display text-4xl font-bold uppercase tracking-tighter">Réponse Express</p>
                            <p className="mt-4 text-white/80">Nos unités mobiles sont géolocalisées pour garantir le temps de trajet le plus court.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section className="container mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid gap-12 md:grid-cols-3">
                    {[
                        { icon: MapPin, title: 'Zone Étendue', desc: 'Couverture complète d\'Abidjan et des zones périphériques.' },
                        { icon: Clock, title: 'Urgence 24/7', desc: 'Service disponible pour les situations critiques même le dimanche.' },
                        { icon: ShieldCheck, title: 'Sécurité Totale', desc: 'Interventions sécurisées et identification rigoureuse du propriétaire.' },
                    ].map((feature, idx) => (
                        <motion.div 
                            key={feature.title}
                            {...fadeInUp}
                            transition={{ delay: idx * 0.1 }}
                            className="p-8 border-2 border-slate-100 dark:border-white/5 space-y-4"
                        >
                            <div className="size-14 bg-primary/10 flex items-center justify-center text-primary">
                                <feature.icon className="size-8" />
                            </div>
                            <h3 className="font-display text-xl font-bold uppercase tracking-tight">{feature.title}</h3>
                            <p className="text-slate-500">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* How it works */}
            <section className="bg-[#131313] py-24 text-white">
                <div className="container mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mb-16 text-center space-y-4">
                        <Badge variant="outline" className="border-primary/50 text-primary uppercase">Logistique</Badge>
                        <h2 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">Le flux d'intervention mobile</h2>
                    </div>

                    <div className="grid gap-12 lg:grid-cols-4">
                        {[
                            { step: '01', title: 'Alerte', desc: 'Vous nous contactez par téléphone ou via le formulaire urgent.' },
                            { step: '02', title: 'Localisation', desc: 'Validation de votre position et de la marque du véhicule.' },
                            { step: '03', title: 'Déploiement', desc: 'Envoi immédiat de l\'unité mobile la plus proche.' },
                            { step: '04', title: 'Résolution', desc: 'Reproduction ou programmation sur place en moins de 45 min.' },
                        ].map((item) => (
                            <div key={item.step} className="space-y-6 relative group">
                                <span className="font-display text-6xl font-black text-white/10 group-hover:text-primary transition-colors">{item.step}</span>
                                <div className="space-y-2">
                                    <h3 className="font-display text-xl font-bold uppercase tracking-tight">{item.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="container mx-auto max-w-7xl px-6 lg:px-8 text-center space-y-12">
                <div className="mx-auto max-w-3xl space-y-6">
                    <h2 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-6xl">
                        Bloqué devant <span className="text-primary italic">votre véhicule ?</span>
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                        Ne restez pas immobilisé. Nos techniciens mobiles disposent de tout le matériel nécessaire pour reprogrammer vos clés sur place.
                    </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                    <Button asChild size="lg" className="h-16 px-12 text-lg">
                        <Link href={quote()}>Demande Urgente</Link>
                    </Button>
                    <a href="tel:+22572114444" className="inline-flex h-16 px-12 items-center justify-center text-lg border-2 border-primary text-primary font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                        Appeler le 72 11 44 44
                    </a>
                </div>
            </section>
        </div>
    );
}

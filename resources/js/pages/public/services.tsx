import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Wrench, 
    ArrowRight, 
    Shield, 
    Zap
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { home, quote } from '@/routes';
import type { PublicBrand, PublicService } from '@/types';

type Props = {
    services: PublicService[];
    brands: PublicBrand[];
};

export default function Services({ services, brands }: Props) {
    return (
        <div className="flex flex-col gap-24 pb-24">
            <Head title="Catalogue des Services Techniques">
                <meta name="description" content="Mécanicien électronique, programmation automobile, vente de clés et scanners, formations techniques. Découvrez tous les services KeyPro à Abidjan." />
                <meta property="og:title" content="Services — KeyPro Service Center" />
                <meta property="og:description" content="Catalogue complet des services techniques KeyPro : diagnostic, programmation, vente d'équipements et formations professionnelles." />
            </Head>

            {/* Header Section */}
            <section className="relative -mx-6 bg-[#131313] py-24 px-6 text-white lg:-mx-8 lg:px-8">
                <div className="absolute inset-0 z-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                </div>
                
                <div className="mx-auto max-w-7xl relative z-10 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="h-[2px] w-12 bg-primary" />
                        <span className="font-display text-sm font-bold uppercase tracking-[0.3em] text-primary">
                            Expertises & Solutions
                        </span>
                    </div>
                    <h1 className="font-display text-5xl font-extrabold uppercase tracking-tight sm:text-7xl">
                        Catalogue <span className="text-primary italic">Services.</span>
                    </h1>
                    <p className="max-w-2xl text-lg leading-relaxed text-slate-300">
                        Chaque intervention est documentée, qualifiée et réalisée selon les protocoles constructeurs les plus exigeants.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="container mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-2">
                    {services.map((service, idx) => (
                        <motion.div 
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            viewport={{ once: true }}
                        >
                            <Card className="group h-full flex flex-col">
                                <CardHeader className="p-8">
                                    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                                        <div className="flex size-14 items-center justify-center bg-primary text-white">
                                            <Wrench className="size-8" />
                                        </div>
                                        <div className="flex gap-2">
                                            <Badge variant="outline" className="border-primary/20 text-primary">
                                                {service.turnaround_time ?? 'Sur devis'}
                                            </Badge>
                                            {service.is_featured && (
                                                <Badge className="bg-black text-white dark:bg-white dark:text-black">
                                                    Priorité
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <CardTitle className="text-3xl">{service.name}</CardTitle>
                                    <CardDescription className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                                        {service.description ?? service.short_description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="px-8 pb-8 flex-1 space-y-8">
                                    <div className="space-y-4">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                            Protocoles de marque supportés
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {service.brands.map((brand) => (
                                                <Badge
                                                    key={`${service.id}-${brand.slug}`}
                                                    variant="secondary"
                                                    className="border-primary/5 bg-slate-100 font-bold dark:bg-white/5"
                                                >
                                                    {brand.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4 border-t-2 border-slate-100 pt-8 dark:border-white/5">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Garantie</p>
                                            <p className="font-display font-bold uppercase">12 Mois minimum</p>
                                        </div>
                                        <div className="space-y-1 text-right">
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Disponibilité</p>
                                            <p className="font-display font-bold uppercase text-primary">Immédiate</p>
                                        </div>
                                    </div>
                                </CardContent>
                                <div className="p-8 pt-0 mt-auto">
                                    <Button asChild className="w-full h-14">
                                        <Link href={quote()}>
                                            Démarrer un diagnostic <ArrowRight className="ml-2 size-5" />
                                        </Link>
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Brands Coverage */}
            <section className="bg-[#131313] py-24 text-white">
                <div className="container mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
                        <div className="space-y-4">
                            <Badge variant="outline" className="border-primary/50 text-primary">Couverture</Badge>
                            <h2 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
                                Partenaires & <span className="text-primary italic">Compatibilité.</span>
                            </h2>
                            <p className="max-w-2xl text-slate-400">
                                Notre laboratoire est équipé des outils de diagnostic certifiés pour les plus grandes marques du marché.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {brands.map((brand) => (
                            <motion.div 
                                key={brand.id}
                                whileHover={{ scale: 1.02 }}
                                className="group relative overflow-hidden border-2 border-white/5 bg-white/5 p-8 transition-colors hover:border-primary/50"
                            >
                                <div className="relative z-10 space-y-4">
                                    <div className="size-12 border-2 border-primary/20 bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                        <Shield className="size-6" />
                                    </div>
                                    <h3 className="font-display text-xl font-bold uppercase tracking-tight">
                                        {brand.name}
                                    </h3>
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                                        <Zap className="size-4 text-primary" />
                                        {brand.services.length} Spécialités
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="container mx-auto max-w-7xl px-6 lg:px-8 text-center space-y-12">
                <div className="mx-auto max-w-3xl space-y-6">
                    <h2 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-6xl">
                        Un besoin spécifique ?
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                        Nos techniciens sont à votre disposition pour toute demande sur-mesure ou flotte d'équipements.
                    </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                    <Button asChild size="lg" className="h-16 px-12 text-lg">
                        <Link href={quote()}>Diagnostic Technique</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="h-16 px-12 text-lg border-2">
                        <Link href={home()}>Retour Accueil</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}

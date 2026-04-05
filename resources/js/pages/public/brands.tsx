import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Zap, 
    ArrowRight, 
    Shield,
    CheckCircle2,
    Briefcase
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
import { quote } from '@/routes';
import type { PublicBrand } from '@/types';

type Props = {
    brands: PublicBrand[];
};

export default function Brands({ brands }: Props) {
    return (
        <div className="flex flex-col gap-24 pb-24">
            <Head title="Marques Supportées & Compatibilité" />

            {/* Header Section */}
            <section className="relative -mx-6 bg-[#131313] py-24 px-6 text-white lg:-mx-8 lg:px-8">
                <div className="absolute inset-0 z-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                </div>
                
                <div className="mx-auto max-w-7xl relative z-10 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="h-[2px] w-12 bg-primary" />
                        <span className="font-display text-sm font-bold uppercase tracking-[0.3em] text-primary">
                            Écosystème Partenaires
                        </span>
                    </div>
                    <h1 className="font-display text-5xl font-extrabold uppercase tracking-tight sm:text-7xl">
                        Marques <span className="text-primary italic">Supportées.</span>
                    </h1>
                    <p className="max-w-2xl text-lg leading-relaxed text-slate-300">
                        Notre expertise technique s'étend aux protocoles spécifiques des plus grands constructeurs mondiaux.
                    </p>
                </div>
            </section>

            {/* Brands Grid */}
            <section className="container mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {brands.map((brand, idx) => (
                        <motion.div 
                            key={brand.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            viewport={{ once: true }}
                        >
                            <Card className="group h-full flex flex-col transition-all hover:border-primary/40">
                                <CardHeader className="p-8">
                                    <div className="mb-6 flex items-center justify-between">
                                        <div className="flex size-14 items-center justify-center border-2 border-primary/20 bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                            <Shield className="size-8" />
                                        </div>
                                        {brand.is_featured && (
                                            <Badge className="bg-black text-white dark:bg-white dark:text-black">
                                                Partenaire Gold
                                            </Badge>
                                        )}
                                    </div>
                                    <CardTitle className="text-3xl">{brand.name}</CardTitle>
                                    <CardDescription className="text-base leading-relaxed text-slate-600 dark:text-slate-400 min-h-[3rem]">
                                        {brand.headline ?? brand.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="px-8 pb-8 flex-1 space-y-8">
                                    <div className="space-y-4">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                            Expertises déployées
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {brand.services.map((service) => (
                                                <Badge
                                                    key={`${brand.id}-${service.slug}`}
                                                    variant="secondary"
                                                    className="border-primary/5 bg-slate-100 font-bold dark:bg-white/5"
                                                >
                                                    {service.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="border-t-2 border-slate-100 pt-8 dark:border-white/5">
                                        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-500">
                                            <CheckCircle2 className="size-4 text-primary" />
                                            Certifié Constructeur
                                        </div>
                                    </div>
                                </CardContent>
                                <div className="p-8 pt-0 mt-auto">
                                    <Button asChild variant="outline" className="w-full h-14 border-2">
                                        <Link href={quote()}>
                                            Demander un devis {brand.name} <ArrowRight className="ml-2 size-5" />
                                        </Link>
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Industrial Banner */}
            <section className="bg-[#131313] py-24 text-white">
                <div className="container mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <Badge variant="outline" className="border-primary/50 text-primary">Laboratoire</Badge>
                                <h2 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
                                    Intervention multi-marques centralisée.
                                </h2>
                                <p className="text-lg text-slate-400">
                                    Notre plateforme unifie le support technique pour l'ensemble de votre parc machine, indépendamment du constructeur.
                                </p>
                            </div>
                            <div className="grid gap-6 sm:grid-cols-2">
                                {[
                                    { icon: Zap, title: 'Diagnostic Unifié', desc: 'Une seule interface pour toutes vos marques.' },
                                    { icon: Briefcase, title: 'Gestion de Parc', desc: 'Inventaire technique et suivi de maintenance.' },
                                ].map((item) => (
                                    <div key={item.title} className="space-y-3 border-l-2 border-primary/20 pl-6">
                                        <item.icon className="size-6 text-primary" />
                                        <h3 className="font-display font-bold uppercase tracking-wide">{item.title}</h3>
                                        <p className="text-sm text-slate-500">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="aspect-video overflow-hidden border-2 border-primary/20 bg-white/5 grayscale">
                            <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200" alt="Tech Lab" className="h-full w-full object-cover opacity-50" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

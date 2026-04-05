import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Check, 
    ArrowRight, 
    Shield, 
    Zap, 
    Clock, 
    Wrench, 
    Cpu, 
    Settings, 
    Search, 
    PenTool, 
    Send,
    Star
} from 'lucide-react';
import LeadCaptureForm from '@/components/lead-capture-form';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { quote } from '@/routes';
import { index as servicesPage } from '@/routes/services';
import type {
    LeadOptions,
    PublicBrand,
    PublicPricingPlan,
    PublicProcessStep,
    PublicProject,
    PublicService,
    PublicTestimonial,
} from '@/types';

type Props = {
    stats: {
        services: number;
        brands: number;
        faqs: number;
    };
    services: PublicService[];
    brands: PublicBrand[];
    projects: PublicProject[];
    processSteps: PublicProcessStep[];
    pricingPlans: PublicPricingPlan[];
    testimonials: PublicTestimonial[];
    leadOptions: LeadOptions;
};

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
};

export default function Home({
    stats,
    services,
    projects,
    processSteps,
    pricingPlans,
    testimonials,
    leadOptions,
}: Props) {
    return (
        <div className="flex flex-col gap-24 pb-24">
            <Head title="Centre de Service Professionnel" />

            {/* Hero Section */}
            <section className="relative -mx-6 flex min-h-[85vh] items-center overflow-hidden bg-[#131313] px-6 text-white lg:-mx-8 lg:px-8">
                {/* Background Pattern */}
                <div className="absolute inset-0 z-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                    <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-primary/30 to-transparent" />
                </div>

                <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative z-10 space-y-8"
                    >
                        <div className="flex items-center gap-3">
                            <div className="h-[2px] w-12 bg-primary" />
                            <span className="font-display text-sm font-bold uppercase tracking-[0.3em] text-primary">
                                KeyPro Service Center
                            </span>
                        </div>
                        
                        <h1 className="font-display text-5xl font-extrabold leading-[1.1] tracking-tight text-balance sm:text-7xl">
                            PRECISION CARE FOR <span className="text-primary italic">EVERY MACHINE.</span>
                        </h1>
                        
                        <p className="max-w-xl text-lg leading-relaxed text-slate-300">
                            Centre de maintenance technique industriel et digital. Nous transformons vos pannes en opérations pilotées, qualifiées et garanties.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button asChild size="lg" className="h-14 px-10 text-base">
                                <Link href={quote()}>
                                    Lancer une demande <ArrowRight className="ml-2 size-5" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="h-14 border-white/20 px-10 text-base text-white hover:bg-white hover:text-black">
                                <Link href={servicesPage()}>Catalogue Services</Link>
                            </Button>
                        </div>

                        <div className="grid grid-cols-3 gap-8 pt-8">
                            {[
                                { label: 'Services', value: stats.services + '+' },
                                { label: 'Marques', value: stats.brands + '+' },
                                { label: 'Solutions', value: '24/7' },
                            ].map((stat) => (
                                <div key={stat.label} className="space-y-1">
                                    <p className="font-display text-3xl font-bold text-primary">{stat.value}</p>
                                    <p className="text-xs uppercase tracking-widest text-slate-500">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative aspect-[4/5] overflow-hidden">
                            <img 
                                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200" 
                                alt="Maintenance Service" 
                                className="h-full w-full object-cover grayscale brightness-75 transition-all hover:grayscale-0"
                            />
                            {/* Geometric Overlay */}
                            <div className="absolute -bottom-6 -left-6 h-48 w-48 border-4 border-primary bg-[#131313] p-8">
                                <Shield className="size-full text-primary" />
                            </div>
                            <div className="absolute -right-4 -top-4 size-32 bg-primary/20 backdrop-blur-xl" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Why Us / Experience Section */}
            <section className="container mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                    <div className="relative grid grid-cols-2 gap-4">
                        <div className="space-y-4 pt-12">
                            <motion.div {...fadeInUp} className="aspect-square overflow-hidden bg-slate-100">
                                <img src="https://images.unsplash.com/photo-159742324403d-d19504ba2f47?auto=format&fit=crop&q=80&w=800" alt="Detail 1" className="h-full w-full object-cover grayscale" />
                            </motion.div>
                            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="aspect-[3/4] overflow-hidden bg-slate-100">
                                <img src="https://images.unsplash.com/photo-1530124560676-574332f056d3?auto=format&fit=crop&q=80&w=800" alt="Detail 2" className="h-full w-full object-cover" />
                            </motion.div>
                        </div>
                        <div className="space-y-4">
                            <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="aspect-[3/4] overflow-hidden bg-slate-100">
                                <img src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&q=80&w=800" alt="Detail 3" className="h-full w-full object-cover" />
                            </motion.div>
                            <div className="relative aspect-square overflow-hidden bg-primary p-8 text-white">
                                <p className="font-display text-6xl font-extrabold">15+</p>
                                <p className="mt-2 text-sm font-bold uppercase tracking-widest">Ans d'Expertise Technique</p>
                                <Zap className="absolute -bottom-4 -right-4 size-24 opacity-20" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-4">
                            <Badge variant="outline" className="border-primary/20 text-primary">Pourquoi nous ?</Badge>
                            <h2 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
                                Une infrastructure taillée pour la performance.
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400">
                                Nous ne nous contentons pas de réparer. Nous documentons chaque étape, vérifions chaque compatibilité marque et assurons un suivi proactif via notre plateforme centralisée.
                            </p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                            {[
                                { icon: Shield, title: 'Garantie Totale', desc: 'Chaque intervention est couverte par notre assurance professionnelle.' },
                                { icon: Clock, title: 'Rapidité Critique', desc: 'Diagnostics express sous 24h pour les demandes urgentes.' },
                                { icon: Cpu, title: 'Hardware & Logiciel', desc: 'Expertise hybride sur l\'électronique et les systèmes embarqués.' },
                                { icon: Settings, title: 'Composants Certifiés', desc: 'Utilisation exclusive de pièces d\'origine ou haute qualité.' },
                            ].map((item) => (
                                <motion.div key={item.title} {...fadeInUp} className="space-y-3 border-l-2 border-primary/20 pl-6">
                                    <item.icon className="size-6 text-primary" />
                                    <h3 className="font-display font-bold uppercase tracking-wide">{item.title}</h3>
                                    <p className="text-sm text-slate-500">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                            <Link href={quote()}>En savoir plus sur notre engagement</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Working Process Section */}
            <section className="bg-[#131313] py-24 text-white">
                <div className="container mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mb-16 text-center space-y-4">
                        <Badge variant="outline" className="border-primary/50 text-primary">Processus</Badge>
                        <h2 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">Notre Workflow Operationnel</h2>
                        <p className="mx-auto max-w-2xl text-slate-400">De la première demande à la livraison finale, chaque étape est tracée.</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {(processSteps.length > 0 ? processSteps : [
                            { id: 1, title: 'Identifier', description: 'Diagnostic précis de la panne et analyse de compatibilité marque.', icon: 'search' },
                            { id: 2, title: 'Préparer', description: 'Devis détaillé et sourcing des composants nécessaires.', icon: 'pen-tool' },
                            { id: 3, title: 'Opérer', description: 'Intervention technique en atelier avec suivi en temps réel.', icon: 'wrench' },
                            { id: 4, title: 'Délivrer', description: 'Tests finaux de qualité et remise de l\'appareil garanti.', icon: 'send' },
                        ]).map((step, idx) => (
                            <motion.div 
                                key={step.id} 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="relative group"
                            >
                                <div className="absolute -left-4 -top-4 font-display text-8xl font-black text-white/5 transition-colors group-hover:text-primary/10">
                                    0{idx + 1}
                                </div>
                                <div className="relative space-y-4 border-2 border-white/5 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-primary/50">
                                    <div className="size-12 bg-primary flex items-center justify-center">
                                        {idx === 0 && <Search className="size-6 text-white" />}
                                        {idx === 1 && <PenTool className="size-6 text-white" />}
                                        {idx === 2 && <Wrench className="size-6 text-white" />}
                                        {idx === 3 && <Send className="size-6 text-white" />}
                                    </div>
                                    <h3 className="font-display text-xl font-bold uppercase tracking-tight">{step.title}</h3>
                                    <p className="text-sm leading-relaxed text-slate-400">{step.description}</p>
                                </div>
                                {idx < 3 && (
                                    <ArrowRight className="absolute -right-4 top-1/2 hidden -translate-y-1/2 size-8 text-primary/20 lg:block" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Grid Section */}
            <section className="container mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div className="space-y-4">
                        <Badge variant="outline" className="border-primary/20 text-primary">Catalogue</Badge>
                        <h2 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">Nos Services Experts</h2>
                    </div>
                    <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                        <Link href={servicesPage()}>Voir tous les services</Link>
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <Card key={service.id} className="group">
                            <CardHeader>
                                <div className="mb-4 flex items-center justify-between">
                                    <Wrench className="size-8 text-primary transition-transform group-hover:rotate-12" />
                                    {service.is_featured && <Badge>Top Service</Badge>}
                                </div>
                                <CardTitle>{service.name}</CardTitle>
                                <CardDescription className="line-clamp-2">{service.short_description}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    {service.brands.slice(0, 3).map((brand) => (
                                        <Badge key={brand.slug} variant="secondary">{brand.name}</Badge>
                                    ))}
                                    {service.brands.length > 3 && (
                                        <Badge variant="secondary">+{service.brands.length - 3}</Badge>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                                    <Clock className="size-4" />
                                    Délai : {service.turnaround_time || 'Sur devis'}
                                </div>
                            </CardContent>
                            <div className="px-6 pb-6 mt-auto">
                                <Button asChild variant="link" className="h-auto p-0 text-primary">
                                    <Link href={quote()}>
                                        Détails techniques <ArrowRight className="ml-2 size-4" />
                                    </Link>
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Projects / Completed Works Section */}
            <section className="overflow-hidden bg-slate-50 py-24 dark:bg-white/5">
                <div className="container mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mb-16 text-center space-y-4">
                        <Badge variant="outline" className="border-primary/20 text-primary">Portfolio</Badge>
                        <h2 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">Interventions Récentes</h2>
                        <p className="mx-auto max-w-2xl text-slate-500">Aperçu de nos réalisations techniques et diagnostics complexes.</p>
                    </div>

                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                        {projects.length > 0 ? projects.map((project) => (
                            <motion.div key={project.id} {...fadeInUp} className="group relative aspect-[4/5] overflow-hidden bg-[#131313]">
                                <img 
                                    src={project.image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"} 
                                    alt={project.title} 
                                    className="h-full w-full object-cover opacity-60 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end text-white translate-y-4 transition-transform group-hover:translate-y-0">
                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{project.category}</p>
                                    <h3 className="mt-2 font-display text-2xl font-bold uppercase">{project.title}</h3>
                                    <p className="mt-4 text-sm text-slate-300 line-clamp-2 opacity-0 transition-opacity group-hover:opacity-100">{project.description}</p>
                                </div>
                            </motion.div>
                        )) : (
                            [1, 2, 3].map((i) => (
                                <div key={i} className="aspect-[4/5] bg-slate-200 dark:bg-white/5 animate-pulse" />
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="container mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mb-16 text-center space-y-4">
                    <Badge variant="outline" className="border-primary/20 text-primary">Forfaits</Badge>
                    <h2 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">Plans de Maintenance</h2>
                    <p className="mx-auto max-w-2xl text-slate-500">Des solutions adaptées à vos besoins ponctuels ou récurrents.</p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {(pricingPlans.length > 0 ? pricingPlans : [
                        { id: 1, name: 'Diagnostic Basic', price: '49€', description: 'Idéal pour une évaluation rapide.', features: ['Vérification hardware', 'Rapport de panne', 'Estimation pièces', 'Support par email'], is_featured: false },
                        { id: 2, name: 'Premium Support', price: '129€', description: 'Le choix de la tranquillité.', features: ['Réparation prioritaire', 'Nettoyage complet', 'Garantie 6 mois', 'Support téléphonique dédié'], is_featured: true },
                        { id: 3, name: 'Fleet Maintenance', price: 'Sur devis', description: 'Pour les entreprises et parcs.', features: ['Gestion multi-appareils', 'Maintenance préventive', 'Facturation mensuelle', 'Conseiller technique dédié'], is_featured: false },
                    ]).map((plan) => (
                        <div 
                            key={plan.id}
                            className={cn(
                                "relative flex flex-col border-2 p-8 transition-all hover:scale-[1.02]",
                                plan.is_featured 
                                    ? "border-primary bg-primary text-white shadow-[20px_20px_0px_0px_rgba(244,63,94,0.1)]" 
                                    : "border-slate-200 bg-white dark:border-white/10 dark:bg-white/5"
                            )}
                        >
                            {plan.is_featured && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                                    Recommandé
                                </div>
                            )}
                            <div className="mb-8">
                                <h3 className="font-display text-2xl font-bold uppercase">{plan.name}</h3>
                                <p className={cn("mt-2 text-sm", plan.is_featured ? "text-white/80" : "text-slate-500")}>
                                    {plan.description}
                                </p>
                            </div>
                            <div className="mb-8 flex items-baseline gap-1">
                                <span className="font-display text-5xl font-black">{plan.price}</span>
                                {plan.price !== 'Sur devis' && <span className="text-sm font-bold uppercase opacity-60">HT</span>}
                            </div>
                            <ul className="mb-12 space-y-4 flex-1">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3 text-sm">
                                        <Check className={cn("size-5 shrink-0", plan.is_featured ? "text-white" : "text-primary")} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <Button 
                                asChild
                                className={cn(
                                    "w-full h-14",
                                    plan.is_featured ? "bg-black text-white hover:bg-white hover:text-black" : ""
                                )}
                            >
                                <Link href={quote()}>Choisir ce plan</Link>
                            </Button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-[#131313] py-24 text-white">
                <div className="container mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr]">
                        <div className="space-y-6">
                            <Badge variant="outline" className="border-primary/50 text-primary">Témoignages</Badge>
                            <h2 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">Ce que nos clients disent</h2>
                            <p className="text-slate-400">La satisfaction technique est notre seul indicateur de succès. Voici les retours de nos partenaires.</p>
                            <div className="flex gap-4 pt-4">
                                <div className="size-16 border-2 border-primary/20 bg-primary/10 flex items-center justify-center">
                                    <Star className="size-8 text-primary fill-primary" />
                                </div>
                                <div>
                                    <p className="font-display text-3xl font-bold">4.9/5</p>
                                    <p className="text-xs uppercase tracking-widest text-slate-500">Note moyenne</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-8 sm:grid-cols-2">
                            {testimonials.map((t) => (
                                <motion.div key={t.id} {...fadeInUp} className="border border-white/10 bg-white/5 p-8">
                                    <div className="mb-6 flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={cn("size-4", i < (t.rating || 5) ? "text-primary fill-primary" : "text-white/20")} />
                                        ))}
                                    </div>
                                    <p className="italic text-slate-300">"{t.quote}"</p>
                                    <div className="mt-8 border-t border-white/10 pt-6">
                                        <p className="font-display font-bold uppercase">{t.customer_name}</p>
                                        <p className="text-xs uppercase tracking-widest text-slate-500">{t.role} @ {t.company}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA / Lead Form Section */}
            <section id="contact" className="container mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid gap-16 lg:grid-cols-2">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <Badge variant="outline" className="border-primary/20 text-primary">Contact</Badge>
                            <h2 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-6xl">
                                Prêt à restaurer <span className="text-primary">votre matériel ?</span>
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400">
                                Reproduction de clés, diagnostic électronique ou intervention mobile urgente. Remplissez le formulaire, nous vous recontactons sous 24h.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {[
                                { title: 'Localisation', value: 'Abidjan, Côte d\'Ivoire (Zone mobile étendue)' },
                                { title: 'Téléphones', value: '+225 72 11 44 44 / 98 48 88 44 / 22 46 66 26' },
                                { title: 'Email', value: 'garagelaredemption@gmail.com' },
                            ].map((item) => (
                                <div key={item.title} className="space-y-1">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">{item.title}</p>
                                    <p className="font-display text-xl font-bold">{item.value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="aspect-video w-full bg-slate-100 grayscale dark:bg-white/5">
                            <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200" alt="Office" className="h-full w-full object-cover opacity-50" />
                        </div>
                    </div>

                    <Card className="border-primary/20 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)] lg:p-4">
                        <CardHeader>
                            <CardTitle>Qualification Lead</CardTitle>
                            <CardDescription>Décrivez votre besoin technique en quelques secondes.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <LeadCaptureForm leadOptions={leadOptions} />
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}

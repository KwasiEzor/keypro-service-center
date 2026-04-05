import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Plus, 
    Minus,
    MessageSquare
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { quote } from '@/routes';
import type { PublicFaq } from '@/types';

type Props = {
    faqs: PublicFaq[];
};

export default function Faq({ faqs }: Props) {
    const [openId, setOpenId] = useState<number | null>(null);

    return (
        <div className="flex flex-col gap-24 pb-24">
            <Head title="FAQ & Support Technique" />

            {/* Header Section */}
            <section className="relative -mx-6 bg-[#131313] py-24 px-6 text-white lg:-mx-8 lg:px-8">
                <div className="absolute inset-0 z-0 opacity-10">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                </div>
                
                <div className="mx-auto max-w-7xl relative z-10 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="h-[2px] w-12 bg-primary" />
                        <span className="font-display text-sm font-bold uppercase tracking-[0.3em] text-primary">
                            Centre d'Aide
                        </span>
                    </div>
                    <h1 className="font-display text-5xl font-extrabold uppercase tracking-tight sm:text-7xl">
                        Questions <span className="text-primary italic">Fréquentes.</span>
                    </h1>
                    <p className="max-w-2xl text-lg leading-relaxed text-slate-300">
                        Trouvez des réponses immédiates sur nos protocoles d'intervention, nos garanties et notre logistique de maintenance.
                    </p>
                </div>
            </section>

            {/* FAQ List */}
            <section className="container mx-auto max-w-4xl px-6 lg:px-8">
                <div className="flex flex-col gap-4">
                    {faqs.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            viewport={{ once: true }}
                            className={cn(
                                "border-2 transition-all duration-300",
                                openId === item.id 
                                    ? "border-primary bg-primary/5 shadow-[10px_10px_0px_0px_rgba(244,63,94,0.05)]" 
                                    : "border-slate-100 hover:border-primary/20 dark:border-white/5"
                            )}
                        >
                            <button
                                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                                className="flex w-full items-center justify-between p-8 text-left outline-none"
                            >
                                <span className="font-display text-xl font-bold uppercase tracking-tight sm:text-2xl">
                                    {item.question}
                                </span>
                                <div className={cn(
                                    "flex size-10 shrink-0 items-center justify-center border-2 transition-all",
                                    openId === item.id ? "bg-primary text-white border-primary" : "border-slate-200 text-slate-400 dark:border-white/10"
                                )}>
                                    {openId === item.id ? <Minus className="size-5" /> : <Plus className="size-5" />}
                                </div>
                            </button>
                            <div className={cn(
                                "overflow-hidden transition-all duration-300",
                                openId === item.id ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                            )}>
                                <div className="p-8 pt-0 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                                    {item.answer}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Support CTA */}
            <section className="container mx-auto max-w-7xl px-6 lg:px-8">
                <div className="bg-[#131313] p-12 text-white lg:p-24 relative overflow-hidden">
                    <div className="absolute right-0 top-0 size-64 bg-primary/20 blur-[120px]" />
                    <div className="relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
                        <div className="space-y-6">
                            <Badge variant="outline" className="border-primary/50 text-primary uppercase">Assistance</Badge>
                            <h2 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-6xl">
                                Vous n'avez pas trouvé <span className="text-primary italic">votre réponse ?</span>
                            </h2>
                            <p className="text-xl text-slate-400">
                                Nos conseillers techniques sont disponibles pour une étude personnalisée de votre dossier.
                            </p>
                        </div>
                        <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
                            <Button asChild size="lg" className="h-16 px-12 text-lg">
                                <Link href={quote()}>
                                    Ouvrir un ticket <MessageSquare className="ml-2 size-5" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="h-16 px-12 text-lg border-2 border-white/20 text-white hover:bg-white hover:text-black">
                                <Link href={quote()}>Diagnostic Rapide</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

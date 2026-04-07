import PublicLayout from '@/layouts/public-layout';
import { Head } from '@inertiajs/react';
import { ShieldCheck, Scale, FileText } from 'lucide-react';

export default function MentionsLegales() {
    return (
        <PublicLayout>
            <Head title="Mentions Légales — KeyPro Service Center" />
            
            <div className="relative py-24 lg:py-32 overflow-hidden">
                <div className="mx-auto max-w-4xl px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <ShieldCheck className="size-8" />
                            </div>
                        </div>
                        <h1 className="font-display text-4xl font-black uppercase tracking-tight sm:text-5xl">Mentions Légales</h1>
                        <p className="mt-4 text-lg font-medium text-slate-500">Informations obligatoires concernant l'éditeur et l'hébergeur du site.</p>
                    </div>

                    <div className="prose prose-slate max-w-none dark:prose-invert space-y-12">
                        <section className="space-y-4">
                            <h2 className="flex items-center gap-3 text-2xl font-bold uppercase tracking-tight">
                                <div className="size-2 bg-primary" />
                                1. Éditeur du Site
                            </h2>
                            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-8 dark:border-white/5 dark:bg-white/5">
                                <p className="font-bold text-slate-900 dark:text-white mb-2">KeyPro Service Center (Garage La Rédemption)</p>
                                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                                    <li><strong>Siège Social :</strong> Abidjan, Côte d'Ivoire</li>
                                    <li><strong>Téléphone :</strong> +225 72 11 44 44 / +225 98 48 88 44</li>
                                    <li><strong>Email :</strong> garagelaredemption@gmail.com</li>
                                    <li><strong>Activité :</strong> Diagnostic technique, programmation électronique et maintenance automobile spécialisée.</li>
                                </ul>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="flex items-center gap-3 text-2xl font-bold uppercase tracking-tight">
                                <div className="size-2 bg-primary" />
                                2. Hébergement
                            </h2>
                            <div className="p-2">
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Ce site est hébergé par des serveurs sécurisés garantissant une haute disponibilité et une protection des données optimale.
                                </p>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="flex items-center gap-3 text-2xl font-bold uppercase tracking-tight">
                                <div className="size-2 bg-primary" />
                                3. Propriété Intellectuelle
                            </h2>
                            <div className="p-2 text-slate-600 dark:text-slate-400 space-y-4">
                                <p>
                                    L'ensemble de ce site relève de la législation internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                                </p>
                                <p>
                                    La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
                                </p>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="flex items-center gap-3 text-2xl font-bold uppercase tracking-tight">
                                <div className="size-2 bg-primary" />
                                4. Limitation de Responsabilité
                            </h2>
                            <div className="p-2 text-slate-600 dark:text-slate-400">
                                <p>
                                    KeyPro Service Center s'efforce d'assurer au mieux de ses possibilités, l'exactitude et la mise à jour des informations diffusées sur ce site. Les informations contenues sur le site sont fournies à titre indicatif et ne sauraient engager la responsabilité de l'éditeur.
                                </p>
                            </div>
                        </section>
                    </div>

                    <div className="mt-24 border-t border-slate-100 pt-12 dark:border-white/5">
                        <p className="text-center text-sm font-bold uppercase tracking-widest text-slate-400">
                            Dernière mise à jour : 07 Avril 2026
                        </p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}

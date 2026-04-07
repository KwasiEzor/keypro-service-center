import PublicLayout from '@/layouts/public-layout';
import { Head } from '@inertiajs/react';
import { Scale, CheckCircle2, AlertCircle, Wrench, ShieldCheck } from 'lucide-react';

export default function CGV() {
    return (
        <PublicLayout>
            <Head title="Conditions Générales de Vente — KeyPro Service Center" />
            
            <div className="relative py-24 lg:py-32 overflow-hidden">
                <div className="mx-auto max-w-4xl px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <Scale className="size-8" />
                            </div>
                        </div>
                        <h1 className="font-display text-4xl font-black uppercase tracking-tight sm:text-5xl">Conditions Générales</h1>
                        <p className="mt-4 text-lg font-medium text-slate-500">Cadre contractuel pour l'ensemble des interventions et services de KeyPro.</p>
                    </div>

                    <div className="prose prose-slate max-w-none dark:prose-invert space-y-12">
                        <section className="space-y-4">
                            <h2 className="flex items-center gap-3 text-2xl font-bold uppercase tracking-tight">
                                <div className="size-2 bg-primary" />
                                1. Objet des Services
                            </h2>
                            <div className="p-2 text-slate-600 dark:text-slate-400 space-y-4 leading-relaxed">
                                <p>
                                    Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre KeyPro Service Center et ses clients pour l'ensemble des services techniques proposés : diagnostic, programmation électronique, réparation spécialisée, vente d'équipements et formation technique.
                                </p>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="flex items-center gap-3 text-2xl font-bold uppercase tracking-tight">
                                <div className="size-2 bg-primary" />
                                2. Devis et Commandes
                            </h2>
                            <div className="p-2 text-slate-600 dark:text-slate-400 space-y-4">
                                <p>
                                    Tout diagnostic préalable donne lieu à un devis chiffré. Le devis est valable pendant une durée de 15 jours à compter de sa date d'émission.
                                </p>
                                <div className="flex items-start gap-4 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm font-medium text-slate-800 dark:text-slate-200">
                                    <CheckCircle2 className="size-5 shrink-0 text-primary" />
                                    <p>La commande est considérée comme ferme après signature du devis ou acceptation explicite via la plateforme client KeyPro.</p>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="flex items-center gap-3 text-2xl font-bold uppercase tracking-tight">
                                <div className="size-2 bg-primary" />
                                3. Modalités de Paiement
                            </h2>
                            <div className="p-2 text-slate-600 dark:text-slate-400">
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Un acompte de 50% peut être exigé pour les interventions nécessitant l'achat de composants spécifiques.</li>
                                    <li>Le solde est payable à la livraison du matériel réparé ou à la fin de l'intervention technique.</li>
                                    <li>Moyens de paiement acceptés : Virement bancaire, Paiement mobile, Espèces.</li>
                                </ul>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="flex items-center gap-3 text-2xl font-bold uppercase tracking-tight">
                                <div className="size-2 bg-primary" />
                                4. Garanties et Responsabilités
                            </h2>
                            <div className="grid gap-6 md:grid-cols-2 mt-4 text-sm bg-slate-50 dark:bg-white/5 rounded-2xl p-8">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                                        <Wrench className="size-4 text-primary" />
                                        Garantie Technique
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        Sauf mention contraire, nos interventions de réparation bénéficient d'une garantie contractuelle de 3 mois sur les pièces et la main d'œuvre.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white uppercase tracking-tight">
                                        <ShieldCheck className="size-4 text-primary" />
                                        Confidentialité
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        KeyPro garantit la confidentialité des données techniques contenues dans les calculateurs et appareils confiés par ses clients.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="flex items-center gap-3 text-2xl font-bold uppercase tracking-tight">
                                <div className="size-2 bg-primary" />
                                5. Réclamations et Litiges
                            </h2>
                            <div className="p-2 text-slate-600 dark:text-slate-400">
                                <div className="flex items-start gap-4 mb-4">
                                    <AlertCircle className="size-5 shrink-0 text-amber-500 mt-1" />
                                    <p>Toute réclamation relative à une intervention doit être effectuée par écrit dans un délai de 48 heures après la livraison.</p>
                                </div>
                                <p>
                                    En cas de litige, les parties s'engagent à rechercher une solution amiable avant toute action judiciaire. À défaut, les tribunaux d'Abidjan seront seuls compétents.
                                </p>
                            </div>
                        </section>
                    </div>

                    <div className="mt-24 border-t border-slate-100 pt-12 dark:border-white/5 text-center">
                        <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
                            KeyPro Service Center — Excellence Technique Sans Compromis
                        </p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}

import PublicLayout from '@/layouts/public-layout';
import { Head } from '@inertiajs/react';
import { ShieldCheck, Eye, Database, Lock } from 'lucide-react';

export default function PolitiqueConfidentialite() {
    return (
        <PublicLayout>
            <Head title="Politique de Confidentialité — KeyPro Service Center" />
            
            <div className="relative py-24 lg:py-32 overflow-hidden">
                <div className="mx-auto max-w-4xl px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <Lock className="size-8" />
                            </div>
                        </div>
                        <h1 className="font-display text-4xl font-black uppercase tracking-tight sm:text-5xl">Confidentialité</h1>
                        <p className="mt-4 text-lg font-medium text-slate-500">Protection de vos données personnelles et respect de votre vie privée.</p>
                    </div>

                    <div className="prose prose-slate max-w-none dark:prose-invert space-y-12">
                        <section className="space-y-4">
                            <h2 className="flex items-center gap-3 text-2xl font-bold uppercase tracking-tight">
                                <div className="size-2 bg-primary" />
                                1. Nature des Données Collectées
                            </h2>
                            <div className="p-2 text-slate-600 dark:text-slate-400 space-y-4">
                                <p>
                                    Nous collectons uniquement les informations nécessaires au traitement de vos demandes de diagnostic et de réparation :
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Identité (Nom, Prénom, Société)</li>
                                    <li>Contact (Email, Téléphone)</li>
                                    <li>Véhicule/Appareil (Marque, Modèle, Description du problème)</li>
                                    <li>Données de connexion (Logs techniques IP pour la sécurité)</li>
                                </ul>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="flex items-center gap-3 text-2xl font-bold uppercase tracking-tight">
                                <div className="size-2 bg-primary" />
                                2. Finalité du Traitement
                            </h2>
                            <div className="p-2 text-slate-600 dark:text-slate-400">
                                <p>
                                    Vos données sont traitées exclusivement pour :
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li>Établir vos devis et diagnostics techniques.</li>
                                    <li>Assurer le suivi de vos interventions via le tableau de bord client.</li>
                                    <li>Vous contacter en cas d'urgence sur votre dossier.</li>
                                    <li>Améliorer la qualité de nos services techniques.</li>
                                </ul>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="flex items-center gap-3 text-2xl font-bold uppercase tracking-tight">
                                <div className="size-2 bg-primary" />
                                3. Durée de Conservation
                            </h2>
                            <div className="p-2 text-slate-600 dark:text-slate-400">
                                <p>
                                    Nous conservons vos données pendant la durée nécessaire à la gestion de la relation commerciale et au respect de nos obligations légales (jusqu'à 10 ans pour les factures et documents contractuels).
                                </p>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="flex items-center gap-3 text-2xl font-bold uppercase tracking-tight">
                                <div className="size-2 bg-primary" />
                                4. Sécurité des Données
                            </h2>
                            <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-8 dark:border-white/5 dark:bg-white/5">
                                <div className="flex items-start gap-4 text-slate-600 dark:text-slate-400">
                                    <ShieldCheck className="size-6 shrink-0 text-primary" />
                                    <p className="leading-relaxed">
                                        Toutes les communications sur notre plateforme sont chiffrées via TLS/SSL. Vos données sont stockées sur des serveurs sécurisés et leur accès est strictement restreint au personnel habilité de KeyPro Service Center.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="flex items-center gap-3 text-2xl font-bold uppercase tracking-tight">
                                <div className="size-2 bg-primary" />
                                5. Vos Droits
                            </h2>
                            <div className="p-2 text-slate-600 dark:text-slate-400 space-y-4">
                                <p>
                                    Conformément aux législations sur la protection des données, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition au traitement de vos données.
                                </p>
                                <p>
                                    Pour exercer ces droits, contactez-nous à l'adresse suivante : <span className="font-bold text-primary">garagelaredemption@gmail.com</span>
                                </p>
                            </div>
                        </section>
                    </div>

                    <div className="mt-24 border-t border-slate-100 pt-12 dark:border-white/5 text-center">
                        <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
                            Propulsé par la plateforme technique de KeyPro Service Center
                        </p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}

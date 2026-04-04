import { Form } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { store } from '@/routes/leads';
import type { LeadOptions } from '@/types';

const fieldClassName =
    'flex h-12 w-full rounded-none border-2 border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 outline-none transition-all focus:border-primary focus:ring-0 dark:border-white/10 dark:bg-white/5 dark:text-white';

export default function LeadCaptureForm({
    leadOptions,
    className,
    submitLabel = 'Envoyer la demande',
}: {
    leadOptions: LeadOptions;
    className?: string;
    submitLabel?: string;
}) {
    return (
        <Form
            action={store()}
            resetOnSuccess
            setDefaultsOnSuccess
            className={cn('grid gap-6', className)}
        >
            {({ errors, processing, wasSuccessful }) => (
                <>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="full_name" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Nom complet</Label>
                            <Input
                                id="full_name"
                                name="full_name"
                                required
                                placeholder="Jean Martin"
                                className="h-12 rounded-none border-2 border-slate-200 bg-white focus:border-primary focus:ring-0 dark:border-white/10 dark:bg-white/5"
                            />
                            <InputError message={errors.full_name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Email Professionnel</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="contact@entreprise.fr"
                                className="h-12 rounded-none border-2 border-slate-200 bg-white focus:border-primary focus:ring-0 dark:border-white/10 dark:bg-white/5"
                            />
                            <InputError message={errors.email} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Téléphone Direct</Label>
                            <Input
                                id="phone"
                                name="phone"
                                placeholder="+33 6 12 34 56 78"
                                className="h-12 rounded-none border-2 border-slate-200 bg-white focus:border-primary focus:ring-0 dark:border-white/10 dark:bg-white/5"
                            />
                            <InputError message={errors.phone} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="company" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Société / Entité</Label>
                            <Input
                                id="company"
                                name="company"
                                placeholder="Atelier, boutique, franchise..."
                                className="h-12 rounded-none border-2 border-slate-200 bg-white focus:border-primary focus:ring-0 dark:border-white/10 dark:bg-white/5"
                            />
                            <InputError message={errors.company} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="service_id" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Service Requis</Label>
                            <select
                                id="service_id"
                                name="service_id"
                                defaultValue=""
                                className={fieldClassName}
                            >
                                <option value="">Sélectionner un service</option>
                                {leadOptions.services.map((service) => (
                                    <option
                                        key={service.id}
                                        value={service.id}
                                        className="text-slate-900"
                                    >
                                        {service.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.service_id} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="brand_id" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Marque de l'équipement</Label>
                            <select
                                id="brand_id"
                                name="brand_id"
                                defaultValue=""
                                className={fieldClassName}
                            >
                                <option value="">Sélectionner une marque</option>
                                {leadOptions.brands.map((brand) => (
                                    <option
                                        key={brand.id}
                                        value={brand.id}
                                        className="text-slate-900"
                                    >
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.brand_id} />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="device_model" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Modèle ou Référence Technique</Label>
                        <Input
                            id="device_model"
                            name="device_model"
                            placeholder="MacBook Pro 14, Galaxy S24, borne tactile..."
                            className="h-12 rounded-none border-2 border-slate-200 bg-white focus:border-primary focus:ring-0 dark:border-white/10 dark:bg-white/5"
                        />
                        <InputError message={errors.device_model} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="message" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Description du besoin</Label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows={5}
                            placeholder="Décrivez la panne, le contexte technique et l'urgence de l'intervention."
                            className="w-full rounded-none border-2 border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition-all focus:border-primary focus:ring-0 dark:border-white/10 dark:bg-white/5 dark:text-white"
                        />
                        <InputError message={errors.message} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="preferred_contact_method" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                            Canal de communication privilégié
                        </Label>
                        <select
                            id="preferred_contact_method"
                            name="preferred_contact_method"
                            defaultValue="email"
                            className={fieldClassName}
                        >
                            <option value="email">Email</option>
                            <option value="phone">Téléphone</option>
                        </select>
                        <InputError
                            message={errors.preferred_contact_method}
                        />
                    </div>

                    <div className="flex flex-col gap-6 pt-4 md:flex-row md:items-center md:justify-between">
                        <p className="max-w-xs text-xs font-bold leading-relaxed text-slate-500">
                            Système de qualification centralisé. Vos données sont traitées selon les protocoles de sécurité KeyPro.
                        </p>
                        <Button
                            type="submit"
                            disabled={processing}
                            size="lg"
                            className="h-14 min-w-[200px]"
                        >
                            {processing && <Spinner />}
                            {submitLabel}
                        </Button>
                    </div>

                    {wasSuccessful && (
                        <div className="mt-4 border-l-4 border-primary bg-primary/5 p-4 text-sm font-bold uppercase tracking-wide text-primary">
                            Transmission réussie. Un expert vous recontacte.
                        </div>
                    )}
                </>
            )}
        </Form>
    );
}

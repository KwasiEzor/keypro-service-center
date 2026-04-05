import { Head, Link, usePage } from '@inertiajs/react';
import { 
    Shield, 
    Zap, 
    Clock, 
    User as UserIcon,
    Menu
} from 'lucide-react';
import { useEffect, useState } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from '@/lib/utils';
import { dashboard, home, login, quote, about, mobile, diagnostic } from '@/routes';
import { index as brandsIndex } from '@/routes/brands';
import { index as faqIndex } from '@/routes/faq';
import { index as servicesIndex } from '@/routes/services';
import type { User } from '@/types';

type SharedProps = {
    auth: {
        user: User | null;
    };
    flash?: {
        status?: string | null;
    };
    name: string;
};

const navigation = [
    { label: 'Accueil', href: home() },
    { label: 'Services', href: servicesIndex() },
    { label: 'Mobile', href: mobile() },
    { label: 'Diagnostic', href: diagnostic() },
    { label: 'Marques', href: brandsIndex() },
    { label: 'À Propos', href: about() },
    { label: 'FAQ', href: faqIndex() },
    { label: 'Contact', href: quote() },
];

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const page = usePage<SharedProps>();
    const currentPath = page.url.split('?')[0];
    const user = page.props.auth.user;
    const [year, setYear] = useState<number | null>(null);

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <div className="min-h-screen bg-white text-slate-950 dark:bg-[#0a0a0a] dark:text-white">
            <Head>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=space-grotesk:400,500,700|instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div className="relative">
                <header className="sticky top-0 z-50 border-b-2 border-primary/10 bg-white/80 backdrop-blur-md dark:border-white/5 dark:bg-[#0a0a0a]/80">
                    <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
                        <Link
                            href={home()}
                            className="flex items-center"
                        >
                            <AppLogoIcon className="h-12 w-auto object-contain" />
                        </Link>

                        <nav className="hidden items-center gap-2 md:flex">
                            {navigation.map((item) => {
                                const isActive =
                                    currentPath === item.href.url ||
                                    (item.href.url !== '/' &&
                                        currentPath.startsWith(item.href.url));

                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={cn(
                                            "px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all",
                                            isActive
                                                ? "bg-primary text-white"
                                                : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5"
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="flex items-center gap-2 md:gap-4">
                            <Button
                                asChild
                                variant="outline"
                                className="hidden md:inline-flex h-10 border-2"
                            >
                                <Link href={quote()}>Diagnostic Express</Link>
                            </Button>
                            <Button asChild size="icon" className="size-10 bg-black hover:bg-primary dark:bg-white dark:text-black">
                                <Link href={user ? dashboard() : login()}>
                                    <UserIcon className="size-5" />
                                </Link>
                            </Button>

                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" size="icon" className="md:hidden size-10 border-2">
                                        <Menu className="size-5" />
                                        <span className="sr-only">Toggle menu</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-[300px] bg-white dark:bg-[#0a0a0a] p-0 border-l-4 border-primary">
                                    <SheetHeader className="p-6 border-b border-slate-100 dark:border-white/5">
                                        <SheetTitle className="text-left">
                                            <AppLogoIcon className="h-10 w-auto object-contain" />
                                        </SheetTitle>
                                    </SheetHeader>
                                    <nav className="flex flex-col py-4">
                                        {navigation.map((item) => {
                                            const isActive =
                                                currentPath === item.href.url ||
                                                (item.href.url !== '/' &&
                                                    currentPath.startsWith(item.href.url));

                                            return (
                                                <Link
                                                    key={item.label}
                                                    href={item.href}
                                                    className={cn(
                                                        "px-8 py-4 text-xs font-black uppercase tracking-[0.2em] transition-all border-l-4",
                                                        isActive
                                                            ? "bg-primary/5 text-primary border-primary"
                                                            : "text-slate-600 border-transparent hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-white/5"
                                                    )}
                                                >
                                                    {item.label}
                                                </Link>
                                            );
                                        })}
                                        <div className="mt-8 px-8">
                                            <Button asChild className="w-full h-12 uppercase tracking-widest font-bold text-xs">
                                                <Link href={quote()}>Diagnostic Express</Link>
                                            </Button>
                                        </div>
                                    </nav>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </header>

                {page.props.flash?.status && (
                    <div className="border-b-2 border-primary bg-primary/5 px-6 py-3">
                        <div className="mx-auto max-w-7xl text-sm font-bold uppercase tracking-wide text-primary">
                            {page.props.flash.status}
                        </div>
                    </div>
                )}

                <main className="flex flex-col">
                    {children}
                </main>
            </div>

            <footer className="border-t-4 border-primary bg-[#131313] py-24 text-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid gap-16 lg:grid-cols-2">
                        <div className="space-y-8">
                            <Link href={home()} className="flex items-center">
                                <AppLogoIcon className="h-16 w-auto object-contain" />
                            </Link>
                            <p className="max-w-md text-lg font-medium leading-relaxed text-slate-400">
                                Infrastructure technique de pointe pour la maintenance, le diagnostic et l'optimisation de vos équipements industriels et digitaux.
                            </p>
                            <div className="flex gap-4">
                                {[Shield, Zap, Clock].map((Icon, i) => (
                                    <div key={i} className="flex size-12 items-center justify-center border border-white/10 bg-white/5 text-primary">
                                        <Icon className="size-6" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid gap-12 sm:grid-cols-2">
                            <div className="space-y-6">
                                <h4 className="font-display text-sm font-bold uppercase tracking-[0.3em] text-primary">Expertises</h4>
                                <nav className="flex flex-col gap-4 text-sm text-slate-400">
                                    <Link href={servicesIndex()} className="hover:text-white transition-colors">Catalogue Services</Link>
                                    <Link href={brandsIndex()} className="hover:text-white transition-colors">Marques Supportées</Link>
                                    <Link href={faqIndex()} className="hover:text-white transition-colors">Centre d'aide FAQ</Link>
                                    <Link href={quote()} className="hover:text-white transition-colors">Demande de Diagnostic</Link>
                                </nav>
                            </div>
                            <div className="space-y-6">
                                <h4 className="font-display text-sm font-bold uppercase tracking-[0.3em] text-primary">Laboratoire</h4>
                                <div className="space-y-4 text-sm text-slate-400">
                                    <p>Abidjan, Côte d'Ivoire<br />Zone d'intervention mobile étendue</p>
                                    <div className="space-y-1">
                                        <p>+225 72 11 44 44</p>
                                        <p>+225 98 48 88 44</p>
                                        <p>+225 22 46 66 26</p>
                                    </div>
                                    <p>garagelaredemption@gmail.com</p>
                                    <div className="pt-2">
                                        <p className="font-bold text-white uppercase text-[10px] tracking-widest mb-1">Horaires</p>
                                        <p>Lun - Sam: 08:00 - 19:00</p>
                                        <p>Dimanche: Urgence uniquement</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-24 border-t border-white/5 pt-8 flex flex-col justify-between gap-6 md:flex-row md:items-center">
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-600">
                            © <span>{year ?? '...'}</span> KeyPro Service Center. Système Qualité Certifié.
                        </p>
                        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
                            <Link href="#" className="hover:text-primary">Mentions Légales</Link>
                            <Link href="#" className="hover:text-primary">Confidentialité</Link>
                            <Link href="#" className="hover:text-primary">Conditions</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

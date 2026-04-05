import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, Menu, Search } from 'lucide-react';
import AppLogoIcon from '@/components/app-logo-icon';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { UserMenuContent } from '@/components/user-menu-content';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';
import type { BreadcrumbItem, NavItem } from '@/types';

type Props = {
    breadcrumbs?: BreadcrumbItem[];
};

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

export function AppHeader({ breadcrumbs = [] }: Props) {
    const page = usePage();
    const { auth } = page.props;
    const getInitials = useInitials();
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <>
            <div className="border-b-2 border-primary/10 bg-white dark:bg-[#0a0a0a]">
                <div className="mx-auto flex h-16 items-center px-4 md:max-w-7xl">
                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="mr-2 h-10 w-10 border-2"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="flex h-full w-64 flex-col items-stretch justify-between bg-white dark:bg-[#0a0a0a]"
                            >
                                <SheetTitle className="sr-only">
                                    Navigation menu
                                </SheetTitle>
                                <SheetHeader className="flex justify-start text-left border-b-2 border-primary/10 pb-4">
                                    <AppLogoIcon className="h-10 w-auto object-contain" />
                                </SheetHeader>
                                <div className="flex h-full flex-1 flex-col space-y-4 p-4">
                                    <div className="flex h-full flex-col justify-between text-xs font-bold uppercase tracking-widest">
                                        <div className="flex flex-col space-y-2">
                                            {mainNavItems.map((item) => (
                                                <Link
                                                    key={item.title}
                                                    href={item.href}
                                                    className={cn(
                                                        "flex items-center space-x-3 p-3 transition-colors",
                                                        isCurrentUrl(item.href) ? "bg-primary text-white" : "hover:bg-primary/5"
                                                    )}
                                                >
                                                    {item.icon && (
                                                        <item.icon className="h-5 w-5" />
                                                    )}
                                                    <span>{item.title}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <Link
                        href={dashboard()}
                        prefetch
                        className="flex items-center"
                    >
                        <AppLogoIcon className="h-10 w-auto object-contain" />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="ml-8 hidden h-full items-center space-x-2 lg:flex">
                        {mainNavItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    "px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all",
                                    isCurrentUrl(item.href) 
                                        ? "bg-primary text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]" 
                                        : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5"
                                )}
                            >
                                <div className="flex items-center gap-2">
                                    {item.icon && <item.icon className="size-4" />}
                                    {item.title}
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="ml-auto flex items-center space-x-4">
                        <Button
                            variant="outline"
                            size="icon"
                            className="size-10 border-2"
                        >
                            <Search className="size-5" />
                        </Button>
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="size-10 rounded-none border-2 p-0 overflow-hidden"
                                >
                                    <Avatar className="size-full rounded-none">
                                        <AvatarImage
                                            src={auth.user?.avatar}
                                            alt={auth.user?.name}
                                        />
                                        <AvatarFallback className="rounded-none bg-primary text-white font-bold">
                                            {getInitials(auth.user?.name ?? '')}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 rounded-none border-2 border-primary/10" align="end">
                                {auth.user && (
                                    <UserMenuContent user={auth.user} />
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
            {breadcrumbs.length > 1 && (
                <div className="flex w-full border-b-2 border-primary/5 bg-slate-50 dark:bg-white/5">
                    <div className="mx-auto flex h-10 w-full items-center justify-start px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}

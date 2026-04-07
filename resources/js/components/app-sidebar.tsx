import { Link } from '@inertiajs/react';
import { LayoutGrid, Wrench, Calendar, LifeBuoy, FileText } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard, contact } from '@/routes';
import { leads, appointments } from '@/routes/dashboard';
import { index as servicesIndex } from '@/routes/services';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Vue d\'ensemble',
        href: dashboard().url,
        icon: LayoutGrid,
    },
    {
        title: 'Mes Interventions',
        href: leads().url,
        icon: Wrench,
    },
    {
        title: 'Mes Rendez-vous',
        href: appointments().url,
        icon: Calendar,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Support Technique',
        href: contact().url,
        icon: LifeBuoy,
    },
    {
        title: 'Catalogue Services',
        href: servicesIndex().url,
        icon: FileText,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

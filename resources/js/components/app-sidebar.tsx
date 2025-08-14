import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, History, House, Inbox, FileCheck2, Target, Trash2, Cog } from 'lucide-react';
import AppLogo from './app-logo';
import { NavWorkSpace } from './nav-workspace';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Home',
        icon: House,
        href: '/user'
    },
    {
        title: 'Inbox',
        icon: Inbox,
        href: '/user/inbox'
    },
    {
        title: 'Tasks',
        icon: FileCheck2,
        href: '/user/tasks'
    },
    {
        title: 'Projects',
        icon: Target,
        href: '/user/projects'
    },
    {
        title: 'History',
        icon: History,
        href: '/user/history'
    },
    {
        title: 'Trash',
        icon: Trash2,
        href: '/users/trash'
    },
    {
        title: "Settings",
        icon: Cog,
        href: '/users/setting'
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset" className='bg-[#202020] scrollbar-hide'>
            <SidebarHeader className='bg-todosecondary'>
                <SidebarMenu>
                    <SidebarMenuItem >
                        <SidebarMenuButton size="lg" asChild className=''>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarFooter className='bg-todosecondary scrollbar-hide'>
                <NavUser />
            </SidebarFooter>

            <SidebarContent className='bg-todosecondary scrollbar-hide'>
                <NavMain items={mainNavItems} />
                <NavWorkSpace />
            </SidebarContent>
        </Sidebar>
    );
}



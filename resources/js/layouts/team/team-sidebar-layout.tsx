import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { TemaSidebar } from '@/components/team/team-sidebar';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function TeamSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell variant="sidebar">
            <TemaSidebar />
            <AppContent className='overflow-hidden w-full'>
                {children}
            </AppContent>
        </AppShell>
    );
}

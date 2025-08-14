import TeamLayoutTemplate from '@/layouts/team/team-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <TeamLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        {children}
    </TeamLayoutTemplate>
);

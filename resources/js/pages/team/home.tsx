import TeamLayout from "@/layouts/team-layout";
import { BreadcrumbItem, teamType } from "@/types";
import { Head } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'new teams',
        href: '/company/{id}/team/{teamId}',
    },
];

export default  function TeamHome ({team, userRole}:{team: teamType, userRole: string}) {
    return (
        <TeamLayout breadcrumbs={breadcrumbs}>
            <Head title="team" />
            <section>
                <h1>home</h1>
            </section>
        </TeamLayout>
        
    )
}
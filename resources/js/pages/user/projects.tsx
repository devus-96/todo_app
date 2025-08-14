import { ProjectComponent } from "@/components/common/projectComponent";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, ProjectType } from "@/types";
import { Head } from "@inertiajs/react";



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Task',
        href: '/user/projects',
    },
];

type projectdatatype = {
    data: ProjectType[]
}

const dropMenuTab = [
    {
        title: 'All',
        values: ['all']
    },
    {
        title: 'Priority',
        values: ['High', 'Medium', 'Low']
    },
    {
        title: 'State',
        values: ["not started",'in progress',"waitting", "paused"]
    },
]

export default function Home ({
    project, 
    company_id,
    team_id
}:{
    project: projectdatatype, 
    company_id: number | null,
    team_id: number | null
}) {

    console.log(team_id, company_id)
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Task" />
            <ProjectComponent filter={dropMenuTab} project={project} />
        </AppLayout>
    )
}

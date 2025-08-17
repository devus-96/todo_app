import { ProjectComponent } from "@/components/common/projectComponent";
import TeamLayout from "@/layouts/team-layout";
import { BreadcrumbItem, ProjectType } from "@/types";
import { Head } from "@inertiajs/react";
import { useEffect } from "react";


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Project',
        href: '/team/projects',
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
    {
        title: 'Author',
        values: ["not started",'in progress',"waitting", "paused"]
    },

]

export default function ProjectsTeam ({
    project, 
    company_id,
    team_id
}:{
    project: projectdatatype, 
    company_id: number | null,
    team_id: number | null
}) {
    useEffect(() => {
        if (company_id === null) {
            window.location.assign('/user')
        }
    }, [team_id, company_id])   
    return (
        <TeamLayout breadcrumbs={breadcrumbs}>
            <Head title="project" />
            {(company_id && team_id) && <ProjectComponent filter={dropMenuTab} project={project} company_id={company_id} team_id={team_id}  />}
        </TeamLayout>
    )
}

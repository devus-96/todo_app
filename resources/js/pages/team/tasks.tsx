import TeamLayout from "@/layouts/team-layout";
import { BreadcrumbItem, Todo } from "@/types";
import { Head } from "@inertiajs/react";
import { SquareCheck } from "lucide-react";
import { faketasks } from "@/constant/global";
import { useState } from "react";
import { TaskComponent } from "@/components/common/taskComponent";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Task',
        href: '/team/task',
    },
];

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

export default function Tasks ({
    taskdata,
    teamId,
    companyId
}:{
    taskdata: {data: Todo[]},
    teamId?: number,
    companyId?:number
}) {
    const [tasks, setTasks] = useState<Todo[]>(faketasks as Todo[])
    return (
        <TeamLayout breadcrumbs={breadcrumbs}>
            <Head title="Task" />
            <TaskComponent 
                team_id={teamId} 
                company_id={companyId}
                taskData={taskdata.data}
                filter={dropMenuTab}
            />
        </TeamLayout>
    )
}
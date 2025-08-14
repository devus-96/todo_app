import TeamLayout from "@/layouts/team-layout";
import { BreadcrumbItem, Todo } from "@/types";
import { Head } from "@inertiajs/react";
import { SquareCheck } from "lucide-react";
import { faketasks } from "@/constant/global";
import { useState } from "react";
import { TaskTeamComponent } from "@/components/team/taskTeamComponent";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Task',
        href: '/team/task',
    },
];

export default function Tasks () {
    const [tasks, setTasks] = useState<Todo[]>(faketasks as Todo[])
    return (
        <TeamLayout breadcrumbs={breadcrumbs}>
            <Head title="Task" />
            <div className="flex items-center text-3xl text-textprimary space-x-4 px-4 my-4">
                <SquareCheck /><p>Tasks</p>
            </div>
            <TaskTeamComponent tasks={tasks} setTasks={setTasks} />
        </TeamLayout>
    )
}
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, Todo } from "@/types";
import { Head } from "@inertiajs/react";
import { TaskComponent } from "@/components/common/taskComponent";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Task',
        href: '/user/task',
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

export type taskResponseType = {
    data: Todo[]
}

export default function Tasks ({tasks}:{tasks: taskResponseType}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Task" />
            <TaskComponent filter={dropMenuTab} taskData={tasks['data']}  />
        </AppLayout>
    )
}
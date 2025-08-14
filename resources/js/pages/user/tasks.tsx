import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, Todo } from "@/types";
import { Head } from "@inertiajs/react";
import { SquareCheck } from "lucide-react";
import { useState } from "react";
import { TaskUserComponent } from "@/components/user/taskUserComponent";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Task',
        href: '/user/task',
    },
];

export type taskResponseType = {
    data: Todo[]
}

export default function Tasks ({tasks}:{tasks: taskResponseType}) {
    const [taskDatas, setTaskDatas] = useState<Todo[]>(tasks['data'] as Todo[])
    console.log(taskDatas)
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Task" />
            <div className="flex items-center text-3xl text-textprimary space-x-4 px-4 my-4">
                <SquareCheck /><p>Tasks</p>
            </div>
            <TaskUserComponent tasks={taskDatas} setTasks={setTaskDatas} />
        </AppLayout>
    )
}
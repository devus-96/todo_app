import { SheetTask } from "../custom/sheet"
import { LucideProps } from "lucide-react";
import { Button } from "../ui/button";
import { SheetComment } from "../popup/sheetComment";
import { ProjectType, Todo } from "@/types";
import { router } from '@inertiajs/react';
import { ProjectCombobox } from "../custom/projectCombobox";

export function SheetAction ({
    type='',
    tasks,
    projects,
    selected,
    setAppError,
    setTasks,
    setProjects,
    dropAction
}:{
    type?: string
    tasks?: Todo[],
    projects?:ProjectType[]
    selected: number[],
    setAppError: React.Dispatch<React.SetStateAction<string[]>>,
    setTasks?: React.Dispatch<React.SetStateAction<Todo[]>>,
    setProjects?: React.Dispatch<React.SetStateAction<ProjectType[]>>,
    dropAction: {
        title: string;
        icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    }[]
}) {
    function deleteTask (id: number | undefined) {
        if (setTasks)
        setTasks((prev) => {
            let newTab = [...prev]
            newTab = newTab.filter((item) => item.id !== id)
            return newTab
        })
        router.delete(route('user.taskDelete', id));
    }

    function duplicate () {
        if (setTasks)
        setTasks((prev) => {
            let newTab = [...prev]
            const newCopy = newTab[selected[0]]
            newTab = [...newTab, newCopy]
            return newTab
        })
        router.post(route('user.newtask'));
    }
    return (
        <div className="absolute w-fit flex items-center justify-between ml-4 border rounded bg-todosecondary">
        {dropAction.map((item, index) => {
            return (
            <div key={index}>
                {item.title === 'Add comment' &&  tasks ?
                        <SheetComment id={tasks[selected[0]].id as number} type={type}>
                        <Button 
                        key={index} 
                        className="text-xs bg-todosecondary border-r border-l rounded-none text-textprimary cursor-pointer hover:text-textprimary3">
                            <item.icon />
                            <p>{item.title}</p>
                        </Button>
                        </SheetComment>
                : item.title === 'Open' &&  tasks ? 
                <SheetTask task={tasks[selected[0]]} setError={setAppError}>
                    <Button 
                        key={index} 
                        className="text-xs bg-todosecondary border-r border-l rounded-none text-textprimary cursor-pointer hover:text-textprimary3">
                            <item.icon />
                            <p>{item.title}</p>
                    </Button>
                </SheetTask> :
                item.title === 'Delete task' && tasks ?
                <Button 
                key={index} 
                onClick={() => {
                    deleteTask(tasks[selected[0]].id)
                }}
                className="text-xs bg-todosecondary border-r border-l rounded-none text-textprimary cursor-pointer hover:text-textprimary3">
                    <item.icon />
                    <p>{item.title}</p>
                </Button>
                : item.title === 'Duplicate' ? 
                <Button 
                key={index} 
                onClick={() => {
                    duplicate()
                }}
                className="text-xs bg-todosecondary border-r border-l rounded-none text-textprimary cursor-pointer hover:text-textprimary3">
                    <item.icon />
                    <p>{item.title}</p>
                </Button>
                : item.title === 'Move to' && type !== 'user_task' ?
                <ProjectCombobox>
                    <Button 
                        key={index} 
                        className="text-xs bg-todosecondary border-r border-l rounded-none text-textprimary cursor-pointer hover:text-textprimary3">
                        <item.icon />
                        <p>{item.title}</p>
                    </Button>
                </ProjectCombobox>
                : 
                <Button 
                key={index} 
                className="text-xs bg-todosecondary border-r border-l rounded-none text-textprimary cursor-pointer hover:text-textprimary3">
                    <item.icon />
                    <p>{item.title}</p>
                </Button>
                }
            </div>
            )
        })}
    </div>
    )
}
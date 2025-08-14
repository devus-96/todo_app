import { Dispatch, SetStateAction, useMemo, useRef, useState } from "react";
import { SheetTask } from "../custom/sheet"
import { ProjectType, Todo } from "@/types";
import { CalendarPage } from "../calendar/calendarComponent";
import { Week } from "../custom/weekTay";
import { BoardTasks } from "../custom/board";
import { Plus, X} from "lucide-react";
import { Commontable } from "../custom/commontable";
import { userstasksRow } from "@/constant/task";
import { TaskTableComponent } from "./user-task-table";
import { Button } from "../ui/button";
import clsx from "clsx";
import { dropType, sortTask, viewAvailable } from "@/constant/global";
import { GlobalError } from "../ui/global-error-component";
import { SheetAction } from "../popup/sheetAction";
import { Filters } from "./filters";
import { DisplayFilter } from "./displayFilter";
import { DoorOpen, MessageCircleDashed,Trash2, CornerUpRight, WrapText } from "lucide-react";


export const dropAction = [
    {title: 'Add comment', icon: MessageCircleDashed},
    {title: 'Open', icon: DoorOpen},
    {title: 'Move to', icon: CornerUpRight},
    {title: 'Duplicate', icon: WrapText},
    {title: 'Delete task', icon: Trash2}
]

export const TaskUserComponent = ({
    tasks,
    setTasks,
    type = 'user_task',
    project = null
}:{
    tasks: Todo[],
    setTasks: Dispatch<SetStateAction<Todo[]>>,
    type?: 'user_task' | 'user_project_task' | 'team_task' | 'team_projects_task',
    project?: ProjectType | null
}) => {
    const [filterType, setFilterType] = useState<'all' | 'task' | 'habit'>('all')
    const [selected, setSelected] = useState<number[]>([])
    const [filterTab, setFilterTab] = useState(sortTask)
    const [views, setViews] = useState<string>("tasks");
    const [date, setDate] = useState(new Date())
    const [appError, setAppError] = useState<string[]>([])

    const taskRef = useRef<Todo[]>(tasks as Todo[])

    useMemo(() => {
        let currentTodos = taskRef.current; // Start with all todos

        if (filterType !== 'all') {
            currentTodos = currentTodos.filter(todo => todo.type === filterType);
        }

        setTasks(currentTodos)
    }, [filterType]); 

    return (
        <>
        <GlobalError 
            appError={appError}
            setError={setAppError} 
        />
        <div className="w-full flex justify-between items-center px-5 mt-8 border-b py-2">
            <div className="flex items-center space-x-2">
                <SheetTask type={type} project={project} setError={setAppError}>
                    <Button className="w-fit px-2 rounded cursor-pointer text-white bg-todoterciary">
                        New
                    </Button>
                </SheetTask>
                <div className="space-x-2">
                    {dropType.map((item, index) => (
                    <Button 
                        onClick={() => setFilterType(() => item.value as 'all' | 'task' | 'habit')} 
                        key={index} 
                        className={clsx("rounded bg-todosecondary cursor-pointer text-textprimary text-xs hover:bg-todoterciary hover:text-white", {
                            'bg-todoterciary text-white' : filterType === item.value
                    })}>{item.title}</Button>
                    ))}
                </div>
            </div>
            <Filters 
                setData={setTasks}
                data={tasks}
                views={views}
                filterTab={filterTab}
                setViews={setViews}
                setFilterTab={setFilterTab}
                viewAvailable={viewAvailable}
            />
            </div>
            <section className="w-full h-full overflow-auto mb-8 relative">
                {selected.length !== 0 &&
                    <SheetAction 
                        type={type} 
                        tasks={tasks}
                        selected={selected} 
                        setAppError={setAppError} 
                        setTasks={setTasks}
                        dropAction={dropAction}
                    />
                }

                <DisplayFilter setFilterTab={setFilterTab} filterTab={filterTab} />
                
                {views === 'tasks' &&
                <div>
                    <Commontable tabHeader={userstasksRow}>
                    {tasks.map((item: any, index: number) => {
                        return (
                        <TaskTableComponent 
                            key={index}
                            item={item} 
                            tasks={tasks}
                            index={index}
                            setTasks={setTasks}
                            setSelected={setSelected}
                            setError={setAppError}
                        />
                        )
                    })}
                    </Commontable>
                    <SheetTask type={type} project={project} setError={setAppError}>
                        <div className="flex items-center text-sm text-textprimary3 space-x-4 py-2 px-2 cursor-pointer hover:bg-secondary">
                            <Plus size={16} /> <p>New task</p>
                        </div>
                    </SheetTask>
                </div>
                }
                {views === 'board' && <BoardTasks tasks={tasks} />}
                {views === 'week' && <Week date={date} data={tasks} setDate={setDate} setTasks={setTasks}/>}
                {views === 'calendar' && <CalendarPage data={tasks} />}
            </section>
        </>
    )
}
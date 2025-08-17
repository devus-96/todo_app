import { useEffect, useRef, useState } from "react"
import { GlobalError } from "../ui/global-error-component"
import { CornerUpRight, DoorOpen, MessageCircleDashed, Plus, SquareCheck, Trash2, WrapText } from "lucide-react"
import { Todo } from "@/types";
import { Filters } from "../user/filters";
import { SheetTask } from "../custom/sheet";
import { Button } from "../ui/button";
import { dropType, sortTask, viewAvailableInTasksView } from "@/constant/global";
import clsx from "clsx";
import { DisplayFilter } from "../user/displayFilter";
import { Commontable } from "../custom/commontable";
import { teamsTaskRow, userstasksRow } from "@/constant/task";
import { TaskTableComponent } from "../user/user-task-table";
import { BoardTasks } from "../custom/board";
import { Week } from "../custom/weekTay";
import { CalendarPage } from "../calendar/calendarComponent";
import { SheetAction } from "../popup/sheetAction";


export const dropAction = [
    {title: 'Add comment', icon: MessageCircleDashed},
    {title: 'Open', icon: DoorOpen},
    {title: 'Move to', icon: CornerUpRight},
    {title: 'Duplicate', icon: WrapText},
    {title: 'Delete task', icon: Trash2}
]

export function TaskComponent ({
    filter,
    taskData,
    company_id,
    team_id,
    project_id
}:{
    filter: {title: string; values: string[];}[],
    taskData: Todo[],
    company_id?: number,
    team_id?: number,
    project_id?: number
}) {
    const [appError, setAppError] = useState<string[]>([])
    const [tasks, setTasks] = useState<Todo[]>([])
    const [filterType, setFilterType] = useState<'all' | 'task' | 'habit'>('all')
    const [selected, setSelected] = useState<number[]>([])
    const [filterTab, setFilterTab] = useState(sortTask)
    const [views, setViews] = useState<string>("tasks");
    const [date, setDate] = useState(new Date())
    
     const taskRef = useRef<Todo[]>(taskData as Todo[])

     useEffect(() => {
        let currentTodos = taskRef.current; // Start with all todos

        if (filterType !== 'all') {
            currentTodos = currentTodos.filter(todo => todo.type === filterType);
        }

        setTasks(currentTodos)
    }, [filterType]); 
    return (
        <section>
            <GlobalError 
                appError={appError}
                setError={setAppError} 
            />
            <div className="flex items-center text-3xl text-textprimary space-x-4 px-4 my-4">
                <SquareCheck /><p>Tasks</p>
            </div>
            <div className="w-full flex justify-between items-center px-5 mt-8 border-b py-2">
                <div className="flex items-center space-x-2">
                    <SheetTask setError={setAppError}>
                        <Button className="w-fit px-2 rounded cursor-pointer text-white bg-todoterciary">
                            New
                        </Button>
                    </SheetTask>
                    {!team_id && !project_id &&
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
                    }
                </div>
                <Filters 
                    setData={setTasks}
                    dropMenuTab={filter}
                    data={tasks}
                    views={views}
                    filterTab={filterTab}
                    setViews={setViews}
                    setFilterTab={setFilterTab}
                    viewAvailable={viewAvailableInTasksView}
                />
            </div>
            <section className="w-full h-full overflow-auto mb-8 relative">
                {selected.length !== 0 &&
                    <SheetAction 
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
                    <Commontable tabHeader={(company_id && team_id) ? teamsTaskRow : userstasksRow}>
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
                            company_id={company_id}
                            team_id={team_id}
                            project_id={project_id}
                        />
                        )
                    })}
                    </Commontable>
                    <SheetTask 
                        setError={setAppError}
                        company_id={company_id}
                        team_id={team_id}
                        project_id={project_id}
                    >
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
        </section>
    )
}
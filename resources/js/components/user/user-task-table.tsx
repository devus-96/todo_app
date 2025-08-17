"use client"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { Menu } from "../custom/menu"; 
import { DoorOpen, MessageCircleDashed, Trash2, X } from "lucide-react"
import { StatusCombobox } from "../custom/statusCombobox";
import { PriorityCombobox } from "../custom/priorityCombox";
import { DateCombox } from "../custom/dateCombox";
import { Input } from "../ui/input";
import { Todo } from "@/types";
import { checkDateValues, checkTimes } from "@/lib/global";
import { Checkbox } from "../ui/checkbox";
import { useForm } from "@inertiajs/react";

export const dropMenuTab = [
    {title: 'Add comment', icon: MessageCircleDashed},
    {title: 'Open', icon: DoorOpen},
    {title: 'Delete task', icon: Trash2}
]

export const TaskTableComponent = ({
    item,
    setTasks,
    index,
    tasks,
    setSelected,
    setError,
    company_id,
    team_id,
    project_id
}:{
        item: Todo, 
        setTasks: Dispatch<SetStateAction<Todo[]>>,
        index: number,
        tasks: Todo[],
        setSelected: Dispatch<SetStateAction<number[]>>,
        setError: Dispatch<SetStateAction<string[]>>,
        company_id?: number,
        team_id?: number,
        project_id?: number,
    }) => {
    //useState
    const { data, setData, patch, errors, reset } = useForm<Required<{[key: string]: string}>>();
    const [updateName, setUpdateName] = useState(false)
    const startTimeInputRef = useRef<HTMLInputElement | null>(null)
    const [checked, setChecked] = useState(false)
    const [indexes, setIndexes] = useState<number | null>(null)

    function handleChange (value: string, key: string) {
        setData({name: value})
        setIndexes(index)
        setTasks((prev: Todo[]) => {
            let newTab = [...prev]
            const newValue = {[key]: value}
            newTab[index] = {...newTab[index], ...newValue}
            return newTab
        })
    }

    function handleChangeTime(value: string, key: string) {
        try {
            if (tasks[index].end_time && tasks[index].start_date) {
                if (key === 'start_time') {
                    checkTimes(tasks[index].start_date, tasks[index].end_time,  value)
                } else {
                    checkTimes(tasks[index].start_date,value,  tasks[index].start_time as string)
                }
            }
            setData({key: value})
            setIndexes(index)
            setTasks((prev: Todo[]) => {
                let newTab = [...prev]
                const newValue = {[key]: value}
                newTab[index] = {...newTab[index], ...newValue}
                return newTab
            })
        } catch (error) {
            if (startTimeInputRef.current) {
                if (tasks[index].start_time)
                startTimeInputRef.current.value = tasks[index].start_time
            }
            if (error instanceof Error) {
                setError((prev) => [...prev, error?.message]);
            }
        }
    }

    function handleUpdateStatus (currentStatus: "not started" | "paused" | "canceled" | "in progress" | "done") {
        setData({state: currentStatus})
        setIndexes(index)
        setTasks((prev: Todo[]) => {
            let newTab = [...prev]
            const newValue = {state: currentStatus}
            newTab[index] = {...newTab[index], ...newValue}
            return newTab
        })
    }

    function handleUpdatePriority (currentPriority: "high" | "medium" | "low") {
        setData({priority: currentPriority})
        setIndexes(index)
        setTasks((prev: Todo[]) => {
            let newTab = [...prev]
            const newValue = {priority: currentPriority}
            newTab[index] = {...newTab[index], ...newValue}
            return newTab
        })
    }

    function handleUpdateStartdate (currentDate: string) {
        try {
            checkDateValues(currentDate, tasks[index].deadline)
            setData({start_date: currentDate})
            setIndexes(index)
            setTasks((prev: Todo[]) => {
                let newTab = [...prev]
                const newValue = {start_date: currentDate}
                newTab[index] = {...newTab[index], ...newValue}
                return newTab
            })
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError((prev) => [...prev, error?.message]);
            }
        }
    }

    function handleUpdateDeadline (currentDate: string) {
        try {
            checkDateValues(tasks[index].start_date, currentDate)
            setData({deadline: currentDate})
            setIndexes(index)
            setTasks((prev: Todo[]) => {
                let newTab = [...prev]
                const newValue = {deadline: currentDate}
                newTab[index] = {...newTab[index], ...newValue}
                return newTab
            })
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError((prev) => [...prev, error?.message]);
            }
        }
    }

    useEffect(() => {
        if (project_id && !team_id) {
            if (indexes !== null) {
                patch(route('company.update_project_task', {
                    id: company_id, 
                    projectId: project_id, 
                    taskId: tasks[indexes].id
                }))
            }
        } else if (!project_id && team_id) {
            if (indexes !== null) {
                patch(route('company.update_task_team', {
                    id: company_id, 
                    teamId: team_id, 
                    taskId: tasks[indexes].id
                }))
            }
        } else if (project_id && team_id) {
            if (indexes !== null) {
                patch(route('company.update_task_project_team', {
                    id: company_id, 
                    teamId: team_id, 
                    projectId: project_id, 
                    taskId: tasks[indexes].id
                }))
            }
        } else {
            if (indexes !== null) {
                patch(route('user.taskUpdate', tasks[indexes].id))
            }
        }
    }, [data, indexes])
    console.log(company_id)
    return (
        <>
        <tr className="py-2 text-textprimary">
            <td className="border-r border-t border-sidebar-border/50 flex-wrap">
                <div className="relative w-full h-full">
                    <div className="w-full flex justify-between items-center px-4 group">
                        <div className=" text-sidebarText rounded flex-center cursor-pointer">
                            <Checkbox 
                                checked={checked} 
                                onClick={() => {
                                    if (checked) {
                                        setChecked(false)
                                        setSelected((prev) => prev.filter((item) => item !== index))
                                    }else {
                                        setChecked(true)
                                        setSelected((prev) => [...prev, index])
                                    }
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between w-[200px]">
                            <p onClick={() => {setUpdateName(true)}} className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">{item.name}</p>
                        </div>
                    </div>
                    {(updateName) &&
                    <Menu active={updateName} setActive={setUpdateName}>
                    <div className="w-full absolute top-[-5px] z-30 rounded h-full bg-secondary border border-borderCard p-4 flex items-center">
                        <input 
                            type="text" 
                            name='name'
                            placeholder="write the new name" 
                            className="bg-secondary text-sm text-gray-300 outline-none"
                            onKeyUp={(e) => {
                                let target = e.target as HTMLInputElement
                                if (e.key == 'Enter') {
                                    handleChange(target.value, 'name')
                                    setUpdateName(false)
                                }
                            }}
                        />
                    </div>
                    </Menu>
                    }
                </div>
            </td>
            {(team_id !== undefined && company_id !== undefined) &&
            <>
            <td className="border-l border-r border-t border-sidebar-border/50 cursor-pointer w-fit text-sm">
                <div className="flex px-4 items-center space-x-1 w-[150px] capitalize">
                    <div className=" bg-todosecondary text-textprimary rounded-full w-[24px] h-[24px] flex items-center justify-center">
                        <p>{item.author?.slice(0, 1)}</p>
                    </div>
                    <p>{item.author}</p>
                </div>
            </td>
            <td className="border-l border-r border-t border-sidebar-border/50 overflow-hidden relative">
                <div className="w-[200px] overflow-auto flex scrollbar-hide">
                    {item.assignee?.map((menber, i) => {
                    return (
                        <div key={i}>
                            <div className="text-sm flex items-center text-sidebarText justify-between px-1">
                                <p>{menber}</p>
                                <X onClick={() => {
                                    
                                }} size={16} className="ml-1 cursor-pointer"/>
                            </div>
                        </div>
                    )
                })}
                </div>
            </td>
            </>
            }
            <td className="w-fit border-l border-r border-t border-sidebar-border/50 cursor-pointer text-xs">
                <StatusCombobox 
                    value={item.state} 
                    onChange={handleUpdateStatus} 
                    btnClass='justify-between border-none cursor-pointer' 
                    className="w-[200px] p-0"
                />
            </td>
            <td className="border-l border-r border-t border-sidebar-border/50 cursor-pointer">
                <PriorityCombobox 
                    value={item.priority} 
                    onChange={handleUpdatePriority}
                    btnClass='justify-between border-none cursor-pointer' 
                    className="w-[200px] p-0"/>
            </td>
            <td className="border-l border-r border-t border-sidebar-border/50 text-center cursor-pointer !text-xs">
               <DateCombox 
                    value={new Date(item.start_date).toLocaleDateString()}
                    className="flex flex-col gap-3"
                    onChange={handleUpdateStartdate}
                />
            </td>
            <td className="border-l border-r border-t border-sidebar-border/50 text-center cursor-pointer text-xs">
                <DateCombox 
                    value={new Date(item.deadline).toLocaleDateString()}
                    className="flex flex-col gap-3 "
                    onChange={handleUpdateDeadline}
                />
            </td>
            {Object.keys(item).includes('start_time') &&
            <td className="border-l border-r border-t border-sidebar-border/50 text-center cursor-pointer text-xs">
                <Input
                    type="time"
                    id="time-picker"
                    step="3"
                    ref={startTimeInputRef}
                    onBlur={(e) => {
                        let target = e.target as HTMLInputElement
                        handleChangeTime(target.value, 'start_time')
                    }}
                    defaultValue={item.start_time ? item.start_time: ""}
                    className="bg-todoprimary !text-sm border-none appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
            </td>
            }
            {Object.keys(item).includes('end_time') &&
            <td className="border-l border-r border-t border-sidebar-border/50 text-center cursor-pointer text-xs">
                <Input
                    type="time"
                    id="time-picker"
                    step="1"
                    onBlur={(e) => {
                        let target = e.target as HTMLInputElement
                        handleChangeTime(target.value, 'end_time')
                    }}
                    defaultValue={item.end_time ? item.end_time: ""}
                    className="bg-todoprimary !text-sm border-none appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
            </td>
            }
        </tr>
        </>
    )
}
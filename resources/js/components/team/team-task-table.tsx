import React, { Dispatch, SetStateAction, useRef, useState } from "react"
import { Menu } from "../custom/menu"; 
import { DoorOpen, MessageCircleDashed, Trash2, Users, X } from "lucide-react"
import { DropdownMenu2 } from "../custom/dropdownMenu";
import { StatusCombobox } from "../custom/statusCombobox";
import { PriorityCombobox } from "../custom/priorityCombox";
import { DateCombox } from "../custom/dateCombox";
import { Todo } from "@/types";
import { checkDateValues, checkTimes } from "@/lib/global";
import { TeamCombobox } from "./teamCombox";

export const dropMenuTab = [
    {title: 'Add comment', icon: MessageCircleDashed},
    {title: 'Open', icon: DoorOpen},
    {title: 'Add Participants', icon: Users},
    {title: 'Delete task', icon: Trash2}
]

export const TeamTableComponent = ({
    item,
    setTasks,
    index,
    tasks,
    setError
}:{
        item: Todo, 
        setTasks: Dispatch<SetStateAction<Todo[]>>,
        index: number,
        tasks: Todo[],
        setError: Dispatch<SetStateAction<string | undefined>>
    }) => {
    //useState
    const [updateName, setUpdateName] = useState(false)
    const [updateAssigned, setUpdateAssigned] = useState(false)
    const startTimeInputRef = useRef<HTMLInputElement | null>(null)

    function handleChange (value: string, key: string) {
        setTasks((prev: Todo[]) => {
            let newTab = [...prev]
            const newValue = {[key]: value}
            newTab[index] = {...newTab[index], ...newValue}
            return newTab
        })
    }

    function handleUpdateStatus (currentStatus: "not started" | "paused" | "canceled" | "in progress" | "done") {
        setTasks((prev: Todo[]) => {
            let newTab = [...prev]
            const newValue = {state: currentStatus}
            newTab[index] = {...newTab[index], ...newValue}
            return newTab
        })
    }

    function handleUpdatePriority (currentPriority: "high" | "medium" | "low") {
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
            setTasks((prev: Todo[]) => {
                let newTab = [...prev]
                const newValue = {start_date: currentDate}
                newTab[index] = {...newTab[index], ...newValue}
                return newTab
            })
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error?.message);
            }
        }
    }

    function handleUpdateDeadline (currentDate: string) {
        try {
            checkDateValues(tasks[index].start_date, currentDate)
            setTasks((prev: Todo[]) => {
                let newTab = [...prev]
                const newValue = {deadline: currentDate}
                newTab[index] = {...newTab[index], ...newValue}
                return newTab
            })
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error?.message);
            }
        }
    }

    function handleUpdateAssigned (value: string[]) {
        setTasks((prev: Todo[]) => {
            let newTab = [...prev]
            if (newTab[index].assigned) {
                if (!newTab[index].assigned.includes(value[0])) {
                    let newValue = {assigned: [...newTab[index].assigned, ...value]}
                    newTab[index] = {...newTab[index], ...newValue}
                    console.log(newTab[index].assigned)
                    return newTab
                }
            } 
           return newTab
        })
        setUpdateAssigned(false)
    }

    function time () {
        const str_startdate = new Date(item.start_date)
        const str_deadline = new Date(item.deadline)
        const now = new Date()
        const percent = (now.getTime() - str_startdate.getTime()) / (str_deadline.getTime() - str_startdate.getTime())
        if (now.getTime() >= str_deadline.getTime()) return 100
        if (now.getTime() < str_startdate.getTime()) return 0
        return percent * 100
    }
    return (
        <>
        <tr className="py-2 text-textprimary">
            <td className="border-r border-t border-sidebar-border/50 flex-wrap">
                <div className="relative w-full h-full">
                    <div className="w-full flex justify-between items-center px-4 group">
                        <div className=" text-textprimary2 rounded flex-center cursor-pointer">
                            <DropdownMenu2 
                                title="Sort" 
                                table={dropMenuTab} 
                                btnClass="rounded w-4 h-5 cursor-pointer border-none" 
                                data={item}
                            />
                        </div>
                        <div className="flex items-center justify-between w-[200px] text-textprimary">
                            <p onClick={() => {setUpdateName(true)}} className="text-sm font-normal overflow-hidden text-ellipsis whitespace-nowrap">{item.name}</p>
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
            <td className="border-l border-r border-t border-sidebar-border/50 cursor-pointer w-fit text-sm">
                <div className="flex px-4 items-center space-x-1 w-[150px] capitalize">
                    <div className=" bg-todosecondary text-textprimary rounded-full w-[24px] h-[24px] flex items-center justify-center">
                        <p>{item.author?.slice(0, 1)}</p>
                    </div>
                    <p>{item.author}</p>
                </div>
            </td>
            <td className="border-l border-r border-t border-sidebar-border/50 overflow-hidden relative">
                <div onClick={() => setUpdateAssigned(true)} className="w-[200px] overflow-auto flex scrollbar-hide">
                    {item.assigned?.map((menber, i) => {
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
                {updateAssigned &&
                    <div className="w-full absolute top-0 z-30 rounded h-full bg-secondary border border-borderCard p-4 flex items-center">
                         <TeamCombobox
                            value={[]}
                            onChange={handleUpdateAssigned}
                            btnClass="w-[100%] justify-between border-none"
                            className="w-[300px] p-0"
                        />
                    </div>
                }
            </td>
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
            <td className="border-l border-r border-t border-sidebar-border/50 text-center cursor-pointer text-xs px-2">
                <div className="flex items-center w-[150px]">
                    <div className="w-[80%] rounded-full h-1 bg-todosecondary">
                        <div className="bg-blue-500 rounded-full h-1" style={{
                           width: time().toFixed(2) + '%'
                        }}>

                        </div>
                    </div>
                    <p className="text-xs">{time().toFixed(2)}%</p>
                </div>
            </td>
            
        </tr>
        </>
    )
}
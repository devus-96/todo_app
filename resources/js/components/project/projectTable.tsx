"use client"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { Menu } from "../custom/menu"; 
import { BookOpen, DoorOpen, MessageCircleDashed, Trash2, X } from "lucide-react"
import { StatusCombobox } from "../custom/statusCombobox";
import { PriorityCombobox } from "../custom/priorityCombox";
import { DateCombox } from "../custom/dateCombox";
import { ProjectType } from "@/types";
import { checkDateValues } from "@/lib/global";
import { useForm } from "@inertiajs/react";
import { Checkbox } from "../ui/checkbox";

export const dropMenuTab = [
    {title: 'Add comment', icon: MessageCircleDashed},
    {title: 'Open', icon: DoorOpen},
    {title: 'Delete task', icon: Trash2}
]

export const ProjectTable = ({
    item, 
    setProjects,
    index,
    projects,
    setError,
    teamId,
    companyId,
    setSelected,
}:{
        item: ProjectType, 
        setProjects: Dispatch<SetStateAction<ProjectType[]>>,
        index: number,
        projects: ProjectType[],
        setError: Dispatch<SetStateAction<string[]>>,
        teamId: number | undefined,
        companyId: number | undefined,
        setSelected: Dispatch<SetStateAction<number[]>>
    }) => {
    //useState
    const [updateName, setUpdateName] = useState(false)
    const { data, setData, patch, errors, reset } = useForm<Required<any>>();
    const [indexes, setIndexes] = useState<number | null>(null)
    const [checked, setChecked] = useState(false)

    function handleChange (value: string, key: string) {
        setData({name: value})
        setIndexes(index)
        setProjects((prev: ProjectType[]) => {
            let newTab = [...prev]
            const newValue = {[key]: value}
            newTab[index] = {...newTab[index], ...newValue}
            return newTab
        })
    }

    function handleUpdateStatus (currentStatus: "not started" | "paused" | "canceled" | "in progress" | "done") {
        setData({state: currentStatus})
        setIndexes(index)
        setProjects((prev: ProjectType[]) => {
            let newTab = [...prev]
            const newValue = {state: currentStatus}
            newTab[index] = {...newTab[index], ...newValue}
            return newTab
        })
    }

    function handleUpdatePriority (currentPriority: "high" | "medium" | "low") {
        setData({priority: currentPriority})
        setIndexes(index)
        setProjects((prev: ProjectType[]) => {
            let newTab = [...prev]
            const newValue = {priority: currentPriority}
            newTab[index] = {...newTab[index], ...newValue}
            return newTab
        })
    }

    function handleUpdateStartdate (currentDate: string) {
        try {
            checkDateValues(currentDate, projects[index].deadline)
            setData({start_date: currentDate})
            setIndexes(index)
            setProjects((prev: ProjectType[]) => {
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
            checkDateValues(projects[index].start_date, currentDate)
            setData({deadline: currentDate})
            setIndexes(index)
            setProjects((prev: ProjectType[]) => {
                let newTab = [...prev]
                const newValue = {deadline: currentDate}
                newTab[index] = {...newTab[index], ...newValue}
                return newTab
            })
        } catch (error: unknown) {
            console.log(error)
            if (error instanceof Error) {
                setError((prev) => [...prev, error?.message]);
            }
        }
    }

    useEffect(() => {
        if (companyId && teamId) {
            if (indexes !== null) {
                patch(`/user/project/update/${projects[indexes].id}`)
            }
        } else {
            if (indexes !== null) {
                patch(`company/${companyId}/team/${teamId}/projects/${projects[indexes].id}`)
            }
        }
    }, [data, indexes, companyId, teamId])

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
                    <div className="w-full flex items-center px-4 group">
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
                        <div className="flex items-center justify-between w-full">
                            <p onClick={() => {setUpdateName(true)}} className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">{item.name}</p>
                            <div onClick={() => {
                                window.location.assign(`/user/projects/${projects[index].id}`)
                            }} className="text-xs opacity-0 cursor-pointer group-hover:opacity-100 h-8 w-fit flex items-center px-4 space-x-1 rounded hover:bg-todosecondary hover:text-textprimary2">
                                <BookOpen size={16} /><p>open</p>
                            </div>
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
            {(teamId !== undefined && companyId !== undefined) &&
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
            <td className="border-r border-t flex justify-center items-center text-center cursor-pointer text-xs">
                <div className="flex justify-center items-center w-[200px]">
                    <div className="w-[80%] rounded-full h-2 bg-todosecondary">
                        <div className="bg-blue-500 rounded-full h-2" style={{
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
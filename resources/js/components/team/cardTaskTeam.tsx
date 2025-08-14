"use client"
import React from "react"
import clsx from "clsx"
import { format } from "date-fns"
import { Todo } from "@/types"
import { DropdownMenu2 } from "../custom/dropdownMenu" 
import { dropMenuTab } from "../user/user-task-table"
import { SheetTask } from "../custom/sheet" 

export const CardTasksTeam = ({
    item,
}:{
    item: Todo, 
}) => {
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
        <SheetTask data={item}>
        <div className="w-full flex flex-col rounded-xl text-sidebarText my-1 cursor-pointer">
            <div className={clsx("flex flex-col w-full p-4 rounded-xl", {
                "bg-[rgba(161,161,170,.1)] text-[#a1a1aa]" : item.state.toLowerCase() === 'not started',
                "bg-[rgba(52,211,153,.1)] text-[#34d399]" : item.state.toLowerCase() === 'done' ,
                "bg-[rgba(251,191,36,.1)] text-[#fbbf24]" : item.state.toLowerCase() === 'in progress',
                "bg-[rgba(250,96,116,.1)] text-[#fa6074]" : item.state.toLowerCase() === 'waitting',
                'bg-[rgba(215,130,255,.1)] text-[#d782ff]' : item.state.toLowerCase() === 'paused'
            })}>
            <div className="flex justify-between item-center w-full capitalize">
                <div className="w-[75%]">
                    <p className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold">{item.name}</p>
                </div>
                <div className=" text-sidebarText rounded flex-center cursor-pointer">
                    <DropdownMenu2 title="Sort" table={dropMenuTab} btnClass="rounded w-4 h-5 cursor-pointer border-none" data={item} />
                </div>
            </div>
            {item.description &&
            <div className="w-full h-[50px] overflow-hidden">
                <p className="text-xs text-ellipsis font-light">{item.description}</p>
            </div>
            }
            <div className="mb-4">
                <p className="font-semibold">Progress</p>
                <div className="flex items-center space-x-1">
                    <div className="w-[80%] rounded-full h-4 bg-todosecondary">
                        <div className={clsx("rounded-full h-4", {
                             "bg-[rgba(161,161,170)]" : item.state.toLowerCase() === 'not started',
                             "bg-[rgba(52,211,153)]" : item.state.toLowerCase() === 'done' ,
                             "bg-[rgba(251,191,36)]" : item.state.toLowerCase() === 'in progress',
                             "bg-[rgba(250,96,116)]" : item.state.toLowerCase() === 'waitting',
                             'bg-[rgba(215,130,255)]' : item.state.toLowerCase() === 'paused'
                        })} style={{
                            width: time().toFixed(2) + '%'
                        }}>

                        </div>
                    </div>
                    <p className="text-xs">{time().toFixed(2)}%</p>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <div onClick={(e) => {
                   
                }} className={clsx("w-fit flex-center px-4 text-xs my-2 text-gray-800 rounded-full", {
                    "bg-[rgba(161,161,170,.5)]" : item.priority.toLowerCase() === 'low',
                    "bg-[rgba(215,130,255,.5)]" : item.priority.toLowerCase() === 'medium',
                    "bg-[rgba(250,96,116,.5)]" : item.priority.toLowerCase() === 'high',
                })}>
                    <p>{item.priority}</p>
                </div>
                <div onClick={(e) => {
                    
                }} className={clsx("flex-center px-2 text-xs text-gray-800 rounded-full", {
                    "bg-[rgba(161,161,170,.5)]" : item.state.toLowerCase() === 'not started',
                    "bg-[rgba(52,211,153,.5)]" : item.state.toLowerCase() === 'done',
                    "bg-[rgba(251,191,36,.5)]" : item.state.toLowerCase() === 'in progress',
                    "bg-[rgba(250,96,116,.5)]" : item.state.toLowerCase() === 'waitting',
                    'bg-[rgba(215,130,255,.5)]' : item.state.toLowerCase() === 'paused'
                })}>
                    <p>{item.state}</p>
                </div>
            </div>
            {item.assigned &&
                <div className="relative flex my-4">
                    {item.assigned.map((menber, index) => (
                        <div key={index} className={clsx("text-inherit h-[24px] w-[24px] rounded-full flex items-center justify-center font-bold capitalize", {
                            "bg-[rgba(161,161,170,.5)]" : item.state.toLowerCase() === 'not started',
                            "bg-[rgba(52,211,153,.5)]" : item.state.toLowerCase() === 'done',
                            "bg-[rgba(251,191,36,.5)]" : item.state.toLowerCase() === 'in progress',
                            "bg-[rgba(250,96,116,.5)]" : item.state.toLowerCase() === 'waitting',
                            'bg-[rgba(215,130,255,.5)]' : item.state.toLowerCase() === 'paused'
                        })}>
                            <p>{menber?.slice(0, 1)}</p>
                        </div>
                    ))}
                </div>
            }
            <div>
                <div className="flex items-center text-xs"><p>{format(item.deadline, 'dd/MM/yyy')}</p>-<p>{format(item.deadline, 'dd/MM/yyy')}</p></div>
            </div>
            {item.start_time &&
                <div className="flex items-center text-xs">
                    <p>{item.start_time}</p>-<p>{item.end_time}</p>
                </div>
            }
            
        </div>
        {!item.name &&
            <div className="">
                <p>no task yet</p>
            </div>
        }
        </div>
    </SheetTask>
    )
}
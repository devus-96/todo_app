'use client'
import React, { useRef } from "react"
import { CardTasks } from "./cardtask"
import { Plus } from "lucide-react"
import { ProjectType, Todo } from "@/types"
import { SheetTask } from "./sheet"
import { CardTasksTeam } from "../team/cardTaskTeam"


export function BoardTasks ({
    tasks,
    type='user',
}:{
    type?: 'user' | 'team'
    tasks: Todo[] | ProjectType[],
}) {
        const statesRef = useRef(["not started",'in progress','waitting',"paused"])
         const tabStates = useRef<string[]>([])
        return (
        <div className="w-full overflow-x-auto px-8 scrollbar-hide mt-8">
            <div className="w-[1500px] grid grid-cols-5 gap-4">
            {statesRef.current.map((state, index) => (
                <div key={index} className="flex flex-col h-fit bg-todosecondary rounded-xl p-4 mb-4 text-sidebarText">
                    <div className="w-full text-xl font-bold capitalize mb-8">
                        <p>{state}</p>
                    </div>
                    {tasks.map((item: any , index: number) => {
                        tabStates.current = [...tabStates.current, item.state]
                        return (
                            <>
                            {type === 'user' &&
                                <div key={index}>
                                    {item.state === state &&
                                        <CardTasks item={item} />
                                    }
                                </div>
                            }
                            {type === 'team' &&
                            <div key={index}>
                                {item.state === state &&
                                    <CardTasksTeam item={item} />
                                }
                            </div>
                            }
                            </>
                        )
                    })}
                    <SheetTask>
                        <div  
                        className="flex items-center text-sm space-x-4 border rounded py-2 px-2 cursor-pointer border-borderCard">
                            <Plus size={16} /> <p>New task</p>
                        </div>
                    </SheetTask>
            </div>
            ))}
        </div>
        </div>  
        )
}
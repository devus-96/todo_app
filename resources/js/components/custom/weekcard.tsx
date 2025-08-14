import { Todo } from "@/types" 
import clsx from "clsx"
import React, { Dispatch, SetStateAction } from "react"
import {differenceInDays, format} from "date-fns"
import { Check, X } from "lucide-react"
import { SheetTask } from "./sheet"

export const WeekCard = ({
    item, 
    height, 
    top, 
    str_date,
    setTasks,
    index
}: {
    item:Todo, 
    height:number, 
    top: number, 
    str_date: string,
    setTasks: Dispatch<SetStateAction<Todo[]>>,
    index: number
}) => {
    const thisTodoIsInTheFuture = new Date().getTime() < new Date(`${str_date}T${item.end_time}.000Z`).getTime()
    const thisTaskIsInPresent = (new Date(`${str_date}T${item.start_time}.000Z`).getTime() < new Date().getTime()) && (new Date(`${str_date}T${item.end_time}.000Z`).getTime() > new Date().getTime())

    return (
        <SheetTask data={item}>
            <div className={clsx("absolute cursor-pointer overflow-hidden bg-[#333]/50 text-todoprimary2 p-2",{
                "bg-green-300/50": item.type === 'habit' && item.havedoit?.includes(str_date),
                "bg-red-300/50": item.type === 'habit' && (!item.havedoit?.includes(str_date) && !thisTodoIsInTheFuture),
                "bg-orange-300/50": item.type === 'task' && thisTaskIsInPresent
            })} style={{
                width: "95%",
                height: `${59 * height}px`,
                marginTop: `${top}px`,
                marginRight: 5+"px",
                marginBottom: 5+"px",
                borderRadius: 8+"px"
            }}>
                <p className="capitalize text-xs overflow-hidden text-ellipsis whitespace-nowrap">{item.name}</p>
                <p className="text-xs">{item.start_time}-{item.end_time}</p>
                {item.start_date !== item.deadline &&
                <div className="flex items-center space-x-2 h-[40%]">
                    {(str_date === format(new Date(), 'yyyy-MM-dd') && thisTodoIsInTheFuture)  &&
                        <div onClick={() => {
                            setTasks((prev) => {
                                const newTab = [...prev]
                                let newHasdoit = []
                                if (newTab[index].havedoit) {
                                    newHasdoit = [...newTab[index].havedoit, str_date]
                                } else {
                                    newHasdoit = [str_date]
                                }
                                newTab[index].havedoit = newHasdoit
                                return newTab
                            })
                        if (item.havedoit) {
                            item.havedoit = [...item.havedoit, str_date]
                        }
                        }} className={clsx("w-[18px] h-[18px] flex items-center justify-center border border-textprimary2 rounded-full", {
                        
                        })}>
                        </div>
                    }
                    { item.type === 'habit' && item.havedoit?.includes(str_date) && <Check size={12} />}
                    { item.type === 'habit' && (!item.havedoit?.includes(str_date) && !thisTodoIsInTheFuture) && <X size={12} />}
                    <p className="text-xs text-center">Day {differenceInDays(new Date(str_date), new Date(item.start_date))+1}</p>
                </div>
                }
            </div>
        </SheetTask>
    )
}
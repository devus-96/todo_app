"use client"
import React, { Dispatch, SetStateAction } from "react"
import { hours, hoursOfDays, hoursOfDays2 } from "@/constant/global" 
import { weeksMin } from "@/constant/global" 
import { useManageCalendar } from "@/hooks/useManageCalendar" 
import clsx from "clsx"
import { eachDayOfInterval, format } from "date-fns"
import { useRef } from "react"
import { WeekCard } from "./weekcard" 
import { Todo } from "@/types"
import { getDate, getMonth, getYear, set } from "date-fns";
import { ChevronLeft, ChevronRight} from 'lucide-react';
import { SheetTask } from "./sheet"

export function Week (
    {
        date = new Date(), 
        data,
        setDate,
        setTasks
    }: {
        date:Date, 
        data: Todo[] | undefined,
        setDate: Dispatch<SetStateAction<Date>>,
        setTasks: Dispatch<SetStateAction<Todo[]>>
    }) {
    const {
        converToMinute,
        converToTime,
        dayOfWeek,
        converToText,
        convertEachDay
    } = useManageCalendar(date)
    const currentDate = useRef<Date>(new Date())
    const enter = converToText(hoursOfDays)
    
    return (
        <section className="mt-8 ml-8">
            <div className="flex items-center space-x-4 mb-8">
                <div onClick={() => {
                    const newDate = set(date, {year: getYear(date), month: getMonth(date), date: getDate(date) - 1})
                    setDate(newDate)
                }} className="p-2 border border-sidebarText rounded text-sidebarText cursor-pointer hover:border-sidebarText/10">
                    <div><ChevronLeft size={16}/></div>
                </div>
                <div onClick={() => {
                    const newDate = set(date, {year: getYear(date), month: getMonth(date), date: getDate(date) + 1})
                    setDate(newDate)
                }} className="p-2 border border-sidebarText rounded text-sidebarText cursor-pointer hover:border-sidebarText/10">
                    <div className=""><ChevronRight size={16}/></div>
                </div>  
            </div>
            <div className="overflow-x-hidden">
                <div className="grid grid-cols-7  items-center justify-center text-center pl-10 pr-4">
                    {dayOfWeek.map((item, index) => (
                        <div key={index} className={clsx('flex flex-col items-center', 
                                {
                                    "text-todoterciary" :  format(currentDate.current, "dd/MM/yyyy")  === format(item, "dd/MM/yyyy"),
                                    "text-sidebarText" :  format(currentDate.current, "dd/MM/yyyy")  !== format(item, "dd/MM/yyyy")
                                })}>
                            <div className="text-3xl font-semibold">{`${item.getDate()}`}</div>
                            <p>{weeksMin[item.getDay()]}</p>
                        </div>
                    ))}
                </div> 
                <div className="w-full flex px-4 mb-4 relative">
                    <div className="flex flex-col justify-between col-span-1 text-start pl-2 text-sidebarText">
                        {hours.map((item, index) => (
                            <div key={index} className="h-[60px] flex text-start"><p className="mt-[-13px] text-xs">{item}</p></div>
                        ))}
                    </div>
                    <div className="w-full grid grid-cols-7 relative">
                        <div className="flex items-start absolute left-0 right-0 border border-borderCard" style={{
                                    top: `${60*(new Date().getHours()) + new Date().getMinutes()}px`
                                }}>
                                <div className="w-full h-[1px] bg-red-500"></div>
                        </div>
                        {dayOfWeek.map((day: Date, id) => (
                            <div key={id} className="w-auto grid grid-cols-1 relative">
                            {hoursOfDays2.map((time, index) => {
                                const data = {
                                    name: "",
                                    state: "not started" as "not started" | "paused" | "cancel" | "in progress" | "done",
                                    priority: "low" as "high" | "medium" | "low",
                                    description: "",
                                    start_time: `${time}`,
                                    end_time: `${hoursOfDays2[index+1]}`,
                                    start_date: format(day, 'yyyy-MM-ddd'),
                                    deadline: format(day, 'yyyy-MM-ddd'),
                                    havedoit: null,
                                    taskable_type: "Project"
                                   }
                                return (
                                <SheetTask key={index} data={data}>
                                    <div onClick={() => {
                                        console.log(time, enter[index+1])
                                    }} className={clsx("border-t-[.5px] border-r-[.5px] border-borderCard/20 w-full h-[60px] p-2 relative z-0 cursor-pointer hover:bg-todosecondary", {
                                            "opacity-0" : index === 24,
                                            "border-b-[.5px] border-borderCard" : index === 23
                                        })}>
                                    </div>
                                </SheetTask>
                                )
                            })}
                            {data && data.map((item, index) => {
                                let number = 0
                                let top = 0
                                const str_day = format(day, 'yyyy-MM-dd')
                                if (item.start_time && item.end_time)
                                top = converToTime(item.start_time)
                                if (item.start_time && item.end_time)
                                number = converToMinute(item.start_time, item.end_time)
                                const days = eachDayOfInterval({start: new Date(item.start_date), end: new Date(item.deadline)})
                                const tabDays = convertEachDay(days)
                                if (tabDays.includes(str_day)) {
                                return (
                                    <WeekCard 
                                    key={index} 
                                    item={item} 
                                    top={top} 
                                    index={index}
                                    height={number} 
                                    str_date={str_day} 
                                    setTasks={setTasks}
                                    />
                                )
                                }
                            })}
                            </div>
                        ))}
                    </div>
                </div>
        </div>
        </section>
    )
    
}
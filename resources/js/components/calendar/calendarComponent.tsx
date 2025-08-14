'use client'
import { useState } from "react"
import { Calendar } from "./calendar"
import { Todo } from "@/types"

export function CalendarPage ({data} : {data : Todo[]}) {
    const [currentDate, setCurrentDate] = useState(new Date())
   
    return <main className='w-full h-auto px-8'>
            <Calendar 
                value={currentDate} 
                onChange={setCurrentDate}
                className="w-full pb-4"
                cellsClass='text-right text-textprimary'
                divClassCells = "w-full min-h-[200px] h-full border border-textprimary py-2 cursor-pointer hover:bg-todoprimary/70"
                divClass='grid grid-cols-7 items-center justify-center text-center h-auto relative'
                labelClass='w-full grid grid-cols-7 pb-2 text-textprimary3 text-xs capitalize text-center'
                textColor='text-textprimary text-sm'
                data={data}
                setCurrentDate={setCurrentDate}
            />
    </main>
}

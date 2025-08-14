"use client"
import React, { useState }  from "react";
import clsx from "clsx";
import { Dispatch, SetStateAction, useContext } from "react";
import { CalendarNotice } from "./calendarNotice"; 
import { Todo } from "@/types";

interface Props {
    pastVerify: boolean
    time: number,
    handleClick: (time: number) => void
    isCurrentDate?:boolean
    futureVerify: boolean
    data?: Todo[]
    currentDate: Date,
    setCurrentDate?: Dispatch<SetStateAction<Date>>
    className?: string
    cellsClass? : string
  }

const Cell:React.FC<Props> =  ({
    pastVerify,
    time,
    handleClick,
    isCurrentDate,
    futureVerify,
    data,
    currentDate,
    setCurrentDate,
    className = 'flex flex-col select-none transition-colors min-h-[80px] h-auto ', 
    cellsClass = clsx(
      "pt-1 pb-1 w-full h-full cursor-pointer",
      {
        "bg-red-500" : isCurrentDate,
        "text-[#6b6b6b]" : pastVerify,
        "text-gray-200 hover:bg-[#6b6b6b] cursor-pointer" : futureVerify
      }
    )
}) =>  {
    const [tab, setTab] = useState<Todo[]>(data ? data : [])
   
    return (
        <div
          className={className}
        >
        <div
          key={time}
          onClick={() => {
            if (!pastVerify) {
              handleClick(time)
            }
            setCurrentDate && setCurrentDate(currentDate)
          }}
          className={cellsClass}
        >
          <p className="text-left text-sm font-medium ml-4">{time}</p>
            {data && 
             <div className="p-2">
                {tab.map((item, index) => {
                    return (
                      <CalendarNotice 
                        key={index}
                        index={index}
                        item={item}
                        currentDate={currentDate}
                        tab={tab}
                      />
                     )
                })}
             </div>
            }
        </div>
      </div>
    )
}



export default Cell
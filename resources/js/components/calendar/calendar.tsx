"use client"
import React from "react";
import { format,set,getYear,getMonth,
} from "date-fns";
import Cell from "./cell";
import { useCalendar } from "@/hooks/useCalendar"; 
import { weeksMin } from "@/constant/global"; 
import clsx from "clsx";
import { ChevronLeft, ChevronRight} from 'lucide-react';
import { Dispatch, SetStateAction } from "react";
import { Todo } from "@/types";
  
  type Props = {
    className?: string
    divClass?: string
    labelClass?: string
    divClassCells?: string
    btnClass?: string
    headerClass?: string
    textColor?: string
    cellsClass?: string
    data?: Todo[]
    value?: Date;
    onChange: (date: Date) => void;
    setCurrentDate?: Dispatch<SetStateAction<Date>>
  };
  
  export const Calendar: React.FC<Props> = ({ 
    className = 'w-[400px] rounded font-[family-name:var(--font-jetBrains-mono)]',
    divClass = 'grid grid-cols-7 items-center justify-center text-center',
    labelClass = 'w-full grid grid-cols-7 pb-2 text-white text-xs text-center mb-4',
    btnClass = 'w-8 h-8 rounded bg-gray-200 text-gray-800 flex items-center justify-center cursor-pointer',
    headerClass = 'w-fit flex justify-start space-x-2 text-white text-xs items-center py-8',
    cellsClass,
    divClassCells,
    data,
    value = new Date(), 
    onChange,
    setCurrentDate
  }) => {
    const {
      changeDate,
      lastDayOfMonth,
      firstDaysofNextMonth,
      setToPrev,
      setToNext,
      prevMonth,
      nextMonth,
      isPassed,
      isFuture,
      numDays

  } = useCalendar(value, onChange)

    return (
      <div className={className}>
        <div className={clsx(headerClass,{
            'hidden': false
        })}>
          <div onClick={prevMonth} className={btnClass}>
            <div><ChevronLeft size={16}/></div>
          </div>
          <div>{format(value, "ccc dd LLLL yyyy")}</div>
          <div onClick={nextMonth} className={btnClass}>
          <div className=""><ChevronRight size={16}/></div>
          </div>  
        </div>
        <div className={labelClass}>
                {weeksMin.map((day, index) => (
                    <p key={index}>{day}</p>
                ))}
          </div>

        <div className={divClass}
         style={{
          gridTemplateRows: 'repeat(auto-fit, minmax(200px, 1fr))'
        }} 
        >
          {lastDayOfMonth.reverse().map((time: number, index) => {
          const curr = set(new Date, {year: getYear(value), month: getMonth(value) - 1 , date: time})
          return (
            <Cell 
              key={index} 
              pastVerify={isPassed(time, curr)}  
              handleClick={setToPrev} 
              time={time} 
              futureVerify={isFuture(time, curr)}
              className={divClassCells}
              cellsClass={cellsClass}
              currentDate={curr}
              data={data}
              setCurrentDate={setCurrentDate}
            />
          )
        })}
  
          {Array.from({ length: numDays }).map((_, index) => {
            const time = index + 1;
            const isCurrentDate = time === value.getDate();
            const curr = set(new Date, {year: getYear(value), month: getMonth(value) , date: time})
  
            return (
              <Cell 
                key={index} 
                pastVerify={isPassed(time, curr)} 
                handleClick={changeDate} time={time} 
                isCurrentDate={isCurrentDate} 
                futureVerify={isFuture(time, curr)}
                className={divClassCells}
                cellsClass={cellsClass}
                currentDate={curr}
                data={data}
                setCurrentDate={setCurrentDate}
              />
            );
          })}
  
        {firstDaysofNextMonth.map((time: number, index) => {
          const curr = set(new Date, {year: getYear(value), month: getMonth(value) + 1 , date: time})
          return (
            <Cell 
              key={index} 
              pastVerify={isPassed(time, curr)} 
              handleClick={setToNext} time={time} 
              futureVerify={isFuture(time, curr)}
              className={divClassCells}
              cellsClass={cellsClass}
              currentDate={curr}
              data={data}
              setCurrentDate={setCurrentDate}
            />
          )
        })}
          </div>
        </div>
    );
  };
import { Todo } from "@/types"
import clsx from "clsx"
import { format } from "date-fns"
import { ArrowRight } from "lucide-react"

export const CalendarNotice = ({
    item,
    currentDate,
    index,
    tab,
  }: {
    item: Todo,
    currentDate: Date,
    index: number,
    tab: Todo[],
  }) => {

    const condition = new Date(currentDate).getTime() <= new Date(item.deadline).getTime()
    const condition2 = new Date(currentDate).getTime() >= new Date(item.start_date).getTime()

    return  (
      <>

          {(condition && condition2) &&
          <div onClick={(e) => {
            e.stopPropagation()
            const newTab = {data: tab[index]}
          }}
           className={clsx("flex  items-center text-xs text-start mb-2 cursor-pointer bg-todosecondary  text-textprimary rounded p-2")}
           
           >
            <div>
              <div className="w-[100px]"><p className="text-xs overflow-hidden text-ellipsis whitespace-nowrap">{item.name}</p> </div>
              <div className="flex items-center flex-wrap">
                <p>{format (item.start_date, 'dd/MM/yyyy')}</p>
                <ArrowRight size={10}/>
                <p>{format (item.deadline, 'dd/MM/yyyy')}</p>
              </div>
              <div onClick={(e) => {
                }} className={clsx("w-fit flex-center text-xs text-gray-800 rounded-full", {
                    "bg-[rgba(161,161,170,.5)]" : item.state.toLowerCase() === 'not started',
                    "bg-[rgba(52,211,153,.5)]" : item.state.toLowerCase() === 'done',
                    "bg-[rgba(251,191,36,.5)]" : item.state.toLowerCase() === 'in progress',
                    "bg-[rgba(250,96,116,.5)]" : item.state.toLowerCase() === 'waitting',
                    'bg-[rgba(215,130,255,.5)]' : item.state.toLowerCase() === 'paused'
                })}>
                    <p>{item.state}</p>
                </div>
            </div>
          </div>}

         
      </>
      
    )
  }
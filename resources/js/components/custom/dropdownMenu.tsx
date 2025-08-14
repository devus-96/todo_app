import { Button } from "@/components/ui/button"
import { Filter, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { LucideIcon, LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";
import { SheetTask } from "./sheet";
import { Todo } from "@/types";

interface tabdropMenu {
  title: string,
  values: string[]
}

export function DropdownMenu1({
  title,
  table,
  btnClass,
  priorityFilter,
  stateFilter
}:{
  title: string,
  table: tabdropMenu[]
  btnClass?: string,
  priorityFilter:  (value: "high" | "medium" | "low") => void,
  stateFilter: (value: "not started" | "paused" | "in progress" | "done" | "canceled") => void,
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={btnClass}><Filter size={16} /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table.map((item, index) => (
            <DropdownMenuGroup key={index}>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>{item.title}</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {item.values.map((value, i) => (
                    <DropdownMenuItem key={i} onClick={() => {
                      if (item.title === 'Priority') {
                        const priority = value.toLowerCase() as "high" | "medium" | "low"
                        priorityFilter(priority)
                      } else if (item.title === 'State') {
                        const state = value.toLowerCase() as "not started" | "paused" | "in progress" | "done" | "canceled"
                        stateFilter(state)
                      }
                    }}>{value}</DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

type tabType = {
  icon: LucideIcon;
  title: string
}

type IconProps = LucideProps & {
  title: string,
  table: tabType[]
  btnClass?: string
  data: Todo
};


export function DropdownMenu2({
  title,
  table,
  btnClass,
  data
}: IconProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" className={btnClass}>
          <MoreVertical size={16} />
        </Button>
        </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table.map((item, index) => (
          <DropdownMenuItem key={index}>
            {item.title === 'Open' ? 
              <SheetTask task={data}>
                <div className="flex items-center space-x-2 cursor-pointer w-full">
                  <item.icon />
                <p>{item.title}</p>
            </div>
              </SheetTask>
            : 
            <div onClick={() => {
            }} className={cn("flex items-center space-x-2 cursor-pointer w-full", item.title === 'Delete task' && "hover:text-red-500")}>
              <item.icon />
              <p>{item.title}</p>
            </div>
            }
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

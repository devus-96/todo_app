"use client"
import { ClockAlert, Edit, MessageCircle, Search, SquareCheck, Target, Trash2 } from "lucide-react"
import { useState } from "react"
import { differenceInDays} from "date-fns"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import clsx from "clsx"
import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"
import { BreadcrumbItem } from "@/types"
import { usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { fakeProjects, faketasks } from "@/constant/global"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/user/',
    },
];

const ProjectCard = ({
  name,
  numtasks,
  percent,
  diff
}:{
  name: string
  numtasks: number
  percent: number
  diff: number
}) => {
  return (
    <div className="relative bg-todosecondary text-sidebarText w-[180px] h-[180px] rounded-xl cursor-pointer">
      <div className="relative bg-gray-800 h-[50px] rounded-tl-xl rounded-tr-xl">
        <Target className="absolute bottom-[-12px] left-4" color="#fff"/>
      </div>
      <div className="px-1">
        <div className="mt-6 mb-2">
          <p className="text-sidebarText overflow-hidden text-ellipsis whitespace-nowrap">{name}</p>
          <p className="text-xs">{numtasks > 1 ? `${numtasks} Tasks` : `${numtasks} Task`}</p>
        </div>
        <div className="flex items-center">
              <div className="w-[80%] rounded-full h-2 bg-secondary">
                  <div className="bg-btnColor w-[10%] rounded-full h-2" style={{
                      width: percent.toFixed(2) + '%'
                  }}>

                  </div>
              </div>
              <p className="text-xs">{percent.toFixed(2)}%</p>
          </div>
          <div>
            <p className="text-xs">{diff} days</p>
          </div>
      </div>
    </div>
  )
}

function Home () {
  const { auth } = usePage<SharedData>().props;
  const [projectInfos, setProjectInfo] = useState<any[] | null>(fakeProjects)
  const [tasks, setTask] = useState<any[] | null>(faketasks)

    function time (item: any) {
      const str_startdate = new Date(item.start_date)
      const str_deadline = new Date(item.deadline)
      const now = new Date()
      const percent = (now.getTime() - str_startdate.getTime()) / (str_deadline.getTime() - str_startdate.getTime())
      if (now.getTime() >= str_deadline.getTime()) return 100
      if (now.getTime() < str_startdate.getTime()) return 0
      return percent * 100
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Task" />

        <section className="w-full pb-8 bg-todoprimary min-h-screen">
        <div className="w-full flex justify-between px-8 py-8">
            <h1 className="text-3xl text-textprimary2 font-bold">Hello, { auth.user.name}</h1>
            <div className="flex items-center space-x-4 bg-todosecondary rounded-full">
                <div className="flex items-center bg-todosecondary shadow-sm justify-between px-2 py-1.5 space-x-2 rounded-full text-textprimary">
                  <Search size={16} />
                  <input 
                      type="text" 
                      className="w-[90%] outline-none bg-todosecondary placeholder:text-textprimary2 placeholder:text-xs"
                      placeholder="search a task"
                      onChange={() => {}}
                  />
              </div>
              <div className="w-[30px] h-[30px] rounded-full bg-gray-400"></div>
            </div>
            </div>
            <div className="px-12 pb-8 w-full">
                <h1 className="text-textprimary mb-4 !text-base">Important Projects</h1>
                <div className="flex justify-center space-x-4 w-full">
                {projectInfos ? 
                    <Carousel className="w-[95%]">
                    <CarouselContent>
                    {projectInfos.map((item, index) => (
                        <CarouselItem key={index} className="basis-1/5"> {/* <-- Ajoutez la classe 'basis-full' ici */}
                        <ProjectCard name={item.name} numtasks={item.numb_taches} percent={time(item)} diff={differenceInDays(item.deadline, item.start_date)} />
                        </CarouselItem>
                    ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
                : 
                <div className="">
                    <p className="text-sidebarText">no project created</p>
                </div>
                }
                </div>
            </div>

            <div className="px-8 flex items-start">
                <div className="w-1/2 h-[90%]">
                    <p className="ml-2 text-textprimary">Task schedule today</p>
                    <div className="w-full min-h-[200px] bg-todosecondary rounded-lg p-4">
                        <div className="w-full">

                            <div className="w-full flex items-start justify-between border border-textprimary rounded p-4">
                              <Checkbox className="border-white w-6 h-6" />
                              <div className="w-[70%] flex flex-col items-start text-textprimary ">
                                <p className="text-lg">{tasks[0]?.name}</p>
                                <div className="w-fit flex items-center space-x-4">
                                  <div className="flex items-center text-xs space-x-2">
                                    <ClockAlert size={12} />
                                    <p>{tasks[0].start_date}</p>
                                  </div>
                                  <div className="flex items-center text-xs space-x-2">
                                    <MessageCircle size={12} />
                                    <p>0</p>
                                  </div>
                                </div>
                                <div className="flex items-center text-xs">
                                    {tasks[0].start_time && <p>{tasks[0].start_time}-</p>}
                                    {tasks[0].end_time && <p>{tasks[0].end_time}</p>}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div onClick={(e) => {
                                        
                                    }} className={clsx("w-fit flex-center px-4 text-xs my-2 text-gray-800 rounded-full", {
                                        "bg-[rgba(161,161,170,.5)]" : tasks[0].priority.toLowerCase() === 'low',
                                        "bg-[rgba(215,130,255,.5)]" : tasks[0].priority.toLowerCase() === 'medium',
                                        "bg-[rgba(250,96,116,.5)]" : tasks[0].priority.toLowerCase() === 'high',
                                    })}>
                                        <p>{tasks[0].priority}</p>
                                    </div>

                                </div>
                              </div>
                              
                              <div className="flex space-x-2">
                                <Button className="flex items-center justify-center bg-todoprimary cursor-pointer font-normal border-none text-sm text-textprimary2 h-8 w-8 !rounded">
                                    <Edit className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
                                </Button>
                                <Button className="flex items-center justify-center bg-todoprimary cursor-pointer font-normal border-none text-sm text-textprimary2 h-8 w-8 !rounded">
                                    <Trash2 className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
                                </Button>
                              </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                    <div className="w-1/2 h-[90%] px-12 space-y-2 ">
                        <p className="ml-2 text-textprimary">Important tasks</p>
                        <div className="w-full min-h-[200px] bg-todosecondary rounded-lg p-4 space-y-2 text-textprimary">
                          {tasks ? tasks.filter((item) => item.priority === 'high').map((item, index) => (
                          <div key={index} className="flex px-4 py-1 items-center bg-secondary justify-between text-sidebarText rounded-lg">
                              <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 border-borderCard rounded flex items-center justify-center">
                                  <SquareCheck />
                              </div>
                              <div className="">
                                  <p>{item.name}</p>
                                  <p className="text-xs text-sidebarText/25">{item.start_date}-{item.deadline}</p>
                              </div>
                              </div>
                              <div className={clsx("flex-center px-4 py-1 text-xs text-gray-800 rounded-full", {
                                      "bg-[#a1a1aa]" : item.priority.toLowerCase() === 'low',
                                      "bg-[#a78bfa]" : item.priority.toLowerCase() === 'medium',
                                      "bg-[#f87171]" : item.priority.toLowerCase() === 'high',
                                  })}>
                                  {item.priority}
                              </div>
                          </div>
                          )) : <p>no tasks</p>}
                        </div>
                    </div>
            </div>
    </section>
    
    </AppLayout>
    
  )
}

export default Home

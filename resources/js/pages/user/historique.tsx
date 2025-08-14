"use client"

import { Commontable } from "@/components/custom/commontable"
import { DropdownMenu1 } from "@/components/custom/dropdownMenu"
import { HistoryAccordion } from "@/components/custom/historyAccordion"
import { HistoriqueTable } from "@/components/custom/historyTable"
import { Button } from "@/components/ui/button"
import { tasksJson } from "@/constant/fakejson"
import { dropMenuTabHistory } from "@/constant/global"
import { userstasksHis } from "@/constant/task"
import AppLayout from "@/layouts/app-layout"
import { BreadcrumbItem, Todo } from "@/types"
import { Head } from "@inertiajs/react"
import clsx from "clsx"
import { History, Search } from "lucide-react"
import React, { useRef, useState } from "react"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Historique',
        href: '/user/historique',
    },
];

const dropTypeHistory = [
    {
        title: "Tasks",
        value: 'task'
    },
    {
        title: "Habits",
        value: 'habit'
    },
    {
        title: "Projets",
        value: 'Projet`'
    },
]



function HistoryPage () {

    const [filterType, setFilterType] = useState<'Projet' | 'task' | 'habit'>('task')
    const [historiqueData, setHistoriqueData] = useState<Todo[]>(tasksJson)
    const tabDateTask = useRef<string[]>([])

    for (let i = 0; i <= historiqueData.length - 1; i++) {
        if (historiqueData[i].finish_at) {
            const data = historiqueData[i].finish_at as string
            if (!tabDateTask.current.includes(data)) {
                tabDateTask.current = [...tabDateTask.current, data]
            }
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="history" />
            <div className="w-full pb-8 bg-todoprimary">
            <section>
                <div className="flex items-center text-3xl text-sidebarText space-x-4 px-4 my-4">
                    <History /><p>History</p>
                </div>
                <div className="w-full flex justify-between border-b border-borderCard px-4 py-2 gap-4">
                    <div className="w-fit flex items-center space-x-2">
                        {dropTypeHistory.map((item, index) => (
                            <Button 
                                onClick={() => setFilterType(() => item.value as 'Projet' | 'task' | 'habit')} 
                                key={index} 
                                className={clsx("rounded bg-todosecondary cursor-pointer text-textprimary text-xs hover:bg-todoterciary hover:text-white", {
                                    'bg-todoterciary text-white' : filterType === item.value
                            })}>{item.title}</Button>
                        ))}
                    </div>
                    <div className="flex items-center text-sidebarText space-x-4">
                        <div>
                            <DropdownMenu1 
                                title="Sort" 
                                table={dropMenuTabHistory} 
                                btnClass="rounded border-none" 
                                priorityFilter={ (value: "high" | "medium" | "low") => {}}
                                stateFilter={(value: "not started" | "paused" | "cancel" | "in progress" | "done" | "canceled") => {}}
                            />
                        </div>
                         <div className="flex items-center bg-todosecondary text-sidebarText rounded-full px-4 py-2 space-x-4">
                            <Search size={16} />
                            <input className="w-[200px] text-sm outline-none" type="search" name="search" placeholder="Search"/>
                        </div>
                        <Button className="w-fit px-2 rounded cursor-pointer text-white bg-todoterciary">Restore</Button>
                    </div>
                </div>
               {filterType === 'task' &&
               <>
                {tabDateTask.current.map((item, index) => (
                    <HistoryAccordion dateLabel={item} key={index}>
                        <Commontable tabHeader={userstasksHis}>
                            {historiqueData.filter((task) => task.finish_at === item).map((tabItem, index) => (
                                <HistoriqueTable item={tabItem} key={index} />
                            ))}
                        </Commontable>
                    </HistoryAccordion> 
                ))}
               </>
               }
            </section>
        </div>
        </AppLayout>
        
    )
}

export default HistoryPage
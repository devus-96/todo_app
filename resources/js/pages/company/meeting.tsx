import { Button } from "@/components/ui/button";
import TeamLayout from "@/layouts/team-layout";
import { BreadcrumbItem, MeetingType } from "@/types";
import { Head } from "@inertiajs/react";
import { Notebook, Plus, Search } from "lucide-react";
import { DateFilterCombox } from "@/components/custom/dateFilterCombox";
import { useEffect, useMemo, useRef, useState } from "react";
import { meetingsTeamJson } from "@/constant/fakejson";
import { SheetMeeting } from "@/components/team/sheetMeeting";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { format } from "date-fns";
import { MeetingAccordion } from "@/components/team/meetingsAccordion";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'meeting',
        href: '/team/meeting',
    },
];


export default function Meeting () {
    const [meetings, setMeetings] = useState<MeetingType[]>(meetingsTeamJson)
    const [filterDate, setFilterDate] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [views, setViews] = useState<string>("mettings");
    const topicsColor = ['#34d399', '#fbbf24', '#fa6074', '#d782ff']
    const tabTopicsRef = useRef<string[]>([])
    const meetingRef = useRef<MeetingType[]>(meetingsTeamJson as MeetingType[])

    const handleDateFilterChange = (value: string) => {
        setFilterDate(value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    for (let i = 0; i <= meetings.length - 1; i++) {
        const data = meetings[i].topics
        if (!tabTopicsRef.current.includes(data)) {
            tabTopicsRef.current = [...tabTopicsRef.current, data]
        }
    }

    useMemo(() => {
            let currentTodos = meetingRef.current; // Start with all meetings
    
            // 1. Filtrage par terme de recherche intelligent
            if (searchTerm) {
                const lowercasedSearchTerm = searchTerm.toLowerCase();
                currentTodos = currentTodos.filter((todo: MeetingType) => {
                    // Rendre le nom de la tâche en minuscules pour la comparaison
                    const lowercasedName = todo.name.toLowerCase();
                    // Vérifier si le terme de recherche est inclus n'importe où dans le nom
                    return lowercasedName.includes(lowercasedSearchTerm);
                });
            }

            // 2. Filtrage par date
            if (filterDate !== null) {
                currentTodos = currentTodos.filter(todo => todo.schedule_at === filterDate);
            }  
            
            setMeetings(currentTodos)
        }, [searchTerm, filterDate]); 
    return (
        <TeamLayout breadcrumbs={breadcrumbs}>
            <Head title="Task" />
            <div className="flex items-center text-3xl text-textprimary space-x-4 px-8 my-4">
                <Notebook /><p>Meetings</p>
            </div>
            <div className="w-full flex justify-between items-center px-8 mt-8 border-b py-2">
                <div className="flex items-center space-x-2">
                    <SheetMeeting>
                        <Button className="w-fit px-2 rounded cursor-pointer text-white bg-todoterciary">
                            New
                        </Button>
                    </SheetMeeting>
                    <Button
                        variant="ghost"
                        id="date"
                        onClick={() => setFilterDate(null)}
                        className="font-normal w-fit cursor-pointer border-none text-textprimary2 text-sm bg-todosecondary shadow-sm rounded"
                    >All meetings</Button>
                </div>
                <div className="flex items-center text-sidebarText space-x-4 ">
                    <DateFilterCombox className="bg-todosecondary shadow-sm rounded" onChange={handleDateFilterChange}/>
                    <Select
                        value={views} 
                        onValueChange={setViews}
                    >
                        <SelectTrigger className="w-[180px] rounded-md border-none cursor-pointer text-textprimary2 bg-todosecondary shadow-sm">
                            <SelectValue placeholder="views" />
                        </SelectTrigger>
                        <SelectContent className="bg-todosecondary rounded-md shadow-lg py-1 z-10">
                            <SelectItem value="mettings">mettings</SelectItem>
                            <SelectItem value="List by topics">List by topics</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="flex items-center bg-todosecondary shadow-sm justify-between px-2 py-1.5 space-x-2 rounded text-textprimary">
                        <Search size={16} />
                        <input 
                            type="text" 
                            className="w-[90%] outline-none bg-todosecondary placeholder:text-textprimary2 placeholder:text-xs"
                            placeholder="search a task"
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
            </div>
            {views === 'mettings' &&
            <section className="text-textprimary px-8">
                {meetings.map((item, index) => (
                <SheetMeeting key={index} data={item}>
                    <div key={index} className="w-full flex items-center justify-between p-2 cursor-pointer hover:bg-primary/10">
                        <div className="capitalize font-semibold">
                            <p>{item.name}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="p-1 rounded" style={{
                                background: `${topicsColor[Math.floor(Math.random() * 4)]}`
                            }}>
                                <p className="text-black text-xs">{item.topics}</p>
                            </div>
                            
                            <p className='text-sm'>{item.schedule_at}</p>
                            <p className='text-sm'>{item.start_time}</p>
                        </div>
                    </div>
                </SheetMeeting>
                ))}
                <SheetMeeting>
                    <div className="flex items-center text-sm text-textprimary3 space-x-4 py-2 px-2 cursor-pointer hover:bg-secondary">
                        <Plus size={16} /> <p>New meeting</p>
                    </div>
                </SheetMeeting>
            </section>
            }
            {views === 'List by topics' &&
                <>
                {tabTopicsRef.current.map((item, index) => (
                    <MeetingAccordion dateLabel={item} key={index}>
                        {meetings.filter((meeting) =>  meeting.topics === item).map((tabItem, index) => {
                        return (
                        <>
                            <div key={index} className="w-full flex items-center justify-between p-2 cursor-pointer hover:bg-primary/10">
                                <div className="capitalize font-semibold">
                                    <p>{tabItem.name}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <p className='text-sm'>{tabItem.schedule_at}</p>
                                    <p className='text-sm'>{tabItem.start_time}</p>
                                </div>
                            </div>
                            <SheetMeeting topics={item}>
                                <div className="flex items-center text-sm text-textprimary3 space-x-4 py-2 px-2 cursor-pointer hover:bg-secondary">
                                    <Plus size={16} /> <p>New meeting</p>
                                </div>
                            </SheetMeeting>
                        </>
                        )
                    })}
                    </MeetingAccordion> 
                ))}
                </>
            }
            
        </TeamLayout>
    )
}
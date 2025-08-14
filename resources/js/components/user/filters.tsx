import { ProjectType, Todo } from "@/types";
import { useEffect, useMemo, useRef, useState } from "react";
import { DateFilterCombox } from "../custom/dateFilterCombox";
import { Button } from "../ui/button";
import { CalendarClock, CalendarX, Search } from "lucide-react";
import { DropdownMenu1 } from "../custom/dropdownMenu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export type filterType = {
    assign: string;
    author: string;
    priority: string;
    state: string;
    "at start date": string;
    'at deadline': string;
}

export function Filters ({
    setData,
    data,
    views,
    filterTab,
    setViews,
    setFilterTab,
    viewAvailable,
    dropMenuTab
}:{
    data: Todo[] | ProjectType[],
    setData: React.Dispatch<React.SetStateAction<Todo[]>> | React.Dispatch<React.SetStateAction<ProjectType[]>>,
    views: string,
    filterTab: filterType,
    setViews: React.Dispatch<React.SetStateAction<string>>,
    setFilterTab: React.Dispatch<React.SetStateAction<filterType>>,
    viewAvailable: {name: string;value: string;}[],
    dropMenuTab: {title: string;values: string[];}[]
}) {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterState, setFilterState] = useState<ProjectType['state'] | 'all'>('all');
    const [filterPriority, setFilterPriority] = useState<ProjectType['priority'] | 'all'>('all');
    const [filterDate, setFilterDate] = useState<string | null>(null);
    const [filterDeadline, setFilterDeadline] = useState<string | null>(null);

    const taskRef = useRef<any[]>(data)

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleStateFilterChange = (value: "not started" | "paused" | "canceled" | "in progress" | "done") => {
        setFilterState(value);
    };

    const handlePriorityFilterChange = (value: "high" | "medium" | "low") => {
        setFilterPriority(value);
    };

    const handleDateFilterChange = (value: string) => {
        setFilterDate(value);
    };

    const handleDeadlineFilterChange = (value: string) => {
        setFilterDeadline(value)
    }

    useEffect(() => {
        if (filterTab.priority === '') {
            setFilterPriority('all')
        } 
        if (filterTab.state === '') {
            setFilterState('all')
        } 
        if (filterTab["at start date"] === '') {
            setFilterDate('')
        } 
        if (filterTab["at deadline"] === '') {
            setFilterDeadline('')
        }
    }, [filterTab])

    useMemo(() => {
        let currentTodos = taskRef.current; // Start with all todos

        // 1. Filtrage par terme de recherche intelligent
        if (searchTerm) {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        currentTodos = currentTodos.filter((todo) => {
            // Rendre le nom de la tâche en minuscules pour la comparaison
            const lowercasedName = todo.name.toLowerCase();
            // Vérifier si le terme de recherche est inclus n'importe où dans le nom
            return lowercasedName.includes(lowercasedSearchTerm);
        });
        }

        // 2. Filtrage par statut
        if (filterState !== 'all') {
            currentTodos = currentTodos.filter(todo => todo.state === filterState);
            setFilterTab((prev) => {
                let newValue = {...prev}
                const value = {state: filterState}
                newValue = {...newValue, ...value}
                return newValue
            })
        }

        // 3. Filtrage par priorité
        if (filterPriority !== 'all') {
            currentTodos = currentTodos.filter(todo => todo.priority === filterPriority);
            setFilterTab((prev) => {
                let newValue = {...prev}
                const value = {priority: filterPriority}
                newValue = {...newValue, ...value}
                return newValue
            })
        }

        // 5. Filtrage par date
        if (filterDate) {
            currentTodos = currentTodos.filter(todo => todo.start_date === filterDate);
            setFilterTab((prev) => {
                let newValue = {...prev}
                const value = {"at start date": filterDate}
                newValue = {...newValue, ...value}
                return newValue
            })
        }  
        // 6. Filtrage par date
        if (filterDeadline) {
            currentTodos = currentTodos.filter(todo => todo.deadline === filterDeadline);
            setFilterTab((prev) => {
                let newValue = {...prev}
                const value = {"at deadline": filterDeadline}
                newValue = {...newValue, ...value}
                return newValue
            })
        }  
        setData(currentTodos)
    }, [searchTerm, filterState, filterPriority, filterDate, filterDeadline]); 
    return (
        <div className="flex items-center text-sidebarText space-x-4">
        <DateFilterCombox className="bg-todosecondary shadow-sm rounded" onChange={handleDateFilterChange}>
            <Button
                variant="ghost"
                id="date"
                className="justify-between font-normal w-full border-none text-sm text-textprimary2"
            >
                <CalendarX />
            </Button>
        </DateFilterCombox>
        <DateFilterCombox className="bg-todosecondary shadow-sm rounded" onChange={handleDeadlineFilterChange}>
            <Button
                variant="ghost"
                id="date"
                className="justify-between font-normal w-full border-none text-sm text-textprimary2"
            >
                <CalendarClock />
            </Button>
        </DateFilterCombox>
        <DropdownMenu1 
            title="Sort" 
            table={dropMenuTab} 
            btnClass="rounded border-none shadow-sm bg-todosecondary text-textprimary2" 
            priorityFilter={handlePriorityFilterChange}
            stateFilter={handleStateFilterChange}
        />
        <Select
            value={views} 
            onValueChange={setViews}
        >
            <SelectTrigger className="w-[180px] rounded-md border-none cursor-pointer text-textprimary2 bg-todosecondary shadow-sm">
                <SelectValue placeholder="views" />
            </SelectTrigger>
            <SelectContent className="bg-todosecondary rounded-md shadow-lg py-1 z-10">
                {viewAvailable.map((item, index) => (
                    <SelectItem key={index} value={item.value}>{item.name}</SelectItem>
                ))}
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
    )
}
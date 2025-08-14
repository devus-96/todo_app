import { dropMenuTab } from "@/constant/global";
import { Todo } from "@/types";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { DropdownMenu1 } from "./dropdownMenu";
import { Search } from "lucide-react";

export const FilterUserPart = ({
    tasks,
    setTasks
}:{
    tasks: Todo[],
    setTasks: Dispatch<SetStateAction<Todo[]>>,
}) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterState, setFilterState] = useState<Todo['state'] | 'all'>('all');
    const [filterPriority, setFilterPriority] = useState<Todo['priority'] | 'all'>('all');
    const [filterType, setFilterType] = useState<'all' | 'task' | 'habit'>('all')

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleStateFilterChange = (value: "not started" | "paused" | "cancel" | "in progress" | "done") => {
        setFilterState(value);
    };

    const handlePriorityFilterChange = (value: "high" | "medium" | "low") => {
        setFilterPriority(value);
    };

    useMemo(() => {
        let currentTodos = tasks; // Start with all todos

        // 1. Filtrage par terme de recherche intelligent
        if (searchTerm) {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        currentTodos = currentTodos.filter((todo: Todo) => {
            // Rendre le nom de la tâche en minuscules pour la comparaison
            const lowercasedName = todo.name.toLowerCase();
            // Vérifier si le terme de recherche est inclus n'importe où dans le nom
            return lowercasedName.includes(lowercasedSearchTerm);
        });
        }

        // 2. Filtrage par statut
        if (filterState !== 'all') {
        currentTodos = currentTodos.filter(todo => todo.state === filterState);
        }

        // 3. Filtrage par priorité
        if (filterPriority !== 'all') {
        currentTodos = currentTodos.filter(todo => todo.priority === filterPriority);
        }

        //4. Filtrage par type
        if (filterType !== 'all') {
            currentTodos = currentTodos.filter(todo => todo.type === filterType);
        }
        setTasks(currentTodos)
    }, [searchTerm, filterState, filterPriority, filterType]); 
    return (
        <>
            <DropdownMenu1 
                title="Sort" 
                table={dropMenuTab} 
                btnClass="rounded border-none" 
                priorityFilter={handlePriorityFilterChange}
                stateFilter={handleStateFilterChange}
            />
            <div className="flex bg-secondary items-center justify-between px-2 py-1.5 space-x-2 rounded text-sidebarText">
                <Search size={16} />
                <input 
                    type="text" 
                    className="w-[90%] outline-none placeholder:text-gray-500 placeholder:text-xs"
                    placeholder="search a task"
                    onChange={handleSearchChange}
                />
            </div>
        </>
    )
}
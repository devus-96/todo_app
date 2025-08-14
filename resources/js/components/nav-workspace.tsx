import { SidebarGroup, SidebarGroupLabel, SidebarMenu } from "./ui/sidebar";
import { WorkSpaceContent } from "./team/workSpaceContent";
import { router } from '@inertiajs/react';
import axios from "axios";
import { useState } from "react";
import { Company } from "@/types";

async function fetchTeams () {

}

async function fetchCompanies () {

}

async function fetchProjects () {
    
}

const workSpaces = [
    {
        name: 'Companies',
        method: fetchCompanies
    },
    {
        name: 'Projects',
        method: fetchProjects
    }
]

export function NavWorkSpace ({type = 'company'}:{type?: string}) {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>()
    const [data, setData] = useState<Company[]>([])

    function fetchData () {
        axios.get('/company').then((response) => {
            setLoading(true)
            setData(response.data.companies)
        }).catch((error) => {
            setError(error)
        }).finally(() => {
            setLoading(false)
        })
    }
   
    return (
    <SidebarGroup className="py-1 mb-4">
        <SidebarGroupLabel className="text-todoterciary !text-xs mb-1 ml-2">WORKSPACE</SidebarGroupLabel>
        <SidebarMenu className="px-4">
            <WorkSpaceContent name={type} datas={data} getDatas={fetchData} loading={loading} />
        </SidebarMenu>
    </SidebarGroup>
    )
    
}
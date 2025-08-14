import React, { useState } from "react"
import { ProjectFrom } from "@/components/project/projectForm" 
import AppLayout from "@/layouts/app-layout"
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import { GlobalError } from "@/components/ui/global-error-component";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'new projects',
        href: '/user/newProject',
    },
];

export default function NewProject ({
    company_id,
    team_id
}:{
    company_id: number,
    team_id: number
}) {
    const [error, setError] = useState<string[]>([])
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="new project" />
                <GlobalError 
                    appError={error}
                    setError={setError} 
                />
             <div className="bg-todoprimary py-8 px-24">
                <ProjectFrom company_id={company_id} team_id={team_id} setError={setError}  />
            </div>
        </AppLayout>
    )
}
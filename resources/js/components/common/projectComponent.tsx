import { Plus, Target } from "lucide-react";
import {projectsRow, teamsProjectRow} from "@/constant/task"
import { useState } from "react";
import { sortTask, viewAvailableInProjectView } from "@/constant/global";
import { Commontable } from "@/components/custom/commontable";
import { ProjectTable } from "@/components/project/projectTable";
import { Button } from "@/components/ui/button";
import { BoardTasks } from "@/components/custom/board";
import { GlobalError } from "@/components/ui/global-error-component";
import { Filters } from "@/components/user/filters";
import { DisplayFilter } from "@/components/user/displayFilter";
import { ProjectType } from "@/types";
import { SheetAction } from "../popup/sheetAction";
import { DoorOpen, MessageCircleDashed,Trash2, CornerUpRight, WrapText } from "lucide-react";

export const dropAction = [
    {title: 'Add comment', icon: MessageCircleDashed},
    {title: 'Open', icon: DoorOpen},
    {title: 'Move to', icon: CornerUpRight},
    {title: 'Duplicate', icon: WrapText},
    {title: 'Delete Project', icon: Trash2}
]

export function ProjectComponent ({
    filter,
    project,
    company_id,
    team_id
}:{
    filter: {title: string; values: string[];}[],
    project: {data: ProjectType[]},
    company_id?: number,
    team_id?: number
}) {
    const [views, setViews] = useState<string>("tasks");
    const [appError, setAppError] = useState<string[]>([])
    const [projects, setProjects] = useState<ProjectType[]>(project['data'] as ProjectType[])
    const [filterTab, setFilterTab] = useState(sortTask)
    const [selected, setSelected] = useState<number[]>([])
    return (
        <section>
            <GlobalError 
                appError={appError}
                setError={setAppError} 
            />
            <div className="flex items-center text-3xl text-textprimary space-x-4 px-4 my-4">
                <Target /><p>Projects</p>
            </div>
            <div className="w-full flex justify-between  px-8 mt-8 border-b py-2">
                <Button
                    type="submit"
                    className="w-fit px-2 rounded cursor-pointer text-white bg-todoterciary"
                    onClick={() =>window.location.assign('/user/project/new')}>
                    New
                </Button>
                <Filters 
                    dropMenuTab={filter}
                    setData={setProjects}
                    data={project['data']}
                    views={views}
                    filterTab={filterTab}
                    setViews={setViews}
                    setFilterTab={setFilterTab}
                    viewAvailable={viewAvailableInProjectView}
                />
            </div>
            <section className="min-w-full overflow-hidden">
                {selected.length !== 0 &&
                    <SheetAction 
                        type={''} 
                        projects={projects}
                        selected={selected} 
                        setAppError={setAppError} 
                        setProjects={setProjects}
                        dropAction={dropAction}
                    />
                }
                <DisplayFilter setFilterTab={setFilterTab} filterTab={filterTab} />
                <section className="w-full h-full overflow-auto scrollbar-hide">
                    {views === 'tasks' &&
                    <>
                    <Commontable tabHeader={(company_id && team_id) ? teamsProjectRow : projectsRow}>
                        {projects.map((item: any, index: number) => {
                            console.log(team_id, company_id)
                            return (
                                <ProjectTable 
                                    key={index}
                                    item={item} 
                                    projects={projects}
                                    index={index}
                                    setProjects={setProjects}
                                    setError={setAppError}
                                    teamId={team_id}
                                    companyId={company_id}
                                    setSelected={setSelected}
                                />
                            )
                        })}
                    </Commontable>
                    <div  className="w-full text-[#333] hover:bg-[#333] cursor-pointer hover:text-gray-300 flex pl-2 py-1 gap-2" onClick={() => {
                            if (company_id && team_id) {
                                window.location.assign(`/company/${company_id}/team/${team_id}/project/new`)
                            } else {
                                window.location.assign('/user/project/new')
                            }
                        }}>
                        <Plus size={24} />
                        <p>New Project</p>
                    </div>
                    </>
                    }
                    {views === 'board' && <BoardTasks tasks={projects} type="team" />}
                </section>
            </section>
        </section>
    )
}
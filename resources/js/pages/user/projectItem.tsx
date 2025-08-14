import React, { useEffect, useState } from "react"
import { Plus, SquareCheck } from "lucide-react"
import { BreadcrumbItem, ProjectType, Todo } from "@/types"
import AppLayout from "@/layouts/app-layout"
import { Head, useForm } from "@inertiajs/react"
import { format } from "date-fns"
import { TaskUserComponent } from "@/components/user/taskUserComponent"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'projectItem',
        href: '/user/project/{id}',
    },
];

export default function ProjectDetails ({projectItem, tasksData}:{projectItem: any, tasksData: any}) {
    const [showObjectif, setShowObjectif] = useState(false)
    const [project, setProject] = useState<ProjectType>(projectItem as ProjectType)
    const [tasks, setTasks] = useState<Todo[]>(tasksData as Todo[])
    const { data, setData, patch, errors, reset } = useForm<Required<any>>();

    useEffect(() => {
            if (projectItem) {
                patch(`/user/project/update?id=${projectItem.id}`)
            }
    }, [data])

    return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="projectItem" />
        <div className='w-full pb-8 bg-todoprimary min-h-screen'>
            <section className='w-full h-[200px] relative bg-[url(/baniaire.jpeg)] bg-no-repeat bg-center mb-8'>

            </section>
            <section>
                <div className="w-fit flex flex-col items-start justify-start px-8">
                    <div className="flex items-center justify-between">
                        <input 
                            type="text" 
                            className="w-[800px] text-textprimary text-3xl outline-none placeholder:text-gray-500 placeholder:text-3xl"
                            value={project.name}
                            name='name'
                            placeholder="write name's project"
                            onChange={(e) => {
                                const target = e.target as HTMLInputElement
                                setProject((prev) => {
                                    let newValue = {...prev}
                                    const newNameValue = {name: target.value}
                                    newValue = {...newValue, ...newNameValue}
                                    return newValue
                                })
                            }}
                            onBlur={(e)=>{
                                const target = e.target as HTMLInputElement
                                setData({name: target.value})
                            }}
                        />
                    </div>
                    <p className="text-xs text-textprimary/50">from {format(project.start_date, 'PPP')} to {format(project.deadline, 'PPP')}</p>
                </div>
            {project !== null && 
            <div className="ml-4 mt-8" >
                <div className="group flex items-center cursor-pointer">
                    <Plus size={24} className="text-textprimary" />
                    <p className="text-3xl text-todoterciary ">Objectif</p>
                </div>
                <div className="ml-8 my-8 space-y-2">
                {project.objectif && JSON.parse(project.objectif)?.map((item: string, index: number) => {
                    let objectifs = []
                    if (project.objectif) {
                        objectifs = JSON.parse(project.objectif)
                    }
                    return (
                    <div key={index}>
                        <div className="flex items-center text-textprimary">
                            <SquareCheck size={24}/>
                            <input 
                            type="text" 
                            className="w-[800px] text-textprimary text-lg ml-4 outline-none placeholder:text-gray-500 placeholder:text-3xl"
                            value={item}
                            name='name'
                            onChange={(e) => {
                                const target = e.target as HTMLInputElement
                                objectifs[index] = target.value
                                const objectifStr = JSON.stringify(objectifs)
                                setProject((prev) => {
                                    let newValue = {...prev}
                                    const newNameValue = {objectif: objectifStr}
                                    newValue = {...newValue, ...newNameValue}
                                    return newValue
                                })
                            }}
                            onBlur={(e) => {
                                setData({objectif: project.objectif})
                            }}
                            placeholder="write objectif"
                        />
                        </div>
                    </div>
                    )
                })}
                </div>
                {showObjectif &&
                <input 
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            const target = e.target as HTMLInputElement;
                            let valueChanged = [] as string[]
                            if (project.objectif) {
                                let objectifValue = JSON.parse(project.objectif)
                                valueChanged = [...objectifValue, target.value]
                            } else {
                                valueChanged = [target.value]
                            }
                            let objecfifObj = JSON.stringify(valueChanged)
                            setProject((prev) => {
                                let newValue = {...prev}
                                const newNameValue = {objectif: objecfifObj}
                                newValue = {...newValue, ...newNameValue}
                                return newValue
                            })
                            setData({objectif: objecfifObj})
                        }
                    }}
                    type="text" 
                    name="objectif"
                    className="w-[800px] text-base bg-inherit outline-none text-gray-300 ml-8 placeholder:text-textprimary/50" 
                    placeholder="Write project's objectif then click Enter for record"
                />
                }
                <div onClick={() => {
                    setShowObjectif(true)
                }} className="bg-todosecondary text-textprimary p-2 cursor-pointer rounded w-fit mt-4 ml-8 text-sm">Add Objectifs</div>
            </div>
            }
            </section>
            <section>
                <div className="flex items-center text-3xl text-textprimary space-x-4 px-4 mt-4">
                    <SquareCheck /><p>Tasks</p>
                </div>
                <TaskUserComponent 
                    tasks={tasks} 
                    setTasks={setTasks} 
                    type="user_project_task" 
                    project={projectItem}
                />
            </section>
        </div>
    </AppLayout>
    )
}
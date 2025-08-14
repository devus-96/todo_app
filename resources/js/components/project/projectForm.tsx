"use client"
import { CalendarClock, CalendarX, CircleDashed, Flag, LoaderCircle, MessageSquareText, Plus, SquareCheck, X } from "lucide-react"
import { FormEventHandler, useEffect, useRef, useState } from "react"
import { StatusCombobox } from "../custom/statusCombobox"
import { TaskSheetGroup } from "../custom/taskSheetGroup"
import { PriorityCombobox } from "../custom/priorityCombox"
import { DateCombox } from "../custom/dateCombox"
import { Button } from "../ui/button"
import { useForm, usePage } from '@inertiajs/react';
import { Input } from "../ui/input";
import { SharedData } from "@/types"
import { TeamCombobox } from "../team/teamCombox"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"

type ProjectForm = {
    name: string;
    state: "not started" | "paused" | "in progress" | "done" | "canceled";
    priority: "high" | "medium" | "low";
    description: string;
    objectif: string[] | string;
    start_date: string;
    deadline: string;
    assignee: string;
    isChief: string
};

export const ProjectFrom = ({
  company_id,
  team_id,
  setError
}:{
  company_id: number | null,
  team_id: number | null,
  setError: React.Dispatch<React.SetStateAction<string[]>>
}) => {
     const [showDescription, setShowDescription] = useState<boolean>(false)
     const [number, setNumber] = useState(1)
     const [menbers, setMenbers] = useState<string[]>([])
     const numberRef = useRef(1)
     const objectifRef = useRef<{[key: number]: string}>({})
     const { auth } = usePage<SharedData>().props;

     const { data, setData, post, processing, errors, reset } = useForm<Required<ProjectForm>>({
            name: "",
            state: "not started",
            priority: "medium",
            description: "",
            start_date: new Date().toLocaleDateString(),
            deadline: new Date().toLocaleDateString(),
            objectif: '',
            assignee: '',
            isChief: '',
         });
    
    function handleChangeState (value: "not started" | "paused" | "in progress" | "done" | "canceled") {
      setData('state', value)
    }

    function handleChangePriority (value: "high" | "medium" | "low") {
      setData('priority', value)
    }

    function handleChangeStartDate (value: string) {
      setData('start_date', value)
    }

    function handleChangeDeadline (value: string) {
      setData('deadline', value)
    }

    function hanndeChangeMenber (value: string[]) {
      setData('assignee', JSON.stringify(value))
    }

    function handeChangeObjectif (value: string) {
      const newObjectif  = {[`${number}`]: value};
      objectifRef.current = {...objectifRef.current, ...newObjectif}
      setData('objectif', JSON.stringify(Object.values(objectifRef.current)))
    }
    
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (company_id && team_id) {
          post(`/company/${company_id}/team/${team_id}/project`, {
            onError: (errors) => {
              reset()
            },
          });
        } else {
          post('/user/project', {
            onError: () => {
              reset()
            }
          });
        }
    };

    useEffect(() => {setError(Object.values(errors))}, [errors])

    return (
          <form className="space-y-8" onSubmit={submit}>
            <Input
              id="name"
              type="text"
              required
              autoFocus
              tabIndex={1}
              autoComplete="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              disabled={processing}
              className="w-full border-none !outline-none focus-visible:bg-todoprimary focus-visible:ring-[0px] placeholder:text-textprimary !text-3xl bg-transparent text-textprimary"
              placeholder="Give a name to your project"
            />
            <p className="text-textprimary3 text-sm">author: @{auth.user.email}</p>
            <div className="cursor-pointer" onClick={() => {setShowDescription(true)}}>
              <div className="flex items-center text-textprimary3 space-x-2 text-holder p-1 duration-300 hover:bg-todosecondary hover:text-textprimary">
                  <MessageSquareText size={24} />
                  <p className="">add comment</p>
              </div>
              {showDescription && 
                  <textarea 
                    id="description"
                    autoFocus
                    tabIndex={2}
                    autoComplete="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    disabled={processing}
                    className="w-full bg-todoprimary text-sidebarText border-b scrollbar-hide border-sidebarText outline-none p-3 text-sm max-lg:mb-5"
                    placeholder='add description'
                ></textarea>
              }
            </div>
                            
            <TaskSheetGroup name="State" icon={CircleDashed} width={300}>
                <StatusCombobox
                  value={data.state}
                  onChange={handleChangeState}
                  btnClass="w-[100%] justify-between border-none"
                  className="w-[300px] p-0"
                  processing={processing}
                />
            </TaskSheetGroup>
              
            <TaskSheetGroup name="Priority" icon={Flag} width={300}>
                <PriorityCombobox
                  value={data.priority}
                  onChange={handleChangePriority}
                  btnClass="w-[100%] justify-between border-none"
                  className="w-[300px] p-0"
                  processing={processing}
                />
            </TaskSheetGroup>
              
              <div className="">
                  <div className="flex items-center w-full space-x-4">
                      <TaskSheetGroup name="Start date" icon={CalendarX} width={400}>
                            <DateCombox
                              value={data.start_date}
                              onChange={handleChangeStartDate}
                              className="flex flex-col gap-3 w-[100%]"
                              processing={processing}
                            />
                      </TaskSheetGroup>
                      <TaskSheetGroup name="Deadline" icon={CalendarClock} width={400}>
                          <DateCombox
                            value={data.deadline}
                            onChange={handleChangeDeadline}
                            className="flex flex-col gap-3 w-[100%]"
                            processing={processing}
                          />
                      </TaskSheetGroup>
                  </div>
              </div>

              <div className="space-y-4">
                {menbers.length !== 0 &&
                <div className="w-full">
                  <p className="text-textprimary3 mb-4">choose who is the project manager by clicking on the switches</p>
                  <RadioGroup defaultValue="comfortable" className="flex items-center gap-4 flex-wrap">
                    {menbers.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 bg-todoterciary/30 text-textprimary p-1 ">
                        <RadioGroupItem value={item} id={`r${index}`} />
                        <Label htmlFor="r1">{item}</Label>
                        <X size={14} />
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                }
                <TeamCombobox 
                  setMenbers={setMenbers} 
                  onChange={hanndeChangeMenber} 
                  value={data.assignee}
                  btnClass="text-textprimary3 hover:text-textprimary2 cursor-pointer"
                />
              </div>

              <div className="" >
                  <div onClick={() => {
                    setNumber((prev) => prev+1)
                    numberRef.current = numberRef.current + 1
                    console.log(numberRef.current)
                  }} className="group flex items-center cursor-pointer">
                      <Plus size={24} className="text-textprimary" />
                      <p className="text-3xl text-textprimary ">objectif</p>
                  </div>
              </div>
             
              <div>
                <div className="ml-24 mt-4">
                    {Array.from({ length: number }).map((_,index) => (
                    <div key={index} className="flex items-center text-btnColor mt-4">
                    <SquareCheck size={24}/>
                    <input     
                        id="objectif"
                        value={undefined}
                        type="text" 
                        autoComplete="objectif"
                        disabled={processing}
                        className="outline-none text-base bg-inherit text-gray-300 ml-4 w-[80%] min-w-[300px]" 
                        placeholder="Click on + objectif for add objectif"
                        onChange={(e) => handeChangeObjectif(e.target.value)}
                    />
                    </div>
                    ))}
                </div>
            </div>
                
            <Button
              type="submit"
              className="w-[200px] rounded cursor-pointer bg-todoprimary border text-textprimary hover:bg-todoterciary hover:text-white">
              {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
               create project
          </Button>
        </form>
    )
}
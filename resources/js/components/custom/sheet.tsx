"use client"
import { Button } from "@/components/ui/button"
import {  AlarmClockOff, AlarmClockPlus, CalendarClock, CalendarX, CircleDashed, Flag, LoaderCircle, Target, Type } from "lucide-react";
import { Input } from "../ui/input";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet"
import { StatusCombobox } from "./statusCombobox";
import { TaskSheetGroup } from "./taskSheetGroup";
import { DateCombox } from "./dateCombox";
import { PriorityCombobox } from "./priorityCombox";
import { FormEventHandler} from "react";
import { ProjectType, tasks, Todo } from "@/types";
import { checkDateValues } from "@/lib/global";
import { format } from "date-fns";
import { useForm } from "@inertiajs/react";


export function SheetTask({ 
  children,
  task,
  project, 
  type = 'user_task',
  setError
}: { 
  children: React.ReactNode
  task?: Todo,
  project?: ProjectType | null,
  type?: 'user_task' | 'user_project_task' | 'team_task' | 'team_projects_task',
  setError: React.Dispatch<React.SetStateAction<string[]>>
}) {
    const { data, setData, post, patch, processing, errors, reset } = useForm<Required<tasks>>(task ? task as tasks  : {
        name: "",
        state: "not started",
        priority: "medium",
        description: "",
        start_time: '',
        end_time: '',
        type: 'task',
        start_date: format(new Date(), 'yyyy-MM-dd'),
        deadline: format(new Date(), 'yyyy-MM-dd'),
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

    const submit: FormEventHandler = (e) => {
    e.preventDefault();
    try {
      checkDateValues(data.start_date, data.deadline)
      //checkTimeValues(format(new Date(), 'yyyy-MM-dd'), data.start_time, data.end_time)
      switch (type) {
        case 'user_task':
          post('/user/tasks');
          break
        case 'user_project_task': 
          post(`/user/tasks?project_id=${project?.id}`);
          break
      }
      setError([])
    } catch (error) {
      if (error instanceof Error) {
        setError((prev) => [...prev, error?.message]);
      }
    }
    };

    const update : FormEventHandler = (e) => {
      patch(route('user.taskUpdate', task?.id))
    }

  return (
    <Sheet modal={true}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-[580px] bg-todosecondary p-8">
          <form onSubmit={(e) => {
            if (task) {
              update(e)
            } else {
              submit(e)
            }
          }} className="space-y-4">
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

              {project &&
                <TaskSheetGroup name="Project" icon={Target} width={400}>
                  <div className="w-[100%]">
                    <p>{project.name}</p>
                  </div>
                </TaskSheetGroup>
              }

              <TaskSheetGroup name="State" icon={CircleDashed} width={400}>
                <StatusCombobox
                  value={data.state}
                  onChange={handleChangeState}
                  btnClass="w-[100%] justify-between border-none"
                  className="w-[100%] p-0"
                  processing={processing}
                />
              </TaskSheetGroup>

              <TaskSheetGroup name="Priority" icon={Flag} width={400}>
                  <PriorityCombobox
                    value={data.priority}
                    onChange={handleChangePriority}
                    btnClass="w-[100%] justify-between border-none"
                    className="w-[100%] p-0"
                    processing={processing}
                  />
              </TaskSheetGroup>

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
                    className="flex flex-col gap-3 w-[300px]"
                    processing={processing}
                  />
              </TaskSheetGroup>

              <TaskSheetGroup name="start time" icon={AlarmClockPlus}>
                <Input
                  type="time"
                  id="start_time"
                  autoFocus
                  required
                  step="1"
                  className="w-[100%] border-none bg-todosecondary appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  value={data.start_time}
                  onChange={(e) => setData('start_time', e.target.value)}
                  disabled={processing}
                />
              </TaskSheetGroup>

              <TaskSheetGroup name="end time" icon={AlarmClockOff}>
                <Input
                  type="time"
                  id="end_time"
                  autoFocus
                  
                  step="1"
                  className="w-[100%] border-none bg-todosecondary appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  value={data.end_time}
                  onChange={(e) => setData('end_time', e.target.value)}
                  disabled={processing}
                />
              </TaskSheetGroup>

              {type === 'user_task' &&
              <TaskSheetGroup name="Type" icon={Type} width={400}>
                <select onChange={(e) => {
                  setData('type', e.target.value)
                }} name="" id="" className="w-full p-2 outline-none rounded border-none cursor-pointer text-textprimary2 bg-todosecondary shadow-sm">
                  <option className="bg-todosecondary rounded-md shadow-lg py-1 z-10" value="task">task</option>
                  <option className="bg-todosecondary rounded-md shadow-lg py-1 z-10" value="project">habit</option>
                </select>
              </TaskSheetGroup>
              }

              <div className="grid w-full gap-3 px-4 mt-4">
                <textarea 
                  id="description"
                  autoFocus
                  tabIndex={2}
                  autoComplete="description"
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  disabled={processing}
                  className="border p-2 rounded-none outline-none"
                  placeholder='add description'
               ></textarea>
              </div>

            <SheetFooter className="mb-4">
              <Button
                type="submit"
                className="w-[200px] rounded cursor-pointer bg-todosecondary border border-textprimary3 text-textprimary hover:text-textprimary3"
              >
                 {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                 {task ? "Update Task" : "Create Task"}
              </Button>
            </SheetFooter>
          </form>
      </SheetContent>
    </Sheet>
  );
}
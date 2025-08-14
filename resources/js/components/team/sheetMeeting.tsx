"use client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { AlarmClockPlus, CalendarX, LoaderCircle, PanelTopIcon } from "lucide-react";
import { Input } from "../ui/input";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet"
import { TaskSheetGroup } from "../custom/taskSheetGroup"; 
import { DateCombox } from "../custom/dateCombox";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { GlobalError } from "../ui/global-error-component";
import { MeetingType } from "@/types";
import { meetingFormSchema, meetingFormValues} from "@/types/schema";
import { format } from "date-fns";


export function SheetMeeting({ 
  children,
  data,
  topics
}: { 
  children: React.ReactNode
  data?: MeetingType
  topics?: string
}) {
  const [appError, setAppError] = useState<string>()

  const form = useForm<meetingFormValues>({
    resolver: zodResolver(meetingFormSchema),
    defaultValues: data ? data : {
      name: "",
      description: "",
      start_time: "00:00:00",
      schedule_at: format(new Date(), 'yyyy-MM-dd'),
      topics: topics ? topics : ''
    },
  });

  function PostTask (data: meetingFormValues) {
    try {
    } catch (error: unknown) {
      if (error instanceof Error) {
        setAppError(error?.message);
      }
    }
  }

  const onSubmit = (data: meetingFormValues) => {
    console.log("Form submitted:", data);
    // Ici vous pourriez ajouter la logique pour sauvegarder la tâche
  };

  

  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-[580px] bg-todosecondary p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <GlobalError 
                appError={appError} 
                errorsType={form.formState.errors}
              />
            <div className="grid flex-1 auto-rows-min gap-3 px-4">
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          type="text"
                          className="px-4 py-2 w-full outline-none placeholder:text-textprimary text-3xl bg-transparent text-textprimary"
                          placeholder="Give a name to your task"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <TaskSheetGroup name="topics" icon={PanelTopIcon}>
                <FormField
                  control={form.control}
                  name="topics"
                  render={({ field }) => (
                    <FormItem className="w-[70%] cursor-pointer">
                      <FormControl>
                        <input
                          type="text"
                          className="px-4 py-2 w-full outline-none placeholder:text-textprimary bg-transparent text-textprimary"
                          placeholder="Empty"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TaskSheetGroup>

              <TaskSheetGroup name="Schedule at" icon={CalendarX}>
                <FormField
                  control={form.control}
                  name="schedule_at"
                  render={({ field }) => (
                    <FormItem className="w-[70%] cursor-pointer">
                      <FormControl>
                        <DateCombox
                          value={field.value}
                          onChange={field.onChange}
                          className="flex flex-col gap-3 w-[100%]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TaskSheetGroup>


              <TaskSheetGroup name="start time" icon={AlarmClockPlus}>
                <FormField
                  control={form.control}
                  name="start_time"
                  render={({ field }) => (
                    <FormItem className="w-[70%] cursor-pointer">
                      <FormControl>
                        <Input
                          type="time"
                          id="start-time-picker"
                          step="1"
                          defaultValue="00:00:00"
                          className="w-[100%] border-none bg-todosecondary appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TaskSheetGroup>

              <div className="grid w-full gap-3 px-4 mt-4">
                <Label htmlFor="message" className="text-textprimary2">
                    Description
                </Label>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          className="border-b rounded-none"
                          placeholder="Type your message here."
                          id="message"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <SheetFooter className="p-8">
              <Button
                type="submit"
                className="w-[200px] rounded cursor-pointer bg-todosecondary border border-textprimary3 text-textprimary hover:text-black"
                onClick={() => console.log("hello")}
              >
                {form.formState.isSubmitting ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  data ? "Update Task" : "Create Task"
                )}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Textarea } from "../ui/textarea"
import React, { FormEventHandler } from "react"
import { useForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";

type commentForm = {
  content: string 
}

export function SheetComment({
  children,
  type,
  id
}:{
  children: React.ReactNode,
  type: string,
  id: number
}) {

  const { data, setData, post, processing} = useForm<Required<commentForm>>({
      content: ''
    });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    if (type === 'user_task' || type === 'user_project_task') {
      post(`/user/comment?task_id=${id}`);
    } else {
      post(`/user/comment?project_id=${id}`);
    }
  };
  return (
   
        <Sheet>
        <SheetTrigger asChild>
          {children}
        </SheetTrigger>
        <SheetContent side="top" className="w-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-fit p-2 border-none rounded-lg bg-todosecondary">
        <form onSubmit={submit}>
          <SheetHeader>
            <SheetTitle>New message</SheetTitle>
            <SheetDescription>
            Write your comment here
            </SheetDescription>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <Textarea 
              id='content'
              required
              autoFocus
              disabled={processing}
              autoComplete="content"
              value={data.content}
              onChange={(e) => setData('content', e.target.value)}>
            </Textarea>
          </div>
          <SheetFooter>
          <Button type="submit" className="cursor-pointer">
            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
              Add comment
            </Button>
          </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
  )
}

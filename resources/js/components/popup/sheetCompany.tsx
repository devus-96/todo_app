import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import React, { FormEventHandler } from "react"
import { useForm } from "@inertiajs/react";
import { FormWorkSpace } from "../custom/formWorkspace";

export type companyForm = {
    name: string;
    description: string;
    mission: string;
}

export function SheetCompany({
  children,
}:{
  children: React.ReactNode,
}) {
  const { data, setData, post, processing} = useForm<Required<companyForm>>({
        name: '',
        description: '',
        mission: ''
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/company');
    };
  return (
   
        <Sheet>
        <SheetTrigger asChild>
          {children}
        </SheetTrigger>
        <SheetContent side="top" className="w-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-fit p-2 border-none rounded-lg bg-todosecondary">
        <SheetHeader className="ml-4 text-textprimary">
            <SheetTitle>Create company</SheetTitle>
          </SheetHeader>
          <FormWorkSpace 
            data={data}
            submit={submit}
            processing={processing}
            setData={setData}
            placeholder='New Company'
          />
        </SheetContent>
      </Sheet>
  )
}

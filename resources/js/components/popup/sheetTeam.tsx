import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import React, { FormEventHandler, useRef } from "react"
  import { useForm } from "@inertiajs/react";
  import { FormWorkSpace } from "../custom/formWorkspace";
import { verifyCompanyId } from "@/lib/global";
import { teamType } from "@/types";
  
  export type companyForm = {
      name: string;
      description: string;
      mission: string;
  }
  
  export function SheetTeam({
    children,
    setTeams
  }:{
    children: React.ReactNode,
    setTeams: React.Dispatch<React.SetStateAction<teamType[]>>
  }) {
    const { data, setData, post, processing} = useForm<Required<companyForm>>({
          name: '',
          description: '',
          mission: ''
      });
    const companyIdRef = useRef<string | null>(null)

    const submit: FormEventHandler = (e) => {
        companyIdRef.current = verifyCompanyId() as string
        e.preventDefault();
        
        post(`/company/${companyIdRef.current}/team`);
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
              placeholder='New Team'
            />
          </SheetContent>
        </Sheet>
    )
  }
  
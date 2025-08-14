import { useState } from "react";
import { SidebarMenuItem } from "../ui/sidebar";
import { ChevronDown, ChevronDownIcon, ChevronRight, LoaderCircle, LucideIcon } from "lucide-react";
import { Plus } from "lucide-react";
import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"

import { cn } from "@/lib/utils"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
  } from "@/components/ui/accordion"
import { SheetCompany } from "../popup/sheetCompany";
import { Company } from "@/types";

export function WorkSpaceContent ({
    getDatas,
    datas,
    name,
    loading
}:{
    name: string
    datas: Company[]
    getDatas: () =>  void,
    loading: boolean
}) {
    const [active, setActive] = useState<boolean>(false);

    return (
        <section>
            <SidebarMenuItem key={name} className={`flex items-center justify-between ${active ? 'text-btnColor' : 'text-sidebarText'}`}>
            <Accordion
                type="single"
                collapsible
                defaultValue=""
                className="w-full p-0"
            >
                 <AccordionItem value="item-1">
                <AccordionTrigger className="cursor-pointer w-full">
                    <div onClick={() => {
                        console.log('hello')
                        getDatas()
                        active ? setActive(false) : setActive(true)
                    }} className="text-sm text-textprimary2 space-x-2">
                        <p>{name}</p>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                    {active &&
                    <>
                        {loading ? 
                        <LoaderCircle className="h-4 w-4 animate-spin " />
                        :
                        <div>
                        {datas?.map((company, index) => (
                        <div onClick={() => {
                            if (company.id) {
                                localStorage.setItem('company_name', company.name)
                                localStorage.setItem('company_id', `${company.id}`)
                                window.location.assign(`/company/${company.id}`)
                            }
                        }} key={index} className="rounded text-sm py-1 cursor-pointer hover:bg-todoprimary">
                            <div 
                            className="block rounded "
                            onClick={() => {}}>
                                <ul className="w-full space-x-2 pl-8 text-textprimary overflow-hidden text-ellipsis whitespace-nowrap flex items-center">
                                    <div className="flex items-center justify-center bg-neutral-700 cursor-pointer font-normal border-none text-sm text-textprimary2 h-6 w-6 !rounded">
                                        <p>{company.name.slice(0, 1)}</p>
                                    </div>
                                    <li><p className="text-sm">{company.name}</p></li>
                                </ul>
                            </div>
                        </div>
                        ))}
                    </div>
                        }
                    </>
                    }
                </AccordionContent>
                </AccordionItem>
            </Accordion>
            </SidebarMenuItem>
            
        </section>
    )
}

type customTriggerType = {
    className: string,
    children: React.ReactNode,
    icon?: LucideIcon
}

function AccordionTrigger({
  className,
  children,
  icon,
  ...props
}:customTriggerType) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex py-2 flex-1  gap-4 rounded-md items-center text-left text-sm font-medium transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
        <div className="flex-1">
            {children}
        </div>
        
        <SheetCompany>
            <div className="flex items-center justify-center bg-todosecondary hover:bg-todoprimary cursor-pointer font-normal border-none text-sm text-textprimary2 h-6 w-6 !rounded">
                <Plus size={16} />
            </div>
        </SheetCompany>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}
"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"

export function ProjectCombobox({children}:{children: React.ReactNode}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [projects, setProjects] = useState<any[]>([])

  function fetchProjects () {

  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" side="top" align="start" forceMount>
        <Command>
          <CommandInput placeholder="Search Project..." className="h-9" />
          <CommandList>
            <CommandEmpty></CommandEmpty>
            <CommandGroup>
              {projects.map((project) => (
                <CommandItem
                  key={project.value}
                  value={project.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {project.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === project.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
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

interface PriorityComboboxProps {
  btnClass: string;
  className: string;
  value?: "high" | "medium" | "low";
  onChange?: (value: "high" | "medium" | "low") => void;
  processing?: boolean
}


const frameworks = [
  {
    value: "high",
    label: "high",
  },
  {
    value: "medium",
    label: "medium",
  },
  {
    value: "low",
    label: "low",
  },
]

function PriorityBadge ({
  state = 'medium'
}:{
  state?: string
}) {
  return (
    <div className={cn("flex items-center px-2 space-x-2  bg-secondary rounded", 
        state.toLowerCase() === 'high' && "bg-[rgba(161,161,170,.5)]",
        state.toLowerCase() === 'medium' && "bg-[rgba(250,96,116,.5)]",
        state.toLowerCase() === 'low' && 'bg-[rgba(215,130,255,.4)]'
   )}>

      <p>{state}</p>
    </div>
  )
}

export function PriorityCombobox({ btnClass, className, value, onChange, processing }: PriorityComboboxProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={processing}>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className={btnClass}
        >
          {value
            ? <PriorityBadge state={frameworks.find((framework) => framework.value === value)?.label} />
            : <PriorityBadge />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={className} side="top" align="start" forceMount>
        <Command className="bg-todoprimary">
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty></CommandEmpty>
            <CommandGroup>
              {frameworks.map((option) => (
                 <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue: string) => {
                      if (onChange) {
                        onChange(currentValue as "high" | "medium" | "low")
                      }
                      setOpen(false)
                    }}
                  >
                  <PriorityBadge state={option.label} />
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
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
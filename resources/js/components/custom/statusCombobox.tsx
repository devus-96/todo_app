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
import { Badge } from "../ui/badge"

const statusOptions = [
  {
    value: "not started",
    label: "not started",
  },
  {
    value: "paused",
    label: "paused",
  },
  {
    value: "cancel",
    label: "canceled",
  },
  {
    value: "in progress",
    label: "in progress",
  },
  {
    value: "done",
    label: "done",
  },
]

function StateBadge({
  state = 'not started'
}: {
  state?: string
}) {
  return (
    <div className="flex items-center px-2 space-x-2 bg-secondary rounded-full">
      <Badge className={cn("w-3 h-3 rounded-full px-1 tabular-nums", 
                     state.toLowerCase() === 'not started' && "bg-[rgba(161,161,170,.5)]",
                     state.toLowerCase() === 'cancel' && "bg-[rgba(250,96,116,.5)]",
                     state.toLowerCase() === 'done' && "bg-[rgba(52,211,153,.5)]",
                     state.toLowerCase() === 'in progress' && "bg-[rgba(251,191,36,.8)]",
                     state.toLowerCase() === 'paused' && 'bg-[rgba(215,130,255,.4)]'
                )}>
      </Badge>
      <p>{state}</p>
    </div>
  )
}

interface StatusComboboxProps {
  btnClass: string;
  className: string;
  value?: "not started" | "paused" | "canceled" | "in progress" | "done";
  onChange?: (value: "not started" | "paused" | "canceled" | "in progress" | "done") => void;
  processing?: boolean
}

export function StatusCombobox({ btnClass, className, value, onChange, processing }: StatusComboboxProps) {
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
          <StateBadge state={value || 'not started'} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={className} side="top" align="start" forceMount>
        <Command className="bg-todoprimary">
          <CommandInput placeholder="Search status..." className="h-9" />
          <CommandList>
            <CommandEmpty>No status found</CommandEmpty>
            <CommandGroup>
              {statusOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    if (onChange) {
                      onChange(currentValue as "not started" | "paused" | "canceled" | "in progress" | "done")
                    }
                    setOpen(false)
                  }}
                >
                  <StateBadge state={option.label} />
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
"use client"

import * as React from "react"
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
import { LoaderCircle } from "lucide-react"

interface TeamComboboxProps {
  btnClass?: string;
  className?: string;
  value?: number[] | null;
  onChange?: (value: number[]) => void;
  setMenbers?: React.Dispatch<React.SetStateAction<{id: number; email: string;}[]>>
}
export const emails = [
    {
        id: 1,
        email: 'marcdeus@gmail.com',
    },
    {
        id: 2,
        email: "austinndjom@gmail.com",
    },
    {
        id: 3,
        email: "fsadfdsafdf@gmail.com",
    },
    {
        id: 4,
        email: "dsfdsfsdfsd@gmail.com",
    },
    {
        id: 6,
        email: "irorororor@gmail",
    },
    {
        id: 7,
        email: "sdsaooorje@gmail.com",
    },
    {
        id: 8,
        email: "qwjjejejrrr@gmail.com",
    },
    {
        id: 8,
        email: "eriowerjewoijr@gmail.com",
    },
]

export function TeamCombobox({ btnClass, className, value, onChange, setMenbers }: TeamComboboxProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <section>
        <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className={btnClass}
            >
                <div>Add participants</div>
            </Button>
        </PopoverTrigger>
        <PopoverContent className={className} side="top" align="start" forceMount>
            <Command className="bg-todoprimary">
            <CommandInput placeholder="Search framework..." className="h-9" />
            <CommandList>
                <CommandEmpty></CommandEmpty>
                <CommandGroup>
                {emails ? emails.map((option, index) => (
                    <CommandItem
                        key={option.id}
                        value={option.email}
                        onSelect={(currentValue) => {
                        if (onChange) {
                            if (value) {
                                onChange([...value, emails[index].id])
                            }
                            if (setMenbers) setMenbers((prev) => [...prev, emails[index]])
                        }
                        setOpen(false)
                        }}
                    >
                        <p>{option.email}</p>
                    </CommandItem>
                )) : <LoaderCircle className="h-4 w-4 animate-spin" />}
                </CommandGroup>
            </CommandList>
            </Command>
        </PopoverContent>
        </Popover>
    </section>
    
  )
}
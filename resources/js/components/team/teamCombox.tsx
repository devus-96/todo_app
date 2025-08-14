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
  value?: string;
  onChange?: (value: string[]) => void;
  setMenbers?: React.Dispatch<React.SetStateAction<string[]>>
}
export const emails = [
    'marcdeus@gmail.com',
    "austinndjom@gmail.com",
    "fsadfdsafdf@gmail.com",
    "dsfdsfsdfsd@gmail.com",
    "irorororor@gmail",
    "sdsaooorje@gmail.com",
    "qwjjejejrrr@gmail.com",
    "eriowerjewoijr@gmail.com"
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
                {emails ? emails.map((option) => (
                    <CommandItem
                        key={option}
                        value={option}
                        onSelect={(currentValue: string) => {
                        if (onChange) {
                            let newvalue = [] as string[]
                            if (value) {
                                let arr_value = JSON.parse(value) as string[]
                                if (!arr_value.includes(currentValue)) {
                                    newvalue = [...arr_value, currentValue]
                                }
                            } else {
                                newvalue = [currentValue]
                            }
                            onChange(newvalue)
                            if (setMenbers) setMenbers(newvalue)
                        }
                        setOpen(false)
                        }}
                    >
                        <p>{option}</p>
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
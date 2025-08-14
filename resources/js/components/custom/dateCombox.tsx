"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"

interface DateComboxProps {
  className?: string;
  value?: string;
  onChange: (value: string) => void;
  processing?: boolean
}

export function DateCombox({ className, value, onChange, processing }: DateComboxProps) {
  const [open, setOpen] = React.useState(false)
  
  // Convertit la valeur string en Date pour le calendrier
  const selectedDate = value ? new Date(value) : undefined
  
  // Formatte la date pour l'affichage
  const displayDate = selectedDate 
    ? format(selectedDate, "PPP") 
    : "Select a date"
    
  return (
    <div className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={processing}>
          <Button
            variant="ghost"
            id="date"
            className="justify-between font-normal w-full border-none text-sm"
          >
            {displayDate}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              if (date) {
                onChange(format(date, 'yyyy-MM-dd'))
              }
              setOpen(false)
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
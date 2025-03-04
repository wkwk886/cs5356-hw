import React, { useState } from "react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export function DatePicker({ date, onDateChange, className }) {
  const [open, setOpen] = useState(false)
  
  const handleSelect = (selectedDate) => {
    onDateChange(selectedDate)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex h-9 items-center rounded-md border border-input bg-background px-3 text-sm",
            "hover:bg-accent hover:text-accent-foreground",
            !date && "text-muted-foreground",
            className
          )}
        >
          {date ? format(date, "PPP") : "Set due date"}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker;
"use client";

import {compareAsc, format, isSameDay} from "date-fns";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {CalendarIcon} from "lucide-react";
import {useState} from "react";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {Id} from "@/convex/_generated/dataModel";
import {toast} from "sonner";

type DayePickerProps = {
  dueDate: string | undefined;
  id: Id<"actionItems">;
  task: string;
  creationDate: Date;
};

export const DatePicker = ({dueDate, id, task, creationDate}: DayePickerProps) => {
  const updatActionItemDueDate = useMutation(api.audio.updatActionItemDueDate);

  const [date, setDate] = useState<Date | undefined>(() => {
    if (dueDate) return new Date(dueDate);
    return undefined;
  });

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleSelectDate = async (selectedDate: Date | undefined) => {
    setIsCalendarOpen(false);
    if (!selectedDate) return;

    const isSameDate = isSameDay(selectedDate, creationDate);
    if (!isSameDate && selectedDate < creationDate) {
      toast.error("Due Date cannot precede the creation of the action item.");
      return;
    }

    if (selectedDate) {
      setDate(selectedDate);
      await updatActionItemDueDate({id, dueDate: selectedDate.toISOString()});
      toast.success(`Due date set for ${task}`);
    }
  };

  return (
    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
      <PopoverTrigger asChild>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setIsCalendarOpen(!isCalendarOpen);
          }}
          variant={"outline"}
          className={cn(" justify-start text-left font-normal", !date && "text-muted-foreground")}
        >
          {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
          {date ? format(date, "PPP") : <span>Pick a due date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0"
        align="start"
        onKeyDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Calendar mode="single" selected={date} onSelect={handleSelectDate} initialFocus />
      </PopoverContent>
    </Popover>
  );
};

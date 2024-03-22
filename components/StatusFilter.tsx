"use client";

import * as React from "react";
import {Check, CheckIcon, ChevronsUpDown} from "lucide-react";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Status} from "@/app/(protected)/actionitems/page";

const statusList: {
  value: Status;
  label: string;
}[] = [
  {
    value: "done",
    label: "Done",
  },
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "all",
    label: "Show All",
  },
];

export function StatusFilter({
  status,
  handleFilterActionItems,
}: {
  status: Status;
  handleFilterActionItems: (status: Status) => void;
}) {
  const [open, setOpen] = React.useState(false);

  const getDisplayTitle = () => {
    if (status === "unset") return "Filter Status...";
    const label = statusList.find((currentStatus) => currentStatus.value === status)?.label;
    return label;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
          size="sm"
        >
          {getDisplayTitle()}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Select Status" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {statusList.map((currentStatus) => (
                <CommandItem
                  key={currentStatus.label}
                  value={currentStatus.value}
                  onSelect={(currentValue) => {
                    console.log(currentValue);
                    handleFilterActionItems(currentValue as Status);
                    setOpen(false);
                  }}
                >
                  {currentStatus.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      status === currentStatus.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

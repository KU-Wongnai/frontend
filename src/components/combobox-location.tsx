"use client";

import * as React from "react";
import { Check, ChevronsUpDown, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";

const bars = [
  {
    value: "new bar",
    label: "New bar",
  },
  {
    value: "newer bar",
    label: "Newer bar",
  },
  {
    value: "old bar",
    label: "Old bar",
  },
  {
    value: "science bar",
    label: "Science bar",
  },
  {
    value: "engineering bar",
    label: "Engineering bar",
  },
];

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-green-600 rounded-full text-white hover:bg-green-700 hover:text-white h-[45px]"
        >
          <MapPin className="w-4 h-4" />
          {value
            ? bars.find((bar) => bar.value === value)?.label
            : "Where to eat?"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search bar..." />
          <CommandEmpty>No bar found.</CommandEmpty>
          <CommandGroup>
            {bars.map((bar) => (
              <CommandItem
                key={bar.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  if (currentValue !== value) {
                    router.push(`/search?location=${currentValue}`); // เปลี่ยนเส้นทางโดยเพิ่ม query parameter
                  }
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === bar.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {bar.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

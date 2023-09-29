"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

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

import { ChatUser, ComboboxChatUserProps } from "../interfaces/conversations";

export function ComboboxChatUser({ data, onSelect }: ComboboxChatUserProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<number | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredUsers = searchQuery
    ? data.filter((user) => user.name.includes(searchQuery))
    : data;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? data.find((user) => user.id === value)?.name
            : "Select user..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search user..." />
          <CommandEmpty>No user found.</CommandEmpty>
          <CommandGroup>
            {filteredUsers.map((user: ChatUser) => (
              <CommandItem
                key={user.id}
                onSelect={() => {
                  if (value === user.id) {
                    onSelect(null);
                    setValue(null);
                  } else {
                    onSelect(user);
                    setValue(user.id);
                  }
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === user.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {user.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

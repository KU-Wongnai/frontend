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
import { useRouter, useSearchParams } from "next/navigation";
import foodCenters from "@/data/food-center.json";
import Image from "next/image";
import Link from "next/link";

// const bars = [
//   {
//     value: "new bar",
//     label: "New bar",
//   },
//   {
//     value: "newer bar",
//     label: "Newer bar",
//   },
//   {
//     value: "old bar",
//     label: "Old bar",
//   },
//   {
//     value: "science bar",
//     label: "Science bar",
//   },
//   {
//     value: "engineering bar",
//     label: "Engineering bar",
//   },
// ];

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const [value, setValue] = React.useState(searchParams.get("location") ?? "");
  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full flex justify-start bg-green-600 rounded-full text-white hover:bg-green-700 hover:text-white h-[45px]"
        >
          <MapPin className="w-4 h-4" />
          <span className="ml-2 whitespace-nowrap overflow-hidden w-[13ch] text-left">
            {value
              ? foodCenters.find((bar) => bar.id === +value)?.name
              : "Where to eat?"}
          </span>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <div className="p-4">
          <h2 className="font-semibold mb-3">Most Popular</h2>
          <div className="flex gap-2 w-full">
            {foodCenters
              .filter((bar) => bar.popular)
              .map((bar) => (
                <button
                  className="group block w-full relative overflow-hidden h-[175px] rounded-sm bg-black"
                  key={bar.name}
                  onClick={() => {
                    setOpen(false);
                    setValue(bar.id.toString());
                    router.push(
                      `/search?name=${
                        searchParams.get("name") || ""
                      }&location=${bar.name}`
                    ); // เปลี่ยนเส้นทางโดยเพิ่ม query parameter
                  }}
                >
                  <Image
                    fill={true}
                    src={bar.image}
                    alt={bar.name}
                    className="w-full h-full object-cover opacity-75 group-hover:opacity-60 group-hover:scale-105 duration-300"
                  />
                  <span className="top-0 left-0 absolute text-sm font-semibold text-white p-2">
                    {bar.shortName}
                  </span>
                </button>
              ))}
          </div>
        </div>
        <Command>
          <CommandInput placeholder="Search bar..." />
          <CommandEmpty>No bar found.</CommandEmpty>
          <CommandGroup className="max-h-[400px] overflow-auto">
            {foodCenters.map((bar) => (
              <CommandItem
                key={bar.id}
                value={bar.name}
                onSelect={() => {
                  setValue(bar.id.toString());
                  setOpen(false);
                  router.push(
                    `/search?name=${searchParams.get("name") || ""}&location=${
                      bar.name
                    }`
                  ); // เปลี่ยนเส้นทางโดยเพิ่ม query parameter
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === bar.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {bar.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

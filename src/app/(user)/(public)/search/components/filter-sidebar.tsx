"use client";

import Link from "next/link";
import foodCenters from "@/data/food-center.json";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export default function SearchSideBar() {
  const searchParams = useSearchParams();

  const types = [
    {
      id: "1",
      name: "Korean",
    },
    {
      id: "2",
      name: "Japanese",
    },
    {
      id: "3",
      name: "Chinese",
    },
  ];

  return (
    <div className="flex flex-row w-full md:w-1/5 md:flex-col mr-0 md:mr-5 bg-card border p-3 rounded-md shadow-sm mb-3">
      <div className="flex flex-col w-full pb-4 border-none md:border-b">
        <h1 className="mb-2 font-bold">Location</h1>
        {foodCenters.map((location) => (
          <Link
            href={`/search?name=${searchParams.get("name") || ""}&location=${
              location.id
            }`}
            className={cn(
              "font-light capitalize text-sm mt-2 hover:text-primary ml-3",
              location.id === +searchParams.get("location")!
                ? "text-primary"
                : ""
            )}
            key={location.id}
          >
            {location.name}
          </Link>
        ))}
      </div>
      <div className="flex flex-col w-full pb-4 mt-0 md:mt-3">
        <h1 className="mb-2 font-bold">Type</h1>
        {types.map((type) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                type: type.name,
              },
            }}
            className="font-light capitalize text-sm mt-1 ml-3"
            key={type.id}
          >
            {type.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

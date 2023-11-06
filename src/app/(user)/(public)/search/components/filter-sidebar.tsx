"use client";

import Link from "next/link";
import foodCenters from "@/data/food-center.json";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export default function SearchSideBar() {
  const searchParams = useSearchParams();

  return (
    <div className="flex flex-row w-full lg:w-1/5 lg:flex-col mr-0 lg:mr-5 bg-card border p-3 rounded-md shadow-sm mb-3">
      <div className="flex flex-col w-full pb-4 border-none md:border-b">
        <h1 className="mb-2 font-bold">Location</h1>
        {foodCenters.map((location) => (
          <Link
            href={`/search?name=${searchParams.get("name") || ""}&location=${
              location.name
            }&categories=${searchParams.get("categories")}`}
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
    </div>
  );
}

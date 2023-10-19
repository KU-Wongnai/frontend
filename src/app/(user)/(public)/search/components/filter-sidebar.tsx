"use client";

import Link from "next/link";

export default function SearchSideBar() {
  const locations = [
    {
      id: "1",
      name: "New bar",
    },
    {
      id: "2",
      name: "Newer bar",
    },
    {
      id: "3",
      name: "Old bar",
    },
    {
      id: "4",
      name: "Science bar",
    },
    {
      id: "5",
      name: "Engineering bar",
    },
  ];

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
    <div className="flex flex-row w-full md:w-1/5 md:flex-col mr-5 bg-card border p-3 rounded-md shadow-sm">
      <div className="flex flex-col w-full pb-4 border-b">
        <h1 className="mb-2 text-lg font-extrabold">Location</h1>
        {locations.map((location) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                location: location.name,
              },
            }}
            className="font-light capitalize text-reg ml-3"
            key={location.id}
          >
            {location.name}
          </Link>
        ))}
      </div>
      <div className="flex flex-col w-full pb-4 mt-0 border-b md:mt-3">
        <h1 className="mb-2 text-lg font-extrabold">Type</h1>
        {types.map((type) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                type: type.name,
              },
            }}
            className="font-light capitalize text-reg ml-3"
            key={type.id}
          >
            {type.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

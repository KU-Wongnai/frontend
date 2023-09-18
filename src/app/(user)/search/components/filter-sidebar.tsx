import Link from "next/link";

export default function SearchSideBar(
) {

  const locations = [
    {
      id: "1",
      name: "Toronto",
    },
    {
      id: "2",
      name: "Mississauga",
    },
    {
      id: "3",
      name: "Scarborough",
    },
    {
      id: "4",
      name: "North York",
    },
    {
      id: "5",
      name: "Markham",
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

  const prices = [
    {
      price: "CHEAP",
      label: "$",
      className: "w-full p-2 font-light border rounded-l text-reg text-center",
    },
    {
      price: "REGULAR",
      label: "$$",
      className: "w-full p-2 font-light border text-reg text-center",
    },
    {
      price: "EXPENSIVE",
      label: "$$$",
      className: "w-full p-2 font-light border rounded-r text-reg text-center",
    },
  ];

  // generate key for map price
  const generateKey = (pre: string) => {
    return `${pre}_${new Date().getTime()}`;
  };

  return (
    <div className="flex flex-row w-full md:w-1/5 md:flex-col mr-5">
      <div className="flex flex-col w-full pb-4 border-b">
        <h1 className="mb-2">Location</h1>
        {locations.map((location) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                // ...searchParams, // spread operator to copy all the properties of searchParams
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
        <h1 className="mb-2">Type</h1>
        {types.map((type) => (
          <Link
            href={{
              pathname: "/search",
              query: {
                // ...searchParams,
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
      <div className="pb-4 mt-0 md:mt-3">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {prices.map(({ price, label, className }) => (
            <Link
              href={{
                pathname: "/search",
                query: {
                  // ...searchParams,
                  price,
                },
              }}
              className={className}
              key={generateKey(price)}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { SearchParams } from "@/types/search-params";
import SearchSideBar from "./components/filter-sidebar";
import RestaurantCardSearch from "./components/restaurant-card-search";
import { useEffect, useState } from "react";
import { getRestaurants } from "@/services/restaurant";
import { Restaurant } from "@/types/restaurant";
import foodCenters from "@/data/food-center.json";
import Image from "next/image";
import RestaurantCard from "./components/restaurant-card";
import { useSearchParams } from "next/navigation";

export default function Search() {
  const [restaurantData, setRestaurantData] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    (async () => {
      try {
        const restaurant = await getRestaurants();
        setRestaurantData(restaurant);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred.");
        }
      }
      setIsLoading(false);
    })();
  }, [searchParams]);

  const filterRestaurant = restaurantData.filter((restaurant) => {
    const name = searchParams.get("name")?.toLowerCase() || ""; // Use an empty string if 'name' is not present
    const location = searchParams.get("location")?.toLowerCase() || ""; // Use an empty string if 'location' is not present
    const categories = searchParams.get("categories")?.toLowerCase() || ""; // Use an empty string if 'categories' is not present

    return (
      restaurant.name.toLowerCase().includes(name) &&
      restaurant.location.toLowerCase().includes(location) &&
      restaurant.categories[0].toLowerCase().includes(categories)
    );
  });

  // const filterRestaurant = restaurantData;

  // console.log(restaurantData);
  const foodCenter = foodCenters.find(
    (f) => f.name === searchParams.get("location")!
  );
  // console.log("[location] = ", searchParams.get("location"));
  // console.log("[foodCenter] = ", foodCenter);

  const Title = () =>
    searchParams.get("name") ? (
      <>
        <span>&quot;{searchParams.get("name")}&quot;</span>
        <span className="ml-3 font-normal text-base text-muted-foreground">
          {filterRestaurant.length} Results
        </span>
      </>
    ) : (
      "All Restaurants"
    );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {foodCenter ? (
        <section className="w-full h-[300px] relative bg-black">
          <Image
            fill={true}
            src={foodCenter.image}
            alt="banner image"
            className="object-cover object-center opacity-50"
          />
          <div className="container flex flex-col justify-center h-full absolute">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
              {foodCenter.name}
            </h1>
          </div>
        </section>
      ) : (
        <section className="w-full h-[300px] relative bg-black">
          <Image
            fill={true}
            src="https://images.unsplash.com/photo-1517322479358-df90f951f87d?auto=format&fit=crop&q=80&w=2970&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="banner image"
            className="object-cover object-center opacity-50"
          />
          <div className="container flex flex-col justify-center h-full absolute">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
              Everywhere around KU
            </h1>
          </div>
        </section>
      )}
      <main className="container mx-auto py-6 px-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">
          <Title />
        </h2>
        <div className="flex flex-col items-center justify-center pb-4 m-auto lg:items-start lg:justify-start lg:flex-row">
          <SearchSideBar />
          <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filterRestaurant ? (
              filterRestaurant.map((restaurant) => (
                <RestaurantCard restaurant={restaurant} key={restaurant.id} />
              ))
            ) : (
              <p>No restaurant found</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

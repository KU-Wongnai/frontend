"use client";

import { SearchParams } from "@/interfaces/search-params";
import SearchSideBar from "./components/filter-sidebar";
import RestaurantCardSearch from "./components/restaurant-card-search";
import { useEffect, useState } from "react";
import { getRestaurants } from "@/services/restaurant";

export default function Search({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [restaurantData, setRestaurantData] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    return (
      restaurant.name
        .toLowerCase()
        .includes(searchParams.name?.toLowerCase() ?? "") &&
      restaurant.foodType
        .toLowerCase()
        .includes(searchParams.type?.toLowerCase() ?? "") &&
      restaurant.location
        .toLowerCase()
        .includes(searchParams.location?.toLowerCase() ?? "")
    );
  });

  console.log(restaurantData);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="container mx-auto py-6 px-4 sm:px-0">
      <div className="flex flex-col items-center justify-center w-11/12 pb-4 m-auto md:items-start md:justify-between md:flex-row">
        <SearchSideBar />
        <div className="w-full">
          {filterRestaurant ? (
            filterRestaurant.map((restaurant) => (
              <RestaurantCardSearch
                key={restaurant.id}
                id={restaurant.id}
                name={restaurant.name}
                foodType={restaurant.foodType}
                image={restaurant.image}
                description={restaurant.description}
                location={restaurant.location}
                contactInfo={restaurant.contactInfo}
                menus={restaurant.menus}
                rating={restaurant.rating}
              />
            ))
          ) : (
            <p>No restaurant found</p>
          )}
        </div>
      </div>
    </main>
  );
}

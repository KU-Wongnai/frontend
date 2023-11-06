"use client";

import React, { useEffect, useState } from "react";
import RestaurantCard from "@/components/restaurant-card";
import { getRestaurants } from "@/services/restaurant";
import Image from "next/image";
import NoRestaurantBro from "@/assets/undraw/undraw_chef_cu-0-r.svg";
import { Restaurant } from "@/types/restaurant";
import RestaurantListSkeleton from "./restaurant-list-skeleton";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = React.useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const allRestaurants = await getRestaurants();
      console.log(allRestaurants);
      setRestaurants(allRestaurants);
    };
    fetchRestaurants();
    setLoading(false);
  }, []);

  const isEmpty = restaurants.length === 0;

  return (
    <>
      {loading ? (
        <RestaurantListSkeleton />
      ) : restaurants.length === 0 ? (
        <div className="flex flex-col justify-center items-center col-span-full p-8">
          <Image
            src={NoRestaurantBro}
            alt="No review available"
            width={300}
            height={300}
          />
          <h1 className="text-3xl font-bold  mt-4">No restaurant available</h1>
          <p className="text-lg text-gray-400 mt-2">
            We&apos;re sorry for the inconvenience, let&apos;s be join us and
            add your restaurant.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {restaurants.map((restaurant: Restaurant) => (
            <RestaurantCard key={restaurant.id} {...restaurant} />
          ))}
        </div>
      )}
    </>
  );
};

export default RestaurantList;

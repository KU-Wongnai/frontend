"use client";

import React, { useEffect, useState } from "react";
import RestaurantCard from "@/components/restaurant-card";
import Image from "next/image";
import NoRestaurantBro from "@/assets/undraw/undraw_chef_cu-0-r.svg";
import { Restaurant } from "@/types/restaurant";
import MyRestaurantListSkeleton
    from "@/app/(user)/(protected)/merchant/restaurants/components/my-restaurant-list-skeleton";
import {getMyRestaurants} from "@/services/restaurant";

const MyRestaurantList = () => {
    const [restaurants, setRestaurants] = React.useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const fetchRestaurants = async () => {
        const myRestaurants = await getMyRestaurants();
        console.log(myRestaurants);
        setRestaurants(myRestaurants);
    };
    useEffect(() => {
        fetchRestaurants();
        setLoading(false);
    }, []);

    const isEmpty = restaurants.length === 0;

    return (
        <>
            {loading ? (
                <MyRestaurantListSkeleton />
            ) : restaurants.length === 0 ? (
                <div className="flex flex-col justify-center items-center col-span-full p-8">
                    <Image
                        src={NoRestaurantBro}
                        alt="You have no restaurant"
                        width={300}
                        height={300}
                    />
                    <h1 className="text-3xl font-bold  mt-4">You have no restaurant</h1>
                    <p className="text-lg text-gray-400 mt-2">
                        You currently don&apos;t own any restaurant, let&apos;s add your restaurant.
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

export default MyRestaurantList;
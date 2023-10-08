"use client";

import React, { useEffect } from "react";
import RestaurantCard from "@/components/restaurant-card";
import { getRestaurants } from "@/services/restaurant";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = React.useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const allRestaurants = await getRestaurants();
      console.log(allRestaurants);
      setRestaurants(allRestaurants);
    };
    fetchRestaurants();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {restaurants.map((restaurant: Restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          id={restaurant.id}
          description={restaurant.description}
          location={restaurant.location}
          // operatingHours={restaurant.operatingHours}
          contactInfo={restaurant.contactInfo}
          image={restaurant.image}
          name={restaurant.name}
          foodType={restaurant.foodType}
          rating={restaurant.rating}
          menus={restaurant.menus}
        />
      ))}
    </div>
  );
};

export default RestaurantList;

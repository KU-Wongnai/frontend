"use client";

import React, { useEffect } from "react";
import FoodCard from "./food-card";
import { getRestaurantMenu } from "@/services/restaurant";

const FoodCardList = ({ id }: { id: number }) => {
  const [menus, setMenus] = React.useState<Menu[]>([]);

  useEffect(() => {
    const fetchMenus = async () => {
      const menus = await getRestaurantMenu(id);
      console.log(menus);
      setMenus(menus);
    };
    fetchMenus();
  }, [id]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-4">
      {menus.map((menu) => (
        <FoodCard
          id={menu.id}
          key={menu.id}
          name={menu.name}
          description={menu.description}
          image={menu.image}
          price={menu.price}
          category={menu.category}
          menuOptions={menu.menuOptions}
        />
      ))}
    </div>
  );
};

export default FoodCardList;

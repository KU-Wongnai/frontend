"use client";

import React, { useEffect } from "react";
import MenuCard from "./menu-card";
import { getRestaurantMenu } from "@/services/restaurant";
import Image from "next/image";
import NoMenuBro from "@/assets/undraw/undraw_barbecue_3x93.svg";
import { Menu } from "@/types/restaurant";
import MenuDrawer from "./menu-drawer";

const MenuCardList = ({ id }: { id: number }) => {
  const [menus, setMenus] = React.useState<Menu[]>([]);

  useEffect(() => {
    const fetchMenus = async () => {
      const menus = await getRestaurantMenu(id);
      console.log(menus);
      setMenus(menus);
    };
    fetchMenus();
  }, [id]);

  const isEmpty = menus.length === 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {isEmpty ? (
        <div className="flex flex-col justify-center items-center col-span-full p-8">
          <Image
            src={NoMenuBro}
            alt="No menu available"
            width={300}
            height={300}
          />
          <h1 className="text-3xl font-bold  mt-4">No menu available</h1>
          <p className="text-lg text-gray-400 mt-2">
            We&apos;re sorry for the inconvenience, please check back later.
          </p>
        </div>
      ) : (
        menus.map((menu) => (
          <MenuDrawer
            key={menu.id}
            menu={menu}
            trigger={
              <MenuCard
                id={menu.id}
                key={menu.id}
                name={menu.name}
                description={menu.description}
                image={menu.image}
                price={menu.price}
                category={menu.category}
                menuOptions={menu.menuOptions}
              />
            }
          />
        ))
      )}
    </div>
  );
};

export default MenuCardList;

"use client";
import RestaurantMenuCard from "@/app/(user)/(protected)/merchant/restaurants/components/menu-card-restaurant";
import TagTitle from "@/components/tag-title";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import FoodCategoryCard from "../../components/food-category-card";
import { useParams } from "next/navigation";
import {
  getRestaurantCategories,
  getRestaurantMenu,
} from "@/services/restaurant";
import { Menu } from "@/types/restaurant";
type Props = {};

const FoodManagement = (props: Props) => {
  const params = useParams();

  const [menus, setMenus] = React.useState<Menu[]>([]);
  const [noFilterMenus, setNoFilterMenus] = React.useState<Menu[]>([]);
  const [categories, setCategories] = React.useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchRestaurantCategories = async () => {
    const allRestaurantCategories = await getRestaurantCategories(
      Number(params.restaurant_id)
    );
    console.log(allRestaurantCategories);
    const newCategories = ["All", ...allRestaurantCategories];
    setCategories(newCategories);
  };

  const fetchRestaurantMenus = async () => {
    const allRestaurantMenu = await getRestaurantMenu(
      Number(params.restaurant_id)
    );
    console.log(allRestaurantMenu);
    setNoFilterMenus(allRestaurantMenu);
    setMenus(allRestaurantMenu);
  };

  useEffect(() => {
    fetchRestaurantMenus();
    fetchRestaurantCategories();
    setLoading(false);
  }, []);

  const [currentPage, setCurrentPage] = useState<string>("All");
  let filteredFoodData = menus;

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    filteredFoodData = noFilterMenus.filter(
      (item) => item.category.toLocaleLowerCase() == page.toLocaleLowerCase()
    );
    console.log(filteredFoodData);

    setMenus(filteredFoodData);
    if (page === "All") {
      setMenus(noFilterMenus);
    }
  };

  return (
    <div className="container py-[40px] px-40 ">
      <div className="bg-card rounded-[12px] shadow-md py-12 px-14">
        {/* Tag Topic (Food) */}
        <div className="flex justify-between items-center">
          <div className="flex">
            <TagTitle />
            <div className="flex flex-col">
              <p className="font-bold text-2xl py-2">Food</p>
              <p className="font-light text-md text-gray-500">
                restaurant menu
              </p>
            </div>
          </div>
          <Link
            href={`/merchant/restaurants/${params.restaurant_id}/menus/add-menu`}
            className="text-green-600 font-normal rounded-2xl border-green-600 border-2 py-1 px-3"
          >
            <p>+ Add Food</p>
          </Link>
        </div>
        {/* for category card bar */}
        <div className="m-8 flex gap-5 overflow-x-auto whitespace-nowrap px-2 py-2 no-scrollbar ">
          {categories.map((category: any, index) => {
            const categoryMenus = noFilterMenus.filter(
              (menu) => menu.category === category
            );
            let itemTotal = categoryMenus.length;
            if(category === "All"){
              itemTotal = noFilterMenus.length;
            }
            return (
              <FoodCategoryCard
                key={index}
                name={category}
                itemTotal={itemTotal}
                currentPage={currentPage}
                onClick={(page: string) => handlePageChange(page)}
              />
            );
          })}
        </div>
        <div className="overflow-y-auto max-h-[30rem]">
          <div className="flex flex-wrap ml-2 mr-1 px-2">
            {menus.map((menu: Menu) => (
              <RestaurantMenuCard key={menu.id} {...menu} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodManagement;

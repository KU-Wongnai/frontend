"use client";
import TagTitle from "@/components/tag-title";
import React, { useState } from "react";
import { mockFoodData } from "../../../__mock__/menu-card";
import Link from "next/link";
import RestaurantMenuCard from "@/app/restaurant/components/menu-card-restaurant";
import { mockFoodCategoryData } from "@/app/__mock__/food-category";
import FoodCategoryCard from "../../components/food-category-card";
type Props = {};

const page = (props: Props) => {
  const [currentPage, setCurrentPage] = useState<string>("All");
  const [mockMenuData, setMockMenuData] = useState(mockFoodData);

  let filteredMockFoodData = mockFoodData;

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    filteredMockFoodData = mockFoodData.filter(
      (item) => item.category === page
    );
    setMockMenuData(filteredMockFoodData);
    if (page === "All") {
      setMockMenuData(mockFoodData);
    }
  };

  return (
    <div className="container py-[40px] px-40 ">
      <div className="bg-white  rounded-[12px] shadow-md py-12 px-14">
        {/* Tag Topic (Menu) */}
        <div className="flex justify-between items-center">
          <div className="flex">
            <TagTitle />
            <div className="flex flex-col">
              <p className="font-bold text-2xl py-2">Menu</p>
              <p className="font-light text-md text-gray-500">
                restaurant menu
              </p>
            </div>
          </div>
          <Link
            href="/restaurant/{id}/menus/add-menu"
            className="text-green-600 font-normal rounded-2xl border-green-600 border-2 py-1 px-3"
          >
            <p>+ Add Menu</p>
          </Link>
        </div>
        {/* for category card bar */}
        <div className="m-8 flex gap-5 overflow-x-auto whitespace-nowrap px-2 py-2 no-scrollbar ">
          {mockFoodCategoryData.map((category) => {
            return (
              <FoodCategoryCard
                key={category.id}
                id={category.id}
                emoji={category.emoji}
                name={category.name}
                itemTotal={category.itemTotal}
                decoration=""
                currentPage={currentPage}
                onClick={(page: string) => handlePageChange(page)}
              />
            );
          })}
        </div>
        <div className="overflow-y-auto max-h-[30rem]">
          <div className="flex flex-wrap ml-2 mr-1 px-2 ">
            {mockMenuData.map((food) => {
              console.log(food); // Add this line for debugging
              return (
                <RestaurantMenuCard
                  key={food.id}
                  id={food.id}
                  imageUrl={food.imageUrl}
                  name={food.name}
                  price={food.price}
                  category={food.category}
                  href={`/${food.id}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

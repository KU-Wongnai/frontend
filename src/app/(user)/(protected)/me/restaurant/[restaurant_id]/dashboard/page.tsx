"use client";
import { Avatar, AvatarImage } from "../../../../../../../components/ui/avatar";
import TagTitle from "@/components/tag-title";
import React, { useEffect, useState } from "react";
import RealTimeClock from "@/components/clock";

import { mockOrderData } from "../../../../../../../mock/order";
import OrderCard from "@/app/(user)/(protected)/me/restaurant/components/order-card-dashboard";
import RestaurantMenuCard from "@/app/(user)/(protected)/me/restaurant/components/menu-card-restaurant";
import { mockFoodCategoryData } from "@/mock/food-ype";
import FoodCategoryCard from "../../components/food-category-card";
import { mockMenuData } from "@/mock/menu-card";
type Props = {};

const RestaurantDashBoard = (props: Props) => {
  const [currentPage, setCurrentPage] = useState<string>("All");
  const [mockFoodData, setMockMenuData] = useState(mockMenuData);
  const itemsPerPage = 6;
  const totalItems = 30;
  let filteredMockFoodData = mockMenuData;

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    filteredMockFoodData = mockMenuData.filter(
      (item) => item.category === page
    );
    setMockMenuData(filteredMockFoodData);
    if (page === "All") {
      setMockMenuData(mockMenuData);
    }
  };

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage]);

  return (
    <div className="container py-10 px-28 ">
      <div>
        <p className="font-bold text-3xl">Restaurant Dashboard</p>
      </div>
      <div className="py-10 ">
        <div className="grid grid-cols-4 gap-5  h-full">
          {/* Menu Over All */}
          <div className="col-span-3 bg-card rounded-[12px] shadow-md py-12 px-14 flex flex-col justify-center items-center">
            {/* Tag Topic (Menu) */}
            <div className="w-full">
              <div className="flex">
                <div>
                  <TagTitle />
                </div>
                <div className="flex flex-col px-2 ">
                  <p className="font-bold text-2xl py-2">Menu</p>
                  <p className="font-light text-sm text-gray-500">
                    restaurant menu
                  </p>
                </div>
              </div>
            </div>
            {/* for category card bar */}
            <div className="m-8 flex gap-5 w-full overflow-x-auto whitespace-nowrap px-10 py-2 no-scrollbar">
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
                {mockFoodData.map((food) => {
                  // console.log(food); // Add this line for debugging
                  return (
                    <RestaurantMenuCard
                      key={food.id}
                      id={food.id}
                      imageUrl={food.imageUrl}
                      name={food.name}
                      price={food.price}
                      description={food.description}
                      category={food.category}
                      href={`/${food.id}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-8 h-full">
            <div className="bg-card w-300 rounded-[12px] p-4 shadow-md flex justify-center items-center">
              <RealTimeClock />
            </div>

            <div className="flex flex-col bg-card w-300 h-full rounded-[12px] shadow-md px-2 py-12">
              <div className="flex">
                <div>
                  <TagTitle />
                </div>
                <div className="flex flex-col">
                  <p className="font-bold text-xl py-2">Customer Order</p>
                  <p className="font-light text-sm text-gray-500">
                    restaurant order
                  </p>
                </div>
              </div>
              {/* mockData of Orderlist */}
              <div className="overflow-y-auto max-h-[30rem] mr-2">
                <div className="flex flex-wrap ml-1 mr-1 px-1 ">
                  {mockOrderData.map((order) => {
                    return (
                      <OrderCard
                        key={order.id}
                        id={order.id}
                        // customer={order.customer}
                        // totalItem={order.totalItems}
                        // orderID={order.orderID}
                        decoration="text-xs"
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashBoard;

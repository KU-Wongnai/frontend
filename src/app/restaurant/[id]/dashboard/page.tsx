"use client";
import { Avatar, AvatarImage } from "../../../../components/ui/avatar";
import TagTitle from "@/components/tag-title";
import React, { useState } from "react";
import RealTimeClock from "@/components/clock";
import { mockMenuData } from "../../../__mock__/menu-card";
import { mockOrderData } from "../../../__mock__/order";
import OrderCard from "@/app/restaurant/components/order-card-dashboard";
import RestaurantMenuCard from "@/app/restaurant/components/menu-card-restaurant";
type Props = {};

const RestaurantDashBoard = (props: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;
  const totalItems = 30;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container py-10 px-28 ">
      <div>
        <p className="font-bold text-3xl">Restaurant Dashboard</p>
      </div>
      <div className="py-10 ">
        <div className="grid grid-cols-4 gap-5  h-full">
          {/* Menu Over All */}
          <div className="col-span-3 bg-white  rounded-[12px] shadow-md py-12 px-14">
            {/* Tag Topic (Menu) */}
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
            {/* for category card bar */}
            <div className="m-8 flex gap-5 w-full ">
              <div className="shadow-md bg-green-500 rounded-sm h-[80px] w-[80px] px-4 flex flex-col justify-center items-center">
                <p className="text-2xl">🍣</p>
                <p className="text-sm text-white font-semibold">Sushi</p>
                <p className="text-xs text-white font-light">7 Items</p>
              </div>
              <div className="shadow-md bg-green-300 rounded-sm h-[80px] w-[80px] px-4 flex flex-col justify-center items-center">
                <p className="text-xl">🍜</p>
                <p className="text-sm text-gray-500 font-semibold">Noodle</p>
                <p className="text-xs text-gray-500 font-light">7 Items</p>
              </div>
              <div className="shadow-md bg-green-300 rounded-sm h-[80px] w-[80px] px-4 flex flex-col justify-center items-center">
                <p className="text-xl">🥗</p>
                <p className="text-sm text-gray-500 font-semibold">Salad</p>
                <p className="text-xs text-gray-500 font-light">7 Items</p>
              </div>
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
          <div className="flex flex-col space-y-8 h-full">
            <div className="bg-white w-300 rounded-[12px] p-4 shadow-md flex justify-center items-center">
              <RealTimeClock />
            </div>

            <div className="flex flex-col bg-white w-300 h-full rounded-[12px] shadow-md px-2 py-12">
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
                        customer={order.customer}
                        totalItem={order.totalItems}
                        orderID={order.orderID}
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

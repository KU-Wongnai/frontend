"use client";
import TagTitle from "@/components/tag-title";
import React, { useState } from "react";
import { mockFoodData } from "../../../__mock__/food-card";
import Link from "next/link";
import RestaurantMenuCard from "@/app/restaurant/components/menu-card-restaurant";
type Props = {}

const page = (props: Props) => {
  return (
    <div className="container py-[40px] px-40 ">
        <div className="col-span-3 bg-white  rounded-[12px] shadow-md py-12 px-14">
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
              <Link href="/restaurant/{id}/menus/add-menu" className="text-green-600 font-normal rounded-2xl border-green-600 border-2 py-1 px-3">
                <p>+ Add Menu</p>
              </Link>
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
                {mockFoodData.map((food) => {
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
  )
}

export default page
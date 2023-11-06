"use client";
import RestaurantFoodCard from "@/app/(user)/(protected)/merchant/restaurants/components/menu-card-restaurant";
import TagTitle from "@/components/tag-title";
import { mockFoodCategoryData } from "@/mock/food-ype";
import Link from "next/link";
import { useEffect, useState } from "react";
import { mockMenuData } from "../../../../../../../mock/menu-card";
import FoodCategoryCard from "../../components/food-category-card";
import { useParams, useRouter, useSearchParams } from "next/navigation";
type Props = {};

const FoodManagement = (props: Props) => {
  const [currentPage, setCurrentPage] = useState<string>("All");
  const [mockFoodData, setMockFoodData] = useState(mockMenuData);

  let filteredMockFoodData = mockMenuData;

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    filteredMockFoodData = mockMenuData.filter(
      (item) => item.category === page
    );
    setMockFoodData(filteredMockFoodData);
    if (page === "All") {
      setMockFoodData(mockMenuData);
    }
  };

  const params = useParams();

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
            href={`/me/restaurants/${params.restaurant_id}/menus/add-menu`}
            className="text-green-600 font-normal rounded-2xl border-green-600 border-2 py-1 px-3"
          >
            <p>+ Add Food</p>
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
            {mockFoodData.map((food) => {
              console.log(food); // Add this line for debugging
              return (
                <RestaurantFoodCard
                  key={food.id}
                  id={food.id}
                  imageUrl={food.imageUrl}
                  name={food.name}
                  price={food.price}
                  category={food.category}
                  description={food.description}
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

export default FoodManagement;

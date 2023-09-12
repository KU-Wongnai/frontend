import FoodCard from "@/components/food-card";
import { mockFoodData } from "@/app/__mock__/food-card";
import React from "react";
import FeatureIcon from "@/components/feature-icon";
import { mockRestaurants } from "@/app/__mock__/restaurant-card";
import RestaurantCardDetail from "@/components/restaurant-card-detail";
import { ChefHat, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import Image from "next/image";

interface RestaurantMenuPageProps {
  params: { id: string };
}

const RestaurantMenuPage: React.FC<RestaurantMenuPageProps> = ({ params }) => {
  const id = Number(params.id);

  const restaurantCard: RestaurantProps = mockRestaurants[id];
  const foodCards: FoodCardProps[] = mockFoodData;

  return (
    <>
      <FeatureIcon />
      <main className="container mx-auto py-6 px-2 sm:px-4 md:px-6 lg:px-8">
        {/* food card Horizontal */}
        <section className="w-full bg-card p-5 border shadow-sm rounded-lg">
          <div className="flex">
            {/* image */}
            <div className="relative filter brightness-90 shadow-md rounded-lg w-96 h-52">
              <Image
                src="https://images.unsplash.com/photo-1628294895950-9805252327bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="KU Wongnai"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            {/* detail */}
            <div className="flex flex-col ml-5">
              <div className="flex items-end gap-4">
                <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors">
                  Food Name {params.id}
                </h1>
                <span className="scroll-m-20 text-2xl font-semibold tracking-tight text-gray-500 pb-2">
                  Ran Che Daeng
                </span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-red-600 rounded-lg flex px-2 py-1 text-white w-fit gap-2 items-center">
                  <h2 className="text-lg font-semibold tracking-tight ">4.5</h2>
                  <Star className="w-5 h-5" />
                </div>
                <span>
                  <span className="text-xl font-semibold tracking-tight mb-3 text-gray-400">
                    100 reviews
                  </span>
                </span>
              </div>
              <div className="flex items-end gap-3 mb-3">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Category:
                </h2>
                <h3 className="text-xl font-semibold tracking-tight  text-gray-400">
                  Japanese
                </h3>
              </div>
              <div className="flex items-end gap-3 mb-3">
                <h2 className="text-2xl font-semibold tracking-tight">Price</h2>
                <h3 className="text-xl font-semibold tracking-tight text-gray-400">
                  20 $
                </h3>
              </div>
            </div>
          </div>
        </section>

        {/* all menu */}
        <section className="w-full bg-card pt-3 border shadow-sm rounded-lg p-5 mt-6">
          <div className="flex border-b mb-3 gap-2">
            <ChefHat className="text-green-600 w-8 h-8" />
            <h1 className="border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-primary">
              All menu
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-4">
            {foodCards.map((foodCard, index) => (
              <FoodCard key={index} {...foodCard} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default RestaurantMenuPage;

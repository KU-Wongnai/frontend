import FoodCard from "@/components/food-card";
import { mockFoodData } from "@/app/__mock__/food-card";
import React from "react";
import { mockRestaurants } from "@/app/__mock__/restaurant-card";
import { ChefHat, Star } from "lucide-react";
import RestaurantCardDetail from "@/app/(user)/restaurants/[restaurant_id]/components/restaurant-card-detail";

interface RestaurantMenuPageProps {
  params: { id: string };
}

const RestaurantMenuPage: React.FC<RestaurantMenuPageProps> = ({ params }) => {
  const id = Number(params.id);

  // const restaurantCard: RestaurantProps = mockRestaurants[id];
  const foodCards: FoodCardProps[] = mockFoodData;

  return (
    <main className="container mx-auto py-6 px-2 sm:px-4 md:px-6 lg:px-8">
      {/* food card Horizontal */}
      <RestaurantCardDetail
        id={0}
        name={""}
        foodType={""}
        rating={0}
        image={null}
        href={""}
        description={""}
        location={""}
        operatingHours={0}
        contactInfo={""}
        menus={[]}
      />

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
  );
};

export default RestaurantMenuPage;

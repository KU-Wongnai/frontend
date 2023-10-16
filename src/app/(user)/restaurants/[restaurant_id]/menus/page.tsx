import React, { useEffect } from "react";
import RestaurantCardDetail from "@/app/(user)/restaurants/[restaurant_id]/components/restaurant-card-detail";
import MenuCardList from "../components/menu-card-list";

type Props = {
  params: {
    restaurant_id: number;
    id: string;
  };
};

const RestaurantMenuPage: React.FC<Props> = ({
  params,
}: {
  params: {
    restaurant_id: number;
    id: string;
  };
}) => {
  return (
    <main className="container mx-auto py-6 px-2 sm:px-4 md:px-6 lg:px-8">
      {/* food card Horizontal */}
      <RestaurantCardDetail id={params.restaurant_id} />

      {/* all menu */}
      <section className="w-full bg-card pt-3 border shadow-sm rounded-lg p-5 mt-6">
        <div className="flex border-b mb-3 gap-2">
          {/* <ChefHat className="text-green-600 w-8 h-8" /> */}
          <h1 className="border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-primary">
            All menu
          </h1>
        </div>
        <MenuCardList id={params.restaurant_id} />
      </section>
    </main>
  );
};

export default RestaurantMenuPage;

import React, { useEffect } from "react";
import RestaurantCardDetail from "@/app/(user)/restaurants/[restaurant_id]/components/restaurant-card-detail";
import MenuCardList from "../components/menu-card-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RestaurantMenuPage = ({
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
      <section className="w-full mt-6">
        <Card>
          <CardHeader>
            <CardTitle>All Menu</CardTitle>
          </CardHeader>
          <CardContent>
            <MenuCardList id={params.restaurant_id} />
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default RestaurantMenuPage;

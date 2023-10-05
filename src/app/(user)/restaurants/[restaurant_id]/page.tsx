"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { mockReview } from "@/app/__mock__/review";
import { useRouter } from "next/navigation";
import ReviewCard from "@/app/(user)/restaurants/[restaurant_id]/review/components/review-card";
import { getRestaurant } from "@/services/restaurant";

function ShowRestaurant({
  params,
}: {
  params: {
    restaurant_id: number;
    id: string;
  };
}) {

  const [restaurant, setRestaurant] = React.useState<Restaurant>();

  useEffect(() => {
    const fetchRestaurant = async () => {
      const restaurant = await getRestaurant(params.restaurant_id);
      console.log(restaurant);
      setRestaurant(restaurant);
    }
    fetchRestaurant();
  }, [params.restaurant_id]);

  const router = useRouter();

  const mockRouteReview = () => {
    router.push("/restaurants/1/review");
  };

  const mockRouteMenus = () => {
    router.push("/restaurants/1/menus");
  };

  return (
    <main className="container mx-auto py-3 px-2 sm:px-4 md:px-6 lg:px-8">
      {/* image and detail */}
      <section className="flex flex-col md:flex-row gap-3">
        <div className="w-full md:flex-basis-2/3 h-auto md:h-[450px]">
          <Image
            src={
              restaurant?.image ||
              "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
            }
            alt="KU Wongnai"
            width={700}
            height={700}
            className="border shadow-sm rounded-lg w-full h-full"
          />
        </div>
        <aside className="w-full mt-6 md:mt-0 md:flex-basis-1/3">
          <div className="flex flex-col bg-card rounded-lg p-4 md:p-5 h-auto md:h-[390px] border shadow-sm">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold">{restaurant?.name}</h2>
                <p className="text-sm text-gray-500">{restaurant?.foodType}</p>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="text-red-500 text-2xl font-bold">
                    {restaurant?.rating}
                  </span>
                  <span className="ml-2 text-xl font-bold">/ 5</span>
                </div>
                <div className="text-sm text-gray-500 text-right">Rating</div>
              </div>
            </div>
            <div className="flex justify-between mt-3">
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold">Location</h3>
                <p className="text-sm text-gray-500">{restaurant?.location}</p>
              </div>
            </div>
            {/* <div className="flex mt-3">
              <div className="flex flex-col w-full">
                <div className="text-2xl font-bold">opening hours</div>
                <div className="flex justify-between">
                  <h3 className="text-sm text-gray-500">mon - fri</h3>
                  <p className="text-sm text-gray-500">17:00 - 23:00</p>
                </div>
              </div>
            </div> */}
            <div className="flex mt-3">
              <div className="flex flex-col w-full">
                <h3 className="text-2xl font-bold">phone</h3>
                <p className="text-sm text-gray-500">
                  {restaurant?.contactInfo}
                </p>
              </div>
            </div>

            {/* description */}
            <div className="flex mt-5 w-full">
              <p className="text-sm text-gray-500">{restaurant?.description}</p>
            </div>
          </div>
          <div className="w-full flex gap-3 mt-4">
            <Button
              className="w-full bg-cyan-500 hover:bg-cyan-700 text-white"
              onClick={mockRouteReview}
            >
              Review
            </Button>
            <Button
              className="w-full bg-gray-800 hover:bg-gray-900 text-white"
              onClick={mockRouteMenus}
            >
              All menu
            </Button>
          </div>
        </aside>
      </section>

      {/* reviews */}
      <section className="mt-3 bg-card rounded-lg p-4 md:p-5 border shadow-sm">
        <div className="flex gap-4 border-b items-end">
          <h1 className="pb-2 text-2xl md:text-3xl font-semibold tracking-tight transition-colors text-primary">
            Reviews
          </h1>
          <p className="text-xl md:text-2xl font-semibold tracking-tight text-gray-500 pb-2">
            ({mockReview.length})
          </p>
        </div>
        <div>
          {mockReview.map((review, index) => (
            <ReviewCard
              key={index}
              avatarUrl={review.avatarUrl}
              name={review.name}
              title={review.title}
              content={review.content}
              images={review.images}
              comments={review.comments}
              likes={review.likes}
              rating={review.rating}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default ShowRestaurant;

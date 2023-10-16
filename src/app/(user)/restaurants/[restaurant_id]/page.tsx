"use client";

import React, { use, useCallback, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ReviewCard from "@/app/(user)/restaurants/[restaurant_id]/review/components/review/review-card";
import { getRestaurant } from "@/services/restaurant";
import { Star } from "lucide-react";
import { getReviewsRestaurant } from "@/services/review";
import ReviewList from "./review/components/review/review-list";
import { calAverageReview, calReviewCount } from "@/lib/review-help";
import { Review } from "@/types/reivew";
import { Restaurant } from "@/types/restaurant";

function ShowRestaurant({
  params,
}: {
  params: {
    restaurant_id: number;
    id: string;
  };
}) {
  const [restaurant, setRestaurant] = React.useState<Restaurant>();
  const [review, setReview] = React.useState<Review[]>([]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      const restaurant = await getRestaurant(params.restaurant_id);
      setRestaurant(restaurant);
    };
    fetchRestaurant();
  }, [params.restaurant_id]);

  useEffect(() => {
    const fetchReview = async () => {
      const review = await getReviewsRestaurant(params.restaurant_id);
      setReview(review);
    };
    fetchReview();
  }, [params.restaurant_id]);

  const average = calAverageReview(review);

  const reviewCount = calReviewCount(review);

  const router = useRouter();

  const mockRouteReview = useCallback(() => {
    router.push(`/restaurants/${params.restaurant_id}/review`);
  }, [router, params.restaurant_id]);

  const mockRouteMenus = useCallback(() => {
    router.push(`/restaurants/${params.restaurant_id}/menus`);
  }, [router, params.restaurant_id]);

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
            alt=""
            width={700}
            height={700}
            className="border shadow-sm rounded-lg w-full h-full"
          />
        </div>
        <aside className="w-full mt-6 md:mt-0 md:flex-basis-1/3">
          <div className="flex flex-col bg-card rounded-lg p-4 md:p-5 h-auto md:h-[390px] border shadow-sm">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors">
                  {restaurant?.name}
                </h2>
                <p className="text-lg font-semibold tracking-tight  text-gray-400">
                  {restaurant?.foodType}
                </p>
              </div>
              {reviewCount === 0 ? (
                <span className="text-xl font-semibold tracking-tight mb-3 text-gray-400">
                  don&apos;t have review
                </span>
              ) : (
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-red-600 rounded-lg flex px-2 py-1 text-white w-fit gap-2 items-center">
                    <h2 className="text-lg font-semibold tracking-tight ">
                      {average}
                    </h2>
                    <Star className="w-5 h-5" />
                  </div>
                  <span>
                    <span className="text-xl font-semibold tracking-tight mb-3 text-gray-400">
                      Rating
                    </span>
                  </span>
                </div>
              )}
            </div>
            <div className="flex justify-between mt-3">
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold">Location</h3>
                <p className="text-lg font-semibold tracking-tight  text-gray-400">
                  {restaurant?.location}
                </p>
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
                <h3 className="text-2xl font-semibold tracking-tight">phone</h3>
                <p className="text-lg font-semibold tracking-tight  text-gray-400">
                  {restaurant?.contactInfo}
                </p>
              </div>
            </div>

            {/* description */}
            <div className="flex mt-5 w-full">
              <p className="text-lg font-semibold tracking-tight  text-gray-400">
                {restaurant?.description}
              </p>
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
      <ReviewList restaurant_id={params.restaurant_id} />
    </main>
  );
}

export default ShowRestaurant;

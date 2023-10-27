"use client";

import React, { use, useCallback, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getRestaurant } from "@/services/restaurant";
import { PencilLine, StarIcon, Utensils } from "lucide-react";
import { getReviewsRestaurant } from "@/services/review";
import ReviewList from "./review/components/review/review-list";
import { calAverageReview, calReviewCount } from "@/lib/review-help";
import { Review } from "@/types/reivew";
import { Restaurant } from "@/types/restaurant";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";

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

  return (
    <main>
      <div className="w-full h-auto md:h-[300px]">
        <Image
          src={
            restaurant?.image ||
            "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
          }
          alt=""
          width={700}
          height={700}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <section
        style={{ gridTemplateRows: "auto 1fr" }}
        className="grid grid-cols-1 md:grid-cols-12 gap-4 container mx-auto py-6 px-2 sm:px-4 md:px-6 lg:px-8"
      >
        <Card className="order-1 col-span-8">
          <CardHeader>
            <CardTitle>{restaurant?.name}</CardTitle>
            <CardDescription>
              <div className="flex items-center gap-2">
                <div className="inline-block px-2 py-1 rounded-lg text-white bg-orange-600">
                  <span className="flex items-center">
                    {average} <StarIcon className="ml-1 w-4 h-4" />
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-500">
                    {reviewCount} reviews
                  </span>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                {restaurant?.foodType}
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-gray-600 dark:text-gray-300">
              <span className="text-primary">Open</span> until 16:00
            </div>
            <div className="w-full flex gap-3 mt-4">
              <Button
                className="bg-cyan-500 hover:bg-cyan-700 text-white"
                asChild
              >
                <Link href={`/restaurants/${params.restaurant_id}/review`}>
                  <PencilLine className="w-5 h-5 mr-3" />
                  Review
                </Link>
              </Button>
              <Button
                className="bg-gray-800 hover:bg-gray-900 text-white"
                asChild
              >
                <Link href={`/restaurants/${params.restaurant_id}/menus`}>
                  <Utensils className="w-5 h-5 mr-3" />
                  View menu
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="order-3 col-span-8 p-6 flex gap-6 rounded-lg border bg-card text-card-foreground shadow-sm">
          <Image
            src="https://static2.wongnai.com/static2/images/3zM_NIh.png"
            alt="map"
            width={200}
            height={200}
            className="rounded-lg"
          />
          <div className="w-full">
            <div className="border-b pb-4 mb-4">
              <div className="flex justify-between items-center">
                <p className="text-sm tracking-tight text-gray-600 dark:text-gray-300">
                  {restaurant?.location}
                </p>
                <Button variant="outline" asChild>
                  <Link href="#">Waypoint</Link>
                </Button>
              </div>
            </div>
            <div>
              <h2 className="font-bold">Contact</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {restaurant?.contactInfo}
              </p>
            </div>
          </div>
        </div>
        <div className="order-2 col-span-8 md:col-span-4 row-span-3">
          <div className="w-full p-6 flex flex-col gap-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <div>
              <h2 className="font-bold">Open Hours</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                8:00 AM - 4:00 PM
              </p>
            </div>
            <div>
              <h2 className="font-bold">Prices</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                20 - 60 THB
              </p>
            </div>
            <div>
              <h2 className="font-bold">Description</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {restaurant?.description}
              </p>
            </div>
            <div className="border-t pt-6">
              <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-300">
                <li>Line</li>
                <li>Facebook</li>
                <li>Instagram</li>
                <li>Tiktok</li>
              </ul>
            </div>
          </div>
        </div>
        {/* reviews */}
        <div className="col-span-8 order-4">
          <ReviewList restaurant_id={params.restaurant_id} />
        </div>
      </section>
    </main>
  );
}

export default ShowRestaurant;

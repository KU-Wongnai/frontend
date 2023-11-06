"use client";

import React, { use, useCallback, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getRestaurant } from "@/services/restaurant";
import { Check, PencilLine, StarIcon, Utensils, X } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { convertTime } from "@/utils/time";
import { FaInstagram, FaFacebook, FaLine, FaGlobe } from "react-icons/fa";

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

  const isOpen = () => {
    const today = new Date();
    const openAt = convertTime(restaurant?.openAt!);
    const closeAt = convertTime(restaurant?.closeAt!);

    if (today.getHours() >= openAt.getHours()) {
      if (today.getHours() <= closeAt.getHours()) {
        return true;
      }
    }
    return false;
  };

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
                {restaurant?.categories.map((category) => (
                  <Badge key={category} className="mr-1">
                    {category}
                  </Badge>
                ))}
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-gray-600 dark:text-gray-300">
              {isOpen() ? (
                <>
                  <span className="text-primary">Open</span> until 16:00
                </>
              ) : (
                <span className="text-red-500">Closed</span>
              )}
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
                {restaurant?.phone}
              </p>
            </div>
          </div>
        </div>
        <div className="order-2 col-span-8 md:col-span-4 row-span-3">
          <div className="w-full p-6 flex flex-col gap-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <div>
              <h2 className="font-bold">Open days</h2>
              {restaurant?.openDays && restaurant?.openDays.length > 0 ? (
                <ul className="text-gray-600 dark:text-gray-300 text-sm">
                  {restaurant?.openDays.map((day) => (
                    <li key={day}>
                      {day.charAt(0).toUpperCase() + day.slice(1).toLowerCase()}
                    </li>
                  ))}
                </ul>
              ) : (
                <div>-</div>
              )}
            </div>
            <div>
              <h2 className="font-bold">Open Hours</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {restaurant?.openAt} - {restaurant?.closeAt}
              </p>
            </div>
            <div>
              <ul className="text-sm font-semibold space-y-2">
                <li className="flex items-center">
                  {restaurant?.isDelivery ? (
                    <Check className="bg-green-500 rounded-sm stroke-white inline-block mr-1 w-5 h-5" />
                  ) : (
                    <X className="bg-red-500 rounded-sm stroke-white inline-block mr-1 w-5 h-5" />
                  )}{" "}
                  Delivery
                </li>
                <li className="flex items-center">
                  {restaurant?.isWalkIn ? (
                    <Check className="bg-green-500 rounded-sm stroke-white inline-block mr-1 w-5 h-5" />
                  ) : (
                    <X className="bg-red-500 rounded-sm stroke-white inline-block mr-1 w-5 h-5" />
                  )}{" "}
                  Walk In
                </li>
              </ul>
            </div>
            {restaurant?.priceRange && (
              <div>
                <h2 className="font-bold">Prices</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {restaurant.priceRange}
                </p>
              </div>
            )}
            <div>
              <h2 className="font-bold">Description</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {restaurant?.description}
              </p>
            </div>
            <div className="border-t pt-6">
              <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-300">
                {restaurant?.line && (
                  <li className="flex items-center gap-2">
                    <FaLine className="w-5 h-5" />
                    Line: {restaurant.line}
                  </li>
                )}
                {restaurant?.facebook && (
                  <li>
                    <a
                      href={restaurant.facebook}
                      className="flex items-center gap-2 hover:text-primary"
                      target="_blank"
                    >
                      <FaFacebook className="w-5 h-5" /> Facebook
                    </a>
                  </li>
                )}
                {restaurant?.instagram && (
                  <li>
                    <a
                      href={restaurant.instagram}
                      className="flex items-center gap-2 hover:text-primary"
                      target="_blank"
                    >
                      <FaInstagram className="w-5 h-5" /> Instagram
                    </a>
                  </li>
                )}
                {restaurant?.website && (
                  <li>
                    <a
                      href={restaurant.website}
                      className="flex items-center gap-2 hover:text-primary"
                      target="_blank"
                    >
                      <FaGlobe className="w-5 h-5" /> Website
                    </a>
                  </li>
                )}
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

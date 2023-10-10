"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { getRestaurant } from "@/services/restaurant";
import { getReviewsRestaurant } from "@/services/review";
import { calAverageReview, calReviewCount } from "@/lib/review-help";

const RestaurantCardDetail = ({ id }: { id: number }) => {
  const [restaurant, setRestaurant] = React.useState<Restaurant>();
  const [review, setReview] = React.useState<Review[]>([]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      const restaurant = await getRestaurant(id);
      console.log(restaurant);
      setRestaurant(restaurant);
    };
    fetchRestaurant();
  }, [id]);

  useEffect(() => {
    const fetchReview = async () => {
      const review = await getReviewsRestaurant(id);
      setReview(review);
    };
    fetchReview();
  }, [id]);

  const average = calAverageReview(review);

  const reviewCount = calReviewCount(review);

  // Provide a default image source if image is null
  const imageUrl =
    restaurant?.image ||
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"; // Replace with your default image path

  return (
    <section className="w-full bg-card p-5 border shadow-sm rounded-lg">
      <div className="flex">
        {/* image */}
        <div className="relative filter brightness-90 shadow-md rounded-lg w-96 h-52">
          <Image
            src={imageUrl}
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
              {restaurant?.name}
            </h1>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-red-600 rounded-lg flex px-2 py-1 text-white w-fit gap-2 items-center">
              <h2 className="text-lg font-semibold tracking-tight ">
                {average}
              </h2>
              <Star className="w-5 h-5" />
            </div>
            <span>
              <span className="text-xl font-semibold tracking-tight mb-3 text-gray-400">
                {reviewCount} reviews
              </span>
            </span>
          </div>
          <div className="flex items-end gap-3 mb-3">
            <h2 className="text-2xl font-semibold tracking-tight">Category:</h2>
            <h3 className="text-xl font-semibold tracking-tight  text-gray-400">
              {restaurant?.foodType}
            </h3>
          </div>
          <div className="flex items-end gap-3 mb-3">
            <p className="text-xl font-semibold tracking-tight text-gray-400">
              {restaurant?.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantCardDetail;

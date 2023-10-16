"use client";

import React, { use, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { getReviewsRestaurant } from "@/services/review";
import { calAverageReview, calReviewCount } from "@/lib/review-help";
import { Restaurant } from "@/types/restaurant";
import { Review } from "@/types/reivew";

const RestaurantCard: React.FC<Restaurant> = ({
  id,
  name,
  foodType,
  image,
  rating,

  menus,
}) => {
  const [review, setReview] = React.useState<Review[]>([]);

  useEffect(() => {
    const fetchReview = async () => {
      const review = await getReviewsRestaurant(id);
      setReview(review);
    };
    fetchReview();
  }, []);

  const reviewCount = calReviewCount(review);

  const average = calAverageReview(review);

  const imageUrl =
    image ||
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"; // Replace with your default image path
  return (
    <Link href={`/restaurants/${id}`}>
      <div className="rounded-lg overflow-hidden shadow-md w-full border">
        <div className="h-40 relative">
          <Image
            src={imageUrl}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="font-bold text-2xl sm:text-xl mb-2">{name}</h2>
          <p className="text-gray-400 text-sm sm:text-base">{foodType}</p>
          <div className="flex items-center gap-3 mt-2">
            {reviewCount === 0 ? (
              <span className="text-gray-400 text-sm sm:text-base my-1">
                don't have review yet
              </span>
            ) : (
              <>
                <div className="bg-red-600 rounded-lg flex px-2 py-1 text-white w-fit gap-2 items-center">
                  <h2 className=" text-base font-semibold tracking-tight ">
                    {average}
                  </h2>
                  <Star className="w-4 h-4" />
                </div>
                <span className="text-gray-400 text-sm sm:text-base">
                  {reviewCount} reviews
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;

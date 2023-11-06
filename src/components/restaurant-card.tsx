"use client";

import React, { use, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { getReviewsRestaurant } from "@/services/review";
import { calAverageReview, calReviewCount } from "@/lib/review-help";
import { Restaurant } from "@/types/restaurant";
import { Review } from "@/types/reivew";
import { boolean } from "zod";

interface Props extends Restaurant {
  isMerchant?: boolean;
}

const RestaurantCard: React.FC<Props> = ({
  id,
  name,
  categories,
  image,
  rating,
  isMerchant,
  menus,
}) => {
  const [review, setReview] = React.useState<Review[]>([]);

  useEffect(() => {
    const fetchReview = async () => {
      const review = await getReviewsRestaurant(id);
      setReview(review);
    };
    fetchReview();
  }, [id]);

  const reviewCount = calReviewCount(review);

  const average = calAverageReview(review);

  const imageUrl =
    image ||
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"; // Replace with your default image path

  return (
    <Link href={`${isMerchant ? "/merchant" : ""}/restaurants/${id}`}>
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
          <h2 className="font-bold">{name}</h2>
          <p className="text-gray-400 text-sm">{categories[0]}</p>
          <div className="flex items-center gap-3 mt-2">
            {reviewCount === 0 ? (
              <span className="text-gray-400 text-sm my-1">
                don&apos;t have review yet
              </span>
            ) : (
              <>
                <div className="bg-red-600 rounded-lg flex px-2 py-1 text-white w-fit gap-2 items-center">
                  <h2 className=" text-sm font-semibold tracking-tight ">
                    {average}
                  </h2>
                  <Star className="w-4 h-4" />
                </div>
                <span className="text-gray-400">{reviewCount} reviews</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;

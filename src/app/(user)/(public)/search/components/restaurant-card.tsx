import { calAverageReview } from "@/lib/review-help";
import { getReviewsRestaurant } from "@/services/review";
import { Review } from "@/types/reivew";
import { Restaurant } from "@/types/restaurant";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type RestaurantCardProps = {
  restaurant: Restaurant;
};

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const [review, setReview] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReview = async () => {
      const review = await getReviewsRestaurant(restaurant.id);
      setReview(review);
    };
    fetchReview();
  }, [restaurant]);

  const average = calAverageReview(review);

  return (
    <Link href={`/restaurants/${restaurant.id}`} className="w-full space-y-2">
      <Image
        src={
          restaurant.image ??
          "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
        }
        alt={restaurant.name}
        width={300}
        height={200}
        className="rounded-lg w-full h-[150px] object-cover object-center"
      />
      <div className="flex justify-between">
        <h2 className="font-bold">
          {restaurant.name}{" "}
          <span className="text-sm font-normal text-muted-foreground">
            {restaurant.categories[0]}
          </span>
        </h2>
        <span className="flex items-center justify-center text-sm rounded-full bg-orange-500 w-5 h-5">
          {average}
        </span>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Open 8:00 - 12:00</p>
      </div>
    </Link>
  );
};

export default RestaurantCard;

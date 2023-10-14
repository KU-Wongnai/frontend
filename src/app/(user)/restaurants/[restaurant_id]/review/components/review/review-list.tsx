"use client";

import React, { useEffect } from "react";
import ReviewCard from "./review-card";
import { getReviewsRestaurant } from "@/services/review";
import Image from "next/image";
import NoReviewBro from "@/assets/undraw/undraw_review_re_kgg1.svg";

const ReviewList = ({ restaurant_id }: { restaurant_id: number }) => {
  const [review, setReview] = React.useState<Review[]>();

  console.log(review);
  useEffect(() => {
    const fetchReviewRestaurant = async () => {
      const review = await getReviewsRestaurant(restaurant_id);
      setReview(review);
    };
    fetchReviewRestaurant();
  }, [restaurant_id]);

  const isEmpty = review?.length === 0;

  return (
    <section className="mt-3 bg-card rounded-lg p-4 md:p-5 border shadow-sm">
      <div className="flex gap-4 border-b items-end">
        <h1 className="pb-2 text-2xl md:text-3xl font-semibold tracking-tight transition-colors text-primary">
          Reviews
        </h1>
        <p className="text-xl md:text-2xl font-semibold tracking-tight text-gray-500 pb-2">
          ({review?.length ?? 0})
        </p>
      </div>
      {isEmpty ? (
        <div className="flex flex-col justify-center items-center col-span-full p-8">
          <Image
            src={NoReviewBro}
            alt="No review available"
            width={300}
            height={300}
          />
          <h1 className="text-3xl font-bold  mt-4">
            No review for this restaurant
          </h1>
          <p className="text-lg text-gray-400 mt-2">
            Be the first one to review this restaurant.
          </p>
        </div>
      ) : (
        review?.map((review, index) => (
          <ReviewCard key={index} id={review.id} rating={review.rating} />
        ))
      )}
    </section>
  );
};

export default ReviewList;

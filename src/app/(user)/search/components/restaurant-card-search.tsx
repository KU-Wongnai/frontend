"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { getReviewsRestaurant } from "@/services/review";
import { calAverageReview, calReviewCount } from "@/lib/review-help";
import Link from "next/link";
import { Review } from "@/types/reivew";
import { Restaurant } from "@/types/restaurant";

const RestaurantCardDetail: React.FC<Restaurant> = ({
  id,
  name,
  foodType,
  image,
  description,
  location,
  contactInfo,
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

  const average = calAverageReview(review);

  const reviewCount = calReviewCount(review);

  return (
    <Link href={`/restaurants/${id}`}>
      <section className="w-full bg-card p-5 border shadow-sm rounded-lg mb-3">
        <div className="mb-5">
          {/* Display up to 5 images */}
          <div className="flex gap-3">
            {menus?.slice(0, 5).map((menu) => (
              <div className="relative w-20 h-20" key={menu.id}>
                <Image
                  src={menu.image || "https://via.placeholder.com/150"}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-sm"
                  alt={menu.name}
                />
                {menu.id === 4 && menus.length > 5 && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-sm bg-black bg-opacity-50 text-white font-bold">
                    +{menus.length - 5}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full">
          {/* detail */}
          <div className="flex flex-col ml-5 w-full">
            <div className="flex items-end gap-4">
              <h1 className="scroll-m-20 pb-2 text-xl font-semibold tracking-tight transition-colors">
                {name}
              </h1>
              <span className="scroll-m-20 text-lg font-semibold tracking-tight text-gray-500 pb-2">
                {foodType}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              {reviewCount === 0 ? (
                <span className="text-base font-semibold tracking-tight mb-3 text-gray-400">
                  don't have review yet
                </span>
              ) : (
                <>
                  <div className="bg-red-600 rounded-lg flex px-2 py-1 text-white w-fit gap-2 items-center">
                    <h2 className="text-sm font-semibold tracking-tight ">
                      {average}
                    </h2>
                    <Star className="w-5 h-5" />
                  </div>
                  <span>
                    <span className="text-base font-semibold tracking-tight mb-3 text-gray-400">
                      {reviewCount} reviews
                    </span>
                  </span>
                </>
              )}
            </div>
            <div className="grid grid-cols-2 ">
              <div className="items-end gap-3 mb-3">
                <h2 className="text-base font-semibold tracking-tight">
                  location
                </h2>
                <h3 className="text-base font-semibold tracking-tight  text-gray-400">
                  {location}
                </h3>
              </div>
              <div className="items-end gap-3 mb-3">
                <h2 className="text-base font-semibold tracking-tight">
                  phone
                </h2>
                <h3 className="text-base font-semibold tracking-tight  text-gray-400">
                  {contactInfo}
                </h3>
              </div>
              {/* <div className="items-end gap-3 mb-3">
              <h2 className="text-base font-semibold tracking-tight">
              opening hours
              </h2>
              <div className="flex gap-x-10">
              <h3 className="text-base font-semibold tracking-tight  text-gray-400">
              mon - fri
              </h3>
              <h3 className="text-base font-semibold tracking-tight  text-gray-400">
              17:00 - 23:00
              </h3>
              </div>
            </div> */}
            </div>
            <div className="flex items-end gap-3 mb-3">
              <p className=" text-gray-400">{description}</p>
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
};

export default RestaurantCardDetail;

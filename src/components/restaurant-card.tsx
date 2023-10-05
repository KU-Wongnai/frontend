import React from "react";
import Image from "next/image";
import Link from "next/link";

const RestaurantCard: React.FC<Restaurant> = ({
  id,
  name,
  foodType,
  image,
  rating,

  menus
}) => {
  const imageUrl =
    image ||
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"; // Replace with your default image path

  return (
    <Link href={`/restaurants/${id}`}>
      <div className="rounded-lg overflow-hidden shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-56 border">
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
          <h2 className="font-bold text-lg sm:text-xl mb-2">{name}</h2>
          <p className="text-gray-600 text-sm sm:text-base">{foodType}</p>
          <div className="flex items-center mt-2">
            <span className="text-red-500 font-bold text-xl sm:text-2xl">
              {rating}
            </span>
            <span className="text-gray-500 ml-2 text-sm sm:text-base">
              / 5 (100 reviews)
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;

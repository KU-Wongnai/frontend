import React from "react";
import Image from "next/image";
import Link from "next/link";

const FoodCard: React.FC<FoodCardProps> = ({
  id,
  imageUrl,
  foodName,
  foodType,
  reviewScore,
  reviewCount,
  href,
}) => {
  return (
    <Link href={href}>
      <div className="rounded-lg overflow-hidden shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-56 border">
        <div className="h-40 relative">
          <Image
            src={imageUrl}
            alt={foodName}
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="font-bold text-lg sm:text-xl mb-2">{foodName}</h2>
          <p className="text-gray-600 text-sm sm:text-base">{foodType}</p>
          <div className="flex items-center mt-2">
            <span className="text-red-500 font-bold text-xl sm:text-2xl">
              {reviewScore}
            </span>
            <span className="text-gray-500 ml-2 text-sm sm:text-base">
              / 5 ({reviewCount} reviews)
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FoodCard;

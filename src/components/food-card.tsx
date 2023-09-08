import React from "react";
import Image from "next/image";

const FoodCard: React.FC<FoodCardProps> = ({
  imageUrl,
  foodName,
  foodType,
  reviewScore,
  reviewCount,
}) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-md w-56">
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
        <h2 className="font-bold text-lg mb-2">{foodName}</h2>
        <p className="text-gray-600">{foodType}</p>
        <div className="flex items-center mt-2">
          <span className="text-red-500 font-bold text-xl">{reviewScore}</span>
          <span className="text-gray-500 ml-2">
            / 5 ({reviewCount} reviews)
          </span>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;

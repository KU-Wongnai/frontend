import React from "react";
import Image from "next/image";
import Link from "next/link";

const RestaurantCardDetail: React.FC<RestaurantProps> = ({
  id,
  name,
  foodType,
  rating,
  image,
  href,
  description,
  location,
  operatingHours,
  contactInfo,
}) => {
  // Provide a default image source if image is null
  const imageUrl =
    image ||
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"; // Replace with your default image path

  return (
    <Link href={href} className="flex w-full">
      <div className="w-full md:flex-basis-2/3">
        <Image
          src="https://images.unsplash.com/photo-1628294895950-9805252327bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="KU Wongnai"
          width={700}
          height={700}
          className="border shadow-sm rounded-lg w-full h-full"
        />
      </div>

      <section className="flex-basis-1/3 w-full">
        <div className="w-3/4 ml-4">
          <h2 className="text-xl font-semibold">{name}</h2>
          <div className="flex items-center mt-4">
            <span className="text-red-500 font-bold text-xl sm:text-2xl">
              {rating}
            </span>
            <span className="text-gray-500 ml-2 text-sm sm:text-base">
              / 5 (100 reviews)
            </span>
          </div>
          <p className="text-gray-500">{foodType}</p>
          <p className="text-gray-700 mt-2">{description}</p>
          <p className="text-gray-700 mt-2">
            Location: <span className="font-semibold">{location}</span>
          </p>
          <p className="text-gray-700">
            Operating Hours:{" "}
            <span className="font-semibold">{operatingHours} hours</span>
          </p>
          <p className="text-gray-700">
            Contact Info: <span className="font-semibold">{contactInfo}</span>
          </p>
        </div>
      </section>
    </Link>
  );
};

export default RestaurantCardDetail;

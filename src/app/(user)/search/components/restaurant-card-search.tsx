import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

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
  menus,
}) => {
  // Provide a default image source if image is null
  const imageUrl =
    image ||
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"; // Replace with your default image path

  return (
    <section className="w-full bg-card p-5 border shadow-sm rounded-lg">
      <div className="mb-5">
        {/* Display up to 5 images */}
        <div className="flex gap-3">
          {menus?.slice(0, 5).map((img: string, index: number) => (
            <div className="relative w-20 h-20" key={index}>
              <Image
                src={img}
                layout="fill"
                objectFit="cover"
                className="rounded-sm"
                alt={name}
              />
              {index === 4 && menus.length > 5 && (
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
              Restaurant Name
            </h1>
            <span className="scroll-m-20 text-lg font-semibold tracking-tight text-gray-500 pb-2">
              Ran Che Daeng
            </span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-red-600 rounded-lg flex px-2 py-1 text-white w-fit gap-2 items-center">
              <h2 className="text-sm font-semibold tracking-tight ">4.5</h2>
              <Star className="w-5 h-5" />
            </div>
            <span>
              <span className="text-base font-semibold tracking-tight mb-3 text-gray-400">
                100 reviews
              </span>
            </span>
          </div>
          <div className="grid grid-cols-3 ">
            <div className="items-end gap-3 mb-3">
              <h2 className="text-base font-semibold tracking-tight">
                location
              </h2>
              <h3 className="text-base font-semibold tracking-tight  text-gray-400">
                bar mai
              </h3>
            </div>
            <div className="items-end gap-3 mb-3">
              <h2 className="text-base font-semibold tracking-tight">phone</h2>
              <h3 className="text-base font-semibold tracking-tight  text-gray-400">
                01234566789
              </h3>
            </div>
            <div className="items-end gap-3 mb-3">
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
            </div>
          </div>
          {/* <div className="flex items-end gap-3 mb-3">
            <p className="text-xl font-semibold tracking-tight text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
              voluptatum, quibusdam, voluptate, quia voluptas quod
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default RestaurantCardDetail;
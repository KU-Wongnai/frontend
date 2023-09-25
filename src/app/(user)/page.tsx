import React from "react";
import Image from "next/image";
import RestaurantCard from "@/components/restaurant-card";

import { mockRestaurants } from "../__mock__/restaurant-card";
import { ChefHat } from "lucide-react";
import Link from "next/link";

export default function MainHome() {
  return (
    <>
      {/* Hero section */}
      <div className="relative h-[300px] flex justify-center items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1543353071-10c8ba85a904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="KU Wongnai"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-50"></div>
        <div className="absolute text-center text-black z-10">
          <h1 className="text-4xl font-black leading-tight border-b">
            Discover your favorite restaurants
          </h1>
          <p className="text-base mt-2 font-medium">
            We bring all the restaurants in Kasetsart University closer to you.
          </p>
        </div>
      </div>

      <main className="container mx-auto py-6 px-4 sm:px-0">
        {/* restaurant category */}
        {/* <section className="w-full bg-card pt-3 border shadow-sm rounded-lg p-5">
          <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3 text-primary">
            restaurant category
          </h1>
          <div className="flex gap-10 relative">
            <Link href="/">
              <Image
                src="https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2127&q=80"
                alt="KU Wongnai"
                width={100}
                height={100}
                className="filter brightness-75 w-48 h-32 shadow-md rounded-lg"
              />
              <span className="absolute bottom-0 left-0 p-2 scroll-m-20 text-xl font-bold tracking-tight text-white">
                Japanese
              </span>
            </Link>
          </div>
        </section> */}

        {/* popular menu */}
        {/* <section className="w-full bg-card pt-3 border shadow-sm rounded-lg p-5 mt-6">
          <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3 text-primary">
            popular menu
          </h1>
          <RestaurantCard
            id={1}
            description="good food"
            location="new bar"
            operatingHours={0}
            contactInfo="xxxxxxxxxx"
            image="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
            name="Pad Thai"
            foodType="Thai Food"
            rating={4.5}
            href={`/restaurants/1`}
            menus={null}
          />
        </section> */}

        {/* all restaurant */}
        <section className="w-full bg-card pt-3 border shadow-sm rounded-lg p-5 mt-6">
          <div className="flex border-b mb-3 gap-2">
            <h1 className="border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-primary">
              All restaurant
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-4">
            {mockRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                id={restaurant.id}
                description={restaurant.description}
                location={restaurant.location}
                operatingHours={restaurant.operatingHours}
                contactInfo={restaurant.contactInfo}
                image={restaurant.image}
                name={restaurant.name}
                foodType={restaurant.foodType}
                rating={restaurant.rating}
                href={`/restaurants/${restaurant.id}`}
                menus={null}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

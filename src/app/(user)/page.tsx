import React from "react";
import Image from "next/image";
import RestaurantList from "@/app/(user)/components/restaurant-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

      {/* Show all restaurants */}
      {/* <section className="container mx-auto pb-6 px-4 sm:px-0">
        <div className="w-full bg-card pt-3 border shadow-sm rounded-lg p-5 mt-6">
          <div className="flex border-b mb-3 gap-2">
            <h1 className="pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-primary">
              All restaurant
            </h1>
          </div>
            <RestaurantList />
        </div>
      </section> */}
      <section className="container mx-auto pb-6 px-4 sm:px-0 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>All restaurant</CardTitle>
          </CardHeader>
          <CardContent>
            <RestaurantList />
          </CardContent>
        </Card>
      </section>
    </>
  );
}

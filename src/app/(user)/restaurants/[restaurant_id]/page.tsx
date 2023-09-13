"use client";

import FeatureIcon from "@/components/feature-icon";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { mockReview } from "@/app/__mock__/review";
import Review from "@/components/review";
import { useRouter } from "next/navigation";

function ShowRestaurant({ params }: { params: { id: string } }) {
  const router = useRouter();

  const mockRouteReview = () => {
    router.push("/restaurants/1/review");
  };

  const mockRouteMenus = () => {
    router.push("/restaurants/1/menus");
  };

  return (
    <>
      <FeatureIcon />
      <main className="container mx-auto py-3 px-2 sm:px-4 md:px-6 lg:px-8">
        {/* image and detail */}
        <section className="flex flex-col md:flex-row gap-3">
          <div className="w-full md:flex-basis-2/3">
            <Image
              src="https://images.unsplash.com/photo-1628294895950-9805252327bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="KU Wongnai"
              width={700}
              height={700}
              className="border shadow-sm rounded-lg w-full h-full"
            />
          </div>
          <aside className="w-full mt-6 md:mt-0 md:flex-basis-1/3">
            <div className="flex flex-col bg-card rounded-lg p-4 md:p-5 h-auto md:h-[390px] border shadow-sm">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold">Restaurant Name {params.id}</h2>
                  <p className="text-sm text-gray-500">Japanese</p>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className="text-red-500 text-2xl font-bold">4.5</span>
                    <span className="ml-2 text-xl font-bold">/ 5</span>
                  </div>
                  <div className="text-sm text-gray-500 text-right">Rating</div>
                </div>
              </div>
              <div className="flex justify-between mt-3">
                <div className="flex flex-col">
                  <h3 className="text-2xl font-bold">Location</h3>
                  <p className="text-sm text-gray-500">bar mai</p>
                </div>
              </div>
              <div className="flex mt-3">
                <div className="flex flex-col w-full">
                  <div className="text-2xl font-bold">opening hours</div>
                  <div className="flex justify-between">
                    <h3 className="text-sm text-gray-500">mon - fri</h3>
                    <p className="text-sm text-gray-500">17:00 - 23:00</p>
                  </div>
                </div>
              </div>
              <div className="flex mt-3">
                <div className="flex flex-col w-full">
                  <h3 className="text-2xl font-bold">phone</h3>
                  <p className="text-sm text-gray-500">xxxxxxxxxx</p>
                </div>
              </div>

              {/* description */}
              <div className="flex mt-5 w-full">
                <p className="text-sm text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                  voluptatum, quibusdam, voluptate, quia voluptas quod
                </p>
              </div>
            </div>
            <div className="w-full flex gap-3 mt-4">
              <Button
                className="w-full bg-cyan-500 hover:bg-cyan-700 text-white"
                onClick={mockRouteReview}
              >
                Review
              </Button>
              <Button
                className="w-full bg-gray-800 hover:bg-gray-900 text-white"
                onClick={mockRouteMenus}
              >
                All menu
              </Button>
            </div>
          </aside>
        </section>

        {/* reviews */}
        <section className="mt-3 bg-card rounded-lg p-4 md:p-5 border shadow-sm">
          <div className="flex gap-4 border-b items-end">
            <h1 className="pb-2 text-2xl md:text-3xl font-semibold tracking-tight transition-colors text-primary">
              Reviews
            </h1>
            <p className="text-xl md:text-2xl font-semibold tracking-tight text-gray-500 pb-2">
              ({mockReview.length})
            </p>
          </div>
          <div>
            {mockReview.map((review, index) => (
              <Review
                key={index}
                avatarUrl={review.avatarUrl}
                name={review.name}
                topic={review.topic}
                detail={review.detail}
                images={review.images}
                comments={review.comments}
                likes={review.likes}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default ShowRestaurant;

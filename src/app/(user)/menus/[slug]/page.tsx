"use client"

import FeatureIcon from "@/components/feature-icon";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { mockReview } from "@/app/__mock__/review";
import Review from "@/components/review";
import { useRouter } from "next/navigation";

function ShowMenu({ params }: { params: { slug: string } }) {
  const router = useRouter();

  const mockRoute = () => {
    router.push("/menus/1/review");
  };

  return (
    <>
      <FeatureIcon />
      <main className="container mx-auto py-6">
        {/* image and detail */}
        <section className="flex gap-3 h-[400px]">
          <div className="basis-2/3">
            <Image
              src="https://images.unsplash.com/photo-1628294895950-9805252327bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="KU Wongnai"
              width={700}
              height={700}
              className="border shadow-sm rounded-xl w-full h-full"
            />
          </div>
          <aside className="basis-1/3">
            <div className="flex flex-col bg-white rounded-2xl p-5 h-[347px] border shadow-sm">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold">
                    Food Name {params.slug}
                  </h2>
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

              <div className="flex mt-3">
                <div className="flex flex-col w-full">
                  <h3 className="text-2xl font-bold">Price</h3>
                  <p className="text-sm text-gray-500">20 $</p>
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
            </div>
            <Button className="mt-3 w-full">Add to cart</Button>
          </aside>
        </section>

        {/* menu detail */}
        <section className="mt-3 bg-white rounded-2xl p-5 border shadow-sm">
          <div className="flex items-end gap-4">
            <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors">
              Food Name {params.slug}
            </h1>
            <span className="scroll-m-20 text-2xl font-semibold tracking-tight text-gray-500 pb-2">
              Ran Che Daeng
            </span>
          </div>

          <div className="flex items-end gap-3 border-b">
            <h2 className="text-2xl font-semibold tracking-tight mb-3">
              Category:
            </h2>
            <h3 className="text-xl font-semibold tracking-tight mb-3 text-gray-400">
              Japanese
            </h3>
          </div>
          <Button
            type="button"
            onClick={mockRoute}
            className="mt-3 bg-cyan-500"
          >
            Review
          </Button>
        </section>

        {/* reviews */}
        <section className="mt-3 bg-white rounded-2xl p-5 border shadow-sm">
          <div className="flex items-end gap-4 border-b">
            <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors">
              Reviews
            </h1>
            <span className="scroll-m-20 text-2xl font-semibold tracking-tight text-gray-500 pb-2">
              ({mockReview.length})
            </span>
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

export default ShowMenu;

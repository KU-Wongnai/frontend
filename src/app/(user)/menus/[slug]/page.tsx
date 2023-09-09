import FeatureIcon from "@/components/feature-icon";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function ShowMenu({ params }: { params: { slug: string } }) {
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
              className="shadow-md rounded-xl w-full h-full"
            />
          </div>
          <aside className="basis-1/3">
            <div className="flex flex-col bg-white rounded-2xl p-3 h-[347px]">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <div className="text-2xl font-bold">Pad Thai</div>
                  <div className="text-sm text-gray-500">Japanese</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-2xl font-bold">4.5</div>
                  <div className="text-sm text-gray-500 text-right">Rating</div>
                </div>
              </div>
              <div className="flex justify-between mt-3">
                <div className="flex flex-col">
                  <div className="text-2xl font-bold">Location</div>
                  <div className="text-sm text-gray-500">bar mai</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-2xl font-bold">Price</div>
                  <div className="text-sm text-gray-500 text-right">20 $</div>
                </div>
              </div>
              <div className="flex mt-3">
                <div className="flex flex-col w-full">
                  <div className="text-2xl font-bold">opening hours</div>
                  <div className="flex justify-between">
                    <div className="text-sm text-gray-500">mon - fri</div>
                    <div className="text-sm text-gray-500">17:00 - 23:00</div>
                  </div>
                </div>
              </div>
            </div>
            <Button className="mt-3 w-full">Add to cart</Button>
          </aside>
        </section>
      </main>
    </>
  );
}

export default ShowMenu;

"use client";

import { CartTable, ColumnType } from "@/app/(user)/cart/components/cart-table";
import LocationSelector from "@/app/(user)/cart/components/location-selector";
import { ChefHat } from "lucide-react";
import { MapPin } from "lucide-react";
import { useState } from "react";

function Cart() {
  const data: ColumnType[] = [
    {
      id: "m5gr84i9",
      amount: 316,
      menu: "ยำหมูยอไข่แดง",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      menu: "ข้าวผัดกุ้ง",
    },
    {
      id: "derv1ws0",
      amount: 837,
      menu: "ข้าวผัดหมู",
    },
    {
      id: "5kma53ae",
      amount: 874,
      menu: "หมูกระทะ",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      menu: "ห่อหมก",
    },
  ];

  const handleRowSelect = (row: ColumnType) => {
    console.log("Selected Row:", row);
  };

  const handleFilterApply = (filter: string) => {
    console.log("Filter Applied:", filter);
    // You might want to fetch filtered data based on the applied filter
  };

  const handleMenuAction = (action: string, menu: ColumnType) => {
    console.log(`Action '${action}' applied on menu:`, menu);
  };

  return (
    <main className="container mx-auto px-4 sm:px-0 pb-6">
      <section className="w-full bg-card pt-3 border shadow-sm rounded-md p-5 mt-6">
        {/* show your cart */}
        <div className="flex border-b mb-3 gap-2">
          {/* <ChefHat className="text-green-600 w-8 h-8" /> */}
          <h1 className="border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-primary">
            Your Cart
          </h1>
        </div>
        <CartTable data={data} />
        {/* select location */}
        <div className="flex mb-1 mt-5 gap-2">
          <MapPin className="text-green-600 w-8 h-8" />
          <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors">
            delivery location
          </h1>
        </div>
        <LocationSelector />
      </section>
    </main>
  );
}

export default Cart;

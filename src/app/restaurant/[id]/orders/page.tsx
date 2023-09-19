"use client";
import TagTitle from "@/components/tag-title";
import React, { useState } from "react";
type Props = {}

const OrderManagement = (props: Props) => {
  return (
    <div className="container py-[40px] px-40 ">
        <div className="col-span-3 bg-white  rounded-[12px] shadow-md py-12 px-14">
            {/* Tag Topic (Menu) */}
            <div className="flex justify-between items-center">
              <div className="flex">
                <TagTitle />
                <div className="flex flex-col">
                  <p className="font-bold text-2xl py-2">Order</p>
                  <p className="font-light text-md text-gray-500">
                    restaurant order
                  </p>
                </div>
              </div>
              <button className="text-green-600 font-normal rounded-2xl border-green-600 border-2 py-1 px-3">
                <p>Order History</p>
              </button>
            </div>
            {/* for category card bar */}
            
          
          </div>
    </div>
  )
}

export default OrderManagement
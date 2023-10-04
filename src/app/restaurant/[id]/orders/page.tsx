"use client";
import TagTitle from "@/components/tag-title";
import React, { useState } from "react";
import OrderCard from "@/app/restaurant/components/order-card-dashboard";
import { mockOrderData } from "../../../__mock__/order";
import { Avatar, AvatarImage } from "../../../../components/ui/avatar";

type Props = {}

const OrderManagement = (props: Props) => {

  const [statusIncomingDecoration, setStatusIncomingDecoration] = useState("");
  const [statusProcessingDecoration, setStatusProcessingDecoration] = useState("");
  const [statusFinishDecoration, setStatusFinishDecoration] = useState("");
  const [filterMockOrderData, setFilterMockOrderData] = useState(mockOrderData.filter((order) => order.status === "Incoming"));
  const decorationStatus = "bg-green-500 rounded-lg px-4 py-1 text-white"
  const resetAllStatusDecoration = () =>{
    setStatusIncomingDecoration("");
    setStatusProcessingDecoration("");
    setStatusFinishDecoration("");
  }
  const handleIncomingOrder = () => {
    setFilterMockOrderData(mockOrderData.filter((order) => order.status === "Incoming"));
    resetAllStatusDecoration();
    setStatusIncomingDecoration(decorationStatus);
  };
  const handleProcessingOrder = () => {
    setFilterMockOrderData(mockOrderData.filter((order) => order.status === "Processing"));
    resetAllStatusDecoration();
    setStatusProcessingDecoration(decorationStatus);
  };
  const handleFinishOrder = () => {
    setFilterMockOrderData(mockOrderData.filter((order) => order.status === "Finish"));
    resetAllStatusDecoration();
    setStatusFinishDecoration(decorationStatus);
  };

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
              <div className="flex space-x-10 mr-10">
                <button className={"" + statusIncomingDecoration} onClick={()=>handleIncomingOrder()}>Incoming</button>
                <button className={"" + statusProcessingDecoration} onClick={()=>handleProcessingOrder()}>Processing</button>
                <button className={"" + statusFinishDecoration} onClick={()=>handleFinishOrder()}>Finish</button>
              </div>
            </div>

            {/* for category card bar */}
            <div className="overflow-y-auto max-h-[30rem] mr-2">
                <div className="flex flex-col flex-wrap ml-1 mr-1 px-1 ">
                  {filterMockOrderData.map((order) => {
                    return (
                      <OrderCard
                        key={order.id}
                        id={order.id}
                        customer={order.customer}
                        totalItem={order.totalItems}
                        orderID={order.orderID}
                        decoration="text-sm px-2 py-2"
                      />
                    );
                  })}
                </div>
              </div>
          
          </div>
    </div>
  )
}

export default OrderManagement
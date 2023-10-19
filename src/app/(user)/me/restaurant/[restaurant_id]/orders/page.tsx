"use client";
import TagTitle from "@/components/tag-title";
import React, { useEffect, useState } from "react";

import { getOrderByRestaurant } from "@/services/order";
import { Order } from "@/types/order";
import OrderCard from "../../components/order-card-dashboard";


const OrderManagement = ({ params }: { params: { restaurant_id: string } }) => {
  const [statusReceivedDecoration, setStatusReceivedDecoration] = useState("");
  const [statusProcessingDecoration, setStatusProcessingDecoration] =
    useState("");
  const [statusFinishDecoration, setStatusFinishDecoration] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrderByRestaurant = async () => {
      const orders = await getOrderByRestaurant(params.restaurant_id);
      setOrders(orders);
      setFilterMockOrderData(
        orders.filter((order: Order) => order.status === "RECEIVED")
      );
    };
    fetchOrderByRestaurant();
  }, [params.restaurant_id]);

  const [filterMockOrderData, setFilterMockOrderData] = useState(
    orders.filter((order) => order.status === "RECEIVED")
  );
  const decorationStatus = "bg-green-500 rounded-lg px-4 py-1 text-white";
  const resetAllStatusDecoration = () => {
    setStatusReceivedDecoration("");
    setStatusProcessingDecoration("");
    setStatusFinishDecoration("");
  };
  const handleIncomingOrder = () => {
    setFilterMockOrderData(
      orders.filter((order) => order.status === "RECEIVED")
    );
    resetAllStatusDecoration();
    setStatusReceivedDecoration(decorationStatus);
  };
  const handleProcessingOrder = () => {
    setFilterMockOrderData(
      orders.filter((order) => order.status === "PREPARING")
    );
    resetAllStatusDecoration();
    setStatusProcessingDecoration(decorationStatus);
  };
  const handleFinishOrder = () => {
    setFilterMockOrderData(
      orders.filter((order) => order.status === "COMPLETED")
    );
    resetAllStatusDecoration();
    setStatusFinishDecoration(decorationStatus);
  };

  return (
    <div className="container py-[40px] px-40 ">
      <div className="col-span-3 bg-card border rounded-[12px] shadow-md py-12 px-14">
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
            <button
              className={"" + statusReceivedDecoration}
              onClick={() => handleIncomingOrder()}
            >
              Incoming
            </button>
            <button
              className={"" + statusProcessingDecoration}
              onClick={() => handleProcessingOrder()}
            >
              Processing
            </button>
            <button
              className={"" + statusFinishDecoration}
              onClick={() => handleFinishOrder()}
            >
              Finish
            </button>
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
                  decoration="text-sm px-2 py-2"
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;

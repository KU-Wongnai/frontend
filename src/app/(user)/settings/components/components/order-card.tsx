import React from "react";
import { Order } from "@/types/order";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type OrderCardProps = {
  order: Order;
};

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const totalPrice = order.orderItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const statusColors = {
    PENDING: "bg-yellow-200 text-yellow-800",
    RECEIVED: "bg-blue-200 text-blue-800",
    PREPARING: "bg-orange-200 text-orange-800",
    COMPLETED: "bg-green-200 text-green-800",
    CANCELLED: "bg-red-200 text-red-800",
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="border p-4 rounded-sm shadow bg-card lg:w-[710px]   w-full mx-auto">
          <div className="flex flex-col md:flex-row justify-start w-full items-center">
            <div className="mb-4 md:mb-0 md:mr-6">
              <Image
                src={
                  order.orderItems[0].menu.image ||
                  "https://via.placeholder.com/150"
                }
                alt={order.orderItems[0].menu.name}
                width={64}
                height={64}
                className="w-full md:w-56 h-40 object-cover rounded"
              />
            </div>
            <div className="flex flex-col justify-start items-start w-full mx-1 md:mx-3">
              <div className="flex w-full justify-between mb-3">
                <h4 className="text-xl md:text-2xl font-semibold tracking-tight">
                  {order.restaurant.name}
                </h4>
                <div
                  className={`${
                    statusColors[order.status]
                  } px-2 py-1 rounded-sm font-semibold`}
                >
                  {order.status}
                </div>
              </div>
              <div className="flex flex-col justify-start items-start text-sm">
                <div>{order.orderItems[0].name}</div>
                <div>
                  <span className=" font-semibold">Price: </span>$
                  {totalPrice.toFixed(2)}
                </div>
                <div>
                  <span className=" font-semibold">Quantity: </span>
                  {order.orderItems[0].quantity}
                </div>
                <div>
                  <span className=" font-semibold">Contact rider: </span>
                  {order.delivery?.contactInfo}
                </div>
                <div>
                  <span className=" font-semibold">Delivery Address: </span>
                  {order.delivery?.deliveryAddress}
                </div>
              </div>
              <p className="text-right w-full text-sm text-gray-500 mt-2">
                Update at {new Date(order.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order detail</DialogTitle>
          <DialogDescription>
            {order.orderItems.map((item) => (
              <div key={item.id} className="flex mb-4 justify-start">
                <div>
                  {item.menu && item.menu.image && (
                    <Image
                      src={item.menu.image}
                      alt={item.menu.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover mb-2 md:mb-0 md:mr-4 rounded"
                    />
                  )}
                </div>
                <div>
                  <div className="text-lg">{item.name}</div>
                  <div>
                    Price: ${item.price.toFixed(2)} (x{item.quantity})
                  </div>
                </div>
              </div>
            ))}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default OrderCard;

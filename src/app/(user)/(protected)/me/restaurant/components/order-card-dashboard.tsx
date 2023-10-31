"use client";

import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../../components/ui/avatar";
import { Order } from "@/types/order";
import { getOrderByID, updateOrderStatus } from "@/services/order";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { mockOrderData } from "@/mock/order";
import { Separator } from "@/components/ui/separator";

const OrderCard: React.FC<any> = ({ id, decoration }) => {
  const [order, setOrder] = useState<Order>(mockOrderData[0]);

  useEffect(() => {
    const fetchOrder = async () => {
      const order = await getOrderByID(id);
      setOrder(order);
    };
    fetchOrder();
  }, [id]);

  const handlePreparing = () => {
    console.log("id", id);
    updateOrderStatus(id, "PREPARING");
  };

  const handleCompleted = () => {
    updateOrderStatus(id, "COMPLETED");
  };

  // setOrder(mockOrderData[0]);

  return (
    <Dialog>
      <div className="flex flex-col mt-2 ml-6 border-b py-3">
        <div className="flex text-xs text-green-600 font-md py-2">
          <p>Order number :</p>
          <p>{id}</p>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2 mr-4">
              <Avatar>
                <AvatarImage src={order?.user?.avatar || ""} alt="avatar" />
                <AvatarFallback>{order?.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm">{order?.user.name}</p>
                <p className="text-xs font-light">
                  {order?.orderItems.length} items
                </p>
              </div>
            </div>
            <DialogTrigger
              className={
                "bg-green-600 text-white px-1 py-1  rounded-md text-right" +
                decoration
              }
            >
              view
            </DialogTrigger>
          </div>
          <p className="text-green-600 text-xs font-light">
            {order?.createdAt?.toLocaleString()}
          </p>
        </div>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order #{id}</DialogTitle>
          <DialogDescription>Order details</DialogDescription>
        </DialogHeader>

        <div className="px-2">
          <h3 className="text-md font-semibold">Order Items</h3>
          <Separator />
          {/* show list of order items */}
          <div className="overflow-y-auto max-h-[20rem] p-2">
          <div className="flex flex-col space-y-2">
            {order?.orderItems.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between">
                  <div className="flex space-x-2 mr-4">
                    <div className="flex items-center">
                      <p className="text-sm">{item.menu?.name}</p>
                      <p className="text-xs font-light ml-2">
                        ({item.quantity} items)
                      </p>
                    </div>
                  </div>
                  <p className="text-green-600 text-xs font-light">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                {/* show list of order items option */}
                <div className="flex flex-col ">
                  {item.orderItemOption.map((option) => (
                    <div key={option.id}>
                      <div className="flex justify-between">
                        <div className="flex space-x-2 ml-4">
                          <div className="flex flex-col">
                            <p className="text-xs">{option.name}</p>
                          </div>
                        </div>
                        <p className="text-green-600 text-xs font-light">
                          ${option.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between">
                  <div className="flex space-x-2">
                    <div className="flex flex-col">
                      <p className="text-xs">Total price x {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-green-600 text-xs font-light">
                    ${(item.totalPrice * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          </div>
          <Separator />

          <div className="text-xs text-gray-400 mt-2">
            <p>
              <strong>Created At:</strong> {order?.createdAt?.toLocaleString()}
            </p>
            <p>
              <strong>Updated At:</strong> {order?.updatedAt?.toLocaleString()}
            </p>
          </div>
        </div>
        <DialogFooter>
          {order?.status === "RECEIVED" ? (
            <Button
              type="submit"
              onClick={handlePreparing}
              className="text-white"
            >
              Accept
            </Button>
          ) : (
            <>
              {order?.status === "PREPARING" ? (
                <Button
                  type="submit"
                  onClick={handleCompleted}
                  className="text-white"
                >
                  Completed
                </Button>
              ) : (
                <></>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderCard;

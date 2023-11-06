"use client";

import Currency from "@/components/currency";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getOrderByID } from "@/services/order";
import { Order } from "@/types/order";
import { set } from "date-fns";
import { notFound, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import NewChat from "../../../conversations/components/new-chat";
import { findUserBy } from "@/services/user";
import { User } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatPhoneNumber } from "react-phone-number-input";

const OrderDetailPage = () => {
  const [order, setOrder] = useState<Order>();
  const [rider, setRider] = useState<User>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const params = useParams();

  const statusColors: any = {
    PENDING: "bg-yellow-200 text-yellow-800",
    RECEIVED: "bg-blue-200 text-blue-800",
    PREPARING: "bg-orange-200 text-orange-800",
    COMPLETED: "bg-green-200 text-green-800",
    CANCELLED: "bg-red-200 text-red-800",
  };

  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true);
      try {
        const data = await getOrderByID(params.orderId as string);
        setOrder(data);
        const rider = await findUserBy(data.delivery?.riderId);
        setRider(rider);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    fetchOrder();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    notFound();
  }

  return (
    <div className="w-full max-w-3xl space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Your order detail for{" "}
            <span className="text-primary">#{order?.id}</span>
          </CardTitle>
          <CardDescription>
            <div
              className={`${
                statusColors[order.status]
              } inline-block px-2 py-1 rounded-sm font-semibold`}
            >
              {order.status}
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {order?.delivery ? (
            <>
              <div className="pb-3">
                <h3 className="font-bold mb-3">Rider</h3>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage
                        src={rider?.user_profile?.avatar}
                        alt={rider?.name}
                      ></AvatarImage>
                      <AvatarFallback>{rider?.name[0]}</AvatarFallback>
                    </Avatar>
                    <span>{rider?.name}</span>
                  </div>
                  <div>
                    <NewChat email={rider?.email} />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-bold">Delivery Address</h3>
                <div className="text-sm">
                  {order?.delivery?.deliveryAddress}
                </div>
              </div>
              <div>
                <h3 className="font-bold">Your Contact Information</h3>
                <div className="text-sm">
                  {formatPhoneNumber(order?.delivery?.contactInfo)}
                </div>
              </div>
            </>
          ) : (
            <div>No rider has picked up your order yet.</div>
          )}
          <div>
            <h3 className="font-bold">Order Items</h3>
            <ol>
              {order?.orderItems.map((item, idx) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between text-sm"
                >
                  <div>
                    <span className="mr-1">{idx + 1}.</span>
                    <span>{item.menu.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.orderItemOption
                        .map((option) => option.name)
                        .join(", ")}
                    </span>
                  </div>
                  <div>
                    <span className="mr-3">x {item.quantity}</span>
                    <Currency value={item.totalPrice} />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <span>Total</span>
          <Currency
            className="text-primary ml-1"
            value={order.orderItems
              .map((item) => item.totalPrice)
              .reduce((a, b) => a + b, 0)}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrderDetailPage;

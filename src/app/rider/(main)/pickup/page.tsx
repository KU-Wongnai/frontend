"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Delivery } from "@/types/order";
import { assignDelivery, getUnassignedDeliveryOrders } from "@/services/order";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const OrderPickupPage = () => {
  const [deliveryOrders, setDeliveryOrders] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUnassignedDeliveryOrders();

      setDeliveryOrders(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleAccept = async (deliveryId: string) => {
    try {
      const data = await assignDelivery(deliveryId);

      setDeliveryOrders((prev) =>
        prev.filter((delivery) => delivery.id !== data.id)
      );
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <main className="my-12">
      <h1 className="font-bold text-xl sm:text-2xl md:text-3xl">
        Order Delivery Near You
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        Choose an order to start delivering
      </p>
      <section className="my-6">
        {loading ? (
          <div className="space-y-4">
            {new Array(5).fill(0).map((_, i) => (
              <div
                key={i}
                role="status"
                className="flex items-center justify-center h-72 w-full bg-neutral-300 rounded-lg animate-pulse dark:bg-neutral-700"
              >
                <span className="sr-only">Loading...</span>
              </div>
            ))}
          </div>
        ) : deliveryOrders?.length > 0 ? (
          <div className="space-y-4">
            {deliveryOrders.map((d) => (
              <Card key={d.id}>
                <CardHeader>
                  <div className="flex gap-3">
                    <Avatar>
                      <AvatarImage
                        src={d.order.restaurant?.image || ""}
                        alt={d.order.restaurant?.name}
                      ></AvatarImage>
                      <AvatarFallback>
                        {d.order.restaurant?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{d.order.restaurant?.name}</CardTitle>
                      <CardDescription>Order #{d.order.id}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Address
                    </p>
                    <span>{d.deliveryAddress}</span>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Items
                    </p>
                    <span>{d.order.orderItems.length}</span>
                  </div>
                </CardContent>
                <CardFooter className="space-x-3">
                  <Button onClick={() => handleAccept(d.id)}>Accept</Button>
                  <Button variant="outline" asChild>
                    <Link href={`/rider/pickup/${d.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center mt-12">
            No order delivery at this moment.
          </div>
        )}
      </section>
    </main>
  );
};

export default OrderPickupPage;

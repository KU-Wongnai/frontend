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
import { Delivery } from "@/interfaces/order";
import { getUnassignedDeliveryOrders } from "@/services/order";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const OrderPickupPage = () => {
  const [deliveryOrders, setDeliveryOrders] = useState<Delivery[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUnassignedDeliveryOrders();

      setDeliveryOrders(data);
    };

    fetchData();
  }, []);

  return (
    <main>
      <h1 className="font-bold text-xl sm:text-2xl md:text-3xl">
        Order Delivery Near You
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        Choose an order to start delivering
      </p>
      <section className="my-6">
        <div className="space-y-4">
          {deliveryOrders.map((d) => (
            <Card>
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
                <Button>Accept</Button>
                <Button variant="outline" asChild>
                  <Link href="/rider/pickup/1">View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
};

export default OrderPickupPage;

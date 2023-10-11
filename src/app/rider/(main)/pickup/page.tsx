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
import Link from "next/link";
import React from "react";

const OrderPickupPage = () => {
  return (
    <main>
      <h1 className="font-bold text-xl sm:text-2xl md:text-3xl">
        Order Delivery Near You
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        Choose an order to start delivering
      </p>
      <section className="my-6">
        <div>
          <Card>
            <CardHeader>
              <div className="flex gap-3">
                <Avatar>
                  <AvatarImage></AvatarImage>
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>McDonalds</CardTitle>
                  <CardDescription>Order #123</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Address
                </p>
                <span>Somewhere</span>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Items
                </p>
                <span>2</span>
              </div>
            </CardContent>
            <CardFooter className="space-x-3">
              <Button>Accept</Button>
              <Button variant="outline" asChild>
                <Link href="/rider/pickup/1">View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default OrderPickupPage;

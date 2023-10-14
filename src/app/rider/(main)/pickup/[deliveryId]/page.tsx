"use client";

import Map from "@/app/rider/(main)/components/map";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Delivery } from "@/interfaces/order";
import { getDelivery } from "@/services/order";
import { CardContent } from "@mui/material";
import { ChefHat, Mail, MapPin, Phone, User2 } from "lucide-react";
import { formatPhoneNumber } from "react-phone-number-input";
import React, { useEffect } from "react";

const DeliveryDetails = ({ params }: { params: { deliveryId: string } }) => {
  const [deliveryOrder, setDeliveryOrder] = React.useState<Delivery>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDelivery(params.deliveryId);
      setDeliveryOrder(data);
    };
    fetchData();
  }, []);

  return (
    <main className="my-12">
      <Card>
        <CardHeader>
          <CardTitle>
            Order{" "}
            <span className="text-primary">#{deliveryOrder?.order.id}</span>{" "}
            Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="px-3 sm:px-3">
            <div className="mb-2 sm:mb-4 space-y-1 sm:space-y-2">
              <h2 className="text-lg font-bold">Customer Details</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm sm:text-base font-medium">
                  <User2 />
                  Name
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base font-medium">
                  <Avatar>
                    <AvatarImage
                      src={deliveryOrder?.order.user?.avatar || ""}
                      alt={deliveryOrder?.order.user?.name}
                    ></AvatarImage>
                    <AvatarFallback>
                      {deliveryOrder?.order.user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {deliveryOrder?.order?.user?.name}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 first-letter:text-sm sm:text-base font-medium">
                  <Mail /> Email
                </div>
                <div className="text-sm sm:text-base font-medium">
                  {deliveryOrder?.order?.user?.email}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm sm:text-base font-medium">
                  <Phone /> Contact
                </div>
                <div className="text-sm sm:text-base font-medium">
                  {formatPhoneNumber(deliveryOrder?.contactInfo || "")}
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="mb-2 sm:mb-4 space-y-1 sm:space-y-2 ">
              <h2 className="text-lg font-bold">Restaurant Details</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm sm:text-base font-medium">
                  <ChefHat />
                  Name
                </div>
                <div className="flex items-center gap-3 text-sm sm:text-base font-medium">
                  <Avatar>
                    <AvatarImage
                      src={deliveryOrder?.order.restaurant?.image || ""}
                      alt={deliveryOrder?.order.restaurant?.name}
                    ></AvatarImage>
                    <AvatarFallback>
                      {deliveryOrder?.order.restaurant?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {deliveryOrder?.order.restaurant?.name}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-1 text-sm sm:text-base font-medium">
                  <MapPin />
                  Location
                </div>
                <div className="text-sm sm:text-base font-medium">
                  {deliveryOrder?.order.restaurant?.location}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-1 text-sm sm:text-base font-medium">
                  <Phone />
                  Contact
                </div>
                <div className="text-sm sm:text-base font-medium">
                  {deliveryOrder?.order.restaurant?.contactInfo}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-1 text-sm sm:text-base font-medium">
                  <MapPin />
                  Delivery Location
                </div>
                <div className="text-sm sm:text-base font-medium">
                  {deliveryOrder?.deliveryAddress}
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="mb-2 sm:mb-4 mt-4">
              <h3 className="text-sm sm:text-base font-medium mb-1 sm:mb-2 text-left">
                Order Items
              </h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="bg-muted">#</TableHead>
                    <TableHead className="bg-muted">Menu Item</TableHead>
                    <TableHead className="bg-muted">Quantity</TableHead>
                    <TableHead className="bg-muted">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deliveryOrder?.order &&
                    deliveryOrder?.order.orderItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.menu.id}</TableCell>
                        <TableCell>{item.menu.name}</TableCell>
                        <TableCell>x{item.quantity}</TableCell>
                        <TableCell>
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "THB",
                          }).format(item.price)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-medium mb-2 text-left">
                Location
              </h3>
              <Map />
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default DeliveryDetails;

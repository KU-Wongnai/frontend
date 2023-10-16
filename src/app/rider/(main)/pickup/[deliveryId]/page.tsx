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
import { Delivery } from "@/types/order";
import { getDelivery } from "@/services/order";
import { CardContent } from "@mui/material";
import { ChefHat, Mail, MapPin, Phone, User2 } from "lucide-react";
import { formatPhoneNumber } from "react-phone-number-input";
import React, { useEffect } from "react";

const DeliveryDetails = ({ params }: { params: { deliveryId: string } }) => {
  const [deliveryOrder, setDeliveryOrder] = React.useState<Delivery>();
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDelivery(params.deliveryId);
      setDeliveryOrder(data);
      setLoading(false);
    };
    fetchData();
  }, [params.deliveryId]);

  return (
    <main className="my-12">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2">
              Order
              <div className="flex items-center text-primary">
                #
                {loading ? (
                  <div className="animate-pulse ml-2 h-2.5 bg-green-200 rounded-full dark:bg-green-700 w-48">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <span>{deliveryOrder?.order.id}</span>
                )}
              </div>
              Details
            </div>
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
                  {loading ? (
                    <div className="animate-pulse h-2.5 bg-neutral-200 rounded-full dark:bg-neutral-700 w-48">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <span>{deliveryOrder?.order?.user?.name}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 first-letter:text-sm sm:text-base font-medium">
                  <Mail /> Email
                </div>
                <div className="text-sm sm:text-base font-medium">
                  {loading ? (
                    <div className="animate-pulse h-2.5 bg-neutral-200 rounded-full dark:bg-neutral-700 w-32">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <span>{deliveryOrder?.order?.user?.email}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm sm:text-base font-medium">
                  <Phone /> Contact
                </div>
                <div className="text-sm sm:text-base font-medium">
                  {loading ? (
                    <div className="animate-pulse h-2.5 bg-neutral-200 rounded-full dark:bg-neutral-700 w-24">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <span>
                      {formatPhoneNumber(deliveryOrder?.contactInfo || "")}
                    </span>
                  )}
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
                  {loading ? (
                    <div className="animate-pulse h-2.5 bg-neutral-200 rounded-full dark:bg-neutral-700 w-48">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <span>{deliveryOrder?.order?.restaurant?.name}</span>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-1 text-sm sm:text-base font-medium">
                  <MapPin />
                  Location
                </div>
                <div className="text-sm sm:text-base font-medium">
                  {loading ? (
                    <div className="animate-pulse h-2.5 bg-neutral-200 rounded-full dark:bg-neutral-700 w-52">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <span>{deliveryOrder?.order?.restaurant?.location}</span>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-1 text-sm sm:text-base font-medium">
                  <Phone />
                  Contact
                </div>
                <div className="text-sm sm:text-base font-medium">
                  {loading ? (
                    <div className="animate-pulse h-2.5 bg-neutral-200 rounded-full dark:bg-neutral-700 w-24">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <span>{deliveryOrder?.order?.restaurant?.contactInfo}</span>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="animate-pulse flex items-center gap-1 text-sm sm:text-base font-medium">
                  <MapPin />
                  Delivery Location
                </div>
                <div className="text-sm sm:text-base font-medium">
                  {loading ? (
                    <div className="h-2.5 bg-neutral-200 rounded-full dark:bg-neutral-700 w-52">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <span>{deliveryOrder?.deliveryAddress}</span>
                  )}
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="mb-2 sm:mb-4 mt-4">
              <h3 className="text-sm sm:text-base font-medium mb-1 sm:mb-2 text-left">
                Order Items
              </h3>
              <>
                {loading ? (
                  <div role="status" className="w-full flex justify-center">
                    <svg
                      aria-hidden="true"
                      className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
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
                )}
              </>
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

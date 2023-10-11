import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CardContent } from "@mui/material";
import React from "react";

const orderDetail = {
  id: "65181d45dafa7f1b714b7b61",
  name: "Louella Mooney",
  restaurantLocation: "39 Conway Street, Corriganville, Kansas",
  deliveryLocation: "39 Conway Street, Corriganville, Kansas",
  amount: 592,
  order: [
    {
      id: "m5gr84i9",
      amount: 316,
      menu: "ยำหมูยอไข่แดง",
      restaurant: "ร้านอาหาร 1",
      quantity: 1,
    },
    {
      id: "3u1reuv4",
      amount: 242,
      menu: "ข้าวผัดกุ้ง",
      restaurant: "ร้านอาหาร 2",
      quantity: 1,
    },
    {
      id: "derv1ws0",
      amount: 837,
      menu: "ข้าวผัดหมู",
      restaurant: "ร้านอาหาร 3",
      quantity: 1,
    },
    {
      id: "5kma53ae",
      amount: 874,
      menu: "หมูกระทะ",
      restaurant: "ร้านอาหาร 4",
      quantity: 1,
    },
    {
      id: "bhqecj4p",
      amount: 721,
      menu: "ห่อหมก",
      restaurant: "ร้านอาหาร 5",
      quantity: 1,
    },
  ],
};

const DeliveryDetails = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="px-3 sm:px-3">
          <div className="mb-2 sm:mb-4 space-y-1 sm:space-y-2 ">
            <div className="flex justify-between">
              <div className="text-sm sm:text-base font-medium">Name</div>
              <div className="text-sm sm:text-base font-medium">
                {orderDetail.name}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm sm:text-base font-medium">Total</div>
              <div className="text-sm sm:text-base font-medium">
                ${orderDetail.amount}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm sm:text-base font-medium">
                Restaurant Location
              </div>
              <div className="text-sm sm:text-base font-medium">
                {orderDetail.restaurantLocation}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm sm:text-base font-medium">
                Delivery Location
              </div>
              <div className="text-sm sm:text-base font-medium">
                {orderDetail.deliveryLocation}
              </div>
            </div>
          </div>
          <div className="mb-2 sm:mb-4 mt-4">
            <h3 className="text-sm sm:text-base font-medium mb-1 sm:mb-2 text-left">
              Order List
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-muted">Restaurant</TableHead>
                  <TableHead className="bg-muted">Menu Item</TableHead>
                  <TableHead className="bg-muted">Quantity</TableHead>
                  <TableHead className="bg-muted">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderDetail.order &&
                  orderDetail.order.map((orderList) => (
                    <TableRow key={orderList.id}>
                      <TableCell>{orderList.restaurant}</TableCell>
                      <TableCell>{orderList.menu}</TableCell>
                      <TableCell>x{orderList.quantity}</TableCell>
                      <TableCell>${orderList.amount}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="flex justify-end">
          <Button>Accept</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryDetails;

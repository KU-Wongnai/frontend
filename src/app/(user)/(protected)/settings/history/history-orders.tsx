"use client";

import React, { useEffect, useState } from "react";
import OrderList from "../components/order-list";
import ordersSample from "@/mock/user-order";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getMyOrders } from "@/services/order";

const MyHistory: React.FC = () => {
  const [orders, setOrders] = useState([]);
  const filterOrder = ordersSample.filter(
    (order) => order.status === "COMPLETED" || order.status === "CANCELLED"
  );

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getMyOrders("COMPLETED");
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  }, []);

  return (
    <div className="w-full max-w-3xl space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">History Order</CardTitle>
          <CardDescription>
            Your history order {orders.length} Orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OrderList orders={orders} />
        </CardContent>
      </Card>
    </div>
  );
};

export default MyHistory;

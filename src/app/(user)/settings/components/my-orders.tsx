import React from "react";
import OrderList from "./components/order-list";
import ordersSample from "@/mock/user-order";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const MyOrders: React.FC = () => {
  const filterOrder = ordersSample.filter(
    (order) => order.status !== "COMPLETED" && order.status !== "CANCELLED"
  );

  return (
    <div className="w-full max-w-3xl space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Order</CardTitle>
          <CardDescription>
            {" "}
            Your order in progress {filterOrder.length} Orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OrderList orders={filterOrder} />
        </CardContent>
      </Card>
    </div>
  );
};

export default MyOrders;

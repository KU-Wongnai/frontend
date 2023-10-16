import { Order } from "@/types/order";
import React from "react";
import OrderCard from "./order-card";

type OrderListProps = {
  orders: Order[];
};

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <div>
      {orders.map((order) => (
        <div className="mb-3">
          <OrderCard key={order.id} order={order} />

        </div>
      ))}
    </div>
  );
};

export default OrderList;

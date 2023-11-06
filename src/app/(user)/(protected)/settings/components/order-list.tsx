import { Order } from "@/types/order";
import React from "react";
import OrderCard from "./order-card";

type OrderListProps = {
  orders: Order[];
};

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <>
      {orders.length > 0 ? (
        <div>
          {orders.map((order) => (
            <div className="mb-3" key={order.id}>
              <OrderCard key={order.id} order={order} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-sm my-12">
          If you order something it will be put here.
        </div>
      )}
    </>
  );
};

export default OrderList;

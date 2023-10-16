import React from "react";
import OrderList from "./components/order-list";
import ordersSample from "@/mock/user-order";

const MyOrders: React.FC = () => {
  // filter order to get only order that status are not COMPLETED and CANCELLED
  const filterOrder = ordersSample.filter(
    (order) => order.status !== "COMPLETED" && order.status !== "CANCELLED"
  );

  return (
    <div>
      <OrderList orders={filterOrder} />
    </div>
  );
};

export default MyOrders;

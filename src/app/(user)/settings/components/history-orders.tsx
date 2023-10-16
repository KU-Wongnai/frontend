import React from "react";
import OrderList from "./components/order-list";
import ordersSample from "@/mock/user-order";

const MyHistory: React.FC = () => {
  // filter order to get only order that status are COMPLETED or CANCELLED
  const filterOrder = ordersSample.filter(
    (order) => order.status === "COMPLETED" || order.status === "CANCELLED"
  );

  return (
    <div>
      <OrderList orders={filterOrder} />
    </div>
  );
};

export default MyHistory;

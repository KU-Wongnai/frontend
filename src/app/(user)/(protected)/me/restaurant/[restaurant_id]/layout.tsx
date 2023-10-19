import RestaurantNavbar from "../../../../../../components/navbar-restaurant";
import React from "react";

export default function RestaurantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    restaurant_id: number;
  };
}) {
  return (
    <>
      {/* Content */}
      <RestaurantNavbar restaurant_id={params.restaurant_id} />
      <div>{children}</div>
    </>
  );
}

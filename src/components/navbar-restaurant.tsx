"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import MenuManagementImage from "/src/assets/restaurant/menuManagement.jpg";
import OrderManagementImage from "/src/assets/restaurant/order-management.jpg";
import DashboardManagementImage from "/src/assets/restaurant/dashboardManagement.png";

import { usePathname } from "next/navigation";

const RestaurantNavbar = ({ restaurant_id }: { restaurant_id: number }) => {
  const pathName = usePathname();

  if (pathName === "/restaurant/create" || pathName === "/restaurant") {
    return null;
  }

  return (
    <>
      <header className="px-3 py-8 border-b top-0 bg-background mx-auto w-full text-black">
        <div className="flex flex-wrap gap-8 container justify-center">
          {/* <Link href="/restaurant/dashboard"> */}
          <Link
            // href={{
            //   pathname: `/me/restaurant/${restaurant_id}/menus`,
            //   query: { id: restaurant_id},
            // }}

            href={`/me/restaurants/${restaurant_id}/menus`}
            className="relative "
          >
            <Image
              src={MenuManagementImage}
              width={240}
              height={60}
              className="object-cover h-[100px] rounded-2xl shadow-lg"
              alt="Picture of the author"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 py-7 font-bold px-5">
              <h3>
                Menu
                <br />
                Management
              </h3>
            </div>
          </Link>
          <Link
            href={`/me/restaurants/${restaurant_id}/orders`}
            className="relative "
          >
            <Image
              src={OrderManagementImage}
              width={240}
              height={60}
              className="object-cover h-[100px] rounded-2xl shadow-lg"
              alt="Picture of the author"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 py-7 font-bold px-5">
              <h3>
                Order
                <br />
                Management
              </h3>
            </div>
          </Link>

          <Link
            href={`/me/restaurants/${restaurant_id}/dashboard`}
            className="relative "
          >
            <Image
              src={DashboardManagementImage}
              width={240}
              height={60}
              className="object-cover h-[100px] rounded-2xl shadow-lg"
              alt="Picture of the author"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 py-7 font-bold px-4">
              <h3>
                Dashboard
                <br />
                Management
              </h3>
            </div>
          </Link>
        </div>
      </header>
    </>
  );
};

export default RestaurantNavbar;

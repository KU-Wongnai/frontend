import React from "react";
import Link from "next/link";
import Image from "next/image";
import MenuManagementImage from "/src/assets/restaurant/menu-management.jpg";
import OrderManagementImage from "/src/assets/restaurant/order-management.jpg";


type Props = {};

const RestaurantNavbar = (props: Props) => {
  return (
    <>
      <header className="px-3 py-14 border-b top-0 bg-white mx-auto">
        <div className="flex flex-wrap gap-8">
          {/* <Link href="/restaurant/dashboard"> */}
          <Link  href="/restaurant/dashboard" className="relative ">
            <Image
              src={MenuManagementImage}
              width={240}
              height={160}
              className="object-cover h-[100px] rounded-2xl shadow-md"
              alt="Picture of the author"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 py-7 font-bold px-5">
              <h3>Menu<br />Management</h3>
            </div>
          </Link>
          <Link  href="/restaurant/dashboard" className="relative ">
            <Image
              src={OrderManagementImage}
              width={240}
              height={160}
              className="object-cover h-[100px] rounded-2xl shadow-md"
              alt="Picture of the author"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 py-7 font-bold px-5">
              <h3>Order<br />Management</h3>
            </div>
          </Link>
          <Link  href="/restaurant/dashboard" className="relative ">
            <Image
              src={MenuManagementImage}
              width={240}
              height={160}
              className="object-cover h-[100px] rounded-2xl shadow-md"
              alt="Picture of the author"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 py-7 font-bold px-5">
              <h3>Menu<br />Management</h3>
            </div>
          </Link>
          <Link  href="/restaurant/dashboard" className="relative ">
            <Image
              src={MenuManagementImage}
              width={240}
              height={160}
              className="object-cover h-[100px] rounded-2xl shadow-md"
              alt="Picture of the author"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 py-7 font-bold px-4">
              <h3>Menu<br />Management</h3>
            </div>
          </Link>
          <Link  href="/restaurant/dashboard" className="relative ">
            <Image
              src={MenuManagementImage}
              width={240}
              height={160}
              className="object-cover h-[100px] rounded-2xl shadow-md"
              alt="Picture of the author"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 py-7 font-bold px-4">
              <h3>Menu<br />Management</h3>
            </div>
          </Link>
          {/* </Link> */}
        </div>
      </header>
    </>
  );
};

export default RestaurantNavbar;

"use client";

import React from "react";
import Image from "next/image";
import { Menu, MenuOption } from "@/types/restaurant";
import CurrencyFormat from "react-currency-format";

const MenuCard: React.FC<Menu> = ({
  id,
  image,
  name,
  description,
  category,
  price,
  menuOptions,
}) => {
  const imageUrlUse =
    image ||
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80";

  return (
    <div className="rounded-lg overflow-hidden shadow-md w-80 sm:w-56 border">
      <div className="h-40 relative">
        <Image
          src={imageUrlUse}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="object-cover"
        />
      </div>
      <div className="p-4 flex flex-col text-start">
        <p className="text-gray-600 text-sm sm:text-base">{category}</p>
        <h2 className="font-bold text-lg sm:text-xl mb-2">{name}</h2>
        {/* <span className="text-gray-500 text-sm sm:text-base">{price} $</span> */}
        <CurrencyFormat
          value={price}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"฿"}
          className="text-gray-500 text-sm sm:text-base"
        />
      </div>
    </div>
  );
};

export default MenuCard;

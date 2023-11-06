import React, { useState } from "react";
import Image from "next/image";
const FoodCategoryCard: React.FC<any> = ({ id, emoji, name, itemTotal, decoration, currentPage,onClick}) => {
  return (
    <>
        {/* decoration => bg-color, text-color */}
      <div onClick={() => onClick(name)} className={"shadow-md rounded-sm h-[80px] w-[80px] px-4 flex flex-col justify-center items-center transition-all cursor-pointer whitespace-nowrap "+ decoration + (currentPage == name ? " bg-green-600 text-white" : " bg-green-200 text-gray-400")}>
        <p className="text-2xl">{emoji}</p>
        <p className="text-sm font-semibold">{name}</p>
        <p className="text-xs font-light">{itemTotal} Items</p>
      </div>
    </>
  );
};

export default FoodCategoryCard;

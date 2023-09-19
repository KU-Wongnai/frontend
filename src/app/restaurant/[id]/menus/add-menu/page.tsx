"use client";
import TagTitle from "@/components/tag-title";
import React, { useState } from "react";
type Props = {};

const AddMenuPage = (props: Props) => {
  return (
    <div className="container py-[40px] px-40 ">
      <div className="col-span-3 bg-white  rounded-[12px] shadow-md py-12 px-14">
        {/* Tag Topic (Menu) */}
        <div className="flex">
          <TagTitle />
          <div className="flex flex-col">
            <p className="font-bold text-2xl py-2">Add menu</p>
            <p className="font-light text-md text-gray-500">
              restaurant new menu
            </p>
          </div>
        </div>

        {/* for category card bar */}
      </div>
    </div>
  );
};

export default AddMenuPage;

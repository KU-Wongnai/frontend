"use client";

import DropdownFoodCategories from "@/components/dropdown-foodCategories";
import TagTitle from "@/components/tag-title";
import React, { useEffect, useState } from "react";

type Props = {};

export default function CreateRestaurant({}: Props) {
  const [optionCount, setOptionCount] = useState<number>(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [pricingRange, setPricingRange] = useState<
    "" | "underHundred" | "hundredToThousand"
  >("");

  const onPricingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPricingRange(
      e.target.value as "" | "underHundred" | "hundredToThousand"
    );
  };

  const [serviceType, setServiceType] = useState<{
    isDelivery: boolean;
    isWalkIn: boolean;
  }>({ isDelivery: false, isWalkIn: false });

  const onHandleChangeDeliveryStatus = () => {
    setServiceType({
      isDelivery: !serviceType.isDelivery,
      isWalkIn: serviceType.isWalkIn,
    });
  };

  const onHandleChangeWalkInStatus = () => {
    setServiceType({
      isDelivery: serviceType.isDelivery,
      isWalkIn: !serviceType.isWalkIn,
    });
  };

  const handleDeleteCategory = (indexToDelete: number) => {
    const updatedCategories = selectedCategories.filter(
      (_, index) => index !== indexToDelete
    );
    setSelectedCategories(updatedCategories);
    setOptionCount(updatedCategories.length);
  };

  useEffect(() => {
    console.log(serviceType);
  }, [serviceType]);
  useEffect(() => {
    console.log(pricingRange);
  }, [pricingRange]);

  useEffect(() => {
    console.log(selectedCategories);
  }, [selectedCategories]);

  const handleAddCategory = () => {
    setOptionCount(optionCount + 1);
    setSelectedCategories([...selectedCategories, ""]);
  };

  const handleCategoryChange = (index: number, selectedCategory: string) => {
    // Update the selected categories based on the index
    const updatedCategories = [...selectedCategories];
    updatedCategories[index] = selectedCategory;
    setSelectedCategories(updatedCategories);
  };

  return (
    <div className="">
      <div className="container py-10 mt-14 px-20">
        <p className="text-3xl font-bold">Add your restaurant</p>
        <p className="text-green-600 py-4">
          Providing accurate information will make it easier for users to find
          your restaurant
        </p>
      </div>
      {/* background of each section*/}
      <div className="">
        {/* block for base information  */}
        <div className="flex justify-center text-sm font-bold container">
          {/* sprit 2 side */}
          <div className="w-2/3">
            {/* inner white block for input */}
            <div className="bg-white w-600 rounded-[12px] m-10 pb-16">
              <hr className="w-full rounded-t-[12px] h-4 bg-green-600 border-transparent" />
              <div>
                <div className="px-10 py-10 flex items-center mt-6">
                  <TagTitle />
                  <div>
                    <p className="font-bold text-lg py-2">Basic information</p>
                    <p className="text-md font-light text-gray-500">
                      restaurant information
                    </p>
                  </div>
                </div>
                <div className="flex flex-col ml-3 space-y-4">
                  <div className="flex flex-col px-14 mr-8 ml-8">
                    <label
                      htmlFor="input-label-with-helper-text"
                      className="block text-sm font-medium mb-2 text-green-600"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="py-3 px-4 block w-full border-gray-300 border-2 rounded-md text-sm font-light focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      placeholder="restaurant name"
                    />
                    <p
                      className="text-xs font-light text-gray-500 mt-2"
                      id="hs-input-helper-text"
                    >
                      Enter your restaurant name
                    </p>
                  </div>
                  <div className="flex flex-col px-14 mr-8 ml-8">
                    <label
                      htmlFor="input-label-with-helper-text"
                      className="block text-sm font-medium mb-2 text-green-600"
                    >
                      Branch
                    </label>
                    <input
                      type="text"
                      id="branch"
                      className="py-3 px-4 block w-full font-light border-gray-300 border-2 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      placeholder="restaurant branch"
                    />
                    <p
                      className="text-xs font-light text-gray-500 mt-2"
                      id="hs-input-helper-text"
                    >
                      Enter your restaurant branch
                    </p>
                  </div>
                  <div className="flex flex-col px-14 mr-8 ml-8 justify-start items-start gap-4">
                    <label
                      htmlFor="input-label-with-helper-text"
                      className="block text-sm font-medium mb-1 text-green-600"
                    >
                      Type of Restaurant
                    </label>
                    {Array.from({ length: optionCount }).map((_, index) => (
                      <div className="flex justify-center items-center gap-3"
                      key={index}
                      >
                        <DropdownFoodCategories
                          value={selectedCategories[index] || ""}
                          onChange={(selectedCategory) =>
                            handleCategoryChange(index, selectedCategory)
                          }
                        />
                        <button
                          className="text-sm font-light text-white bg-red-400 px-3 py-1 rounded-sm "
                          onClick={() => handleDeleteCategory(index)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                    <button
                      className="text-sm font-light text-green-600 underline"
                      onClick={handleAddCategory}
                    >
                      + เพิ่มประเภทอื่นๆ
                    </button>
                  </div>
                  <div className="flex flex-col px-14 mr-8 ml-8">
                    <label
                      htmlFor="input-label-with-helper-text"
                      className="block text-sm font-medium mb-2 text-green-600"
                    >
                      รูปแบบบริการ
                    </label>
                    <div className="flex gap-4">
                      <div className="flex items-center">
                        <input
                          id="link-checkbox-delivery"
                          type="checkbox"
                          value="delivery"
                          onClick={onHandleChangeDeliveryStatus}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
                        />
                        <label
                          htmlFor="link-checkbox-delivery"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Delivery
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="link-checkbox-walkIn"
                          type="checkbox"
                          value="walkIn"
                          onClick={onHandleChangeWalkInStatus}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
                        />
                        <label
                          htmlFor="link-checkbox-walkIn"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          รับที่ร้าน
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col px-14 mr-8 ml-8">
                    <label
                      htmlFor="input-label-with-helper-text"
                      className="block text-sm font-medium mb-2 text-green-600"
                    >
                      ช่วงราคา
                    </label>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center">
                        <input
                          id="under-100"
                          type="radio"
                          name="default-radio"
                          value="underHundred"
                          checked={pricingRange === "underHundred"}
                          onChange={onPricingChange}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="under-100"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          ต่ำกว่า 100 บาท
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          defaultChecked
                          id="100-to-1000"
                          type="radio"
                          value="hundredToThousand"
                          name="default-radio"
                          checked={pricingRange === "hundredToThousand"}
                          onChange={onPricingChange}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="100-to-1000"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          100 ถึง 1000 บาท
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </div>
          <div className="p-4 flex flex-col justify-center items-center w-1/3 gap-4">
            <div className=" rounded-full w-[80px] h-[80px] bg-[#9DA9DF] flex items-center justify-center">
              <p className="font-bold text-2xl text-white">1</p>
            </div>
            <div className=" rounded-full w-[40px] h-[40px] bg-[#9DA9DF]"></div>
            <div className=" rounded-full w-[20px] h-[20px] bg-[#9DA9DF]"></div>
          </div>
        </div>
        <div className="bg-white py-20">

        </div>
      </div>
    </div>
  );
}

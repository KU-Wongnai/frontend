"use client";

import DropdownDayInWeek from "@/components/dropdown-dayInWeek";
import DropdownFoodCategories from "@/components/dropdown-foodCategories";
import TagTitle from "@/components/tag-title";
import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import DropdownTimeScale from "@/components/dropdown-timeScale";
type Props = {};

let marker: any;
export default function CreateRestaurant({}: Props) {
  const [optionCount, setOptionCount] = useState<number>(1);
  const [optionCountDay, setOptionCountDay] = useState<number>(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<string[]>([]);
  const [selectedOpenTime, setSelectedOpenTime] = useState<string>("");
  const [selectedCloseTime, setSelectedCloseTime] = useState<string>("");
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

  const [Time, setTime] = useState<{
    openTime: string;
    closeTime: string;
  }>({ openTime: "", closeTime: "" });

  const onHandleChangeOpenTimeStatus = (selectedTime: string) => {
    setTime({
      openTime: selectedTime,
      closeTime: Time.closeTime,
    });
  };

  const onHandleChangeCloseTimeStatus = (selectedTime: string) => {
    setTime({
      openTime: Time.openTime,
      closeTime: selectedTime,
    });
  };

  const handleDeleteCategory = (indexToDelete: number) => {
    const updatedCategories = selectedCategories.filter(
      (_, index) => index !== indexToDelete
    );
    setSelectedCategories(updatedCategories);
    setOptionCount(updatedCategories.length);
  };

  const handleDeleteDay = (indexToDelete: number) => {
    const updatedDay = selectedDay.filter(
      (_, index) => index !== indexToDelete
    );
    setSelectedDay(updatedDay);
    setOptionCountDay(updatedDay.length);
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

  useEffect(() => {
    console.log(selectedDay);
  }, [selectedDay]);
  
  useEffect(() => {
    console.log(Time);
  }, [Time]);

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

  const handleAddDay = () => {
    setOptionCountDay(optionCountDay + 1);
    setSelectedDay([...selectedDay, ""]);
  };

  const handleDayChange = (index: number, selectedDayValue: string) => {
    // Update the selected categories based on the index
    const updatedDay = [...selectedDay];
    updatedDay[index] = selectedDayValue;
    setSelectedDay(updatedDay);
  };

  // const handleAddTime = () => {
  //   setOptionCountTime(optionCountTime + 1);
  //   setSelectedTime([...selectedDay, ""]);
  // };

  const [markerPosition, setMarkerPosition] = useState({
    lat: 13.850563550109797,
    lng: 100.57007576117385,
  });

  const handleMoveMarker = () => {
    if (marker) {
      const newPosition = new window.google.maps.LatLng(
        markerPosition.lat,
        markerPosition.lng
      );
      marker.setPosition(newPosition);
    }
  };

  useEffect(() => {
    console.log(markerPosition);
  }, [markerPosition]);

  const renderMarkers = (map: any, maps: any) => {
    const cityCircle = new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.15,
      map,
      center: { lat: 13.850563550109797, lng: 100.57007576117385 },
      radius: 1000,
      draggable: false,
    });
    marker = new maps.Marker({
      position: { lat: 13.850563550109797, lng: 100.57007576117385 },
      map,
      title: "Hello World!",
      draggable: true,
    });
    marker.addListener("dragend", () => {
      const newPosition = marker.getPosition();
      setMarkerPosition({ lat: newPosition.lat(), lng: newPosition.lng() });
    });
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
            <div className="bg-white w-600 rounded-[12px] m-10 pb-16 shadow-md">
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
                      Category of Food
                    </label>
                    {Array.from({ length: optionCount }).map((_, index) => (
                      <div
                        className="flex justify-center items-center gap-3"
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
                      + Add Additional Categories
                    </button>
                  </div>
                  <div className="flex flex-col px-14 mr-8 ml-8">
                    <label
                      htmlFor="input-label-with-helper-text"
                      className="block text-sm font-medium mb-2 text-green-600"
                    >
                      Service option
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
                          Walk In
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col px-14 mr-8 ml-8">
                    <label
                      htmlFor="input-label-with-helper-text"
                      className="block text-sm font-medium mb-2 text-green-600"
                    >
                      Price Range
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
                          Less than 100 baht.
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
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
                          100 to 1000 baht.
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
      </div>
      {/* background of each section*/}
      <div className="bg-white">
        {/* block for base information  */}
        <div className="flex justify-center text-sm font-bold container">
          {/* sprit 2 side */}
          <div className="p-4 flex flex-col justify-center items-center w-1/3 gap-4">
            <div className=" rounded-full w-[80px] h-[80px] bg-[#9DA9DF] flex items-center justify-center">
              <p className="font-bold text-2xl text-white">2</p>
            </div>
            <div className=" rounded-full w-[40px] h-[40px] bg-[#9DA9DF]"></div>
            <div className=" rounded-full w-[20px] h-[20px] bg-[#9DA9DF]"></div>
          </div>
          <div className="w-2/3">
            {/* inner white block for input */}
            <div className="bg-white w-600 rounded-[12px] m-10 pb-16 shadow-md">
              <hr className="w-full rounded-t-[12px] h-4 bg-green-600 border-transparent" />
              <div>
                <div className="px-10 py-10 flex items-center mt-6">
                  <TagTitle />
                  <div>
                    <p className="font-bold text-lg py-2">
                      Restaurant Location
                    </p>
                    <p className="text-md font-light text-gray-500">
                      restaurant information
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-12 pl-14 mr-2 ml-11 gap-5">
                  <div className="col-span-6 flex flex-col">
                    <label
                      htmlFor="input-label-with-helper-text"
                      className="block text-sm font-medium mb-2 text-green-600"
                    >
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      className="py-3 px-4 block w-full border-gray-300 border-2 rounded-md text-sm font-light focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      placeholder="Alley or Road Name "
                    />
                    <p
                      className="text-xs font-light text-gray-500 mt-2"
                      id="hs-input-helper-text"
                    >
                      Enter your restaurant location
                    </p>

                    <label
                      htmlFor="input-label-with-helper-text"
                      className="block text-sm font-medium mb-2 text-green-600"
                    >
                      Route
                    </label>
                    <input
                      type="text"
                      id="route"
                      className="py-3 px-4 block w-full font-light border-gray-300 border-2 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      placeholder="Specify the route or landmarks to assist in navigating to the restaurant"
                    />
                    <p
                      className="text-xs font-light text-gray-500 mt-2"
                      id="hs-input-helper-text"
                    >
                      Enter your restaurant route
                    </p>
                    <label
                      htmlFor="lat"
                      className="block text-sm font-medium mb-2 text-green-600"
                    >
                      Latitude
                    </label>
                    <input
                      type="number"
                      id="lat"
                      className="py-3 px-4 block w-full font-light border-gray-300 border-2 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      placeholder="Latitude"
                      value={markerPosition.lat}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setMarkerPosition({
                          lat: Number(e.target.value),
                          lng: markerPosition.lng,
                        })
                      }
                    />
                    <p
                      className="text-xs font-light text-gray-500 mt-2"
                      id="hs-input-helper-text"
                    >
                      Enter your Latitude
                    </p>
                    <label
                      htmlFor="lng"
                      className="block text-sm font-medium mb-2 text-green-600"
                    >
                      Longitude
                    </label>
                    <input
                      type="number"
                      id="lng"
                      value={markerPosition.lng}
                      className="py-3 px-4 block w-full font-light border-gray-300 border-2 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      placeholder="Longitude"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setMarkerPosition({
                          lat: markerPosition.lat,
                          lng: Number(e.target.value),
                        })
                      }
                    />
                    <p
                      className="text-xs font-light text-gray-500 mt-2"
                      id="hs-input-helper-text"
                    >
                      Enter your Longitude
                    </p>
                    <button onClick={handleMoveMarker}>
                      Sync lat,lng to map
                    </button>
                  </div>
                  <div className="col-span-6">
                    <div style={{ height: "400px", width: "100%" }}>
                      <GoogleMapReact
                        bootstrapURLKeys={{
                          key: "AIzaSyB1o_yDXPKXeDFToHCuQVhfqVwpOKnde0I",
                        }}
                        defaultCenter={{
                          lat: 13.850563550109797,
                          lng: 100.57007576117385,
                        }}
                        defaultZoom={15}
                        yesIWantToUseGoogleMapApiInternals
                        onGoogleApiLoaded={({ map, maps }) =>
                          renderMarkers(map, maps)
                        }
                      ></GoogleMapReact>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ml-3 space-y-4"></div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      {/* background of each section*/}
      <div className="">
        {/* block for base information  */}
        <div className="flex justify-center text-sm font-bold container">
          {/* sprit 2 side */}
          <div className="w-2/3">
            {/* inner white block for input */}
            <div className="bg-white w-600 rounded-[12px] m-10 pb-16 shadow-md">
              <hr className="w-full rounded-t-[12px] h-4 bg-green-600 border-transparent" />
              <div>
                <div className="px-10 py-10 flex items-center mt-6">
                  <TagTitle />
                  <div>
                    <p className="font-bold text-lg py-2">
                      Contact Information
                    </p>
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
                      Tel
                    </label>
                    <input
                      type="tel"
                      id="tel"
                      className="py-3 px-4 block w-full border-gray-300 border-2 rounded-md text-sm font-light focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      placeholder="restaurant tel"
                    />
                    <p
                      className="text-xs font-light text-gray-500 mt-2"
                      id="hs-input-helper-text"
                    >
                      Enter your restaurant tel
                    </p>
                  </div>
                  <div className="flex flex-col px-14 mr-8 ml-8">
                    <label
                      htmlFor="input-label-with-helper-text"
                      className="block text-sm font-medium mb-2 text-green-600"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="py-3 px-4 block w-full font-light border-gray-300 border-2 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      placeholder="example@email.com"
                    />
                    <p
                      className="text-xs font-light text-gray-500 mt-2"
                      id="hs-input-helper-text"
                    >
                      Enter your restaurant email
                    </p>
                  </div>
                  <div className="flex flex-col px-14 mr-8 ml-8">
                    <label
                      htmlFor="input-label-with-helper-text"
                      className="block text-sm font-medium mb-2 text-green-600"
                    >
                      Facebook Page
                    </label>
                    <input
                      type="url"
                      id="facebook"
                      className="py-3 px-4 block w-full font-light border-gray-300 border-2 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      placeholder="https://www.facebook.com/restaurantExample "
                    />
                    <p
                      className="text-xs font-light text-gray-500 mt-2"
                      id="hs-input-helper-text"
                    >
                      Enter your restaurant facebook page
                    </p>
                  </div>
                  <div className="flex flex-col px-14 mr-8 ml-8">
                    <label
                      htmlFor="input-label-with-helper-text"
                      className="block text-sm font-medium mb-2 text-green-600"
                    >
                      LINE@
                    </label>
                    <input
                      type="text"
                      id="line"
                      className="py-3 px-4 block w-full font-light border-gray-300 border-2 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      placeholder="restaurant LINE ID"
                    />
                    <p
                      className="text-xs font-light text-gray-500 mt-2"
                      id="hs-input-helper-text"
                    >
                      Enter your restaurant LINE ID
                    </p>
                  </div>
                  <div className="flex flex-col px-14 mr-8 ml-8">
                    <label
                      htmlFor="input-label-with-helper-text"
                      className="block text-sm font-medium mb-2 text-green-600"
                    >
                      Instagram
                    </label>
                    <input
                      type="url"
                      id="instagram"
                      className="py-3 px-4 block w-full font-light border-gray-300 border-2 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      placeholder="https://www.instagram.com/restaurantExample/ "
                    />
                    <p
                      className="text-xs font-light text-gray-500 mt-2"
                      id="hs-input-helper-text"
                    >
                      Enter your restaurant Instagram
                    </p>
                  </div>
                  <div className="flex flex-col px-14 mr-8 ml-8">
                    <label
                      htmlFor="input-label-with-helper-text"
                      className="block text-sm font-medium mb-2 text-green-600"
                    >
                      Website
                    </label>
                    <input
                      type="url"
                      id="website"
                      className="py-3 px-4 block w-full font-light border-gray-300 border-2 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      placeholder="https://www.restaurantExample.com "
                    />
                    <p
                      className="text-xs font-light text-gray-500 mt-2"
                      id="hs-input-helper-text"
                    >
                      Enter your restaurant website
                    </p>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </div>
          <div className="p-4 flex flex-col justify-center items-center w-1/3 gap-4">
            <div className=" rounded-full w-[80px] h-[80px] bg-[#9DA9DF] flex items-center justify-center animate-wiggle animate-infinite">
              <p className="font-bold text-2xl text-white">3</p>
            </div>
            <div className=" rounded-full w-[40px] h-[40px] bg-[#9DA9DF]"></div>
            <div className=" rounded-full w-[20px] h-[20px] bg-[#9DA9DF]"></div>
          </div>
        </div>
      </div>
      {/* background of each section*/}
      <div className="bg-white">
        {/* block for base information  */}
        <div className="flex justify-center text-sm font-bold container">
          {/* sprit 2 side */}
          <div className="p-4 flex flex-col justify-center items-center w-1/3 gap-4">
            <div className=" rounded-full w-[80px] h-[80px] bg-[#9DA9DF] flex items-center justify-center">
              <p className="font-bold text-2xl text-white">4</p>
            </div>
            <div className=" rounded-full w-[40px] h-[40px] bg-[#9DA9DF]"></div>
            <div className=" rounded-full w-[20px] h-[20px] bg-[#9DA9DF]"></div>
          </div>
          <div className="w-2/3">
            {/* inner white block for input */}
            <div className="bg-white w-600 rounded-[12px] m-10 pb-16 shadow-md">
              <hr className="w-full rounded-t-[12px] h-4 bg-green-600 border-transparent" />
              <div>
                <div className="px-10 py-10 flex items-center mt-6">
                  <TagTitle />
                  <div>
                    <p className="font-bold text-lg py-2">
                      Additional Information
                    </p>
                    <p className="text-md font-light text-gray-500">
                      restaurant information
                    </p>
                  </div>
                </div>
                <div className="flex flex-col ml-3 space-y-4">
                  <div className="flex flex-col px-14 mr-8 ml-8 justify-start items-start gap-4">
                    <label
                      htmlFor="input-label-with-helper-text"
                      className="block text-sm font-medium mb-1 text-green-600"
                    >
                      Open Day
                    </label>
                    {Array.from({ length: optionCountDay }).map((_, index) => (
                      <div
                        className="flex justify-center items-center gap-3"
                        key={index}
                      >
                        <DropdownDayInWeek
                          value={selectedDay[index] || ""}
                          onChange={(selectedDay) =>
                            handleDayChange(index, selectedDay)
                          }
                        />
                        <button
                          className="text-sm font-light text-white bg-red-400 px-3 py-1 rounded-sm "
                          onClick={() => handleDeleteDay(index)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                    <button
                      className="text-sm font-light text-green-600 underline"
                      onClick={handleAddDay}
                    >
                      + Add Additional Day
                    </button>
                  </div>
                </div>
                <div className="flex flex-col ml-3 space-y-4 mt-4">
                  <div className="flex flex-col px-14 mr-8 ml-8 justify-start items-start gap-4">
                    <label
                      htmlFor="input-label-with-helper-text"
                      className="block text-sm font-medium mb-1 text-green-600"
                    >
                      Opening Time
                    </label>
                    <DropdownTimeScale
                          value={Time.openTime}
                          onChange={onHandleChangeOpenTimeStatus}
                        />
                  </div>
                </div>
                <div className="flex flex-col ml-3 space-y-4 mt-4">
                  <div className="flex flex-col px-14 mr-8 ml-8 justify-start items-start gap-4">
                    <label
                      htmlFor="input-label-with-helper-text"
                      className="block text-sm font-medium mb-1 text-green-600"
                    >
                      Close Time
                    </label>
                    <DropdownTimeScale
                          value={Time.closeTime}
                          onChange={onHandleChangeCloseTimeStatus}
                        />
                  </div>
                </div>
              </div>
            </div>
              <div className="flex justify-end mr-9"><button className="bg-green-600 px-4 py-2 rounded-md">submit</button></div>

          </div>
        </div>
      </div>
    </div>
  );
}

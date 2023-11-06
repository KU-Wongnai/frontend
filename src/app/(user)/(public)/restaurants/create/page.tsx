"use client";
import DropdownDayInWeek from "@/components/dropdown-dayInWeek";
import DropdownFoodCategories from "@/components/dropdown-foodCategories";
import TagTitle from "@/components/tag-title";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import DropdownTimeScale from "@/components/dropdown-timeScale";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import categoryData from "@/mock/category";
import {
  RestaurantForm,
  restaurantSchema,
} from "@/validations/restaurant-schema";
import toast from "react-hot-toast";
import { createRestaurant } from "@/services/restaurant";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { MultiSelect } from "@/components/ui/multi-select";
type Props = {};

let marker: any;
export default function CreateRestaurant({}: Props) {
  const form = useForm<RestaurantForm>({
    defaultValues: {
      name: "",
      description: "",
      location: "",
      categories: [],
      phone: "",
      email: "",
      facebook: "",
      line: "",
      openAt: undefined,
      closeAt: undefined,
      openDays: [],
      priceRange: "",
      isDelivery: false,
      isWalkIn: false,
      // rating: 3,
    },
    resolver: zodResolver(restaurantSchema),
  });

  const { isLoading } = form.formState;
  const router = useRouter();

  const onSubmit = async (data: RestaurantForm) => {
    console.log("Form submitted", data);
    try {
      await createRestaurant(data);
      toast.success("Restaurant created successfully");
      router.push("/");
    } catch (error: any) {
      if (error.response.status === 422)
        // Loop over the errors object and set errors return from restaurant-service
        for (const key in error.response.data.errors) {
          if (error.response.data.errors.hasOwnProperty(key)) {
            form.setError(key as any, {
              message: error.response.data.errors[key][0], // Use the first error message
            });
          }
        }
      else {
        toast.error("An error occurred. Please try again.");
      }

      console.error("Restaurant creation failed", error);
    }
  };

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
    // setServiceType({
    //   isDelivery: !serviceType.isDelivery,
    //   isWalkIn: serviceType.isWalkIn,
    // });
    form.setValue("isDelivery", !form.getValues("isDelivery"));
  };

  const onHandleChangeWalkInStatus = () => {
    // setServiceType({
    //   isDelivery: serviceType.isDelivery,
    //   isWalkIn: !serviceType.isWalkIn,
    // });
    form.setValue("isWalkIn", !form.getValues("isWalkIn"));
  };

  const [Time, setTime] = useState<{
    openTime: string;
    closeTime: string;
  }>({ openTime: "", closeTime: "" });

  const onHandleChangeOpenTimeStatus = (selectedTime: string) => {
    form.setValue("openAt", selectedTime);
    setTime({
      openTime: selectedTime,
      closeTime: Time.closeTime,
    });
  };

  const onHandleChangeCloseTimeStatus = (selectedTime: string) => {
    form.setValue("closeAt", selectedTime);
    setTime({
      openTime: Time.openTime,
      closeTime: selectedTime,
    });
  };

  const handleDeleteDay = (indexToDelete: number) => {
    const updatedDay = selectedDay.filter(
      (_, index) => index !== indexToDelete
    );
    // setSelectedDay(updatedDay);
    form.setValue("openDays", updatedDay);
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

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) =>
      console.log(value)
    );
    return () => subscription.unsubscribe();
  }, [form.watch]);

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
    const updatedDay = [...form.getValues("openDays")];
    updatedDay[index] = selectedDayValue;
    console.log(updatedDay);
    // setSelectedDay(updatedDay);
    form.setValue("openDays", updatedDay);
  };

  // const handleAddTime = () => {
  //   setOptionCountTime(optionCountTime + 1);
  //   setSelectedTime([...selectedDay, ""]);
  // };

  const [markerPosition, setMarkerPosition] = useState({
    lat: 13.850563550109797,
    lng: 100.57007576117385,
  });

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
      checkIsAccuratePosition(newPosition.lat(), newPosition.lng());
      // setMarkerPosition({ lat: newPosition.lat(), lng: newPosition.lng() });
    });
  };

  const checkIsAccuratePosition = (newLat: number, newLong: number) => {
    const circleCenter = new google.maps.LatLng(
      13.850563550109797,
      100.57007576117385
    );
    const circleRadius = 1000;
    const newPosition = new google.maps.LatLng(newLat, newLong);
    const distance = google.maps.geometry.spherical.computeDistanceBetween(
      circleCenter,
      newPosition
    );

    // Check if the marker is inside the circular area
    if (distance <= circleRadius) {
      marker.setPosition(newPosition);
      setMarkerPosition({ lat: newPosition.lat(), lng: newPosition.lng() });
    } else {
      // Marker is outside the circular area, so reset its position to the last valid position
      marker.setPosition(circleCenter);
      setMarkerPosition({ lat: circleCenter.lat(), lng: circleCenter.lng() });
    }
  };

  const handleMoveMarker = () => {
    if (marker && window.google) {
      // Add optional chaining here
      const newPosition = new window.google.maps.LatLng(
        markerPosition.lat,
        markerPosition.lng
      );
      checkIsAccuratePosition(newPosition.lat(), newPosition.lng());
    }
  };

  return (
    <div className="">
      <div className="container py-10 mt-14 md:px-20">
        <p className="text-3xl font-bold">Add your restaurant</p>
        <p className="text-green-600 py-4">
          Providing accurate information will make it easier for users to find
          your restaurant
        </p>
      </div>
      {/* form for creating restaurant */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* background of each section*/}
          <div className="">
            {/* block for base information  */}
            <div className="flex flex-col md:flex-row justify-center text-sm font-bold container pb-3 md:pb-0">
              {/* split 2 side */}
              <div className="w-full md:w-2/3">
                {/* inner white block for input */}
                <div className="bg-card border w-600 rounded-[12px] md:m-10 pb-16 shadow-md">
                  <hr className="w-full rounded-t-[12px] h-4 bg-green-600 border-transparent" />
                  <div>
                    <div className="px-10 py-10 flex items-center mt-6">
                      <TagTitle />
                      <div>
                        <p className="font-bold text-lg py-2">
                          Basic information
                        </p>
                        <p className="text-md font-light text-gray-500">
                          restaurant information
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col ml-3 space-y-4 md:mx-8 px-14 justify-center">
                      <div className="flex flex-col space-y-4 md:flex-row px-2">
                        <FormField
                          name="name"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="w-full md:pr-2">
                              <FormLabel className="block text-sm font-medium mb-2 text-green-600">
                                Name *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="py-3 px-4 block w-full border-gray-300 border-2 rounded-md text-sm font-light  dark:text-gray-400"
                                  {...field}
                                  id="name"
                                  placeholder="Restaurant name"
                                  disabled={isLoading}
                                />
                              </FormControl>
                              <FormMessage />
                              <FormDescription className="text-xs font-light text-gray-500 mt-2">
                                Enter your restaurant name
                              </FormDescription>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex flex-col space-y-4 md:flex-row px-2">
                        <FormField
                          name="description"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="w-full md:pr-2">
                              <FormLabel className="block text-sm font-medium mb-2 text-green-600">
                                Description
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="py-3 px-4 block w-full border-gray-300 border-2 rounded-md text-sm font-light  dark:text-gray-400"
                                  {...field}
                                  id="description"
                                  placeholder="Describe your restaurant"
                                  disabled={isLoading}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex flex-col space-y-4 md:flex-row px-2">
                        <FormField
                          name="categories"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem className="w-full md:pr-2">
                              <FormLabel className="block text-sm font-medium mb-2 text-green-600">
                                Category *
                              </FormLabel>
                              <MultiSelect
                                selected={field.value}
                                options={categoryData}
                                {...field}
                                className="sm:w-[510px]"
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      {/*<div className="flex flex-col px-14 mr-8 ml-8 justify-start items-start gap-4">*/}
                      {/*  <label*/}
                      {/*    htmlFor="input-label-with-helper-text"*/}
                      {/*    className="block text-sm font-medium mb-1 text-green-600"*/}
                      {/*  >*/}
                      {/*    Category of Food*/}
                      {/*  </label>*/}
                      {/*  {Array.from({ length: optionCount }).map((_, index) => (*/}
                      {/*    <div*/}
                      {/*      className="flex justify-center items-center gap-3"*/}
                      {/*      key={index}*/}
                      {/*    >*/}
                      {/*      <DropdownFoodCategories*/}
                      {/*        value={selectedCategories[index] || ""}*/}
                      {/*        onChange={(selectedCategory) =>*/}
                      {/*          handleCategoryChange(index, selectedCategory)*/}
                      {/*        }*/}
                      {/*      />*/}
                      {/*      <button*/}
                      {/*        className="text-sm font-light text-white bg-red-400 px-3 py-1 rounded-sm "*/}
                      {/*        onClick={() => handleDeleteCategory(index)}*/}
                      {/*      >*/}
                      {/*        Delete*/}
                      {/*      </button>*/}
                      {/*    </div>*/}
                      {/*  ))}*/}
                      {/*  <button*/}
                      {/*    className="text-sm font-light text-green-600 underline"*/}
                      {/*    onClick={handleAddCategory}*/}
                      {/*  >*/}
                      {/*    + Add Additional Categories*/}
                      {/*  </button>*/}
                      {/*</div>*/}
                      <div className="flex flex-col px-2">
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
                      <div className="flex flex-col px-2">
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
              <div className="p-4 hidden md:flex flex-col justify-center items-center w-full md:w-1/3 gap-4 mt-4 md:mt-0">
                <div className=" rounded-full w-[80px] h-[80px] bg-[#9DA9DF] flex items-center justify-center">
                  <p className="font-bold text-2xl text-white">1</p>
                </div>
                <div className=" rounded-full w-[40px] h-[40px] bg-[#9DA9DF]"></div>
                <div className=" rounded-full w-[20px] h-[20px] bg-[#9DA9DF]"></div>
              </div>
            </div>
          </div>
          {/* background of each section*/}
          <div className="bg-background">
            {/* block for location  */}
            <div className="flex flex-col md:flex-row justify-center text-sm font-bold container pt-3 md:pt-0 pb-3 md:pb-0">
              {/* sprit 2 side */}
              <div className="p-4 md:flex hidden flex-col justify-center items-center w-1/3 gap-4">
                <div className=" rounded-full w-[80px] h-[80px] bg-[#9DA9DF] flex items-center justify-center">
                  <p className="font-bold text-2xl text-white">2</p>
                </div>
                <div className=" rounded-full w-[40px] h-[40px] bg-[#9DA9DF]"></div>
                <div className=" rounded-full w-[20px] h-[20px] bg-[#9DA9DF]"></div>
              </div>
              <div className="w-full md:w-2/3">
                {/* inner white block for input */}
                <div className="bg-card border w-full md:w-600 mx-auto rounded-[12px] md:m-10 pb-16 shadow-md">
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
                    <div className="grid grid-cols-1 md:grid-cols-12 pl-4 md:pl-14 mr-2 ml-11 px-14 gap-5">
                      <div className="col-span-6 flex flex-col space-y-4">
                        <FormField
                          name="location"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="block text-sm font-medium mb-2 text-green-600">
                                Location *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="py-3 px-4 block w-full border-gray-300 border-2 rounded-md text-sm font-light  dark:text-gray-400"
                                  {...field}
                                  id="location"
                                  placeholder="Alley or Road name"
                                  disabled={isLoading}
                                />
                              </FormControl>
                              <FormDescription className="text-xs font-light text-gray-500 mt-2">
                                Enter your restaurant location
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

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
                        <button
                          className="font-medium text-white bg-green-600 p-2 mt-3 rounded-md"
                          type="button"
                          onClick={handleMoveMarker}
                        >
                          Sync latitude and longitude to map
                        </button>
                      </div>
                      <div className="col-span-6 mt-6 md:mt-0">
                        <div className="w-full h-40 md:h-400">
                          <GoogleMapReact
                            bootstrapURLKeys={{
                              key: "AIzaSyBBUB0Wrt1xnu8qOK1_7teVZF2J7hY4Smk",
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
            <div className="flex justify-center text-sm font-bold container pt-3 md:pt-0 pb-3 md:pb-0">
              {/* sprit 2 side */}
              <div className="flex w-full">
                {/* inner white block for input */}
                <div className=" md:w-2/3 bg-card border w-600 rounded-[12px] md:m-10 pb-16 shadow-md">
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
                      <div className="flex flex-col px-14 md:mr-8 md:ml-8">
                        <FormField
                          name="phone"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="block text-sm font-medium mb-2 text-green-600">
                                Phone *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="py-3 px-4 block w-full border-gray-300 border-2 rounded-md text-sm font-light  dark:text-gray-400"
                                  {...field}
                                  id="phone"
                                  placeholder="012-345-6789"
                                  disabled={isLoading}
                                />
                              </FormControl>
                              <FormDescription className="text-xs font-light text-gray-500 mt-2">
                                Enter your restaurant phone number
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex flex-col px-14 md:mr-8 md:ml-8">
                        <FormField
                          name="email"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="block text-sm font-medium mb-2 text-green-600">
                                Email
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="py-3 px-4 block w-full border-gray-300 border-2 rounded-md text-sm font-light  dark:text-gray-400"
                                  {...field}
                                  type="email"
                                  id="email"
                                  placeholder="example@email.com"
                                  disabled={isLoading}
                                />
                              </FormControl>
                              <FormDescription className="text-xs font-light text-gray-500 mt-2">
                                Enter your restaurant email
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex flex-col px-14 md:mr-8 md:ml-8">
                        <FormField
                          name="facebook"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="block text-sm font-medium mb-2 text-green-600">
                                Facebook Page
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="py-3 px-4 block w-full border-gray-300 border-2 rounded-md text-sm font-light  dark:text-gray-400"
                                  {...field}
                                  id="facebook"
                                  placeholder="https://www.facebook.com/restaurantExample"
                                  disabled={isLoading}
                                />
                              </FormControl>
                              <FormDescription className="text-xs font-light text-gray-500 mt-2">
                                Enter your restaurant facebook page
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex flex-col px-14 md:mr-8 md:ml-8">
                        <FormField
                          name="line"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="block text-sm font-medium mb-2 text-green-600">
                                LINE@
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="py-3 px-4 block w-full border-gray-300 border-2 rounded-md text-sm font-light  dark:text-gray-400"
                                  {...field}
                                  id="line"
                                  placeholder="restaurant LINE ID"
                                  disabled={isLoading}
                                />
                              </FormControl>
                              <FormDescription className="text-xs font-light text-gray-500 mt-2">
                                Enter your restaurant LINE ID
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex flex-col px-14 md:mr-8 md:ml-8">
                        <FormField
                          name="instagram"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="block text-sm font-medium mb-2 text-green-600">
                                Instagram
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="py-3 px-4 block w-full border-gray-300 border-2 rounded-md text-sm font-light  dark:text-gray-400"
                                  {...field}
                                  id="instagram"
                                  placeholder="restaurant Instagram"
                                  disabled={isLoading}
                                />
                              </FormControl>
                              <FormDescription className="text-xs font-light text-gray-500 mt-2">
                                Enter your restaurant Instagram
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex flex-col px-14 md:mr-8 md:ml-8">
                        <FormField
                          name="website"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="block text-sm font-medium mb-2 text-green-600">
                                Website
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="py-3 px-4 block w-full border-gray-300 border-2 rounded-md text-sm font-light  dark:text-gray-400"
                                  {...field}
                                  id="website"
                                  placeholder="restaurant Website"
                                  disabled={isLoading}
                                />
                              </FormControl>
                              <FormDescription className="text-xs font-light text-gray-500 mt-2">
                                Enter your restaurant website
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 hidden md:flex flex-col justify-center items-center w-1/3 gap-4">
                  <div className=" rounded-full w-[80px] h-[80px] bg-[#9DA9DF] flex items-center justify-center animate-wiggle animate-infinite">
                    <p className="font-bold text-2xl text-white">3</p>
                  </div>
                  <div className=" rounded-full w-[40px] h-[40px] bg-[#9DA9DF]"></div>
                  <div className=" rounded-full w-[20px] h-[20px] bg-[#9DA9DF]"></div>
                </div>
              </div>
            </div>
          </div>
          {/* background of each section*/}
          <div className="bg-background">
            <div className="flex flex-col md:flex-row justify-center text-sm font-bold container py-6">
              <div className="p-4 hidden md:flex flex-col justify-center items-center w-1/3 gap-4">
                <div className=" rounded-full w-[80px] h-[80px] bg-[#9DA9DF] flex items-center justify-center">
                  <p className="font-bold text-2xl text-white">4</p>
                </div>
                <div className=" rounded-full w-[40px] h-[40px] bg-[#9DA9DF]"></div>
                <div className=" rounded-full w-[20px] h-[20px] bg-[#9DA9DF]"></div>
              </div>

              <div className="w-full md:w-2/3 lg:w-3/4">
                <div className="bg-card border w-full lg:max-w-xl xl:max-w-2xl rounded-[12px] md:m-10 pb-16 shadow-md">
                  {/* ... Other contents inside this div ... */}
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
                      <div className="flex flex-col px-14 md:mr-8 md:ml-8 justify-start items-start gap-4">
                        <label
                          htmlFor="input-label-with-helper-text"
                          className="block text-sm font-medium mb-1 text-green-600"
                        >
                          Open Day
                        </label>
                        {Array.from({ length: optionCountDay }).map(
                          (_, index) => (
                            <div
                              className="flex justify-center items-center gap-3"
                              key={index}
                            >
                              <DropdownDayInWeek
                                value={form.watch("openDays")[index] || ""}
                                onChange={(selectedDay) =>
                                  handleDayChange(index, selectedDay)
                                }
                              />
                              <button
                                className="text-sm font-light text-white bg-red-400 px-3 py-1 rounded-sm "
                                onClick={() => handleDeleteDay(index)}
                                type="button"
                              >
                                Delete
                              </button>
                            </div>
                          )
                        )}
                        <button
                          className="text-sm font-light text-green-600 underline"
                          onClick={handleAddDay}
                          type="button"
                        >
                          + Add Additional Day
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col ml-3 space-y-4 mt-4">
                      <div className="flex flex-col px-14 md:mr-8 md:ml-8 justify-start items-start gap-4">
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
                    <div className="flex flex-col ml-3 space-y-4 mt-4 w-full">
                      <div className="flex flex-col px-14 md:mr-8 md:ml-8 justify-start items-start gap-4 w-full">
                        <label
                          htmlFor="input-label-with-helper-text"
                          className="block text-sm font-medium mb-1 text-green-600 w-full"
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
                <div className="flex justify-end mt-4 px-4 md:px-0">
                  <Button
                    disabled={isLoading}
                    type="submit"
                    className="w-full md:w-1/3 selection:bg-green-600 hover:bg-green-800 text-white"
                  >
                    {isLoading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

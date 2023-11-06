"use client";
import TagTitle from "@/components/tag-title";
import React, { useEffect, useState } from "react";
import RealTimeClock from "@/components/clock";
import { getOrderByRestaurant } from "@/services/order";
import { Order } from "@/types/order";
import OrderCard from "@/app/(user)/(protected)/merchant/restaurants/components/order-card-dashboard";
import RestaurantMenuCard from "@/app/(user)/(protected)/merchant/restaurants/components/menu-card-restaurant";
import FoodCategoryCard from "../../components/food-category-card";
import { getRestaurantCategories, getRestaurantMenu } from "@/services/restaurant";
import { Menu } from "@/types/restaurant";
import { useParams } from "next/navigation";
type Props = {};

const RestaurantDashBoard = ({ params }: { params: { restaurant_id: string } }) => {
  const paramMenu = useParams();

  const [currentPage, setCurrentPage] = useState<string>("All");
  const [noFilterMenus, setNoFilterMenus] = React.useState<Menu[]>([]);

  const [menus, setMenus] = React.useState<Menu[]>([]);
  const [categories, setCategories] = React.useState<string[]>([]);


  let filteredFoodData = menus;

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    filteredFoodData = noFilterMenus.filter((item) => item.category.toLocaleLowerCase() == page.toLocaleLowerCase());
    console.log(filteredFoodData);
    
    setMenus(filteredFoodData);
    if (page === "All") {
      setMenus(noFilterMenus);
    }
  };

  const fetchRestaurantCategories = async () => {
    const allRestaurantCategories = await getRestaurantCategories(
      Number(paramMenu.restaurant_id)
    );
    console.log(allRestaurantCategories);
    const newCategories = ["All" , ...allRestaurantCategories];
    setCategories(newCategories);
  };
  const fetchRestaurantMenus = async () => {
    const allRestaurantMenu = await getRestaurantMenu(
      Number(paramMenu.restaurant_id)
    );
    console.log(allRestaurantMenu);
    setNoFilterMenus(allRestaurantMenu);
    setMenus(allRestaurantMenu);
  };
  useEffect(() => {
    fetchRestaurantCategories();
    fetchRestaurantMenus();
  }, []);

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrderByRestaurant = async () => {
      const orders = await getOrderByRestaurant(params.restaurant_id);
      setOrders(orders);
      setFilterMockOrderData(
        orders.filter((order: Order) => order.status === "RECEIVED")
      );
    };
    fetchOrderByRestaurant();
  }, [params.restaurant_id]);

  const [filterMockOrderData, setFilterMockOrderData] = useState(
    orders.filter((order) => order.status === "RECEIVED")
  );
  return (
    <div className="container py-10 px-28 ">
      <div>
        <p className="font-bold text-3xl">Restaurant Dashboard</p>
      </div>
      <div className="py-10 ">
        <div className="grid grid-cols-4 gap-5  h-full">
          {/* Menu Over All */}
          <div className="col-span-3 bg-card rounded-[12px] shadow-md py-12 px-14 flex flex-col justify-center items-center">
            {/* Tag Topic (Menu) */}
            <div className="w-full">
              <div className="flex">
                <div>
                  <TagTitle />
                </div>
                <div className="flex flex-col px-2 ">
                  <p className="font-bold text-2xl py-2">Menu</p>
                  <p className="font-light text-sm text-gray-500">
                    restaurant menu
                  </p>
                </div>
              </div>
            </div>
            {/* for category card bar */}
            <div className="m-8 flex gap-5 w-full overflow-x-auto whitespace-nowrap px-10 py-2 no-scrollbar">
              {categories.map((category: string, index) => {
                const categoryMenus = noFilterMenus.filter(
                  (menu) => menu.category === category
                );
                let itemTotal = categoryMenus.length;
                if(category === "All"){
                  itemTotal = noFilterMenus.length;
                }
                return (
                  <FoodCategoryCard
                    key={index}
                    name={category}
                    currentPage={currentPage}
                    itemTotal={itemTotal}
                    onClick={(page: string) => handlePageChange(page)}
                  />
                );
              })}
            </div>
            <div className="overflow-y-auto max-h-[30rem]">
              <div className="flex flex-wrap ml-2 mr-1 px-1 ">
                {menus.map((menu) => {
                  // console.log(food); // Add this line for debugging
                  return (
                    <RestaurantMenuCard key={menu.id} {...menu} />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-8 h-full">
            <div className="bg-card w-300 rounded-[12px] p-4 shadow-md flex justify-center items-center">
              <RealTimeClock />
            </div>

            <div className="flex flex-col bg-card w-300 h-full rounded-[12px] shadow-md px-2 py-12">
              <div className="flex">
                <div>
                  <TagTitle />
                </div>
                <div className="flex flex-col">
                  <p className="font-bold text-xl py-2">Customer Order</p>
                  <p className="font-light text-sm text-gray-500">
                    restaurant order
                  </p>
                </div>
              </div>
              {/* mockData of Orderlist */}
              <div className="overflow-y-auto max-h-[30rem] mr-2">
                <div className="flex flex-wrap ml-1 mr-1 px-1 ">
                {filterMockOrderData.map((order) => {
              return (
                <OrderCard
                  key={order.id}
                  id={order.id}
                  decoration="text-sm px-2 py-2"
                />
              );
            })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashBoard;

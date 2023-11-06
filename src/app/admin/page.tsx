"use client";

import { use, useEffect, useState } from "react";
import { Bike, ChefHat, ListTodo, MapPin, UserIcon } from "lucide-react";
import Link from "next/link";
import { getUsers } from "@/services/user";
import { User } from "@/types/user";
import TinyLineChart from "./components/tiny-line-chart";
import { getRestaurants } from "@/services/restaurant";
import SimpleBarChart from "./components/simple-bar-chart";
import SimplePieChart from "./components/simple-pie-chart";

const isUser = (user: User) => {
  return (
    !user.roles.some((role) => role.name === "admin")
  );
};

const isRider = (user: User) => {
  return (
    !user.roles.some((role) => role.name === "admin") &&
    user.roles.some((role) => role.name === "rider")
  );
};

function getDateCount({ items, name }: { items: any[]; name: string }) {
  const dateArr = items.map((item: any) => {
    let date: any;
    if (name === "riders") {
      date = new Date(item.rider_profile.created_at).toDateString();
    } else {
      date = new Date(item.created_at).toDateString();
    }
    const dateArr: any = date;
    return dateArr;
  });

  const count: any = {};

  for (const element of dateArr) {
    if (count[element]) {
      count[element] += 1;
    } else {
      count[element] = 1;
    }
  }

  const array = Object.entries(count).map(([date, users]) => {
    return { date, [name]: users };
  });
  return array;
}

function getLocationCount({ items }: { items: any[] }) {
  const nameArr = items.map((item: any) => {
    const nameArr: any = item.location;
    return nameArr;
  });

  const count: any = {};

  for (const element of nameArr) {
    if (count[element]) {
      count[element] += 1;
    } else {
      count[element] = 1;
    }
  }

  const array = Object.entries(count).map(([name, value]) => {
    return { name, value };
  });
  return array;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const allRestaurants = await getRestaurants();
      setRestaurants(allRestaurants);
    };
    fetchRestaurants();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await getUsers();
      setUsers(allUsers);
    };
    fetchUsers();
  }, []);

  const userCreateTimes = getDateCount({
    items: users.filter(isUser),
    name: "users",
  });
  const riderCreateTimes = getDateCount({
    items: users.filter(isRider),
    name: "riders",
  });
  // const restaurantCreateTimes = getDateCount({
  //   items: restaurants,
  //   name: "restaurants",
  // });
  // console.log("restaurantCreateTimes", restaurantCreateTimes);
  const restaurantLocations = getLocationCount({
    items: restaurants,
  });
  console.log("restaurantLocations", restaurantLocations);

  return (
    <>
      <div className="container px-4 py-6 mx-auto my-4">
        <div className="grid row-auto cols- h-full">
          {/* Main content */}
          <div className="grid grid-cols-12 gap-6 ">
            {/* User */}
            <div className="col-span-12 lg:col-span-4 hover:scale-105 duration-500">
              <div className="p-4 relative rounded-sm shadow-sm border bg-card ">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex gap-2 items-center ">
                      <UserIcon className="mb-2" />
                      <div className="text-md">Total Users</div>
                    </div>
                    <div className=" text-2xl font-medium leading-8 mt-5">
                      {users.filter(isUser).length}
                    </div>
                    <div className="mt-5">
                      <Link
                        href={"/admin/user-management"}
                        className="opacity-40  underline text-sm hover:opacity-90"
                      >
                        View all
                      </Link>
                    </div>
                  </div>
                  {/* chart */}
                  <div className="pb-2 lg:pb-2 sm:pb-3 h-[125px] mt-2">
                    <TinyLineChart data={userCreateTimes} x="users" />
                  </div>
                </div>
              </div>
            </div>
            {/* Rider */}
            <div className="col-span-12 lg:col-span-4 hover:scale-105 duration-500">
              <div className="p-4 relative rounded-sm shadow-sm border bg-card ">
                <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <div className="flex gap-2 items-center ">
                      <Bike className="mb-2" />
                      <div className="text-md">Total Riders</div>
                    </div>
                    <div className=" text-2xl font-medium leading-8 mt-5">
                      {users.filter(isRider).length}
                    </div>
                    <div className="mt-5">
                      <Link
                        href={"/admin/user-management"}
                        className="opacity-40  underline text-sm hover:opacity-90"
                      >
                        View all
                      </Link>
                    </div>
                  </div>
                  {/* chart */}
                  <div className="pb-2 lg:pb-2 sm:pb-3 h-[125px] mt-2">
                    <TinyLineChart data={riderCreateTimes} x="riders" />
                  </div>
                </div>
              </div>
            </div>
            {/* Restaurant */}
            <div className="col-span-12 lg:col-span-4 hover:scale-105 duration-500">
              <div className="p-4 relative rounded-sm shadow-sm border bg-card ">
                <div>
                  <div className="flex gap-2 items-center ">
                    <ChefHat className="mb-2" />
                    <div className="text-md">Total Restaurants</div>
                  </div>
                  <div className=" text-2xl font-medium leading-8 mt-5">
                    {restaurants.length}
                  </div>
                  <div className="mt-5">
                    <Link
                      href={"/admin/restaurant-management"}
                      className="opacity-40  underline text-sm hover:opacity-90"
                    >
                      View all
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* end restaurant */}
            {/* Rider Request
            <div className="col-span-12 sm:col-span-6 hover:scale-105 duration-500">
              <div className="p-4 relative rounded-sm shadow-sm border bg-card ">
                <div className="flex gap-2 items-center ">
                  <ListTodo className="mb-2" />
                  <div className="text-md">Rider Request</div>
                </div>
                <SimplePieChart data={userCreateTimes} />
              </div>
            </div>
            end Request
            Restaurant Request
            <div className="col-span-12 sm:col-span-6 hover:scale-105 duration-500">
              <div className="p-4 relative rounded-sm shadow-sm border bg-card ">
                <div className="flex gap-2 items-center ">
                  <ListTodo className="mb-2" />
                  <div className="text-md">Restaurant Request</div>
                </div>
                <SimplePieChart data={userCreateTimes} />
              </div>
            </div>
            end Request */}
            {/* Restaurant location */}
            <div className="col-span-12 sm:col-span-12 hover:scale-105 duration-500">
              <div className="p-4 relative rounded-sm shadow-sm border bg-card ">
                <div className="gird grid-cols-10">
                  <div className="flex gap-2 items-center col-span-2">
                    <MapPin className="mb-2" />
                    <div className="text-md">Restaurants Location</div>
                  </div>
                  <div className="pb-2 lg:pb-2 sm:pb-3 flex mt-2 col-span-8 -ml-14 sm:ml-0">
                    <SimpleBarChart data={restaurantLocations} />
                  </div>
                </div>
                {/* chart */}
              </div>
            </div>
            {/* end restaurant location */}
          </div>
          {/* end main content */}
        </div>
      </div>
    </>
  );
}

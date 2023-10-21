"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { getAllNotification } from "@/services/notification";
import axios from 'axios';
import useStore from "@/contexts/useStore";
import useAuthStore from "@/contexts/auth-store";
import { log } from "console";

import Pusher from 'pusher-js';
import echo from "../../../../lib/echo";

interface Notification {
  id: number;
  type: string;
  notifiable_type: string;
  notifiable_id: number;         // user id that login
  data: string;
  read_at: Boolean;
  created_at: Date;
  updated_at: Date;
}

function ShowNotifications({
  params,
}: {
  params: {
    user_id: number;
    id: string;
  };
}) {
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  // const user = useStore(useAuthStore, (state) => state.user);
  const user = useAuthStore((state) => state.user);
  // const notifications: Notification[] = await getAllNotification(params.user_id);
  // console.log("[noti] user", user);

  //---------------------------------------------
  if (user == null) return; // bug
  const id = user.id;
  // const id = 2;

  // can receive event message from laravel
  echo.channel(`App.Models.User.${id}`) // subscribe to channel
  .listen('.notified-to-user', (e:any) => { // listen to event name
      console.log(e);
  });
//---------------------------------------------

  useEffect(() => {

  // อันนี้ดึงข้อมูลnotiทั้งหมดจาก user นั้นๆ จาก database มาแสดงได้แล้ว

    console.log("[noti] user", user);
    const fetchNotification = async () => {
      console.log("[noti] trying to fetch");
      if (user == null) return; // bug
      const notifications = await getAllNotification(user.id);
      // const notifications = await getAllNotification(2);
      console.log("[noti] done");
      console.log(notifications);
      setNotifications(notifications);
    };
    fetchNotification();

  }, [user]);

  const router = useRouter();

  return (
      <div>
        <h2 className=" py-5 mt-1 mx-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors">
                  Notifications
                </h2>
        <main className="container mx-auto py-3 px-2 sm:px-4 md:px-6 lg:px-8">
          {notifications?.map((notification: any) => (
            <Link
              key={notification.id}
              href="/conversations"
              className="block mb-4 p-4 border rounded shadow hover:bg-background/90 transition ease-in-out duration-150"
            >
              {/* <h3 className="text-lg font-semibold">{notification.riderName}</h3> */}
              <p>{notification.data}</p>
              <span className="text-sm text-gray-500">
                <p>{new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long'}).format((new Date(notification.created_at)))}</p>
              </span>
            </Link>
          ))}
        </main>

        </div>
      );
}

export default ShowNotifications;







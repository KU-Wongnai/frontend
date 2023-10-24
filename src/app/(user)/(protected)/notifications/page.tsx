"use client";

export const dynamic = "force-dynamic";

import React from "react";
import Link from "next/link";
import { useEffect } from "react";
import { getAllNotification } from "@/services/notification";
import useAuthStore from "@/contexts/auth-store";

import echo from "@/lib/echo";

interface Notification {
  id: number;
  type: string;
  notifiable_type: string;
  notifiable_id: number; // user id that login
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
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    // อันนี้ดึงข้อมูลnotiทั้งหมดจาก user นั้นๆ จาก database มาแสดงได้แล้ว

    // console.log("[noti] user", user);
    const fetchNotification = async () => {
      // console.log("[noti] trying to fetch");
      if (user == null) return; // bug
      const notifications = await getAllNotification(user.id);
      // const notifications = await getAllNotification(2);
      // console.log("[noti] done");
      // console.log(notifications);
      setNotifications(notifications);
    };
    fetchNotification();
  }, [user]);

  // can receive event message from laravel
  useEffect(() => {
    echo
      .channel(`App.Models.User.${user?.id}`) // subscribe to channel
      .listen(".notified-to-user", (e: any) => {
        // listen to event name
        console.log("[noti] event received");
        console.log(e); // { message: "something" }
        setNotifications((prev) => [
          ...prev,
          {
            id: new Date().getTime(),
            type: "",
            notifiable_type: "",
            notifiable_id: user?.id || 0,
            data: e.message,
            read_at: false,
            created_at: new Date(),
            updated_at: new Date(),
          },
        ]);
      });
    return () => echo.leaveChannel(`App.Models.User.${user?.id}`);
  }, []);

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
              <p>
                {new Intl.DateTimeFormat("en-GB", {
                  dateStyle: "full",
                  timeStyle: "long",
                }).format(new Date(notification.created_at))}
              </p>
            </span>
          </Link>
        ))}
      </main>
    </div>
  );
}

export default ShowNotifications;

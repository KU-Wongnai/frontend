"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Notification = {
  id: number;
  riderName: string;
  message: string;
  timestamp: Date;
};

const Notifications = () => {
  const router = useRouter();

  const notifications: Notification[] = [
    {
      id: 1,
      riderName: "John Doe",
      message: "Hey, I'm near your location. Where should I park?",
      timestamp: new Date(),
    },
    {
      id: 2,
      riderName: "John Doe",
      message: "Hey, I'm near your location. Where should I park?",
      timestamp: new Date(),
    },
    {
      id: 3,
      riderName: "John Doe",
      message: "Hey, I'm near your location. Where should I park?",
      timestamp: new Date(),
    },
  ];

  return (
    <main className="container mx-auto py-3 px-2 sm:px-4 md:px-6 lg:px-8">
      {notifications.map((notification) => (
        <Link
          key={notification.id}
          href="/conversations"
          className="block mb-4 p-4 border rounded shadow hover:bg-background/90 transition ease-in-out duration-150"
        >
          <h3 className="text-lg font-semibold">{notification.riderName}</h3>
          <p>{notification.message}</p>
          <span className="text-sm text-gray-500">
            {new Intl.DateTimeFormat("en-GB").format(notification.timestamp)}
          </span>
        </Link>
      ))}
    </main>
  );
};

export default Notifications;

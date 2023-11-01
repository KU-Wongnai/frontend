"use client";

export const dynamic = "force-dynamic";

import React from "react";
import Link from "next/link";
import { useNotification } from './NotificationsContext';

function ShowNotifications({
  params,
}: {
  params: {
    user_id: number;
    id: string;
  };
}) {
  const { state, dispatch } = useNotification();

  const notishows = state.notificationLastest;
  console.log('notification page', notishows);

  const handleClear = async () => {
    dispatch({ type: 'RESET' });
  }

  return (
    <div>
      <h2 className=" py-5 mt-1 mx-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors">
        Notifications
      </h2>
      <main className="container mx-auto py-3 px-2 sm:px-4 md:px-6 lg:px-8">
        {notishows?.map((notification: any) => (
        <React.Fragment key={notification.id}>

          {/* notification for user role */}
          {notification.data.type === "User" ? (
            <Link
            key={notification.id}
            // href="/conversations"
            href="/"
            onClick={handleClear}
            className="block mb-4 p-4 border rounded shadow hover:bg-background/90 transition ease-in-out duration-150"
          >
            <h3 className="text-lg font-semibold">{"Related to the User"}</h3>
            <p className=" my-1">{notification.data.message}</p>
            <span className="text-sm text-gray-500">
              <p>
                {new Intl.DateTimeFormat("en-GB", {
                  dateStyle: "full",
                  timeStyle: "long",
                }).format(new Date(notification.created_at))}
              </p>
            </span>
          </Link>
          ) : null}

          {/* notification for rider role */}
          {notification.data.type === "Rider" ? (
            <Link
            key={notification.id}
            href="/rider/dashboard"
            onClick={handleClear}
            className="block mb-4 p-4 border rounded shadow hover:bg-background/90 transition ease-in-out duration-150"
          >
            <h3 className="text-lg font-semibold">{"Related to the Rider"}</h3>
            <p className=" my-1">{notification.data.message}</p>
            <span className="text-sm text-gray-500">
              <p>
                {new Intl.DateTimeFormat("en-GB", {
                  dateStyle: "full",
                  timeStyle: "long",
                }).format(new Date(notification.created_at))}
              </p>
            </span>
          </Link>
          ) : null}


          </React.Fragment>
        ))}
      </main>
    </div>
  );
}

export default ShowNotifications;

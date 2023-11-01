"use client";

import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Bell,
  Bike,
  LogOut,
  MessageCircle,
  Settings,
  ShoppingCart,
  UtensilsCrossed,
} from "lucide-react";
import { ComboboxDemo } from "./combobox-location";
import { ModeToggle } from "./ui/button-mode-toggle";
import { Button } from "./ui/button";
import SearchInput from "./search-input";

import useStore from "@/contexts/useStore";
import useAuthStore from "../contexts/auth-store";
import { usePathname, useRouter } from "next/navigation";
import CartDrawer from "./cart/cart-drawer";
import DropdownNav from "./dropdown-nav";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import echo from "@/lib/echo";
import { getAllNotification } from "@/services/notification";
import { useNotification } from './../app/(user)/(protected)/notifications/NotificationsContext';
import { markAsRead } from "@/services/notification";
export const items = [
  // {
  //   label: "Cart",
  //   href: "/cart",
  //   icon: <ShoppingCart className="mr-2 h-4 w-4" />,
  // },
  {
    label: "Social",
    items: [
      {
        label: "Messages",
        href: "/conversations",
        icon: <MessageCircle className="mr-2 h-4 w-4" />,
      },
    ],
  },
  {
    label: "Others",
    items: [
      {
        label: "Add your restaurant",
        href: "/me/restaurant/1",
        icon: <UtensilsCrossed className="mr-2 h-4 w-4" />,
      },
      {
        label: "Become a rider",
        href: "/rider",
        icon: <Bike className="mr-2 h-4 w-4" />,
      },
      {
        label: "Settings",
        href: "/settings",
        icon: <Settings className="mr-2 h-4 w-4" />,
      },
    ],
  },
];

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Navbar({ className, ...props }: NavbarProps) {
  const { data: user, loading } = useStore(useAuthStore, (state) => state.user);
  const pathname = usePathname();

  const paths = pathname.split("/");

  const isRider = paths[1] === "rider";
  const isRestaurant = paths[1] === "me" && paths[2] === "restaurant";

  const { state, dispatch, notifications, setNewNotification} = useNotification();
  const handleClear = async () => {
    console.log('[navbar][handleClear]');
      for (const noti of state.notificationLastest) {
      if (!noti.read_at) {
        if (user?.id !== undefined) {
          console.log('[navbar][handleClear] markAsRead');
          await markAsRead(user?.id, noti.id);
        }
      }
    }
    dispatch({ type: 'RESET' });
  }
  const incrementNotificationCount = () => {
    console.log('[navbar][incrementNotificationCount]');
    dispatch({ type: 'INCREMENT' });
  }
  const notiCount = state.count;

  useEffect(() => {
    // console.log('This user', user);
    console.log('[navbar] Notification count changed:', state.count);
    const fetchNotifications = async () => {
      console.log('[navbar][useEffect][fetchNotifications] inside', user);
      if (user == null) return; 
      const notiInside = await getAllNotification(user.id);
      setNewNotification(notiInside);
    };
    echo
      .channel(`App.Models.User.${user?.id}`) // subscribe to channel
      .listen(".notified-to-user", (e: any) => {
        // listen to event name
        console.log("[noti navbar] event received");
        console.log(e); // { message: "something" }
        incrementNotificationCount();
        console.log('[noti navbar] after incrementNotificationCount');
        fetchNotifications();
      });
      console.log('[navbar][useEffect] after echo');
      fetchNotifications();  // have this because when the first time user login, the notification will not show
    return () => echo.leaveChannel(`App.Models.User.${user?.id}`);
  }, [state.count, user]);

  return (
    <header
      className={cn(
        className,
        "backdrop-blur-sm bg-opacity-5 md:px-3 py-3 border-b sticky top-0 z-50 bg-background"
      )}
      {...props}
    >
      <div className="px-3 md:px-0 lg:container mx-auto flex flex-wrap justify-between items-center gap-2">
        {/* Logo */}
        <Link
          href="/"
          className="order-1 md:order-1 text-2xl font-semibold tracking-tight mb-2 md:mb-0"
        >
          <span className="text-green-600">KU</span> Wongnai
        </Link>

        {/* Search */}
        {!isRider && !isRestaurant ? (
          <div className="w-full lg:w-auto order-3 lg:order-2 flex gap-3 items-center mb-2 md:mb-0">
            <div className="hidden md:block w-[290px]">
              <ComboboxDemo />
            </div>
            <div className="relative rounded-full border-green-600 border-2 w-full">
              <SearchInput />
            </div>
          </div>
        ) : null}

        {/* Menu */}
        <div className="order-2 lg:order-3 lg:w-[200px] h-[50px] flex items-center justify-end gap-3">
          {user ? (
            <>
              {!isRider && !isRestaurant ? <CartDrawer /> : null}
              <Button
                variant="outline"
                className="rounded-full w-10 h-10"
                asChild
                onClick={handleClear}
              >
                <Link
                  href="/notifications"
                  className="relative inset-0 rounded-full hidden sm:block"
                >
                  <Bell className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5" />
                  { notiCount > 0 && (
                  <span className="absolute -top-[6px] -right-[12px] w-6 h-6 bg-red-500 rounded-full text-white text-xs flex items-center justify-center border-2 border-background">
                    { notiCount }
                  </span>
                  )}
                </Link>
              </Button>
              <DropdownNav items={items} />
            </>
          ) : !loading ? (
            <>
              <ModeToggle />
              <Link href="/auth">
                <Button variant="outline" className="rounded-full">
                  Sign in / Sign up
                </Button>
              </Link>
            </>
          ) : (
            <div className="animate-pulse flex gap-2">
              <div className="w-10 h-10 bg-neutral-200 rounded-full dark:bg-neutral-700"></div>
              <div className="w-24 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700"></div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

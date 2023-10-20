"use client";

import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Bell,
  Bike,
  Home,
  LogOut,
  MessageCircle,
  Settings,
  ShoppingCart,
  UtensilsCrossed,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ComboboxDemo } from "@/components/combobox-location";
import { ModeToggle } from "@/components/ui/button-mode-toggle";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/search-input";

import { logout } from "@/services/auth"; // Import the logoutUser function
import useStore from "@/contexts/useStore";
import useAuthStore from "@/contexts/auth-store";

export default function Navbar() {
  const me = useStore(useAuthStore, (state) => state.user);

  return (
    <header className=" backdrop-blur-sm bg-opacity-5 md:px-3 md:py-4 py-2 border-b sticky top-0 z-50 bg-background">
      <div className="md:container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-semibold tracking-tight mb-2 md:mb-0 hidden md:block"
        >
          <span className="text-green-600">KU</span> Wongnai
        </Link>

        {/* Logo and Avatar for Mobile */}
        <div className="md:hidden flex justify-between items-center w-full mb-1 px-2">
          <Link href="/" className="text-3xl font-semibold tracking-tight">
            <span className="text-green-600">KU</span> Wongnai
          </Link>
          <div className="flex gap-1">
            <Link href="/notifications">
              <Button variant="outline" className="relative rounded-full">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-6 h-6 bg-red-500 rounded-full text-white text-xs flex items-center justify-center border-2 border-background">
                  3
                </span>
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={me?.rider_profile?.avatar || undefined} />
                  <AvatarFallback>{me?.name[0]}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/cart" className="flex items-center w-full">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    <span>Cart</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/me/restaurant"
                    className="flex items-center w-full"
                  >
                    <UtensilsCrossed className="mr-2 h-4 w-4" />
                    <span>Your restaurant</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/rider" className="flex items-center w-full">
                    <Bike className="mr-2 h-4 w-4" />
                    <span>Rider</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings" className="flex items-center w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <button onClick={logout} className="flex items-center w-full">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Icons and Avatar for Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/rider/conversations">
            <Button variant="outline" className="rounded-full">
              <MessageCircle className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/notifications">
            <Button variant="outline" className="relative rounded-full">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-6 h-6 bg-red-500 rounded-full text-white text-xs flex items-center justify-center border-2 border-background">
                3
              </span>
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={me?.rider_profile?.avatar || undefined} />
                <AvatarFallback>{me?.name[0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  href="/me/restaurant"
                  className="flex items-center w-full"
                >
                  <UtensilsCrossed className="mr-2 h-4 w-4" />
                  <span>Your restaurant</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/" className="flex items-center w-full">
                  <Home className="mr-2 h-4 w-4" />
                  <span>Home</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/settings" className="flex items-center w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <button onClick={logout} className="flex items-center w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <h4 className="text-xl font-semibold tracking-tight">
            {me?.name.split(" ")[0]}
          </h4>
        </div>
      </div>
    </header>
  );
}

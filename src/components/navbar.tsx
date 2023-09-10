import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Bike,
  LogOut,
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
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ComboboxDemo } from "./combobox-location";

export default async function Navbar() {
  return (
    <header className="md:px-3 md:py-4 py-1 border-b sticky top-0 z-50 backdrop-blur-md bg-opacity-60 bg-white">
      <div className="md:container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-semibold tracking-tight mb-2 md:mb-0 hidden md:block"
        >
          <span className="text-green-600">KU</span>wongnai
        </Link>

        {/* Logo and Avatar for Mobile */}
        <div className="md:hidden flex justify-between items-center w-full mb-1 px-2">
          <Link href="/" className="text-3xl font-semibold tracking-tight">
            <span className="text-green-600">KU</span>wongnai
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span>Cart</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UtensilsCrossed className="mr-2 h-4 w-4" />
                <span>Your restaurant</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bike className="mr-2 h-4 w-4" />
                <span>Rider</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/login" className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Search for Mobile */}
        <div className="md:hidden w-full px-2">
          <form>
            <div className="relative rounded-full border-green-600 border-2 w-full mb-2">
              <Input
                type="search"
                placeholder="search a restaurant ...."
                className="pl-4 pr-10 rounded-full w-full"
              />
              <div
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 rounded-full pl-1 flex items-center"
                style={{ width: "30px", height: "30px" }}
              >
                🍳
              </div>
            </div>
          </form>
        </div>

        {/* Search and Combobox for Desktop */}
        <div className="hidden md:flex gap-3 items-center mb-2 md:mb-0">
          <ComboboxDemo />
          <form>
            <div className="relative rounded-full border-green-600 border-2 w-full">
              <Input
                type="search"
                placeholder="search a restaurant ...."
                className="pl-4 pr-10 rounded-full w-full"
              />
              <div
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 rounded-full pl-1 flex items-center"
                style={{ width: "30px", height: "30px" }}
              >
                🍳
              </div>
            </div>
          </form>
        </div>

        {/* Icons and Avatar for Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/">
            <ShoppingCart className="w-7 h-7 mr-4" />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UtensilsCrossed className="mr-2 h-4 w-4" />
                <span>Your restaurant</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bike className="mr-2 h-4 w-4" />
                <span>Rider</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/login" className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <h4 className="text-xl font-semibold tracking-tight">John doe</h4>
        </div>
      </div>
    </header>
  );
}

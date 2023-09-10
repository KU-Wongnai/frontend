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
    <header className="px-3 py-4 border-b sticky top-0 z-50 backdrop-blur-md bg-opacity-60 bg-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
        >
          <span className="text-green-600">KU</span>wongnai
        </Link>
        <div className="flex gap-3 items-center">
          <div >
            <ComboboxDemo />
          </div>
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
        <div className="flex items-center gap-3">
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
                {" "}
                <UtensilsCrossed className="mr-2 h-4 w-4" />
                <span>Your restaurant</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {" "}
                <Bike className="mr-2 h-4 w-4" />
                <span>Rider</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {" "}
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
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            John doe
          </h4>
        </div>
      </div>
    </header>
  );
}

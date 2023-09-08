import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Bike, LogOut, Settings, ShoppingCart, UtensilsCrossed } from "lucide-react";
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
    <header className="px-3 py-4 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
        >
          <span className="text-green-600">KU</span>wongnai
        </Link>
        <div className="flex gap-3">
          <ComboboxDemo />
          <form>
            <Input
              type="search"
              placeholder="search a restaurant ...."
              className="rounded-full w-full max-6xl border-green-600 border-2"
            />
          </form>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/cart">
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
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
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

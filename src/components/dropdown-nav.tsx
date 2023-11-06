import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { logout } from "@/services/auth";
import Link from "next/link";
import {
  ShoppingCart,
  MessageCircle,
  UtensilsCrossed,
  Bike,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import useAuthStore from "@/contexts/auth-store";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { DashboardIcon } from "@radix-ui/react-icons";

type DropdownNavProps = {
  items: {
    label: string;
    items: {
      label: string;
      href: string;
      icon: React.ReactNode;
    }[];
  }[];
};

const DropdownNav: React.FC<DropdownNavProps> = ({ items }) => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 border rounded-full p-1 pl-3 cursor-pointer hover:shadow-md duration-300 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800">
          <Menu className="w-4 h-4" />
          <Avatar>
            <AvatarImage src={user.user_profile?.avatar} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2">
        <DropdownMenuLabel>
          <div className="flex items-center gap-2 p-3">
            <Avatar>
              <AvatarImage src={user.user_profile?.avatar} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3>{user.name}</h3>
              <p className="text-sm font-normal text-gray-600 dark:text-gray-300">
                {user.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((group) => (
          <DropdownMenuGroup key={group.label}>
            <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
            {group.items.map((item) => (
              <DropdownMenuItem key={item.href} className="py-3">
                <Link href={item.href} className="flex items-center w-full">
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        ))}
        <DropdownMenuLabel>Admin</DropdownMenuLabel>
        {user.roles.some((role) => role.name === "admin") ? (
          <DropdownMenuItem key="/admin" className="py-3">
            <Link href="/admin" className="flex items-center w-full">
              <DashboardIcon className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
        ) : (
          <></>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="py-3">
          <button onClick={logout} className="flex items-center w-full">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownNav;

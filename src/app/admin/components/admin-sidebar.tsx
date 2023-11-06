import { el } from "date-fns/locale";
import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";
import React, { useState } from "react";

interface AdminSidebarProps {
  setActive: (active: number) => void;
  active: number;
}

export default function AdminSidebar({ setActive, active }: AdminSidebarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  if (pathname === "/admin") {
    setActive(1);
  } else if (pathname === "/admin/user-management") {
    setActive(2);
  } else if (pathname === "/admin/rider-management") {
    setActive(3);
  } else if (pathname === "/admin/restaurant-management") {
    setActive(4);
  } else if (pathname === "/admin/rider-request") {
    setActive(5);
  } else if (pathname === "/admin/restaurant-request") {
    setActive(6);
  }
  return (
    <div className="md:p-6 mr-4 font-bold">
      {/* <h2 className="mb-4 text-4xl hidden md:block">Admin</h2> */}
      <div className="md:hidden grid place-content-center">
        <button
          className="flex justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>
      <nav className={`md:block mt-2 md:mt-0 ${menuOpen ? "block" : "hidden"}`}>
        <ul className="space-y-2 text-md">
          <li>
            <Link
              href={"/admin"}
              className={`cursor-pointer flex items-center rounded-lg px-4 py-2 transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-800 hover:underline ${
                active === 1
                  ? "bg-gradient-to-l from-green-200 to-green-500 dark:from-green-500 dark:to-green-900"
                  : "text-gray-500"
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href={"/admin/user-management"}
              className={`cursor-pointer flex items-center rounded-lg px-4 py-2 transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-800 hover:underline ${
                active === 2
                  ? "bg-gradient-to-l from-green-200 to-green-500 dark:from-green-500 dark:to-green-900"
                  : "text-gray-500"
              }`}
            >
              User Management
            </Link>
          </li>
          <li>
            <Link
              href={"/admin/rider-management"}
              className={`cursor-pointer flex items-center rounded-lg px-4 py-2 transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-800 hover:underline ${
                active === 3
                  ? "bg-gradient-to-l from-green-200 to-green-500 dark:from-green-500 dark:to-green-900"
                  : "text-gray-500"
              }`}
            >
              Rider Management
            </Link>
          </li>
          <li>
            <Link
              href={"/admin/restaurant-management"}
              className={`cursor-pointer flex items-center rounded-lg px-4 py-2 transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-800 hover:underline ${
                active === 4
                  ? "bg-gradient-to-l from-green-200 to-green-500 dark:from-green-500 dark:to-green-900"
                  : "text-gray-500"
              }`}
            >
              Restaurant Management
            </Link>
          </li>
          <li>
            <Link
              href={"/admin/rider-request"}
              className={`cursor-pointer flex items-center rounded-lg px-4 py-2 transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-800 hover:underline ${
                active === 5
                  ? "bg-gradient-to-l from-green-200 to-green-500 dark:from-green-500 dark:to-green-900"
                  : "text-gray-500"
              }`}
            >
              Rider Request
            </Link>
          </li>
          <li>
            <Link
              href={"/admin/restaurant-request"}
              className={`cursor-pointer flex items-center rounded-lg px-4 py-2 transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-800 hover:underline ${
                active === 6
                  ? "bg-gradient-to-l from-green-200 to-green-500 dark:from-green-500 dark:to-green-900"
                  : "text-gray-500"
              }`}
            >
              Restaurant Request
            </Link>
          </li>
          {/* <li>
            <Link href={"/admin/restaurant-request"}
              className={`cursor-pointer flex items-center rounded-lg px-4 py-2 transition-colors duration-200 hover:bg-primary  hover:text-primary-foreground ${
                active === 5 ? "bg-card" : "text-gray-500"
              }`}
              onClick={() => setActive(5)}
            >
              Restaurant Request
            </Link>
          </li> */}
        </ul>
      </nav>
    </div>
  );
}

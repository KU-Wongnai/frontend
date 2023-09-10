"use client"
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import RestaurantNavbar from "../../components/navbar-restaurant";
import { usePathname } from 'next/navigation';
import React from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Navbar */}
      <Navbar />
      {/* Content */}
      {pathName !== "/restaurant/create" && pathName !== "/restaurant" && <RestaurantNavbar/>}
      <main className="flex-1 bg-gray-100">
        {/* <div className="container px-auto py-3">{children}</div> */}
        <div>
          {children}
        </div>
      </main>
      {/* Footer always at the bottom */}
      <Footer />
    </div>
  );
}

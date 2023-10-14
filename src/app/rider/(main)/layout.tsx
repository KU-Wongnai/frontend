import Navbar from "@/app/rider/components/rider-navbar";
// import Footer from "@/app/rider/components/rider-footer";
import React from "react";
import { NavigationMenuDemo } from "./components/navigation-menu";
import { Separator } from "@/components/ui/separator";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-secondary">
        <div className="container mx-auto py-3 px-2 sm:px-4 md:px-6 lg:px-8">
          {/* <NavigationMenuDemo /> */}
          {/* <Separator className="my-4" /> */}
          {children}
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

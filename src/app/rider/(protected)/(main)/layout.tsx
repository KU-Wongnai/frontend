"use client";

// import Footer from "@/app/rider/components/rider-footer";
import React, { useEffect } from "react";
import { NavigationMenuDemo } from "./components/navigation-menu";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/navbar";
import useAuthStore from "@/contexts/auth-store";
import { redirect } from "next/navigation";
import useStore from "@/contexts/useStore";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user, loading } = useStore(useAuthStore, (state) => state.user);

  useEffect(() => {
    console.log("rider user = ", user);
    if (!loading && user?.rider_profile === null) {
      redirect("/rider");
    }
  }, [loading, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

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

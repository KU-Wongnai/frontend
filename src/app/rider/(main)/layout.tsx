import Navbar from "@/app/rider/components/rider-navbar";
// import Footer from "@/app/rider/components/rider-footer";
import React from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-secondary">{children}</main>
      {/* <Footer /> */}
    </div>
  );
}

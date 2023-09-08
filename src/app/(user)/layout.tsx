import Navbar from "@/components/navbar";
import React from "react";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="bg-gray-100 min-h-screen">{children}</main>
    </>
  );
}

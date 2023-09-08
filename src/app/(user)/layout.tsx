import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import React from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="bg-gray-100 min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

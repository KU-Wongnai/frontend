import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import React from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Navbar */}
      <Navbar />
      {/* Content */}
      <main className="flex-1 bg-secondary">{children}</main>
      {/* Footer always at the bottom */}
      <Footer />
    </div>
  );
}

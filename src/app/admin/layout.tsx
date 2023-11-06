"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import React from "react";
import { useState } from "react";
import AdminSidebar from "./components/admin-sidebar";
import { Card } from "@mui/material";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(1);
  const pathname = usePathname();
  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Navbar */}
      <Navbar />
      {/* Content */}
      <main className="flex-1 bg-secondary">
        <div className="container px-4 py-6 mx-auto my-4">
          
            <div className="flex flex-col h-screen m-auto md:flex-row">
              {/* Sidebar */}
              <AdminSidebar active={active} setActive={setActive} />

              {/* Main content */}
              <main className="flex-1 p-8 mt-5 rounded-sm shadow-sm border bg-card overflow-auto">
                <div>{children}</div>
              </main>
            </div>

        </div>
      </main>
      {/* Footer always at the bottom */}
      <Footer />
    </div>
  );
}

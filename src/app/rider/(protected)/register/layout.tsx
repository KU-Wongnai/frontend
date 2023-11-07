"use client";

import useAuthStore from "@/contexts/auth-store";
import useStore from "@/contexts/useStore";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: user, loading } = useStore(useAuthStore, (state) => state.user);

  useEffect(() => {
    console.log("rider user = ", user);
    if (!loading && user?.rider_profile !== null) {
      redirect("/rider/dashboard");
    }
  }, [loading, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default Layout;

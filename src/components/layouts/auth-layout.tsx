"use client";

import useAuthStore from "@/contexts/auth-store";
import { redirect } from "next/navigation";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    redirect("/auth");
  }

  return <>{children}</>;
};

export default AuthLayout;

"use client";

import useAuthStore from "@/contexts/auth-store";
import useStore from "@/contexts/useStore";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AuthAdminLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.roles.some((role) => role.name === "admin")) {
      redirect("/");
    }
    setLoading(false);
  }, [user]);

  if (loading) {
    return null;
  }

  return <>{children}</>;
};

export default AuthAdminLayout;

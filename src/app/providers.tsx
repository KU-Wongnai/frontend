"use client";

import { getMe } from "@/services/auth";
import { ThemeProvider } from "@/components/theme-provider";
import React, { useEffect } from "react";
import useStore from "@/contexts/useStore";
import useAuthStore from "@/contexts/auth-store";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const user = useStore(useAuthStore, (state) => state.user);
  useEffect(() => {
    if (user) { // prevent error when user is null
      // Used to verify if the user is logged in on every page
      getMe();
    }
  }, []);

  // Add more providers as needed
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
};

export default Providers;

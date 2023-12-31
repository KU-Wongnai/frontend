"use client";

import { getMe } from "@/services/auth";
import { ThemeProvider } from "@/components/theme-provider";
import React, { useEffect } from "react";
import { NotificationProvider } from './(user)/(protected)/notifications/NotificationsContext';

const Providers = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Used to verify if the user is logged in on every page
    getMe();
  }, []);

  // Add more providers as needed
  return (
    <NotificationProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </NotificationProvider>
  );
};

export default Providers;

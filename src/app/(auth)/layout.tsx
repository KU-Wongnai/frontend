import React from "react";
import Image from "next/image";
import logoRadius from "/src/assets/logo/logo_white_radius.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center lg:grid lg:grid-cols-2 lg:max-w-none lg:px-0">
      {/* Display the logo only on md (tablet) screens and above */}
      <Image
        src={logoRadius}
        width={200}
        height={200}
        alt="KU Wongnai"
        className="hidden md:block absolute left-4 top-4 md:left-8 md:top-8 z-10"
      />

      {/* Display the background div only on lg (large) screens and above */}
      <div className="hidden lg:flex h-full p-10 text-white relative dark:border-r">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1601314212732-047d4bdffd22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1936&q=80')]" />
      </div>

      {/* This div will be displayed on all screen sizes, but takes full width only on small screens */}
      <div className="lg:p-8 w-full">
        <div className="mx-auto flex flex-col justify-center space-y-6 sm:w-[350px] mt-40 md:mt-0">
          {children}
        </div>
      </div>
    </div>
  );
}

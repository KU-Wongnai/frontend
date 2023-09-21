import React from "react";
import Image from "next/image";
import logoRadius from "/src/assets/logo/logo_white_radius.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInAuthForm } from "./components/user-auth-signin-form";
import Link from "next/link";
import { SignUpAuthForm } from "./components/user-auth-signup-form";

const Auth = () => {
  return (
    <div className="container relative min-h-screen flex-col items-start justify-center lg:grid lg:grid-cols-2 lg:max-w-none lg:px-0">
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
        <div className="mx-auto flex flex-col justify-center space-y-6 sm:w-[350px] mt-10 md:mt-28">
          <Tabs defaultValue="sign-in">
            <TabsList>
              <TabsTrigger value="sign-in">
                <div className="w-[130px] lg:w-[150px]">Sign In</div>
              </TabsTrigger>
              <TabsTrigger value="sign-up">
                <div className="w-[130px] lg:w-[150px]">Register</div>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="sign-in">
              <div className="flex flex-col text-start space-y-2 my-8">
                <h1 className="text-4xl font-semibold tracking-tight">
                  Sign In
                </h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email below to sign-in
                </p>
              </div>
              <SignInAuthForm />
              <p className="px-8 text-center text-sm text-muted-foreground">
                If you don&apos;t have an account, you can{" "}
                <Link
                  href="/sign-up"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  create one
                </Link>
              </p>
            </TabsContent>
            <TabsContent value="sign-up">
              <div className="flex flex-col space-y-2 text-start my-8">
                <h1 className="text-4xl font-semibold tracking-tight">
                  Register
                </h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email below to create your account
                </p>
              </div>
              <SignUpAuthForm />
              <p className="px-8 text-center text-sm text-muted-foreground">
                If you already have an account, you can{" "}
                <Link
                  href="/login"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  login
                </Link>
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;

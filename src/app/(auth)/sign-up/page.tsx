import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { UserAuthForm } from "@/components/user-auth-signup-form";
import logoRadius from "/src/assets/logo/logo_white_radius.png";

export const metadata: Metadata = {
  title: "Login",
  description: "Authentication forms built using the components.",
};

export default function LoginPage() {
  return (
    <>
      <div className="container relative hidden min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Image
          src={logoRadius}
          width={200}
          height={200}
          alt="KU Wongnai"
          className="absolute left-4 top-4 md:left-8 md:top-8 z-10"
        />
        <div className="relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex ">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1601314212732-047d4bdffd22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1936&q=80')]" />
        </div>

        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Register
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              If you already have an account, you can{" "}
              <Link
                href="/login"
                className="underline underline-offset-4 hover:text-primary"
              >
                login
              </Link>
            </p>
            {/* <p className="px-8 text-center text-sm text-muted-foreground">
              If you don&apos;t have an account, you can{" "}
              <Link
                href="/sign-up"
                className="underline underline-offset-4 hover:text-primary"
              >
                create one
              </Link>
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
}

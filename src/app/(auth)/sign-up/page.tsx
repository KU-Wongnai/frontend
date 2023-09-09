import { Metadata } from "next";
import Link from "next/link";

import { SignInAuthForm } from "@/components/user-auth-signup-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Authentication forms built using the components.",
};

export default function LoginPage() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Register</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to create your account
        </p>
      </div>
      <SignInAuthForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        If you already have an account, you can{" "}
        <Link
          href="/login"
          className="underline underline-offset-4 hover:text-primary"
        >
          login
        </Link>
      </p>
    </>
  );
}

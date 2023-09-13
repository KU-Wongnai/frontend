import { Metadata } from "next";
import Link from "next/link";

import { LoginAuthForm } from "@/components/user-auth-login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Authentication forms built using the components.",
};

export default function Login() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to login
        </p>
      </div>
      <LoginAuthForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        If you don&apos;t have an account, you can{" "}
        <Link
          href="/sign-up"
          className="underline underline-offset-4 hover:text-primary"
        >
          create one
        </Link>
      </p>
    </>
  );
}

"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SignUpAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

interface FormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function SignUpAuthForm({ className, ...props }: SignUpAuthFormProps) {
  const { handleSubmit, control, formState } = useForm<FormInputs>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { isLoading } = formState;
  const router = useRouter();

  const mockRoute = () => {
    router.push("/");
  };

  const onSubmit = (data: FormInputs) => {
    console.log(data);
    // Perform your sign-up logic here
    mockRoute();
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid">
          <div className="grid gap-1 mb-5">
            <Label htmlFor="name">Name</Label>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  id="name"
                  placeholder="Enter your name"
                  type="text"
                  disabled={isLoading}
                />
              )}
            />
          </div>
          <div className="grid gap-1 mb-5">
            <Label htmlFor="email">Email</Label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  disabled={isLoading}
                />
              )}
            />
          </div>
          <div className="grid gap-1 mb-5">
            <Label htmlFor="password">Password</Label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  id="password"
                  placeholder="Type your password here"
                  type="password"
                  disabled={isLoading}
                />
              )}
            />
          </div>
          <div className="grid gap-1 mb-5">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  type="password"
                  disabled={isLoading}
                />
              )}
            />
          </div>
          <Button
            disabled={isLoading}
            type="submit"
            className="bg-green-600 hover:bg-green-800 text-white"
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        onClick={mockRoute}
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  );
}

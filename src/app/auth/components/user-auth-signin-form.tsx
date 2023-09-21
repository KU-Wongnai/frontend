"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

import { loginSchema } from "@/validations/auth-schema";
import { useAuthStore } from "@/contexts/auth-store";
import { loginUser, googleAuth } from "@/lib/auth-helper";

interface SignInAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

interface FormInputs {
  email: string;
  password: string;
}

export function SignInAuthForm({ className, ...props }: SignInAuthFormProps) {
  const { handleSubmit, control, setValue, formState } = useForm<FormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
    // this is a custom resolver to handle yup validation errors
    resolver: async (data) => {
      try {
        loginSchema.parse(data);
        return { values: data, errors: {} };
      } catch (error: any) {
        return { values: {}, errors: error.formErrors.fieldErrors };
      }
    },
  });
  const { isLoading } = formState;
  const { toast } = useToast();
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken); // Zustand store

  const onSubmit = async (data: FormInputs) => {
    try {
      const token = await loginUser(data);
      setToken(token); // Save token to Zustand store
      console.log("User logged in", token);
      router.push("/");
      toast({ title: "Login Success", description: "Welcome back!" });
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const token = await googleAuth();
      setToken(token); // Save token to Zustand store
      router.push("/"); // Navigate to dashboard
      toast({ title: "Google Authentication Success", description: "" });
    } catch (error) {
      console.error("Google Authentication failed", error);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid">
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
          <div className="grid gap-1 mb-10">
            <Label htmlFor="password">Password</Label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  id="password"
                  placeholder="Password"
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
            Sign In with Email
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
        onClick={handleGoogleAuth}
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}
        Google
      </Button>
    </div>
  );
}

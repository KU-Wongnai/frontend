import { z } from "zod";

// Note: Name of the field should be the same as returned from our user-service

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password should be at least 8 characters"),
});

export type LoginForm = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(1, "Name should not be empty"),
    email: z.string().email(),
    password: z.string().min(8, "Password should be at least 8 characters"),
    password_confirmation: z
      .string()
      .min(8, "Password should be at least 8 characters"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export type RegisterForm = z.infer<typeof registerSchema>;

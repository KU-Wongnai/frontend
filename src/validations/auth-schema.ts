import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerSchema = z.object({
  name: z.string().min(1, "Name should not be empty"),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const userProfileSchema = z
  .object({
    phone_number: z.string().nullable().optional(),
    birth_date: z.date().optional(),
    address: z.string().nullable().optional(),
    student_id: z.string().length(10).nullable().optional(),
    faculty: z.string().max(255).nullable().optional(),
    major: z.string().max(255).nullable().optional(),
    favorite_food: z.string().max(255).nullable().optional(),
    allergy_food: z.string().max(255).nullable().optional(),
  })
  .refine(
    (data) => !data.phone_number || isValidPhoneNumber(data.phone_number),
    {
      message: "Invalid phone number",
      path: ["phone_number"],
    }
  );

export type UserProfileForm = z.infer<typeof userProfileSchema>;

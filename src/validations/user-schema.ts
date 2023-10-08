import { z } from "zod";

export const userProfileSchema = z.object({
  phone_number: z
    .string()
    .nullable()
    .refine(
      (data) => data === null || data.length === 10,
      "Phone number should be either null or 10 characters"
    ),
  birth_date: z
    .date()
    // .nullable()
    .refine(
      (data) => data === null || data instanceof Date,
      {
        message: "Birth date should be either null or a valid date",
        params: {}
      }
    ),
  address: z
    .string()
    .nullable()
    .refine(
      (data) => data === null || data.length >= 1 || data.length === 0,
      "Address should be either null or not empty"
    ),
  student_id: z
    .string()
    .nullable()
    .refine(
      (data) => data === null || data.length === 10 || data.length === 0,
      "Student ID should be either null or 10 characters"
    ),
  faculty: z
    .string()
    .nullable()
    .refine(
      (data) => data === null || data.length >= 1 || data.length === 0,
      "Faculty should be either null or not empty"
    ),
  major: z
    .string()
    .nullable()
    .refine(
      (data) => data === null || data.length >= 1 || data.length === 0,
      "Major should be either null or not empty"
    ),
  favorite_food: z
    .string()
    .nullable()
    .refine(
      (data) => data === null || data.length >= 1,
      "Favorite food should be either null or not empty"
    ),
  allergy_food: z
    .string()
    .nullable()
    .refine(
      (data) => data === null || data.length >= 1 || data.length === 0,
      "Allergy food should be either null or not empty"
    ),
});

export type UserProfileForm = z.infer<typeof userProfileSchema>;
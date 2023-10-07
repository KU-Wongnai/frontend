import { z } from "zod";

// export const userProfileSchema = z.object({
//   phone_number: z
//     .string()
//     .nullable()
//     .refine(
//       (data) => data === null || data.length === 10,
//       "Phone number should be either null or 10 characters"
//     ),
//   birth_date: z.date({
//     required_error: "Birth date should not be empty",
//     invalid_type_error: "Birth date should be a date",
//   }),
//   address: z.string().min(1, "Address should not be empty"),
//   avatar: z.string().min(1, "Avatar should not be empty"),
//   student_id: z.string().length(10, "Student ID should be 10 characters"),
//   faculty: z.string().min(1, "Faculty should not be empty"),
//   major: z.string().min(1, "Major should not be empty"),
//   favorite_food: z.string().min(1, "Favorite food should not be empty"),
//   allergy_food: z.string().min(1, "Allergy food should not be empty"),
//   point: z.number().min(0, "Point should not be empty"),
// });

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
    .nullable()
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
      (data) => data === null || data.length >= 1,
      "Address should be either null or not empty"
    ),
  avatar: z
    .string()
    .nullable()
    .refine(
      (data) => data === null || data.length >= 1,
      "Avatar should be either null or not empty"
    ),
  student_id: z
    .string()
    .nullable()
    .refine(
      (data) => data === null || data.length === 10,
      "Student ID should be either null or 10 characters"
    ),
  faculty: z
    .string()
    .nullable()
    .refine(
      (data) => data === null || data.length >= 1,
      "Faculty should be either null or not empty"
    ),
  major: z
    .string()
    .nullable()
    .refine(
      (data) => data === null || data.length >= 1,
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
      (data) => data === null || data.length >= 1,
      "Allergy food should be either null or not empty"
    ),
  point: z
    .number()
    .nullable()
    .refine(
      (data) => data === null || data >= 0,
      "Point should be either null or positive"
    ),
});

export type UserProfileForm = z.infer<typeof userProfileSchema>;
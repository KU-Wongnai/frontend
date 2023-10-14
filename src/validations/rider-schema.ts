import { z } from "zod";

export const riderRegisterGeneralSchema = z.object({
  phone_number: z.string().length(10, "Phone number should be 10 digits"),
  id_card: z.string().length(13, "ID card should be 13 digits"),
  birth_date: z.date(),
  bank_account_number: z
    .string()
    .length(10, "Bank account number should be 10 digits"),
  avatar: z.string().nullable(),
  desire_location: z
    .string()
    .nullable()
    .refine(
      (data) => data === null || data.length >= 1 || data.length === 0,
      "Desire location should be either null or not empty"
    ),
});

export type RiderRegisterGeneralForm = z.infer<
  typeof riderRegisterGeneralSchema
>;

export const riderRegisterStudentSchema = z.object({
  phone_number: z.string().length(10, "Phone number should be 10 digits"),
  id_card: z.string().length(13, "ID card should be 13 digits"),
  birth_date: z.date(),
  bank_account_number: z
    .string()
    .length(10, "Bank account number should be 10 digits"),
  avatar: z.string().nullable(),
  student_id: z.string().length(10, "Student ID should be 10 digits"),
  faculty: z
    .string()
    .min(1, "Faculty should not be empty")
    .max(255, "Faculty should not be more than 255 characters"),
  major: z
    .string()
    .min(1, "Major should not be empty")
    .max(255, "Major should not be more than 255 characters"),
  desire_location: z
    .string()
    .nullable()
    .refine(
      (data) => data === null || data.length >= 1 || data.length === 0,
      "Desire location should be either null or not empty"
    ),
});

export type RiderRegisterStudentForm = z.infer<
  typeof riderRegisterStudentSchema
>;

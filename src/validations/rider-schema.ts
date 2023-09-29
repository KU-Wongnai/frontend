import { z } from "zod";

export const riderRegisterSchema = z.object({
  phone_number: z.string().min(10, "Phone number should be 10 digits"),
  birth_date: z.date(),
  id_card: z.string().min(13, "ID card should be 13 digits"),
  bank_account_number: z.string().min(10, "Bank account number should be 10 digits"),
  avatar: z.string().nullable(),
  student_id: z.string().min(10, "Student ID should be 10 digits").nullable(),
  faculty: z.string().min(1, "Faculty should not be empty").max(255, "Faculty should not be more than 255 characters").nullable(),
  major: z.string().min(1, "Major should not be empty").max(255, "Major should not be more than 255 characters").nullable(),
  desire_location: z.string().min(1, "Desire location should not be empty").max(255, "Desire location should not be more than 255 characters").nullable(),
});

export type RiderRegisterForm = z.infer<typeof riderRegisterSchema>;

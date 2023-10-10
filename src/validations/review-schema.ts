import { z } from "zod";

export const reviewSchema = z.object({
  title: z.string().nonempty("Title is required."),
  content: z.string().nonempty("Review content is required."),
  rating: z.number().min(0).max(5),
  images: z.array(z.any()).optional(),
});

export type ReviewForm = z.infer<typeof reviewSchema>;

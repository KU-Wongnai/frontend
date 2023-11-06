import { z } from "zod";

// Note: Name of the field should be the same as returned from our restaurant-service

// TODO: Add more field in the service and here

export const restaurantSchema = z.object({
  name: z.string().nonempty("Name is required."),
  description: z.string(),
  location: z.string().nonempty("Location is required."),
  categories: z.string().array().nonempty("Food categories are required."),
  isDelivery: z.boolean(),
  isWalkIn: z.boolean(),
  phone: z.string().nonempty("Phone number is required."),
  email: z.string().email().optional().or(z.literal("")),
  website: z.string().url().optional().or(z.literal("")),
  instagram: z.string().optional().or(z.literal("")),
  facebook: z.string().url().optional().or(z.literal("")),
  line: z.string().optional(),
  openDays: z.string().array(),
  openAt: z.string().optional(),
  closeAt: z.string().optional(),
  priceRange: z.string().optional(),
});

export type RestaurantForm = z.infer<typeof restaurantSchema>;

// ----------- Restaurant Menu --------------------

// Note:

// TODO:

export const restaurantMenuSchema = z.object({
    name: z.string().min(1, "Name should not be empty").max(255, "Name should not be more than 255 characters").nonempty("Name is required."),
    price: z.coerce.number().positive("Price should be positive number"),
    category: z.string().min(3, "Category should not be empty").max(255, "Category should not be more than 255 characters").nonempty("The price is required."),
    description:z.string().max(255).nullable().optional(),
    image: z.string()
});

export type RestaurantMenuForm = z.infer<typeof restaurantMenuSchema>;

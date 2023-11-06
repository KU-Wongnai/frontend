import { z } from "zod";

// Note: Name of the field should be the same as returned from our restaurant-service

// TODO: Add more field in the service and here

export const restaurantSchema = z.object({
    name: z.string().nonempty("Name is required."),
    description: z.string(),
    location: z.string(),
    foodType: z.string().nonempty("Food type is required."),
    contactInfo: z.string(),
    rating: z.number().max(5),
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
    image: z.string().nonempty("Menu Image is required.")
});

export type RestaurantMenuForm = z.infer<typeof restaurantMenuSchema>;
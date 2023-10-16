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
import { httpClient } from "@/lib/http-client";
import {RestaurantForm, RestaurantMenuForm} from "@/validations/restaurant-schema";


export const getRestaurants = async () => {
  try {
    const { data: restaurants } = await httpClient.get(
      "restaurant/api/restaurants"
    );
    return restaurants;
  } catch (error) {
    console.error("Failed to get restaurants", error);
    throw error;
  }
};

export const getRestaurant = async (id: number) => {
  try {
    const { data: restaurant } = await httpClient.get(
      `restaurant/api/restaurants/${id}`
    );
    return restaurant;
  } catch (error) {
    console.error("Failed to get restaurant", error);
    throw error;
  }
};

export const createRestaurant = async (data : RestaurantForm) => {
  try {
    const { data: restaurant } = await httpClient.post(
        `restaurant/api/restaurants`, data
    );
    return restaurant;
  } catch (error) {
    console.error("Failed to create a restaurant", error);
    throw error;
  }
}

export const createRestaurantMenu = async (data : RestaurantMenuForm, id : number) => {
  try {
    const { data: menu } = await httpClient.post(
        `restaurant/api/restaurants/${id}/menu`, data
    );
    return menu;
  } catch (error) {
    console.error("Failed to create a menu", error);
    throw error;
  }
}

export const getRestaurantMenu = async (id: number) => {
  try {
    const { data: menu } = await httpClient.get(
      `restaurant/api/restaurants/${id}/menu`
    );
    return menu;
  } catch (error) {
    console.error("Failed to get restaurant menu", error);
    throw error;
  }
}

export const deleteRestaurant = async (id: number) => {
  try {
    await httpClient.delete(`restaurant/api/restaurants/${id}`);
  } catch (error) {
    console.error("Failed to delete restaurant", error);
    throw error;
  }
}
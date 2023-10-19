import { httpClient } from "@/lib/http-client";

export const addToCart = async (data: any) => {
  try {
    const response = await httpClient.post("/order/cart", data);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const removeFromCart = async (itemId: number) => {
  try {
    const response = await httpClient.delete(`/order/cart/${itemId}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

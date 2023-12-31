import { DeliveryStatus, OrderStatus } from "@/types/order";
import { httpClient } from "@/lib/http-client";

export const getUnassignedDeliveryOrders = async () => {
  try {
    const { data } = await httpClient.get("/order/api/deliveries/unassign");

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getMyBills = async () => {
  try {
    const { data } = await httpClient.get("/order/api/bills");

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getMyBillBy = async (id: string) => {
  try {
    const { data } = await httpClient.get(`/order/api/bills/${id}`);

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateOrderStatus = async (id: string, status: OrderStatus) => {
  try {
    const { data } = await httpClient.put(
      `/order/api/orders/${id}?status=${status}`
    );

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const assignDelivery = async (deliveryId: string) => {
  try {
    const { data } = await httpClient.post(
      `/order/api/deliveries/${deliveryId}/assign`
    );

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMyDeliveries = async () => {
  try {
    const { data } = await httpClient.get("/order/api/deliveries/me");

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getMyDeliveriesWithStatus = async (status: DeliveryStatus) => {
  try {
    const { data } = await httpClient.get(`/order/api/deliveries/me/${status}`);

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const completeDelivery = async (deliveryId: string) => {
  try {
    const { data } = await httpClient.post(
      `/order/api/deliveries/${deliveryId}/complete`
    );

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDelivery = async (deliveryId: string) => {
  try {
    const { data } = await httpClient.get(
      `/order/api/deliveries/${deliveryId}`
    );

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getOrderByRestaurant = async (restaurantId: string) => {
  try {
    const { data } = await httpClient.get(
      `/order/api/orders/restaurant/${restaurantId}`
    );

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getOrderByID = async (orderId: string) => {
  try {
    const { data } = await httpClient.get(`/order/api/order/${orderId}`);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMyPocket = async () => {
  try {
    const { data } = await httpClient.get(`/order/api/deliveries/me/earning`);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMyOrders = async (status: string = "") => {
  try {
    const { data } = await httpClient.get(
      `/order/api/orders/me${status ? "/" + status : ""}`
    );
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

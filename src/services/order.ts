import { OrderStatus } from "@/interfaces/order";
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
      `/order/api/orders/${id}?status=${status}}`
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

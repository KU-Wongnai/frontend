export type Delivery = {
  id: string;
  riderId: string | null;
  deliveryAddress: string;
  status: DeliveryStatus;
  order: Order;
};

export type DeliveryStatus = "PENDING" | "ASSIGNED" | "DELIVERED" | "CANCELLED";

export type Order = {
  id: string;
  restaurant: Restaurant;
  orderItems: OrderItem[];
  status: OrderStatus;
  delivery: Delivery | null;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderStatus =
  | "PENDING"
  | "RECEIVED"
  | "PREPARING"
  | "COMPLETED"
  | "CANCELLED";

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  menu: MenuItem;
};

export type MenuItem = {
  id: number;
  name: string;
  price: number;
  image: string;
};

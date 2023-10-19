export type RestaurantOrder = {
  id: number;
  name: string;
  location: string;
  contactInfo: string;
  image: string | null;
  menu: MenuItem[];
};

export type Delivery = {
  id: string;
  riderId: string | null;
  deliveryAddress: string;
  contactInfo: string;
  status: DeliveryStatus;
  order: Order;
};

export type DeliveryStatus = "PENDING" | "ASSIGNED" | "DELIVERED" | "CANCELLED";

export type Order = {
  id: string;
  restaurant: RestaurantOrder;
  user: {
    id: number;
    name: string;
    email: string;
    emailVerifiedAt: Date | null;
    avatar: string | null;
  };
  orderItems: OrderItem[];
  status: string;
  delivery: Delivery | null;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type OrderStatus =
  | "PENDING"
  | "RECEIVED"
  | "PREPARING"
  | "COMPLETED"
  | "CANCELLED";

export type OrderItem = {
  id: string;
  // name: string | null;
  price: number;
  totalPrice: number;
  quantity: number;
  menu: MenuItem;
  orderItemOption: OrderItemOption[];
};

export type OrderItemOption = {
  id: string;
  name: string;
  price: number;
  category: string;
};

export type MenuItem = {
  id: number;
  name: string;
  price: number;
  image: string | null;
};

export type MenuOption = {
  id: number;
  name: string;
  price: number;
  category: string;
};

export type Menu = {
  id: number;
  name: string;
  description: string;
  image: null | string;
  price: number;
  category: string;
  menuOptions: MenuOption[];
};

export type Restaurant = {
  id: number;
  name: string;
  description: string;
  location: string;
  categories: string[];
  status: string;
  openAt: string;
  closeAt: string;
  isDelivery: boolean;
  isWalkIn: boolean;
  phone: string;
  email: string;
  website: string;
  instagram: string;
  facebook: string;
  line: string;
  openDays: string[];
  priceRange: string;
  contactInfo: string;
  image: null | string;
  rating: number;
  createdAt: string,
  menus: Menu[];
};

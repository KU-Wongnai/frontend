interface MenuOption {
  id: number;
  name: string;
  price: number;
  category: string;
}

interface Menu {
  id: number;
  name: string;
  description: string;
  image: null | string;
  price: number;
  category: string;
  menuOptions: MenuOption[];
}

interface Restaurant {
  id: number;
  name: string;
  description: string;
  location: string;
  foodType: string;
  contactInfo: string;
  image: null | string;
  rating: number;
  menus: Menu[];
}

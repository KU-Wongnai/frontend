// interface RestaurantProps {
//   id: number;
//   name: string;
//   foodType: string;
//   rating: number;
//   image: string | null;
//   href: string;
//   description: string;
//   location: string;
//   operatingHours: number;
//   contactInfo: string;
//   menus: string[] | null;
// }

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

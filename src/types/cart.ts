export type Item = {
  menu: ItemMenu;
  options: ItemMenuOption[];
  quantity: number;
};

export type ItemMenu = {
  id: number;
  name: string;
  image: string;
  price: number;
};

export type ItemMenuOption = {
  id: number;
  name: string;
  price: number;
  category: string;
  menuId: number;
};

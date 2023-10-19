import { Item } from "@/types/cart";

export const calculateCartTotal = (cart: Item[]) => {
  return cart.reduce((acc, item) => {
    const optionTotal = item.options.reduce((acc, option) => {
      return acc + option.price;
    }, 0);

    return acc + item.menu.price + optionTotal;
  }, 0);
};

export const calculateMenuTotal = (item: Item) => {
  return item.options.reduce((acc, option) => {
    return acc + option.price;
  }, item.menu.price);
};

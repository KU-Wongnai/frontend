import { Item } from "@/types/cart";
import { create } from "zustand";

type ShoppingCartState = {
  cart: Item[];
  addToCart: (item: Item) => void;
  setCart: (cart: Item[]) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
};

export const useShoppingCartStore = create<ShoppingCartState>((set) => ({
  cart: [],
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  setCart: (cart) => set({ cart }),
  removeFromCart: (itemId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.menu.id !== itemId),
    })),
  clearCart: () => set({ cart: [] }),
}));

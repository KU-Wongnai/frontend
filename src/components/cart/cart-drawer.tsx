"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ShoppingCart, X } from "lucide-react";
import { Drawer } from "@mui/material";
import Summary from "@/components/cart/summary";
import Link from "next/link";
import { Item } from "@/types/cart";
import { httpClient } from "@/lib/http-client";
import { useRouter } from "next/navigation";
import { useShoppingCartStore } from "@/contexts/cart-store";

const CartDrawer = () => {
  const [open, setOpen] = React.useState(false);
  // const [cart, setCart] = useState<Item[]>([]);
  const cart = useShoppingCartStore((state) => state.cart);
  const setCart = useShoppingCartStore((state) => state.setCart);
  const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      const { data } = await httpClient.get("/order/cart");

      setCart(data);
    };

    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkout = () => {
    setOpen(false);
    router.push("/checkout");
  };

  return (
    <React.Fragment>
      <Button
        variant="outline"
        className="relative rounded-full w-10 h-10"
        onClick={() => setOpen(true)}
      >
        <ShoppingCart className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5" />
        {cart.length > 0 && (
          <span className="absolute -top-[6px] -right-[12px] w-6 h-6 bg-red-500 rounded-full text-white text-xs flex items-center justify-center border-2 border-background">
            {cart.length}
          </span>
        )}
      </Button>
      {/* <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="relative rounded-full"
      >
        <ShoppingCart className="w-5 h-5" />
        {cart.length > 0 && (
          <span className="absolute top-0 right-0 w-6 h-6 bg-red-500 rounded-full text-white text-xs flex items-center justify-center border-2 border-background">
            {cart.length}
          </span>
        )}
      </Button> */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <div className="h-full p-4 w-[400px] sm:w-[478px] text-black dark:text-white bg-white dark:bg-neutral-900">
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
          {cart.length > 0 ? (
            <section>
              <h1 className="mt-6 font-semibold text-xl sm:text-2xl md:text-3xl">
                Your Cart
              </h1>
              <Summary editable />
              <Button className="w-full my-6" onClick={checkout}>
                Checkout
              </Button>
            </section>
          ) : (
            <div className="text-center mt-12">
              <h2 className="text-lg font-semibold">Your cart is empty</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Start exploring and bring the items in here!
              </p>
            </div>
          )}
        </div>
      </Drawer>
    </React.Fragment>
  );
};

export default CartDrawer;

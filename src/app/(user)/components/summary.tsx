"use client";

import { httpClient } from "@/lib/http-client";
import { Item } from "@/types/cart";
import { calculateCartTotal } from "@/utils/cart";
import React, { useEffect, useState } from "react";
import CartItem from "./cart-item";
import CurrencyFormat from "react-currency-format";

const Summary = ({ editable }: { editable?: boolean }) => {
  const [cart, setCart] = useState<Item[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      const { data } = await httpClient.get("/order/cart");

      setCart(data);
    };

    fetchCart();
  }, []);

  return (
    <section className="w-full mt-12">
      <div className="max-w-3xl mx-auto md:container px-4 lg:px-6">
        <>
          {cart.length > 0 ? (
            <div className="space-y-4">
              {cart.map((item, idx) => (
                <CartItem item={item} key={idx} editable={editable} />
              ))}
            </div>
          ) : (
            <div className="text-center my-12">Cart empty.</div>
          )}
        </>

        <ul className="mt-8 space-y-2">
          <li className="flex justify-between">
            <span>Subtotal</span>
            <CurrencyFormat
              value={calculateCartTotal(cart)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"฿"}
            />
          </li>
          <li className="flex justify-between text-sm">
            <span>Shipping</span>
            <CurrencyFormat
              value={0}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"฿"}
            />
          </li>
          <li className="flex justify-between font-bold">
            <span>Total</span>
            <CurrencyFormat
              value={calculateCartTotal(cart)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"฿"}
            />
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Summary;

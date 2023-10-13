"use client";

import { httpClient } from "@/lib/http-client";
import React, { useEffect, useState } from "react";

type Cart = {
  menu: {
    id: number;
    name: string;
    image: string;
    price: number;
  };
  quantity: number;
};

const Summary = () => {
  const [cart, setCart] = useState<Cart[]>([]);

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
                <div key={idx} className="flex items-center">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                      alt="Menu Image"
                      className="w-[100px] h-[100px] rounded-lg"
                    />
                    <div className="absolute -top-2 -right-2 bg-primary text-white text-sm rounded-full h-5 w-5 flex items-center justify-center">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="ml-4">
                    <span> {item.menu.name}</span>
                  </div>
                  <span className="ml-auto">THB {item.menu.price}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center my-12">Cart empty.</div>
          )}
        </>

        <ul className="mt-8 space-y-2">
          <li className="flex justify-between">
            <span>Subtotal</span>
            <span>0.00</span>
          </li>
          <li className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>0.00</span>
          </li>
          <li className="flex justify-between font-bold">
            <span>Total</span>
            <span>0.00</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Summary;

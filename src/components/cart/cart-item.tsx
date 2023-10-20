import React from "react";
import Image from "next/image";
import { Item } from "@/types/cart";
import { calculateMenuTotal } from "@/utils/cart";
import { removeFromCart } from "@/services/cart";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import CurrencyFormat from "react-currency-format";

type CartMenuProps = {
  item: Item;
  editable?: boolean;
};

const CartItem = ({ item, editable }: CartMenuProps) => {
  const handleRemoveItem = async () => {
    try {
      await removeFromCart(item.menu.id);
      toast.success("Item removed from cart.");
    } catch (error) {
      toast.error("Unable to remove item from cart.");
    }
  };

  return (
    <div className="flex items-center">
      <div className="flex">
        <div className="relative">
          <Image
            src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
            alt="Menu Image"
            width={100}
            height={100}
            className="w-[100px] h-[100px] rounded-lg"
          />
          <div className="absolute -top-2 -right-2 bg-primary text-white text-sm rounded-full h-5 w-5 flex items-center justify-center">
            {item.quantity}
          </div>
        </div>
        <div className="ml-4">
          <h3 className="font-bold"> {item.menu.name}</h3>
          <ul className="ml-6 text-sm list-disc text-gray-600 dark:text-gray-300">
            {item.options.map((o) => (
              <li key={o.id}>
                {o.name} -{" "}
                <CurrencyFormat
                  value={o.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"฿"}
                />
              </li>
            ))}
          </ul>
          <CurrencyFormat
            value={calculateMenuTotal(item)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"฿"}
            className="mt-3 font-bold"
          />
        </div>
      </div>
      {editable && (
        <div className="ml-auto text-sm space-x-3">
          <button
            className="text-destructive hover:underline"
            onClick={handleRemoveItem}
          >
            <X />
          </button>
        </div>
      )}
    </div>
  );
};

export default CartItem;

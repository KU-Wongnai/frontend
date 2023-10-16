"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Menu } from "@/types/restaurant";

const MenuCard: React.FC<Menu> = ({
  id,
  image,
  name,
  description,
  category,
  price,
}) => {
  const [quantity, setQuantity] = React.useState(1);
  const imageUrlUse =
    image ||
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80";

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div className="rounded-lg overflow-hidden shadow-md w-80 sm:w-56 border">
            <div className="h-40 relative">
              <Image
                src={imageUrlUse}
                alt={name}
                layout="fill"
                objectFit="cover"
                className="object-cover"
              />
            </div>
            <div className="p-4 flex flex-col text-start">
              <p className="text-gray-600 text-sm sm:text-base">{category}</p>
              <h2 className="font-bold text-lg sm:text-xl mb-2">{name}</h2>
              <span className="text-gray-500 text-sm sm:text-base">
                {price} $
              </span>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <div className="w-auto">
              <DialogTitle>
                <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors">
                  {name}
                </h1>
              </DialogTitle>
              <DialogDescription>
                {/* Description (which will be MenuCardDetail) */}
                <div className="flex flex-col gap-4">
                  <div className="w-full flex justify-center">
                    <AspectRatio ratio={1 / 1}>
                      <Image
                        src={imageUrlUse}
                        alt="Image"
                        fill
                        className="rounded-md object-cover text-center"
                      />
                    </AspectRatio>
                  </div>
                  <div className="flex justify-between text-xl font-semibold tracking-tight">
                    <p>{category}</p>
                    <p>{price} $</p>
                  </div>
                  <p>{description}</p>
                  <div className="flex items-center gap-4">
                    Choose the quantity you want.
                    <Button
                      onClick={() =>
                        setQuantity((prev) => Math.max(prev - 1, 1))
                      }
                      className="py-2 px-5 bg-gray-800 hover:bg-gray-900 text-white w-12"
                    >
                      -
                    </Button>
                    <span>{quantity}</span>
                    <Button
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="py-2 px-5 bg-gray-800 hover:bg-gray-900 text-white w-12"
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    onClick={() => {
                      /* Logic to add to cart */
                    }}
                    className="text-white mt-4"
                  >
                    Add to Cart
                  </Button>
                </div>
              </DialogDescription>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MenuCard;

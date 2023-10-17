"use client";

import React, { useEffect } from "react";
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
import { Menu, MenuOption } from "@/types/restaurant";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import form from "@/app/(user)/checkout/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Drawer } from "vaul";
import toast from "react-hot-toast";
import { Menu } from "lucide-react";

type GroupedOption = {
  [key: string]: MenuOption[];
};

const MenuCard: React.FC<Menu> = ({
  id,
  image,
  name,
  description,
  category,
  price,
  menuOptions,
}) => {
  const [quantity, setQuantity] = React.useState(1);
  const [total, setTotal] = React.useState(price);

  const optionNames = menuOptions.map((option) => option.name);

  const groupedData = menuOptions.reduce(
    (result: GroupedOption, item: MenuOption) => {
      const { category, name, price } = item;
      result[category] = result[category] || [];
      result[category].push({ name, price, id: item.id, category: category });
      return result;
    },
    {}
  );

  const menuSchema = z.object(
    Object.keys(groupedData).reduce(
      (result, key) => ({
        ...result,
        [key]: z.number(),
      }),
      {}
    )
  );

  type MenuForm = z.infer<typeof menuSchema>;

  const form = useForm({
    defaultValues: Object.keys(groupedData).reduce(
      (result, key) => ({
        ...result,
        [key]: undefined,
      }),
      {}
    ) as any,
    resolver: zodResolver(menuSchema),
  });

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      console.log(value, name, type);
      const total = Object.values(value).reduce((acc: number, value) => {
        const option = findOption(value as number);
        if (!option) return acc;
        return acc + option.price;
      }, price);
      setTotal(total);
    });
    return () => subscription.unsubscribe();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch]);

  const onSubmit = async (data: MenuForm) => {
    console.log("Form submitted");
    console.log(Object.values(data));
  };

  const findOption = (id: number) => {
    return menuOptions.find((option) => option.id === id);
  };

  const imageUrlUse =
    image ||
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80";

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <button className="rounded-lg overflow-hidden shadow-md w-80 sm:w-56 border">
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
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="z-[80] fixed inset-0 bg-black/40" />
        <Drawer.Content className="z-[90] bg-white flex flex-col fixed bottom-0 left-0 right-0 max-h-[96%] rounded-t-[10px]">
          <div className="w-full max-w-md mx-auto overflow-auto p-6">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
            <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors">
              {name}
            </h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
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
                    <p>{price} THB</p>
                  </div>
                  <p>{description}</p>

                  <section className="space-y-4">
                    <Accordion
                      defaultValue={Object.keys(groupedData)}
                      type="multiple"
                      // collapsible
                    >
                      {Object.keys(groupedData).map((group) => (
                        <AccordionItem value={group} key={group}>
                          <AccordionTrigger>
                            <div className="text-left">
                              <p>{group}</p>
                              <p className="text-xs text-primary">
                                {findOption(form.getValues(group))?.name}
                              </p>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <FormField
                              control={form.control}
                              name={group}
                              render={({ field }) => (
                                <FormItem className="space-y-3">
                                  <FormControl>
                                    <RadioGroup
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                      className="flex flex-col space-y-1"
                                    >
                                      {groupedData[group].map((option) => (
                                        <FormItem
                                          key={option.id}
                                          className="flex items-center space-x-3 space-y-0"
                                        >
                                          <FormControl>
                                            <RadioGroupItem value={option.id} />
                                          </FormControl>
                                          <FormLabel className="w-full font-normal flex justify-between gap-2">
                                            <span>{option.name}</span>
                                            <span>+{option.price} THB</span>
                                          </FormLabel>
                                        </FormItem>
                                      ))}
                                    </RadioGroup>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </section>

                  <div className="flex items-center gap-4">
                    <span className="text-sm">Select the quantity</span>
                    <Button
                      type="button"
                      onClick={() =>
                        setQuantity((prev) => Math.max(prev - 1, 1))
                      }
                      className="ml-auto py-2 px-5 bg-gray-800 hover:bg-gray-900 text-white w-12"
                    >
                      -
                    </Button>
                    <span>{quantity}</span>
                    <Button
                      type="button"
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="py-2 px-5 bg-gray-800 hover:bg-gray-900 text-white w-12"
                    >
                      +
                    </Button>
                  </div>
                  <Button type="submit" className="text-white mt-4">
                    Add to Cart {total * quantity} THB
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default MenuCard;

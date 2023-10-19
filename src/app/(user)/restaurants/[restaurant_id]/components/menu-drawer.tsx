"use client";

import React, { use, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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
import { addToCart } from "@/services/cart";
import { Item } from "@/types/cart";
import CurrencyFormat from "react-currency-format";

type GroupedOption = {
  [key: string]: MenuOption[];
};

type MenuDrawerProps = {
  menu: Menu;
  defaultValues?: Item;
  trigger: React.ReactNode;
};

const MenuDrawer: React.FC<MenuDrawerProps> = ({
  menu,
  trigger,
  defaultValues,
}) => {
  const [quantity, setQuantity] = React.useState(1);
  const [total, setTotal] = React.useState(menu.price);

  const groupedData = menu.menuOptions.reduce(
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
    defaultValues: defaultValues
      ? defaultValues.options.reduce(
          (obj, option) => ({ ...obj, [option.category]: option.id }),
          {}
        )
      : (Object.keys(groupedData).reduce(
          (result, key) => ({
            ...result,
            [key]: undefined,
          }),
          {}
        ) as any),
    resolver: zodResolver(menuSchema),
  });

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      console.log(value, name, type);
      const total = Object.values(value).reduce((acc: number, value) => {
        const option = findOption(value as number);
        if (!option) return acc;
        return acc + option.price;
      }, menu.price);
      setTotal(total);
    });
    return () => subscription.unsubscribe();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch]);

  const onSubmit = async (data: MenuForm) => {
    console.log("Form submitted");
    console.log(Object.values(data));

    await addToCart({
      menuId: menu.id,
      quantity,
      optionIds: Object.values(data),
    });

    toast.success("Item added to cart.");
  };

  const findOption = (id: number) => {
    return menu.menuOptions.find((option) => option.id === id);
  };

  console.log("I'm a drawer");

  const imageUrlUse =
    menu.image ||
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80";

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <button>{trigger}</button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="z-[80] fixed inset-0 bg-black/40" />
        <Drawer.Content className="z-[90] bg-white flex flex-col fixed bottom-0 left-0 right-0 max-h-[96%] rounded-t-[10px]">
          <div className="w-full max-w-md mx-auto overflow-auto p-6">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
            <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors">
              {menu.name}
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
                    <p>{menu.category}</p>
                    <CurrencyFormat
                      value={menu.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"฿"}
                    />
                  </div>
                  <p>{menu.description}</p>

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

                                            <span>
                                              +
                                              <CurrencyFormat
                                                value={option.price}
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                prefix={"฿"}
                                              />
                                            </span>
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
                    Add to Cart
                    <CurrencyFormat
                      value={total * quantity}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"฿"}
                      className="ml-2"
                    />
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

export default MenuDrawer;

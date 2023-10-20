"use client";

import React from "react";
import { Menu } from "@/types/restaurant";
import { Drawer } from "vaul";
import { Item } from "@/types/cart";
import MenuDetail from "./menu-detail";

type MenuDrawerProps = {
  menu: Menu;
  defaultValues?: Item;
  trigger: React.ReactNode;
};

const MenuDrawer: React.FC<MenuDrawerProps> = ({
  menu,
  defaultValues,
  trigger,
}) => {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <button>{trigger}</button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="z-[80] fixed inset-0 bg-black/40" />
        <Drawer.Content className="z-[90] text-black dark:text-white bg-white dark:bg-neutral-900 flex flex-col fixed bottom-0 left-0 right-0 max-h-[96%] rounded-t-[10px]">
          <MenuDetail menu={menu} />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default MenuDrawer;

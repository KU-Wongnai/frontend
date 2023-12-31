import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import * as React from "react";
import { Delivery, DeliveryStatus, Order } from "@/types/order";
import { cn } from "@/lib/utils";
import Link from "next/link";
import CurrencyFormat from "react-currency-format";

export const columns: ColumnDef<Delivery>[] = [
  {
    accessorKey: "order",
    header: "Order #",
    cell: ({ row }) => {
      const order: Order = row.getValue("order");
      return <div>{order.id}</div>;
    },
  },
  {
    accessorKey: "deliveryAddress",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Location
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("deliveryAddress")}</div>
    ),
  },
  {
    accessorKey: "order",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const order: Order = row.getValue("order");

      console.log(row);

      const total =
        order?.orderItems.reduce((acc, curr) => ({
          ...acc,
          price: acc.price + curr.price * curr.quantity,
        })) || 0;

      return (
        <CurrencyFormat
          value={total.price}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"฿"}
          className="text-right font-medium"
        />
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-right">Status</div>,
    cell: ({ row }) => {
      const status: DeliveryStatus = row.getValue("status");

      const statusColor = {
        PENDING:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        ASSIGNED:
          "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        DELIVERED:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        CANCELLED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      }[status];

      return (
        <div className="w-full flex justify-end">
          <span
            className={cn(
              "text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full",
              statusColor
            )}
          >
            {status}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    enableHiding: false,
    header: () => null,
    cell: ({ row }) => {
      return (
        <Button asChild>
          <Link href={`/rider/pickup/${row.getValue("id")}`}>View Details</Link>
        </Button>
      );
    },
  },
];

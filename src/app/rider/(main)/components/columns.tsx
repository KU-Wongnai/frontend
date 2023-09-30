import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import * as React from "react";
import { Order } from "@/app/rider/(main)/page";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "location",
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
      <div className="lowercase">{row.getValue("location")}</div>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const orderDetail = row.original;

      return (
        <Dialog>
          <DialogTrigger>
            <div className="font-semibold py-1 px-2 border text-center flex align-middle bg-primary text-white rounded-sm">
              View order detail
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {" "}
                <div className="mb-4">
                  <h2 className="text-lg font-bold">Order Details</h2>
                </div>
              </DialogTitle>
              <DialogDescription>
                <div className="p-2 sm:p-4 bg-card rounded-sm container">
                  <div className="mb-2 sm:mb-4">
                    <div className="flex justify-between mb-1 sm:mb-2">
                      <div className="text-sm sm:text-base font-medium">
                        Name
                      </div>
                      <div className="text-sm sm:text-base font-medium">
                        {orderDetail.name}
                      </div>
                    </div>
                    <div className="flex justify-between mb-1 sm:mb-2">
                      <div className="text-sm sm:text-base font-medium">
                        Total
                      </div>
                      <div className="text-sm sm:text-base font-medium">
                        ${orderDetail.amount}
                      </div>
                    </div>
                    <div className="flex justify-between mb-1 sm:mb-2">
                      <div className="text-sm sm:text-base font-medium">
                        Location
                      </div>
                      <div className="text-sm sm:text-base font-medium">
                        {orderDetail.location}
                      </div>
                    </div>
                  </div>
                  <div className="mb-2 sm:mb-4">
                    <h3 className="text-sm sm:text-base font-medium mb-1 sm:mb-2 text-left">
                      Order List
                    </h3>
                    <table className="w-full text-left border-collapse text-sm sm:text-base">
                      <thead>
                        <tr>
                          <th className="py-1 sm:py-2 px-2 sm:px-4 border-b border-gray-200 bg-muted">
                            Restaurant
                          </th>
                          <th className="py-1 sm:py-2 px-2 sm:px-4 border-b border-gray-200 bg-muted">
                            Menu Item
                          </th>
                          <th className="py-1 sm:py-2 px-2 sm:px-4 border-b border-gray-200 bg-muted">
                            Quantity
                          </th>
                          <th className="py-1 sm:py-2 px-2 sm:px-4 border-b border-gray-200 bg-muted">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderDetail.order &&
                          orderDetail.order.map((orderList) => (
                            <tr key={orderList.id}>
                              <td className="py-1 sm:py-2 px-2 sm:px-4 border-b border-gray-200">
                                {orderList.restaurant}
                              </td>
                              <td className="py-1 sm:py-2 px-2 sm:px-4 border-b border-gray-200">
                                {orderList.menu}
                              </td>
                              <td className="py-1 sm:py-2 px-2 sm:px-4 border-b border-gray-200">
                                x{orderList.quantity}
                              </td>
                              <td className="py-1 sm:py-2 px-2 sm:px-4 border-b border-gray-200">
                                ${orderList.amount}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button className="h-8 w-45 p-2 text-sm sm:text-base text-white">
                    Accept
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
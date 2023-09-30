"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { columns } from "@/app/rider/(main)/components/columns";

const data: Order[] = [
  {
    id: "65181d45b97dc934c99978d7",
    name: "Bond Park",
    location: "26 Waldorf Court, Succasunna, Texas",
    amount: 268,
    order: [
      {
        id: "m5gr84i9",
        amount: 316,
        menu: "ยำหมูยอไข่แดง",
        restaurant: "ร้านอาหาร 1",
        quantity: 1,
      },
      {
        id: "3u1reuv4",
        amount: 242,
        menu: "ข้าวผัดกุ้ง",
        restaurant: "ร้านอาหาร 2",
        quantity: 1,
      },
      {
        id: "derv1ws0",
        amount: 837,
        menu: "ข้าวผัดหมู",
        restaurant: "ร้านอาหาร 3",
        quantity: 1,
      },
      {
        id: "5kma53ae",
        amount: 874,
        menu: "หมูกระทะ",
        restaurant: "ร้านอาหาร 4",
        quantity: 1,
      },
      {
        id: "bhqecj4p",
        amount: 721,
        menu: "ห่อหมก",
        restaurant: "ร้านอาหาร 5",
        quantity: 1,
      },
    ],
  },
  {
    id: "65181d4534073622a45d1493",
    name: "Eve Robbins",
    location: "47 Corbin Place, Freeburn, Ohio",
    amount: 457,
    order: [
      {
        id: "m5gr84i9",
        amount: 316,
        menu: "ยำหมูยอไข่แดง",
        restaurant: "ร้านอาหาร 1",
        quantity: 1,
      },
      {
        id: "3u1reuv4",
        amount: 242,
        menu: "ข้าวผัดกุ้ง",
        restaurant: "ร้านอาหาร 2",
        quantity: 1,
      },
      {
        id: "derv1ws0",
        amount: 837,
        menu: "ข้าวผัดหมู",
        restaurant: "ร้านอาหาร 3",
        quantity: 1,
      },
      {
        id: "5kma53ae",
        amount: 874,
        menu: "หมูกระทะ",
        restaurant: "ร้านอาหาร 4",
        quantity: 1,
      },
      {
        id: "bhqecj4p",
        amount: 721,
        menu: "ห่อหมก",
        restaurant: "ร้านอาหาร 5",
        quantity: 1,
      },
    ],
  },
  {
    id: "65181d455e05b803bd75cbe5",
    name: "Leah Mcintosh",
    location: "66 Bowne Street, Enlow, Michigan",
    amount: 212,
    order: [
      {
        id: "m5gr84i9",
        amount: 316,
        menu: "ยำหมูยอไข่แดง",
        restaurant: "ร้านอาหาร 1",
        quantity: 1,
      },
      {
        id: "3u1reuv4",
        amount: 242,
        menu: "ข้าวผัดกุ้ง",
        restaurant: "ร้านอาหาร 2",
        quantity: 1,
      },
      {
        id: "derv1ws0",
        amount: 837,
        menu: "ข้าวผัดหมู",
        restaurant: "ร้านอาหาร 3",
        quantity: 1,
      },
      {
        id: "5kma53ae",
        amount: 874,
        menu: "หมูกระทะ",
        restaurant: "ร้านอาหาร 4",
        quantity: 1,
      },
      {
        id: "bhqecj4p",
        amount: 721,
        menu: "ห่อหมก",
        restaurant: "ร้านอาหาร 5",
        quantity: 1,
      },
    ],
  },
  {
    id: "65181d45f70de6896534cd71",
    name: "Angeline Robinson",
    location: "20 Frank Court, Nescatunga, Arkansas",
    amount: 980,
    order: [
      {
        id: "m5gr84i9",
        amount: 316,
        menu: "ยำหมูยอไข่แดง",
        restaurant: "ร้านอาหาร 1",
        quantity: 1,
      },
      {
        id: "3u1reuv4",
        amount: 242,
        menu: "ข้าวผัดกุ้ง",
        restaurant: "ร้านอาหาร 2",
        quantity: 1,
      },
      {
        id: "derv1ws0",
        amount: 837,
        menu: "ข้าวผัดหมู",
        restaurant: "ร้านอาหาร 3",
        quantity: 1,
      },
      {
        id: "5kma53ae",
        amount: 874,
        menu: "หมูกระทะ",
        restaurant: "ร้านอาหาร 4",
        quantity: 1,
      },
      {
        id: "bhqecj4p",
        amount: 721,
        menu: "ห่อหมก",
        restaurant: "ร้านอาหาร 5",
        quantity: 1,
      },
    ],
  },
  {
    id: "65181d4581fb068e3cb78fc9",
    name: "Rosie Mason",
    location: "84 Benson Avenue, Chilton, Iowa",
    amount: 615,
    order: [
      {
        id: "m5gr84i9",
        amount: 316,
        menu: "ยำหมูยอไข่แดง",
        restaurant: "ร้านอาหาร 1",
        quantity: 1,
      },
      {
        id: "3u1reuv4",
        amount: 242,
        menu: "ข้าวผัดกุ้ง",
        restaurant: "ร้านอาหาร 2",
        quantity: 1,
      },
      {
        id: "derv1ws0",
        amount: 837,
        menu: "ข้าวผัดหมู",
        restaurant: "ร้านอาหาร 3",
        quantity: 1,
      },
      {
        id: "5kma53ae",
        amount: 874,
        menu: "หมูกระทะ",
        restaurant: "ร้านอาหาร 4",
        quantity: 1,
      },
      {
        id: "bhqecj4p",
        amount: 721,
        menu: "ห่อหมก",
        restaurant: "ร้านอาหาร 5",
        quantity: 1,
      },
    ],
  },
  {
    id: "65181d45dafa7f1b714b7b61",
    name: "Louella Mooney",
    location: "39 Conway Street, Corriganville, Kansas",
    amount: 592,
    order: [
      {
        id: "m5gr84i9",
        amount: 316,
        menu: "ยำหมูยอไข่แดง",
        restaurant: "ร้านอาหาร 1",
        quantity: 1,
      },
      {
        id: "3u1reuv4",
        amount: 242,
        menu: "ข้าวผัดกุ้ง",
        restaurant: "ร้านอาหาร 2",
        quantity: 1,
      },
      {
        id: "derv1ws0",
        amount: 837,
        menu: "ข้าวผัดหมู",
        restaurant: "ร้านอาหาร 3",
        quantity: 1,
      },
      {
        id: "5kma53ae",
        amount: 874,
        menu: "หมูกระทะ",
        restaurant: "ร้านอาหาร 4",
        quantity: 1,
      },
      {
        id: "bhqecj4p",
        amount: 721,
        menu: "ห่อหมก",
        restaurant: "ร้านอาหาร 5",
        quantity: 1,
      },
    ],
  },
  {
    id: "65181d45e3103df6057b7711",
    name: "Schmidt Paul",
    location: "88 Middagh Street, Linwood, Indiana",
    amount: 393,
    order: [
      {
        id: "m5gr84i9",
        amount: 316,
        menu: "ยำหมูยอไข่แดง",
        restaurant: "ร้านอาหาร 1",
        quantity: 1,
      },
      {
        id: "3u1reuv4",
        amount: 242,
        menu: "ข้าวผัดกุ้ง",
        restaurant: "ร้านอาหาร 2",
        quantity: 1,
      },
      {
        id: "derv1ws0",
        amount: 837,
        menu: "ข้าวผัดหมู",
        restaurant: "ร้านอาหาร 3",
        quantity: 1,
      },
      {
        id: "5kma53ae",
        amount: 874,
        menu: "หมูกระทะ",
        restaurant: "ร้านอาหาร 4",
        quantity: 1,
      },
      {
        id: "bhqecj4p",
        amount: 721,
        menu: "ห่อหมก",
        restaurant: "ร้านอาหาร 5",
        quantity: 1,
      },
    ],
  },
  {
    id: "65181d45448df08e4c9c5109",
    name: "Gates Morrison",
    location: "49 Herzl Street, Disautel, Minnesota",
    amount: 833,
    order: [
      {
        id: "m5gr84i9",
        amount: 316,
        menu: "ยำหมูยอไข่แดง",
        restaurant: "ร้านอาหาร 1",
        quantity: 1,
      },
      {
        id: "3u1reuv4",
        amount: 242,
        menu: "ข้าวผัดกุ้ง",
        restaurant: "ร้านอาหาร 2",
        quantity: 1,
      },
      {
        id: "derv1ws0",
        amount: 837,
        menu: "ข้าวผัดหมู",
        restaurant: "ร้านอาหาร 3",
        quantity: 1,
      },
      {
        id: "5kma53ae",
        amount: 874,
        menu: "หมูกระทะ",
        restaurant: "ร้านอาหาร 4",
        quantity: 1,
      },
      {
        id: "bhqecj4p",
        amount: 721,
        menu: "ห่อหมก",
        restaurant: "ร้านอาหาร 5",
        quantity: 1,
      },
    ],
  },
  {
    id: "65181d45f604f0b2b2e00aa1",
    name: "Roy Dunn",
    location: "80 Nixon Court, Lewis, Utah",
    amount: 959,
    order: [
      {
        id: "m5gr84i9",
        amount: 316,
        menu: "ยำหมูยอไข่แดง",
        restaurant: "ร้านอาหาร 1",
        quantity: 1,
      },
      {
        id: "3u1reuv4",
        amount: 242,
        menu: "ข้าวผัดกุ้ง",
        restaurant: "ร้านอาหาร 2",
        quantity: 1,
      },
      {
        id: "derv1ws0",
        amount: 837,
        menu: "ข้าวผัดหมู",
        restaurant: "ร้านอาหาร 3",
        quantity: 1,
      },
      {
        id: "5kma53ae",
        amount: 874,
        menu: "หมูกระทะ",
        restaurant: "ร้านอาหาร 4",
        quantity: 1,
      },
      {
        id: "bhqecj4p",
        amount: 721,
        menu: "ห่อหมก",
        restaurant: "ร้านอาหาร 5",
        quantity: 1,
      },
    ],
  },
  {
    id: "65181d45a9235743e8bc6b11",
    name: "Natalie Becker",
    location: "76 Mill Lane, Stewartville, Louisiana",
    amount: 742,
    order: [
      {
        id: "m5gr84i9",
        amount: 316,
        menu: "ยำหมูยอไข่แดง",
        restaurant: "ร้านอาหาร 1",
        quantity: 1,
      },
      {
        id: "3u1reuv4",
        amount: 242,
        menu: "ข้าวผัดกุ้ง",
        restaurant: "ร้านอาหาร 2",
        quantity: 1,
      },
      {
        id: "derv1ws0",
        amount: 837,
        menu: "ข้าวผัดหมู",
        restaurant: "ร้านอาหาร 3",
        quantity: 1,
      },
      {
        id: "5kma53ae",
        amount: 874,
        menu: "หมูกระทะ",
        restaurant: "ร้านอาหาร 4",
        quantity: 1,
      },
      {
        id: "bhqecj4p",
        amount: 721,
        menu: "ห่อหมก",
        restaurant: "ร้านอาหาร 5",
        quantity: 1,
      },
    ],
  },
];

export type Order = {
  id: string;
  amount: number;
  name: string;
  location: string;
  order?: {
    id: string;
    amount: number;
    restaurant: string;
    menu: string;
    quantity: number;
  }[];
};

export default function Rider() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="container mx-auto py-3 px-2 sm:px-4 md:px-6 lg:px-8">
      <h1 className="pb-2 mb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-primary">
        Choose order delivery
      </h1>
      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

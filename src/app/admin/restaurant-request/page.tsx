"use client";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  CheckCircle2,
  ChevronDown,
  DeleteIcon,
  MoreHorizontal,
  Trash2,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { Thasadith } from "next/font/google";

export type ColumnType = {
  id: string;
  name: string;
  location: string;
  openingHours: string;
  phone: string;
};

type RestaurantRequestListsProps = {
  data: ColumnType[];
};

export const columns: ColumnDef<ColumnType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "id",
    header: () => <div>ID</div>,
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "phone",
    header: () => <div>Phone</div>,
    cell: ({ row }) => <div>{row.getValue("phone")}</div>,
  },
  {
    id: "select",
    cell: ({ row }) => (
      <div className="flex ">
        <button className="hover:shadow-md hover:bg-gray-200 p-3 rounded-full">
          <CheckCircle2 className="text-green-600 " />
          <span className="text-green-600">Accept</span>
        </button>
        <button className="hover:shadow-md hover:bg-gray-200 p-3 rounded-full">
          <XCircle className="text-red-500 " />
          <span className="text-red-500">Reject</span>
        </button>
      </div>
    ),
  },
];

export function RestaurantRequestsTable({ data }: RestaurantRequestListsProps) {
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
    <div className="w-full">
      <div className="md:flex justify-between gap-3 items-center pb-4">
        <h2 className="text-2xl font-bold pb-2 md:py-0">Restaurant Requests</h2>
        <Input
          placeholder="search restaurant"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
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
    </div>
  );
}

const RestaurantRequests: React.FC = () => {
  const data: ColumnType[] = [
    {
      id: "1",
      name: "shushi",
      location: "new Bar",
      openingHours: "10.00-20.00",
      phone: "0812345678",
    },
    {
      id: "2",
      name: "pizza",
      location: "new Bar",
      openingHours: "10.00-20.00",
      phone: "0812223345",
    },
  ];
  return (
    <div>
      WIP
    </div>
  );
};

export default RestaurantRequests;

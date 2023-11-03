"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import * as React from "react";
import Image from "next/image";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowUpDown,
  FileText,
  MoreHorizontal,
  StarIcon,
  Trash2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { destroyUser, getUsers } from "@/services/user";
import { User, UserProfile } from "@/types/user";
import { Label } from "@/components/ui/label";
import format from "date-fns/format";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";
import { deleteRestaurant, getRestaurants } from "@/services/restaurant";
import { Restaurant } from "@/types/restaurant";
import { Box, Rating } from "@mui/material";
import { useRouter } from "next/router";

type RestaurantListsProps = {
  data: Restaurant[];
};

export const columns: ColumnDef<Restaurant>[] = [
  {
    id: "image",
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage
            src={row.original?.image ?? ""}
            alt={row.original.name}
          />
          <AvatarFallback>{row.original.name[0]}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="ml-4">{row.original.id}</div>,
  },
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
    cell: ({ row }) => <div className="ml-4">{row.original.name}</div>,
  },
  {
    accessorKey: "rating",
    header: () => <div>Rating</div>,
    cell: ({ row }) => (
      <Box
        sx={{
          width: 200,
          display: "flex",
          alignItems: "center",
        }}
      >
        {" "}
        <Box sx={{ mr: 2 }}>{row.original.rating}</Box>
        <Rating
          name="read-only"
          value={row.original.rating}
          size="small"
          readOnly
          emptyIcon={<StarIcon style={{ opacity: 0 }} fontSize="inherit" />}
        />
      </Box>
    ),
  },
  {
    id: "dropdown",
    cell: ({ row }) => {
      const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
      const handleCancelDelete = () => {
        setIsDeleteDialogOpen(false);
      };

      const handleConfirmDelete = async () => {
        try {
          await deleteRestaurant(row.original.id);
          toast.success("Restaurant deleted");
          setIsDeleteDialogOpen(false);
        } catch (error) {
          console.log(error);
          toast.error("Restaurant delete failed");
        }
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-2">
            <DropdownMenuItem
              onClick={() => setIsViewDialogOpen(true)}
              className="py-3"
            >
              <button className="flex items-center w-full">
                <FileText className="mr-2 h-4 w-4" />
                <span>Veiw Details</span>
              </button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setIsDeleteDialogOpen(true)}
              className="py-3"
            >
              <button className="flex items-center w-full text-red-500">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete Restaurant</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>

          {/* view profile dialog */}
          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Restaurant Details</DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="profile" className="max-w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="info">Basic Information</TabsTrigger>
                  <TabsTrigger value="owner">Owner Information</TabsTrigger>
                </TabsList>

                <TabsContent value="info">
                  <Card>
                    <CardContent className="space-y-2 mt-6">
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-sm font-bold">Name </div>
                        <div className="text-sm col-span-2">
                          {row.original.name}
                        </div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-sm font-bold">Description </div>
                        <div className="text-sm col-span-2">
                          {row.original?.description ?? "-"}
                        </div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-sm font-bold">Food Type</div>
                        <div className="text-sm col-span-2">
                          {row.original?.foodType ?? "-"}
                        </div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-sm font-bold">Location</div>
                        <div className="text-sm col-span-2">
                          {row?.original?.location ?? "-"}
                        </div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-sm font-bold">Contact</div>
                        <div className="text-sm cs2">
                          {row?.original?.contactInfo ?? "-"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="owner">
                  <Card>
                    <CardContent className="space-y-2 mt-4 ">
                      WIP ????
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>

          {/* delete dialog */}
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Delete Restaurant</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this restaurant?
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Your existing profile fields */}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleCancelDelete}>
                  Cancel
                </Button>
                <Button onClick={handleConfirmDelete}>Confirm Delete</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DropdownMenu>
      );
    },
  },
];

export function RestaurantTable({ data }: RestaurantListsProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });
  return (
    <div className="w-full">
      <div className="sm:flex justify-between gap-3 items-center pb-4">
        <h2 className="text-2xl font-bold pb-2 sm:py-0">
          Restaurnt Management
        </h2>
        <Input
          placeholder="search all columns"
          value={(globalFilter as string) ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-sm border overflow-auto max-h-[33rem] mt-2">
        <table className="w-full caption-bottom text-sm">
          <thead className=" sticky top-0 bg-card z-10">
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
          </thead>
          <TableBody className="overflow-auto h-10">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="min-h-min min-w-min ">
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
        </table>
      </div>
    </div>
  );
}

const RestaurantLists: React.FC = () => {
  const [restaurants, setRestaurants] = React.useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const allRestaurants = await getRestaurants();
      setRestaurants(allRestaurants);
    };
    fetchRestaurants();
  }, []);

  const isEmpty = restaurants.length === 0;
  return (
    <div>
      <RestaurantTable data={restaurants} />
    </div>
  );
};

export default RestaurantLists;

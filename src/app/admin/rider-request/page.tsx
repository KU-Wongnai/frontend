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
import { ArrowUpDown, Check, Search, StarIcon, X } from "lucide-react";
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
import { addRoleToUser, destroyUser, getUsers } from "@/services/user";
import { User, UserProfile } from "@/types/user";
import { Label } from "@/components/ui/label";
import format from "date-fns/format";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";
import { deleteRestaurant, getRestaurants } from "@/services/restaurant";
import { Box, Rating } from "@mui/material";
import { useRouter } from "next/router";
import { riderStatus } from "@/services/rider";

type RiderListsProps = {
  data: User[];
};

export const columns: ColumnDef<User>[] = [
  {
    id: "image",
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage
            src={row.original?.rider_profile.avatar ?? ""}
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
    accessorKey: "created_at",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Request
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    cell: ({ row }) => {
      const requestTime = new Date(row.original.rider_profile.created_at);
      return <div>{requestTime.toLocaleString()}</div>;
    },
  },
  {
    id: "button",
    cell: ({ row }) => {
      const [isVerifyDialogOpen, setVerifyDialogOpen] = useState(false);
      const [isRejectDialogOpen, setRejectDialogOpen] = useState(false);
      const handleCancelReject = () => {
        setRejectDialogOpen(false);
      };

      const handleConfirmReject = async () => {
        try {
          await riderStatus(row.original.id, { status: "rejected" });
          toast.success("Reject successfully");
          setVerifyDialogOpen(false);
        } catch (error) {
          console.log(error);
          toast.error("Reject failed");
        }
      };

      const handleCancelVerify = () => {
        setVerifyDialogOpen(false);
      };

      const handleConfirmVerify = async () => {
        try {
          await addRoleToUser({
            user_id: row.original.id,
            role_name: "rider",
          });
          await riderStatus(row.original.id, { status: "verified" });
          toast.success("Verify successfully");
          setVerifyDialogOpen(false);
        } catch (error) {
          console.log(error);
          toast.error("Verify failed");
        }
      };

      return (
        <div className="gap-3 flex flex-row">
          <div>
            <Button variant="outline">
              <Search className="mr-1 -ml-2" />
              <span>View Details</span>
            </Button>
          </div>
          <div>
            <Button
              onClick={() => setRejectDialogOpen(true)}
              className="bg-red-500 text-inherit hover:bg-red-500 hover:bg-opacity-90"
            >
              <X className="mr-1 -ml-2" />
              <span>Reject</span>
            </Button>
          </div>
          <div>
            <Button
              onClick={() => setVerifyDialogOpen(true)}
              className="text-inherit"
            >
              <Check className="mr-1 -ml-2" />
              <span>Verify</span>
            </Button>
          </div>
          {/* reject dialog */}
          <Dialog open={isRejectDialogOpen} onOpenChange={setRejectDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Delete Account</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this account?
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Your existing profile fields */}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleCancelReject}>
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmReject}
                  className="bg-red-500 text-inherit hover:bg-red-500 hover:bg-opacity-90"
                >
                  Confirm Reject
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* verify dialog */}
          <Dialog open={isVerifyDialogOpen} onOpenChange={setVerifyDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Delete Account</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this account?
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Your existing profile fields */}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleCancelVerify}>
                  Cancel
                </Button>
                <Button onClick={handleConfirmVerify}>Confirm Accept</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];

export function RiderRequestTable({ data }: RiderListsProps) {
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
        <h2 className="text-2xl font-bold pb-2 sm:py-0">Rider Request</h2>
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

const isRiderRequest = (user: User) => {
  return (
    !user.roles.some((role) => role.name === "rider") &&
    user.rider_profile?.status === "pending"
  );
};

const RiderLists: React.FC = () => {
  const [users, setUsers] = React.useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await getUsers();
      setUsers(allUsers);
    };
    fetchUsers();
  }, []);

  const isEmpty = users.length === 0;
  return (
    <div>
      <RiderRequestTable data={users.filter(isRiderRequest)} />
    </div>
  );
};

export default RiderLists;

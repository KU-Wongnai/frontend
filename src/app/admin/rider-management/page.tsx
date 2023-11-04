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
import { ArrowUpDown, FileText, MoreHorizontal, Trash2 } from "lucide-react";
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
import { formatPhoneNumber } from "react-phone-number-input";
import banks from "@/data/banks.json";

type RiderListsProps = {
  data: User[];
};

function getRole(user: User) {
  if (user.roles.some((role) => role.name === "admin")) {
    return "Admin";
  } else if (user.roles.some((role) => role.name === "rider")) {
    return "Rider";
  } else return "User";
}

export function formatId(Id: string) {
  return `${Id.substring(0, 1)} ${Id.substring(1, 5)} ${Id.substring(
    5,
    10
  )} ${Id.substring(10, 12)} ${Id.substring(12, 13)}`;
  return Id;
}

export const columns: ColumnDef<User>[] = [
  {
    id: "image",
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage
            src={row.original?.user_profile?.avatar}
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
    accessorKey: "email",
    header: () => <div>Email</div>,
    cell: ({ row }) => <div>{row.original.email}</div>,
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
        // Perform the delete action here
        try {
          await destroyUser(row.original.id);
          toast.success("Account deleted");
          setIsDeleteDialogOpen(false);
        } catch (error) {
          console.log(error);
          toast.error("Account delete failed");
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
                <span>View Profile</span>
              </button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setIsDeleteDialogOpen(true)}
              className="py-3"
            >
              <button className="flex items-center w-full text-red-500">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete Account</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>

          {/* view profile dialog */}
          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Profile</DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="profile" className="max-w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="Rider">Rider Profile</TabsTrigger>
                  <TabsTrigger value="Bank Account">Bank Account</TabsTrigger>
                </TabsList>

                <TabsContent value="Rider">
                  <Card>
                    <CardContent className="space-y-2 mt-6">
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-sm font-bold">ID </div>
                        <div className="text-sm col-span-2">
                          {row.original.id}
                        </div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-sm font-bold">Name </div>
                        <div className="text-sm col-span-2">
                          {row.original.name}
                        </div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-sm font-bold">Email </div>
                        <div className="text-sm col-span-2">
                          {row.original.email}
                        </div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-sm font-bold">
                          Desire Location
                        </div>
                        <div className="text-sm col-span-2">
                          {row.original.rider_profile.desire_location}
                        </div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-sm font-bold">Phone Number</div>
                        <div className="text-sm col-span-2">
                          {formatPhoneNumber(
                            row.original.rider_profile?.phone_number
                          ) ?? "-"}
                        </div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-sm font-bold">ID Card</div>
                        <div className="text-sm col-span-2">
                          {formatId(row.original.rider_profile?.id_card) ?? "-"}
                        </div>
                      </div>
                      <img
                        src={row.original.rider_profile?.id_card_photo}
                        className=" w-full h-full mt-3"
                        alt="id card"
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="Bank Account">
                  <Card>
                    <CardContent className="space-y-2 mt-4 ">
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-sm font-bold">Bank Provider</div>
                        <div className="text-sm col-span-2 flex flex-row">
                          <div
                            className="p-1 rounded-lg mr-3"
                            style={{
                              backgroundColor: (banks.th as any)[
                                row.original?.rider_profile.bank_account_code
                              ].color,
                            }}
                          >
                            <Image
                              src={`/banks/th/${row.original?.rider_profile.bank_account_code}.svg`}
                              alt={
                                row.original?.rider_profile.bank_account_code
                              }
                              width="20"
                              height="20"
                            />
                          </div>
                          <div className="self-center">
                            {
                              (banks.th as any)[
                                row.original?.rider_profile.bank_account_code
                              ].nice_name
                            }
                          </div>
                        </div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-sm font-bold">Name</div>
                        <div className="text-sm col-span-2">
                          {row?.original?.rider_profile?.bank_account_name ??
                            "-"}
                        </div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-sm font-bold">Number </div>
                        <div className="text-sm col-span-2">
                          {row?.original?.rider_profile?.bank_account_number ??
                            "-"}
                        </div>
                      </div>
                      <img
                        src={row.original.rider_profile?.book_bank_photo}
                        className=" w-full h-full mt-3"
                        alt="id card"
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* <TabsContent value="food">
                  <Card>
                    <CardContent className="space-y-2 mt-4">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-sm font-bold ">Favorite Food </div>
                        <div className="text-sm col-span-2">
                          {row.original?.user_profile?.favorite_food ?? "-"}
                        </div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-sm font-bold">Allergy Food</div>
                        <div className="text-sm col-span-2">
                          {row.original?.user_profile?.allergy_food ?? "-"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent> */}
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
                <DialogTitle>Delete Account</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this account?
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4"></div>
              <DialogFooter>
                <Button variant="outline" onClick={handleCancelDelete}>
                  Cancel
                </Button>
                <Button
                  className="bg-red-500 hover:bg-red-500 hover:opacity-80"
                  onClick={handleConfirmDelete}
                >
                  Confirm Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DropdownMenu>
      );
    },
  },
];

export function RiderTable({ data }: RiderListsProps) {
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
        <h2 className="text-2xl font-bold pb-2 sm:py-0">Rider Management</h2>
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
const isRider = (user: User) => {
  return (
    !user.roles.some((role) => role.name === "admin") &&
    user.roles.some((role) => role.name === "rider")
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
      <RiderTable data={users.filter(isRider)} />
    </div>
  );
};

export default RiderLists;

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { destroyUser } from "@/services/user";
import { FileText, MoreHorizontal, Trash2 } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import banks from "@/data/banks.json";
import { formatPhoneNumber } from "react-phone-number-input";
import action from "../rider-request/action";
import Image from "next/image";

function formatId(Id: string) {
  return `${Id.substring(0, 1)} ${Id.substring(1, 5)} ${Id.substring(
    5,
    10
  )} ${Id.substring(10, 12)} ${Id.substring(12, 13)}`;
  return Id;
}

const RowAction = ({ row }: { row: any }) => {
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
                    <div className="text-sm col-span-2">{row.original.id}</div>
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
                    <div className="text-sm font-bold">Desire Location</div>
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
                          alt={row.original?.rider_profile.bank_account_code}
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
                      {row?.original?.rider_profile?.bank_account_name ?? "-"}
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm font-bold">Number </div>
                    <div className="text-sm col-span-2">
                      {row?.original?.rider_profile?.bank_account_number ?? "-"}
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
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
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
};

export default RowAction;

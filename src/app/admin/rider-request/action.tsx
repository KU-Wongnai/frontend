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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { riderStatus } from "@/services/rider";
import { addRoleToUser } from "@/services/user";
import { Check, Search, X } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { formatPhoneNumber } from "react-phone-number-input";
import banks from "@/data/banks.json";
import Image from "next/image";

export function formatId(Id: string) {
  return `${Id.substring(0, 1)} ${Id.substring(1, 5)} ${Id.substring(
    5,
    10
  )} ${Id.substring(10, 12)} ${Id.substring(12, 13)}`;
  return Id;
}

const RowAction = ({ row }: { row: any }) => {
  const [isViewDialogOpen, setViewDialogOpen] = useState(false);
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
        <Button variant="outline" onClick={() => setViewDialogOpen(true)}>
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
          <span>Approve</span>
        </Button>
      </div>
      {/* view detail dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Profile</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="profile" className="max-w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="Rider">Rider Profile</TabsTrigger>
              <TabsTrigger value="Bank Account">Bank Account</TabsTrigger>
              {/* <TabsTrigger value="food">Student</TabsTrigger> */}
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
                    <div className="text-sm font-bold">Desire Location </div>
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
      {/* reject dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle> Reject Request </DialogTitle>
            <DialogDescription>
              Are you sure you want to reject this request?
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
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* verify dialog */}
      <Dialog open={isVerifyDialogOpen} onOpenChange={setVerifyDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Approve Request</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this request?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Your existing profile fields */}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelVerify}>
              Cancel
            </Button>
            <Button onClick={handleConfirmVerify}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RowAction;

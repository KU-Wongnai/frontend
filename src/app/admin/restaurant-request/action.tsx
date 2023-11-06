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
import { acceptRestaurant, declineRestaurant } from "@/services/restaurant";
import { Tooltip } from "@mui/material";
import { Badge } from "@/components/ui/badge";
import { Restaurant } from "@/types/restaurant";
import { FaFacebook, FaGlobe, FaInstagram, FaLine } from "react-icons/fa";

const RowAction = ({ row }: { row: any }) => {
  const [isViewDialogOpen, setViewDialogOpen] = useState(false);
  const [isVerifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const [isRejectDialogOpen, setRejectDialogOpen] = useState(false);
  const handleCancelReject = () => {
    setRejectDialogOpen(false);
  };

  const handleConfirmReject = async () => {
    try {
      await declineRestaurant(row.original, row.original.id);
      toast.success("Reject successfully");
      setRejectDialogOpen(false);
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
      await acceptRestaurant(row.original, row.original.id);
      toast.success("Verify successfully");
      setVerifyDialogOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Verify failed");
    }
  };
  const restaurant: Restaurant = row.original;

  function formatPhone(Id: string) {
    return `${Id.substring(0, 3)} ${Id.substring(3, 6)} ${Id.substring(6, 10)}`;
  }

  return (
    <div className="gap-3 flex flex-row">
      <div>
        <Tooltip title="View Details">
          <Button variant="outline" onClick={() => setViewDialogOpen(true)}>
            <Search />
          </Button>
        </Tooltip>
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
              <TabsTrigger value="Restaurant">Restaurant</TabsTrigger>
              <TabsTrigger value="Contact">Contact</TabsTrigger>
              {/* <TabsTrigger value="food">Student</TabsTrigger> */}
            </TabsList>

            <TabsContent value="Restaurant">
              <Card>
                <CardContent className="space-y-2 mt-6">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm font-bold">ID </div>
                    <div className="text-sm col-span-2">{row.original?.id}</div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm font-bold">Name </div>
                    <div className="text-sm col-span-2">
                      {row.original?.name}
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm font-bold">Description </div>
                    <div className="text-sm col-span-2">
                      {row.original?.description}
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm font-bold">Location </div>
                    <div className="text-sm col-span-2">
                      {row.original?.location}
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm font-bold">Categories</div>
                  </div>
                  <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                    {restaurant?.categories.map((category) => (
                      <Badge key={category} className="m-1">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <Separator />
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm font-bold">Service option</div>
                    <div className="text-sm col-span-2"></div>
                  </div>
                  <ul className="text-sm font-semibold space-y-2">
                    <li className="flex items-center">
                      {restaurant?.isDelivery ? (
                        <Check className="bg-green-500 rounded-sm stroke-white inline-block mr-1 w-5 h-5" />
                      ) : (
                        <X className="bg-red-500 rounded-sm stroke-white inline-block mr-1 w-5 h-5" />
                      )}{" "}
                      Delivery
                    </li>
                    <li className="flex items-center">
                      {restaurant?.isWalkIn ? (
                        <Check className="bg-green-500 rounded-sm stroke-white inline-block mr-1 w-5 h-5" />
                      ) : (
                        <X className="bg-red-500 rounded-sm stroke-white inline-block mr-1 w-5 h-5" />
                      )}{" "}
                      Walk In
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="Contact">
              <Card>
                <CardContent className="space-y-2 mt-4 ">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm font-bold">Phone</div>
                    <div className="text-sm col-span-2">
                      {(row.original?.phone) && formatPhone(row.original?.phone)}
                    </div>
                  </div>
                  <Separator />
                  <ul className="text-sm space-y-2 text-gray-600 dark:text-gray-300 nt-2">
                    {restaurant?.line && (
                      <li className="flex items-center gap-2">
                        <FaLine className="w-5 h-5" />
                        Line: {restaurant.line}
                      </li>
                    )}
                    {restaurant?.facebook && (
                      <li>
                        <a
                          href={restaurant.facebook}
                          className="flex items-center gap-2 hover:text-primary"
                          target="_blank"
                        > 
                          <FaFacebook className="w-5 h-5" /> Facebook
                        </a>
                        
                      </li>
                    )}
                    {restaurant?.instagram && (
                      <li>
                        <a
                          href={restaurant.instagram}
                          className="flex items-center gap-2 hover:text-primary"
                          target="_blank"
                        >
                          <FaInstagram className="w-5 h-5" /> Instagram
                        </a>
                      </li>
                    )}
                    {restaurant?.website && (
                      <li>
                        <a
                          href={restaurant.website}
                          className="flex items-center gap-2 hover:text-primary"
                          target="_blank"
                        >
                          <FaGlobe className="w-5 h-5" /> Website
                        </a>
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
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

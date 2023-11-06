import { Button } from "@/components/ui/button";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { deleteRestaurant } from "@/services/restaurant";
import { MoreHorizontal, FileText, Trash2, Check, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Separator } from "@/components/ui/separator";
import { FaFacebook, FaGlobe, FaInstagram, FaLine } from "react-icons/fa";
import { Restaurant } from "@/types/restaurant";
import { Badge } from "@/components/ui/badge";

const RowAction = ({ row }: { row: any }) => {
  const [isViewDialogOpen, setViewDialogOpen] = useState(false);
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

  const restaurant: Restaurant = row.original;

  function formatPhone(Id: string) {
    return `${Id.substring(0, 3)} ${Id.substring(3, 6)} ${Id.substring(6, 10)}`;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2">
        <DropdownMenuItem
          onClick={() => setViewDialogOpen(true)}
          className="py-3"
        >
          <button className="flex items-center w-full">
            <FileText className="mr-2 h-4 w-4" />
            <span>View Details</span>
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="py-3">
          <Link
            href={`/restaurants/${row.original.id}`}
            className="flex items-center w-full"
          >
            <FaGlobe className="mr-2 h-4 w-4" />
            <span>Visit Restaurant Website</span>
          </Link>
        </DropdownMenuItem>
        {/* <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => setIsDeleteDialogOpen(true)}
          className="py-3"
        >
          <button className="flex items-center w-full text-red-500">
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete Restaurant</span>
          </button>
        </DropdownMenuItem> */}
      </DropdownMenuContent>

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
                      {row.original?.phone && formatPhone(row.original?.phone)}
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
      {/* delete dialog */}
      {/* <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Restaurant</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this restaurant?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4"> */}
      {/* Your existing profile fields */}
      {/* </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelDelete}>
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete}>Confirm Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>*/}
    </DropdownMenu>
  );
};

export default RowAction;

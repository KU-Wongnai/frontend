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
import { deleteRestaurant } from "@/services/restaurant";
import { MoreHorizontal, Link, FileText, Trash2 } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const RowAction = ({ row }: { row: any }) => {
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
        {/* <DropdownMenuItem
              onClick={() => setIsViewDialogOpen(true)}
              className="py-3"
            >
              <button className="flex items-center w-full">
                <FileText className="mr-2 h-4 w-4" />
                <span>View Details</span>
              </button>
            </DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="py-3">
          <Link
            href={`/restaurants/${row.original.id}`}
            className="flex items-center w-full"
            target="_blank"
            // rel="noopener noreferrer"
          >
            <FileText className="mr-2 h-4 w-4" />
            <span>View Details</span>
          </Link>
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
      {/* <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
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
          </Dialog> */}

      {/* delete dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
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
};

export default RowAction;

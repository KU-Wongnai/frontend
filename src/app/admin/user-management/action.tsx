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
import { User } from "@/types/user";
import { FileText, MoreHorizontal, Trash2 } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

function getRole(user: User) {
  if (user.roles.some((role) => role.name === "admin")) {
    return "Admin";
  } else if (user.roles.some((role) => role.name === "rider")) {
    return "Rider";
  } else return "User";
}

const RowAction = ({ row }: { row: any }) => {
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">User Profile</TabsTrigger>
              <TabsTrigger value="student">Student Profile</TabsTrigger>
              <TabsTrigger value="food">Food Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardContent className="space-y-2 mt-6">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm font-bold">ID </div>
                    <div className="text-sm col-span-2">{row.original.id}</div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm font-bold">Role</div>
                    <div className="text-sm col-span-2">
                      {getRole(row.original)}
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
                    <div className="text-sm font-bold">Phone Number </div>
                    <div className="text-sm col-span-2">
                      {row.original?.user_profile?.phone_number ?? "-"}
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm font-bold">Birth Date </div>
                    <div className="text-sm col-span-2">
                      {row?.original?.user_profile?.birth_date?.toString() ??
                        "-"}
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm font-bold">Address </div>
                    <div className="text-sm cs2">
                      {row?.original?.user_profile?.address ?? "-"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="student">
              <Card>
                <CardContent className="space-y-2 mt-4 ">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm font-bold">Student ID </div>
                    <div className="text-sm col-span-2">
                      {row?.original?.user_profile?.student_id ?? "-"}
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm font-bold">Faculty </div>
                    <div className="text-sm col-span-2">
                      {row?.original?.user_profile?.faculty ?? "-"}
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-sm font-bold">Major </div>
                    <div className="text-sm col-span-2">
                      {row.original?.user_profile?.major ?? "-"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="food">
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
            </TabsContent>
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
          <DialogFooter>
            <Button variant="outline" onClick={handleCancelDelete}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              className="bg-red-500 text-inherit hover:bg-red-500 hover:bg-opacity-90"
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

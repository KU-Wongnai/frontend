"use client";

import { Button } from "@/components/ui/button";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { deleteComment, updateComment } from "@/services/review";
import { MoreHorizontal } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CommentDialog = ({ comment }: { comment: Comment }) => {
  const [open, setOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [content, setContent] = useState(comment.content || "");

  const handleUpdate = async () => {
    try {
      await updateComment(comment.id, {
        content: content,
      });
      toast.success("Comment updated");
      console.log("Comment updated");
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Comment update failed");
    }
  };

  const handleDelete = async () => {
    // await deleteReview(comment.id);
    // setOpenDelete(false);
    // toast.success("Review deleted");
    try {
      await deleteComment(comment.id);
      toast.success("Comment deleted");
      setOpenDelete(false);
    } catch (error) {
      console.log(error);
      toast.error("Comment delete failed");
    }
  };

  return (
    <DropdownMenu open={openMenu} onOpenChange={setOpenMenu}>
      <DropdownMenuTrigger>
        <MoreHorizontal className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* Edit */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <p className="p-2 text-sm w-full cursor-pointer hover:bg-accent hover:rounded-sm mb-1">
              Edit
            </p>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit comment</DialogTitle>
              <DialogDescription>
                Make changes to your comment here. Click save when you are done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 pt-4">
              {/* Content */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleUpdate} className="mt-10">
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete */}
        <Dialog open={openDelete} onOpenChange={setOpenDelete}>
          <DialogTrigger asChild>
            <p className="p-2 text-red-500 text-sm w-full cursor-pointer hover:bg-accent hover:rounded-sm">
              Delete
            </p>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete comment</DialogTitle>
            </DialogHeader>
            Are you sure you want to delete this comment?
            <DialogFooter>
              <Button
                onClick={handleDelete}
                className="mt-10"
                variant="destructive"
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommentDialog;

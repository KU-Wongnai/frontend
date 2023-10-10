"use client";

import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "../../../../../../components/ui/input";
import { Button } from "../../../../../../components/ui/button";
import StarIcon from "@mui/icons-material/Star";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import RichTextEditor from "@/components/rich-text-editor";
import { deleteReview, updateReview } from "@/services/review";
import toast from "react-hot-toast";

const labels: { [index: string]: string } = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const ReviewDialog = ({ review }: { review: Review }) => {
  const [valueS, setValue] = React.useState<number | null>(
    review.rating || null
  );
  const [hover, setHover] = React.useState(-1);
  const [titleS, setTitle] = useState(review.title || "");
  const [editorContentS, setEditorContent] = useState(review.content || "");
  const [open, setOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  const handleSubmit = async () => {
    try {
      const formData = {
        title: titleS,
        content: editorContentS,
        rating: valueS,
      };
      await updateReview(review.id, formData);
      toast.success("Review updated");
      console.log(formData);
      setOpen(false);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteReview(review.id);
      toast.success("Review deleted");
      setOpenDelete(false);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.log(error);
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
              <DialogTitle>Edit review</DialogTitle>
              <DialogDescription>
                Make changes to your review here. Click save when you are done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 pt-4">
              {/* Rating */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rating" className="text-right">
                  Rating
                </Label>
                <Box
                  id="rating"
                  className="col-span-3"
                  sx={{
                    width: 200,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Rating
                    name="hover-feedback"
                    size="large"
                    value={valueS}
                    precision={0.5}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  {valueS !== null && (
                    <Box sx={{ ml: 2 }}>
                      {labels[hover !== -1 ? hover : valueS]}
                    </Box>
                  )}
                </Box>
              </div>
              {/* Title */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reviewTitle" className="text-right">
                  Review Title
                </Label>
                <Input
                  id="reviewTitle"
                  value={titleS}
                  onChange={(e) => setTitle(e.target.value)}
                  className="col-span-3"
                />
              </div>
              {/* rich text editor */}
              <RichTextEditor
                initialValue={editorContentS}
                onChange={handleEditorChange}
              />
            </div>
            <DialogFooter>
              <Button onClick={handleSubmit} className="mt-10">
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
              <DialogTitle>Delete review</DialogTitle>
            </DialogHeader>
            Are you sure you want to delete this review?
            <DialogFooter>
              <Button
                onClick={handleDelete}
                className="mt-10"
                variant="destructive"
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ReviewDialog;

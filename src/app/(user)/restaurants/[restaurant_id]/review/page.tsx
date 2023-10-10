"use client";

import React, { useState } from "react";
import { ImageIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import RestaurantCardDetail from "@/app/(user)/restaurants/[restaurant_id]/components/restaurant-card-detail";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { createReview } from "@/services/review";
import { reviewSchema } from "@/validations/review-schema";
import { hash } from "@/lib/hash";
import { uploadFile } from "@/services/file-upload";

import { useRouter } from "next/navigation";

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

const RichTextEditor = dynamic(() => import("@/components/rich-text-editor"), {
  ssr: false,
});

function Review({
  params,
}: {
  params: {
    restaurant_id: number;
    id: string;
  };
}) {
  const [value, setValue] = React.useState<number | null>(2);
  const [hover, setHover] = React.useState(-1);
  const [title, setTitle] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(e.target.files);
    }
  };

  const handleSubmit = async () => {
    try {
      setError(null); // Reset error on new submission attempt
      // upload image
      let imageName = [];
      if (images) {
        for (let i = 0; i < images?.length; i++) {
          const file = images[i];
          const file_name_hash = hash(file.name);
          const file_name = `review/${file_name_hash}`;
          const res = await uploadFile(file, file_name);
          if (res?.data) {
            const imageReview = res.data.replace(
              "http://host.docker.internal:8093",
              "http://localhost:8093"
            );
            // keep object imageUrl
            imageName.push({
              imageUrl: imageReview,
            });
          }
        }
      }
      const formData = {
        title: title,
        content: editorContent,
        rating: value,
        images: imageName,
      };
      // Sending data to the API and getting the response.
      await createReview(params.restaurant_id, formData);

      // useRouter().push(`/restaurants/${params.restaurant_id}`);
      router.push(`/restaurants/${params.restaurant_id}`);
      console.log("Review submitted successfully:");
      // Handle successful review submission here, like redirecting to the restaurant page.
    } catch (error) {
      console.error("Error submitting review:", error);
      // Handle error here, like showing an error message to the user.
    }
  };

  return (
    <>
      <main className="container mx-auto py-6">
        {/* food card Horizontal */}
        <RestaurantCardDetail id={params.restaurant_id} />
        {/* review */}
        <section className="w-full bg-card pt-3 rounded-lg p-5 mt-6 border shadow-sm">
          <div className="flex border-b mb-3 gap-2">
            {/* <ChefHat className="text-green-600 w-8 h-8" /> */}
            <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-primary">
              Write a review
            </h1>
          </div>

          {error && (
            <div className="text-red-500 p-2 mt-2 border-l-4 border-red-500 bg-red-50">
              <p>{error}</p>
            </div>
          )}

          {/* Star Rating */}
          <div className="mb-3">
            <span className="text-xl font-semibold tracking-tight">
              Rate this restaurant
            </span>
            <div className="ml-2">
              <Box
                sx={{
                  width: 200,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Rating
                  name="hover-feedback"
                  size="large"
                  value={value}
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
                {value !== null && (
                  <Box sx={{ ml: 2 }}>
                    {labels[hover !== -1 ? hover : value]}
                  </Box>
                )}
              </Box>
            </div>
          </div>

          {/* Title */}
          <div className="my-4 ">
            <Label className="text-xl font-semibold tracking-tight mb-2">
              Title
            </Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title here"
              className="border rounded-lg p-2 w-full mt-2"
              type="text"
            />
          </div>

          {/* rich text editor */}
          <RichTextEditor onChange={handleEditorChange} />

          {/* Image upload section */}
          <div className="mt-4 flex flex-col items-start justify-start gap-3">
            <Label
              className="cursor-pointer px-4 py-2 flex gap-x-1 items-center rounded-sm border"
              htmlFor="picture"
            >
              <p>Upload Images</p>
              <Input
                id="picture"
                type="file"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
              <ImageIcon />
            </Label>
            {images && (
              <div className="grid grid-cols-3 gap-2">
                {Array.from(images).map((img, index) => (
                  <div
                    key={index}
                    className="border rounded overflow-hidden shadow w-40 h-40"
                  >
                    <Image
                      src={URL.createObjectURL(img)}
                      alt={`uploaded-${index}`}
                      className="w-full"
                      width={50}
                      height={50}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ปุ่ม Post และ Cancel */}
          <div className="mt-4 flex justify-end gap-4">
            <Button className="bg-gray-200 text-black hover:bg-gray-300 px-4">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="px-4 text-white">
              Post
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}

export default Review;

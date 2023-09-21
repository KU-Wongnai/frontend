"use client";

import React, { useState } from "react";
import { ChefHat, ImageIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import RestaurantCardDetail from "@/app/(user)/restaurants/[restaurant_id]/components/restaurant-card-detail";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import StarRatings from "react-star-ratings";
import { Label } from "@/components/ui/label";

const RichTextEditor = dynamic(() => import("@/components/rich-text-editor"), {
  ssr: false,
});

function Review({ params }: { params: { id: string } }) {
  const [editorContent, setEditorContent] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
    console.log(content);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(e.target.files);
    }
  };

  const handleSubmit = () => {
    console.log("Submitting:", editorContent, "Rating:", rating, "Images:", images);
  };

  return (
    <>
      <main className="container mx-auto py-6">
        {/* food card Horizontal */}
        <RestaurantCardDetail
          id={0}
          name={""}
          foodType={""}
          rating={0}
          image={null}
          href={""}
          description={""}
          location={""}
          operatingHours={0}
          contactInfo={""}
          menus={null}
        />
        {/* review */}
        <section className="w-full bg-card pt-3 rounded-lg p-5 mt-6 border shadow-sm">
          <div className="flex border-b mb-3 gap-2">
            <ChefHat className="text-green-600 w-8 h-8" />
            <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-primary">
              Write a review
            </h1>
          </div>
          {/* Star Rating */}
          <div className="mb-3">
            <span className="text-xl font-semibold tracking-tight">
              Rate this restaurant
            </span>
            <div className="ml-2">
              <StarRatings
                rating={rating}
                starRatedColor="red"
                changeRating={handleRatingChange}
                numberOfStars={5}
                name="rating"
                starDimension="35px" // Adjust the size here
                starSpacing="2px" // Adjust the spacing here
              />
            </div>
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

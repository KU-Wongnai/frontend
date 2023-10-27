"use client";

import React, { useState } from "react";
import { ImageIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import RestaurantCardDetail from "@/app/(user)/(public)/restaurants/[restaurant_id]/components/restaurant-card-detail";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { createReview } from "@/services/review";
import { hash } from "@/lib/hash";
import { uploadFile } from "@/services/file-upload";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";

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

const reviewSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1).max(1000),
  rating: z.coerce.number().min(1).max(5),
  images: z.array(
    z.object({
      imageUrl: z.string().url(),
    })
  ),
});

type ReviewForm = z.infer<typeof reviewSchema>;

function Review({
  params,
}: {
  params: {
    restaurant_id: number;
    id: string;
  };
}) {
  const [hover, setHover] = React.useState(-1);
  const [images, setImages] = useState<FileList | null>(null);

  const router = useRouter();

  const form = useForm({
    mode: "onBlur",
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      title: "",
      content: "",
      rating: 0,
      images: [],
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(e.target.files);
    }
  };

  const onSubmit = async (data: ReviewForm) => {
    try {
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

      await createReview(params.restaurant_id, {
        title: data.title,
        content: data.content,
        rating: data.rating,
        images: imageName,
      });
      toast.success("Review submitted successfully");
      router.push(`/restaurants/${params.restaurant_id}`);
      console.log("Review submitted successfully:");
    } catch (error) {
      toast.error("Error submitting review");
      console.error("Error submitting review:", error);
    }
  };

  return (
    <>
      <main className="container mx-auto py-6 space-y-4">
        {/* food card Horizontal */}
        <RestaurantCardDetail id={params.restaurant_id} />
        {/* review */}
        <Card>
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
            <CardDescription>
              Tell other people what do you think about this restaurant.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  name="rating"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating this restaurant</FormLabel>
                      <FormControl>
                        <Box
                          sx={{
                            width: 200,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Rating
                            size="large"
                            precision={0.5}
                            getLabelText={getLabelText}
                            onChangeActive={(event, newHover) => {
                              setHover(newHover);
                            }}
                            emptyIcon={
                              <StarIcon
                                style={{ opacity: 0.55 }}
                                fontSize="inherit"
                              />
                            }
                            {...field}
                          />
                          {field.value !== null && (
                            <Box sx={{ ml: 2 }}>
                              <span className="text-sm">
                                {labels[hover !== -1 ? hover : field.value]}
                              </span>
                            </Box>
                          )}
                        </Box>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="title"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <Input {...field} placeholder="Title here" type="text" />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="content"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <RichTextEditor {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                  <Button
                    type="button"
                    className="bg-gray-200 text-black hover:bg-gray-300 px-4"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="px-4 text-white">
                    Post
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </>
  );
}

export default Review;

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChefHat, Star } from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";

const RichTextEditor = dynamic(() => import("@/components/rich-text-editor"), {
  ssr: false,
});

function Review({ params }: { params: { slug: string } }) {
  const [editorContent, setEditorContent] = useState("");

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
    console.log(content);
  };

  const handleSubmit = () => {
    // ที่นี่คุณสามารถส่งข้อมูลไปยังเซิร์ฟเวอร์ หรือทำอะไรก็ได้ตามต้องการ
    console.log("Submitting:", editorContent);
  };

  const handleCancel = () => {
    // Clear the editor's content
    setEditorContent("");
  };

  return (
    <>
      <main className="container mx-auto py-6">
        {/* food card Horizontal */}
        <section className="w-full bg-white p-5 border shadow-sm rounded-2xl">
          <div className="flex">
            {/* image */}
            <div className="relative filter brightness-90 shadow-md rounded-xl w-96 h-52">
              <Image
                src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
                alt="KU Wongnai"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
            {/* detail */}
            <div className="flex flex-col ml-5">
              <div className="flex items-end gap-4">
                <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors">
                  Food Name {params.slug}
                </h1>
                <span className="scroll-m-20 text-2xl font-semibold tracking-tight text-gray-500 pb-2">
                  Ran Che Daeng
                </span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-red-600 rounded-2xl flex px-2 py-1 text-white w-fit gap-2 items-center">
                  <h2 className="text-lg font-semibold tracking-tight ">4.5</h2>
                  <Star className="w-5 h-5" />
                </div>
                <span>
                  <span className="text-xl font-semibold tracking-tight mb-3 text-gray-400">
                    100 reviews
                  </span>
                </span>
              </div>
              <div className="flex items-end gap-3 mb-3">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Category:
                </h2>
                <h3 className="text-xl font-semibold tracking-tight  text-gray-400">
                  Japanese
                </h3>
              </div>
              <div className="flex items-end gap-3 mb-3">
                <h2 className="text-2xl font-semibold tracking-tight">Price</h2>
                <h3 className="text-xl font-semibold tracking-tight text-gray-400">
                  20 $
                </h3>
              </div>
            </div>
          </div>
        </section>

        {/* review */}
        <section className="w-full bg-white pt-3 rounded-2xl p-5 mt-6 border shadow-sm">
          <div className="flex border-b mb-3 gap-2">
            <ChefHat className="text-green-600 w-8 h-8" />
            <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Write a review
            </h1>
          </div>
          {/* rich text editor */}
          <RichTextEditor onChange={handleEditorChange} />

          {/* ปุ่ม Post และ Cancel */}
          <div className="mt-4 flex justify-end gap-4">
            <Button
              onClick={handleCancel}
              className="bg-gray-200 text-black hover:bg-gray-300 px-4"
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="px-4">
              Post
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}

export default Review;
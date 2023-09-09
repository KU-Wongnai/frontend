"use client";

import React, { useState } from "react";
import { MoreHorizontal, ThumbsUp, MessageSquare } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toggle } from "@/components/ui/toggle";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Review: React.FC<ReviewProps> = ({
  avatarUrl,
  name,
  topic,
  detail,
  images,
  comments,
  likes,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comment, setComment] = useState<ReviewComment[]>([]);

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleToggleCommentInput = () => {
    setShowCommentInput(!showCommentInput);
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      // อัปเดต comments
      setComment((prevComments) => [
        ...prevComments,
        { avatarUrl: avatarUrl, name: name, text: commentText },
      ]);
      setCommentText("");
      setShowCommentInput(false);
    }
  };

  return (
    <div className="border-b p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {name}
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontal className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <p className="text-red-500">Delete</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <h3 className="text-xl font-bold mb-2">{topic}</h3>
      <p className="text-gray-600 mb-4">{detail}</p>
      <div className="grid grid-cols-8 gap-2 mb-4">
        {images.map((img, index) => (
          <div key={index}>
            <Image
              src={img}
              alt={`Review image ${index}`}
              width={100}
              height={100}
              className="rounded-md w-36 h-36 object-cover"
            />
          </div>
        ))}
      </div>
      <div className="flex gap-4 items-center mb-2">
        <div className="flex items-center gap-2">
          <Toggle
            onClick={handleToggleLike}
            className="transition-colors duration-300 hover:bg-gray-100 p-2 rounded-full"
          >
            <ThumbsUp
              className={`cursor-pointer ${
                isLiked ? "text-blue-500" : "text-gray-900"
              }`}
            />
          </Toggle>
          <span className="font-semibold text-gray-800">{likes}</span>
        </div>
        <div className="transition-colors duration-300 hover:text-blue-500">
          <MessageSquare
            className="cursor-pointer"
            onClick={handleToggleCommentInput}
          />
        </div>
      </div>
      {showCommentInput && (
        <div className="mb-4 flex w-full items-center space-x-2">
          <Input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="border rounded w-full"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddComment();
            }}
          />
          <Button
            onClick={handleAddComment}
            className=" text-white p-2 rounded px-8"
          >
            Post
          </Button>
        </div>
      )}
      <ul className="space-y-2">
        {comments.map((comment, index) => (
          <li
            key={index}
            className="text-sm text-gray-500 flex items-center gap-3 p-2 bg-gray-100 rounded"
          >
            <Avatar className="w-8 h-8">
              <AvatarImage src={comment.avatarUrl} />
              <AvatarFallback>
                {comment.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <span className="font-bold">{comment.name}</span>: {comment.text}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Review;

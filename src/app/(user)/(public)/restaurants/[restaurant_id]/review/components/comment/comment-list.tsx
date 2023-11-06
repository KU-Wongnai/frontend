"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuthStore from "@/contexts/auth-store";
import useStore from "@/contexts/useStore";
import React from "react";
import CommentDialog from "./comment-dialog";
import { Review, Comment } from "@/types/reivew";

const CommentList = ({ review }: { review: Review }) => {
  const { data: me } = useStore(useAuthStore, (state) => state.user);

  return (
    <ul className="space-y-2 mb-4">
      {review?.comments.map((comment: Comment, index: number) => (
        <li
          key={index}
          className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-3 p-2 bg-secondary rounded-lg"
        >
          <div className="flex justify-between w-full">
            <div className="flex">
              <div>
                <Avatar className="w-8 h-8">
                  <AvatarImage src={comment.user.avatar} />
                  <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                </Avatar>
              </div>
              <div className="ml-3">
                <span className="font-bold">{comment.user.name}</span>
                <div>{comment.content}</div>
              </div>
            </div>

            <div>
              {me?.id === comment.user.id && review ? (
                <CommentDialog comment={comment} />
              ) : null}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;

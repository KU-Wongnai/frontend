"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ThumbsUp, MessageSquare } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Toggle } from "@/components/ui/toggle";
import { Input } from "../../../../../../components/ui/input";
import { Button } from "../../../../../../components/ui/button";
import { getReviewsByID, likeReview } from "@/services/review";
import useStore from "@/contexts/useStore";
import useAuthStore from "@/contexts/auth-store";
import ReviewDialog from "./review-dialog";
import Rating from "@mui/material/Rating";

const ReviewCard = ({ id, rating }: { id: number, rating:number }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [review, setReview] = useState<Review>();
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState("");
  // const [comment, setComment] = useState<ReviewComment[]>([]);

  const me = useStore(useAuthStore, (state) => state.user);

  useEffect(() => {
    const fetchReview = async () => {
      const review: Review = await getReviewsByID(id);
      setReview(review);
      for (let i = 0; i < review.likes.length; i++) {
        if (review.likes[i].id === me?.id) {
          setIsLiked(true);
        }
      }
    };
    fetchReview();
  }, [id, me?.id, review]);

  const handleToggleLike = async () => {
    await likeReview(id).then(() => {
      setIsLiked(!isLiked);
    });
  };

  const isMyReview = me?.id === review?.user.id;

  const handleToggleCommentInput = () => {
    setShowCommentInput(!showCommentInput);
  };

  const handleAddComment = () => {
    // if (commentText.trim()) {
    //   setComment((prevComments) => [
    //     ...prevComments,
    //     { user: user avatarUrl: avatarUrl, name: name, content: commentText },
    //   ]);
    //   setCommentText("");
    //   setShowCommentInput(false);
    // }
  };

  return (
    <div className="border-b p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={review?.user.avatar} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="scroll-m-20 text-2xl font-semibold tracking-tight">
            {review?.user.name}
          </span>
        </div>
        {isMyReview && review ? <ReviewDialog review={review} /> : null}
      </div>
      <Rating
        name="half-rating-read"
        defaultValue={rating}
        precision={0.5}
        readOnly
      />
      <h3 className="text-lg sm:text-xl font-bold mb-2">{review?.title}</h3>
      {review?.content ? (
        <div
          className="text-gray-500 mb-4"
          dangerouslySetInnerHTML={{ __html: review?.content }}
        />
      ) : null}
      <div className="grid grid-cols-2 sm:grid-cols-8 gap-2 mb-4">
        {review?.images.map((img, index) => (
          <div key={index}>
            <Image
              src={img.imageUrl}
              alt={`Review image ${index}`}
              width={100}
              height={100}
              className="rounded-lg w-full sm:w-36 h-full sm:h-36 object-cover"
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
              className={`cursor-pointer ${isLiked ? "text-blue-500" : ""}`}
            />
          </Toggle>
          <span className="font-semibold ">{review?.likes.length}</span>
        </div>
        <div className="transition-colors duration-300 hover:text-blue-500">
          <MessageSquare
            className="cursor-pointer"
            onClick={handleToggleCommentInput}
          />
        </div>
      </div>
      {showCommentInput && (
        <div className="mb-4 flex flex-col sm:flex-row w-full items-center space-y-2 sm:space-y-0 sm:space-x-2">
          <Input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="border rounded-lg w-full"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddComment();
            }}
          />
          <Button
            onClick={handleAddComment}
            className=" text-white p-2 rounded-lg w-full sm:w-auto px-8"
          >
            Post
          </Button>
        </div>
      )}
      <ul className="space-y-2">
        {review?.comments.map((comment: any, index: any) => (
          <li
            key={index}
            className="text-sm text-gray-500 flex items-center gap-3 p-2 bg-secondary rounded-lg"
          >
            <Avatar className="w-8 h-8">
              <AvatarImage src={comment.avatarUrl} />
              <AvatarFallback>
                {comment.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <span className="font-bold">{comment.name}</span>:
              {comment.content}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewCard;

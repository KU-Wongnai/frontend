import React, { useEffect } from "react";
import ReviewCard from "./review-card";
import { getReviewsRestaurant } from "@/services/review";

const ReviewList = ({ restaurant_id }: { restaurant_id: number }) => {
  const [review, setReview] = React.useState<Review[]>();

  console.log(review);
  useEffect(() => {
    const fetchReviewRestaurant = async () => {
      const review = await getReviewsRestaurant(restaurant_id);
      setReview(review);
    };
    fetchReviewRestaurant();
  }, [restaurant_id]);

  return (
    <section className="mt-3 bg-card rounded-lg p-4 md:p-5 border shadow-sm">
      <div className="flex gap-4 border-b items-end">
        <h1 className="pb-2 text-2xl md:text-3xl font-semibold tracking-tight transition-colors text-primary">
          Reviews
        </h1>
        <p className="text-xl md:text-2xl font-semibold tracking-tight text-gray-500 pb-2">
          ({review?.length ?? 0})
        </p>
      </div>
      {review && (
        <div>
          {review?.map((review, index) => (
            <ReviewCard
              key={index}
              id={review.id}
              // user_id={review.user.id}
              // avatar={review.user.avatar}
              // name={review.user.name}
              // content={review.content}
              // images={review.images}
              rating={review.rating}
              // title={review.title}
              // likes={review.likes}
              // comments={review.comments}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ReviewList;

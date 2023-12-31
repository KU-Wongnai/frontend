import { Review } from "@/types/reivew";

export const calAverageReview = (reviews: Review[]) => {
  const reviewCount = reviews.length;
  if (reviewCount === 0) return "-";
  return reviews.reduce((acc, review) => acc + review.rating, 0) / reviewCount;
};

export const calReviewCount = (reviews: Review[]) => {
  const reviewCount = reviews.length;
  return reviewCount;
};

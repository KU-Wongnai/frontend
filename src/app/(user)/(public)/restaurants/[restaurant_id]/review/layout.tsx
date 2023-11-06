"use client";

import AuthLayout from "@/components/layouts/auth-layout";
import useAuthStore from "@/contexts/auth-store";
import { getReviewsRestaurant } from "@/services/review";
import { Review } from "@/types/reivew";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import RestaurantCardDetail from "../components/restaurant-card-detail";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ReviewLayout = ({ children }: { children: React.ReactNode }) => {
  // Check if user already review this restaurant
  const [review, setReview] = React.useState<Review>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const user = useAuthStore((state) => state.user);
  const params = useParams();

  useEffect(() => {
    const fetchReview = async () => {
      const review = await getReviewsRestaurant(+params.restaurant_id);
      setReview(review.find((review: any) => review.user.id === user?.id));
      setLoading(false);
    };
    fetchReview();
  }, [params.restaurant_id]);

  if (loading) {
    return (
      <AuthLayout>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
      </AuthLayout>
    );
  }

  if (review) {
    return (
      <AuthLayout>
        <main className="container mx-auto py-6 space-y-4">
          {/* food card Horizontal */}
          <RestaurantCardDetail id={+params.restaurant_id} />
          {/* review */}
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <h1 className="text-2xl font-bold">
              You already review this restaurant
            </h1>
            <Button asChild>
              <Link href={`/restaurants/${params.restaurant_id}`}>
                Back to the restaurant
              </Link>
            </Button>
          </div>
        </main>
      </AuthLayout>
    );
  }

  return <AuthLayout>{children}</AuthLayout>;
};

export default ReviewLayout;

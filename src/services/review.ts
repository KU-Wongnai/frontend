import { httpClient } from "@/lib/http-client";
import { } from "@/validations/auth-schema";
import useAuthStore from "../contexts/auth-store";

// export const signUp = async (data: RegisterForm) => {
//   try {
//     const { data: user } = await httpClient.post("user/register", data);
//     return user;
//   } catch (error) {
//     console.error("Failed to sign up", error);
//     throw error;
//   }
// };

export const getReviews = async () => {
  try {
    const { data: reviews } = await httpClient.get(
      "review/api/reviews"
    );
    return reviews;
  } catch (error) {
    console.error("Failed to get reviews", error);
    throw error;
  }
};

export const getReviewsByID = async (id : number) => {
  try {
    const { data: reviews } = await httpClient.get(`review/api/reviews/${id}`);
    return reviews;
  } catch (error) {
    console.error("Failed to get reviews", error);
    throw error;
  }
}

export const getReviewsRestaurant = async (id : number) => {
  try {
    const { data: reviews } = await httpClient.get(
      `review/api/restaurant/${id}/reviews`
    );
    return reviews;
  } catch (error) {
    console.error("Failed to get reviews", error);
    throw error;
  }
}

export const likeReview = async (id : number) => {
  try {
    const { data: reviews } = await httpClient.post(
      `review/api/reviews/${id}/like`
    );
    return reviews;
  } catch (error) {
    console.error("Failed to get reviews", error);
    throw error;
  }
}

export const updateReview = async (id : number, data : any) => {
  try {
    const { data: reviews } = await httpClient.put(
      `review/api/reviews/${id}`, data
    );
    return reviews;
  } catch (error) {
    console.error("Failed to get reviews", error);
    throw error;
  }
}

export const createReview = async (id : number, data : any) => {
  try {
    const { data: reviews } = await httpClient.post(
      `review/api/restaurant/${id}/reviews`, data
    );
    return reviews;
  } catch (error) {
    console.error("Failed to get reviews", error);
    throw error;
  }
}

export const deleteReview = async (id : number) => {
  try {
    const { data: reviews } = await httpClient.delete(
      `review/api/reviews/${id}`
    );
    return reviews;
  } catch (error) {
    console.error("Failed to get reviews", error);
    throw error;
  }
}
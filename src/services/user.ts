import { User } from "@/app/interfaces/user";
import { httpClient } from "@/lib/http-client";

export const findUserBy = async (id: number): Promise<User> => {
  try {
    const { data: user } = await httpClient.get(`user/api/users/${id}`);
    return user;
  } catch (error) {
    console.error("Failed to get user", error);
    throw error;
  }
};

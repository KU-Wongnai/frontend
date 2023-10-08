import { User } from "@/interfaces/user";
import { httpClient } from "@/lib/http-client";
import { getMe } from "./auth";

export const updateUserProfile = async (data: any) => {
  try {
    console.log(data);
    await httpClient.put("user/api/users/profile/user", data);
    getMe();
  } catch (error) {
    console.error("Failed to update user", error);
    throw error;
  }
};

export const findUserBy = async (id: number): Promise<User> => {
  try {
    const { data: user } = await httpClient.get(`user/api/users/${id}`);
    return user;
  } catch (error) {
    console.error("Failed to get user", error);
    throw error;
  }
};

export const findUserByEmail = async (email: string): Promise<User> => {
  try {
    const { data: user } = await httpClient.get(
      `user/api/users/email/${email}`
    );
    return user;
  } catch (error) {
    console.error("Failed to get user", error);
    throw error;
  }
};

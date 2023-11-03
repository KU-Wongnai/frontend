import { User } from "@/types/user";
import { httpClient } from "@/lib/http-client";
import { getMe } from "./auth";

// GET /users
export const getUsers = async () => {
  try {
    const { data: users } = await httpClient.get("user/api/users");
    return users;
  } catch (error) {
    console.error("Failed to get users", error);
    throw error;
  }
}

// POST /users/profile/user
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

// DELETE /users/me
export const deleteMe = async () => {
  try {
    await httpClient.delete("user/api/users/me");
  } catch (error) {
    console.error("Failed to delete user", error);
    throw error;
  }
}

// POST /users/role
export const addRoleToUser = async (data: any) => {
  try {
    await httpClient.post(`user/api/users/role`, data);
  } catch (error) {
    console.error("Failed to add role to user", error);
    throw error;
  }
};

// DELETE /users/role
export const removeRoleFromUser = async (data: any) => {
  try {
    await httpClient.delete(`user/api/users/roles`, { data });
  } catch (error) {
    console.error("Failed to remove role from user", error);
    throw error;
  }
}

// DELETE /users/:id
export const destroyUser = async (id: number) => {
  try {
    await httpClient.delete(`user/api/users/${id}`);
  } catch (error) {
    console.error("Failed to delete user", error);
    throw error;
  }
}

// GET /users/:id
export const findUserBy = async (id: number): Promise<User> => {
  try {
    const { data: user } = await httpClient.get(`user/api/users/${id}`);
    return user;
  } catch (error) {
    console.error("Failed to get user", error);
    throw error;
  }
};

// GET /users/email/:email
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
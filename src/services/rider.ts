import { httpClient } from "@/lib/http-client";

export const riderScore = async (id: number, data: any) => {
  try {
    const { data: score } = await httpClient.post(
      `user/api/users/${id}/score`,
      data
    );
    return score;
  } catch (error) {
    console.error("Failed to get rider score", error);
    throw error;
  }
};

export const riderStatus = async (id: number, data: any) => {
  try {
    const { data: status } = await httpClient.put(
      `user/api/uses/${id}/status`,
      data
    );
    return status;
  } catch (error) {
    console.error("Failed to get rider status", error);
    throw error;
  }
}

export const riderUpdateProfile = async (data: any) => {
  try {
    const { data: profile } = await httpClient.put(
      `user/api/users/profile/rider`,
      data
    );
    return profile;
  } catch (error) {
    console.error("Failed to update rider profile", error);
    throw error;
  }
}
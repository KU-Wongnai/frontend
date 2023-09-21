import axios from "axios";

// Common Axios Configuration
const axiosConfig = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const registerUser = async (data: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_USER_API_URL}register`,
      data,
      axiosConfig
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "An error occurred during registration"
    );
  }
};

export const loginUser = async (data: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_USER_API_URL}api/auth/login`,
      data,
      axiosConfig
    );
    return response.data.access_token;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

export const googleAuth = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_USER_API_URL}api/auth/google`,
      axiosConfig
    );
    return response.data.access_token;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "An error occurred");
  }
};

export const logoutUser = async (token: string) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_USER_API_URL}api/auth/logout`,
      {},
      config
    );
    if (response.data.message === "Successfully logged out") {
      return true;
    }
    return false;
  } catch (error) {
    throw new Error("Failed to logout");
  }
};
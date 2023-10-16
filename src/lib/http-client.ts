import useAuthStore from "@/contexts/auth-store";
import { refreshToken } from "@/services/auth";
import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_GATEWAY_URL;

export const httpClient = axios.create({
  baseURL: API_URL,
});

// Get token from local storage
function getToken() {
  try {
    const token = JSON.parse(localStorage.getItem("auth") || "").state.token;
    return token || null;
  } catch (e) {
    console.error("Failed to parse auth object from local storage:", e);
    return null;
  }
}

// Add a response interceptor to handle token expiration
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 and not a retry request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        await refreshToken();  // refresh the token
        // Resend the request with new token
        const token = getToken();
        if (token) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return httpClient(originalRequest);
        }
      } catch (refreshError) {
        console.error("Failed to refresh token", refreshError);
        useAuthStore.getState().clearAuth();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
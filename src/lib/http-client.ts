import { useAuthStore } from "@/contexts/auth-store";
import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_GATEWAY_URL;

export const httpClient = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to attach token
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    // If token is available, set Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
import { API_URL, httpClient } from "@/lib/http-client";
import { LoginForm, RegisterForm } from "@/validations/auth-schema";
import { useAuthStore } from "../contexts/auth-store";

export const signUp = async (data: RegisterForm) => {
  try {
    const { data: user } = await httpClient.post("user/register", data);
    return user;
  } catch (error) {
    console.error("Failed to sign up", error);
    throw error;
  }
};

export const login = async (data: LoginForm) => {
  try {
    const { data: token } = await httpClient.post("user/api/auth/login", data);
    localStorage.setItem("token", token.access_token);
  } catch (error) {
    console.error("Failed to login", error);
    throw error;
  }
};

export const redirectToGoogleOAuth = async () => {
  window.location.href = `${API_URL}user/api/auth/google`;
};

export const logout = async () => {
  try {
    await httpClient.post("user/api/auth/logout");
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Failed to log out", error);
    throw error;
  }
};

export const getMe = async () => {
  try {
    const { data: user } = await httpClient.post("user/api/users/me");
    useAuthStore.getState().setUser(user);
  } catch (error) {
    console.error("Failed to get user", error);
    throw error;
  }
};

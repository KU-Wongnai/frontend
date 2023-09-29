import { API_URL, httpClient } from "@/lib/http-client";
import { LoginForm, RegisterForm } from "@/validations/auth-schema";

export const signUp = async (data: RegisterForm) => {
  const { data: user } = await httpClient.post("user/register", data);
  return user;
};

export const login = async (data: LoginForm) => {
  const { data: token } = await httpClient.post("user/api/auth/login", data);
  localStorage.setItem("token", token.access_token);
};

export const redirectToGoogleOAuth = async () => {
  window.location.href = `${API_URL}user/api/auth/google`;
};

export const logout = async () => {
  try {
    const _token = localStorage.getItem("token");
    await httpClient.post(
      "user/api/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${_token}`,
        },
      }
    );
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Failed to log out", error);
  }
};

export const getMe = async () => {
  const _token = localStorage.getItem("token");
  const { data: user } = await httpClient.get("user/api/users/me", {
    headers: {
      Authorization: `Bearer ${_token}`,
    },
  });
  return user;
};

import create from "zustand";
import { AuthState } from "./interfaces/auth";

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  user: null,
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },
  setUser: (user) => set({ user }),
  clearToken: () => {
    localStorage.removeItem("token");
    set({ token: null });
  },
  clearUser: () => set({ user: null }),
  clearAuth: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
  },
}));

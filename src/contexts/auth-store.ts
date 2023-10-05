import { create } from "zustand";
import { AuthState } from "./interfaces/auth";

export const useAuthStore = create<AuthState>((set) => ({
  token: null,

  user: null,

  setToken: (token) => set({ token }),
  clearUser: () => set({ user: null }),
  
  setUser: (user) => set({ user }),
  clearToken: () => set({ token: null }),
  
  clearAuth: () => set({ token: null, user: null }),
}));

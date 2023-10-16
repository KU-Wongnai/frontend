import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/user";

interface AuthState {
  token: string | null;
  user: User | null;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  clearToken: () => void;
  clearUser: () => void;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      setToken: (token: string) => set({ token }),
      clearUser: () => set({ user: null }),
      setUser: (user: User) => set({ user }),
      clearToken: () => set({ token: null }),
      clearAuth: () => set({ token: null, user: null }),
    }),
    {
      name: "auth",
    }
  )
);

export default useAuthStore;

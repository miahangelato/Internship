"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/src/types/user";

type AuthState = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);

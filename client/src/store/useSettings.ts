"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSettings = create<{
  locale: "en" | "ja";
  setLocale: (l: "en" | "ja") => void;
}>()(
  persist((set) => ({ locale: "en", setLocale: (l) => set({ locale: l }) }), {
    name: "app-settings",
  })
);

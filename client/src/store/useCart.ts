"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { menuItems } from "@/src/data/menu";

type MenuItem = (typeof menuItems)[number];

export type CartItem = {
  id: number;
  price: number;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: MenuItem, qty: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  removeItem: (id: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item, qty) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + qty } : i
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                id: item.id,
                price: item.price,
                image: item.image,
                quantity: qty,
              },
            ],
          };
        }),

      updateQuantity: (id, qty) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(1, qty) } : i
          ),
        })),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      clear: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);

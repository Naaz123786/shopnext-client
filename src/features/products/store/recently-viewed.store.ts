import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../api/product.service";

type RecentlyViewedState = {
  items: Product[];
  addViewedItem: (item: Product) => void;
  clearHistory: () => void;
};

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      items: [],
      addViewedItem: (item) =>
        set((state) => {
          // Remove if it already exists to put it at the front
          const filtered = state.items.filter((i) => i.id !== item.id);
          // Keep only the 6 most recent
          return { items: [item, ...filtered].slice(0, 6) };
        }),
      clearHistory: () => set({ items: [] }),
    }),
    {
      name: "shopnext-recently-viewed",
    }
  )
);

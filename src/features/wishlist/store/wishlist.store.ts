import { create } from "zustand";
import { persist } from "zustand/middleware";

export type WishlistItem = {
  productId: number;
  name: string;
  price: number;
  imageUrl?: string;
  categoryName?: string;
};

type WishlistState = {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (productId: number) => void;
  toggleItem: (item: WishlistItem) => void;
  isWishlisted: (productId: number) => boolean;
  clearWishlist: () => void;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          if (state.items.some((i) => i.productId === item.productId)) return state;
          return { items: [...state.items, item] };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),
      toggleItem: (item) =>
        set((state) => {
          const exists = state.items.some((i) => i.productId === item.productId);
          if (exists) {
            return { items: state.items.filter((i) => i.productId !== item.productId) };
          }
          return { items: [...state.items, item] };
        }),
      isWishlisted: (productId) => get().items.some((i) => i.productId === productId),
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "shopnext-wishlist",
    }
  )
);

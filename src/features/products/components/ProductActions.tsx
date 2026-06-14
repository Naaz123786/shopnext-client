"use client";

import { ShoppingCart, Zap, Heart } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Product } from "../../api/product.service";
import { useCartStore } from "@/features/cart/store/cart.store";
import { useWishlistStore } from "@/features/wishlist/store/wishlist.store";

export default function ProductActions({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const { toggleItem, isWishlisted } = useWishlistStore();
  
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="mt-8">
      <div className="grid gap-3 sm:grid-cols-2">
        <button 
          onClick={() => {
            addItem({
              productId: product.id,
              name: product.name,
              price: product.price,
              imageUrl: product.imageUrl,
              categoryName: product.categoryName,
            });
            toast.success("Added to cart");
          }}
          className="flex items-center justify-center gap-2 rounded-2xl bg-[#0B1220] dark:bg-zinc-800 px-6 py-4 font-semibold text-white transition hover:bg-black dark:hover:bg-zinc-700"
        >
          <ShoppingCart size={20} />
          Add to Cart
        </button>

        <Link
          href="/login?redirect=/checkout"
          className="flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-6 py-4 font-semibold text-black transition hover:bg-amber-500"
        >
          <Zap size={20} />
          Buy Now
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button 
          onClick={() => {
            toggleItem({
              productId: product.id,
              name: product.name,
              price: product.price,
              imageUrl: product.imageUrl,
              categoryName: product.categoryName,
            });
            if (!wishlisted) {
              toast.success("Added to wishlist");
            } else {
              toast("Removed from wishlist");
            }
          }}
          className="flex items-center justify-center gap-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm font-medium transition hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
        >
          <Heart size={18} className={`transition ${wishlisted ? "fill-red-500 text-red-500" : "text-zinc-600 dark:text-zinc-400"}`} />
          {wishlisted ? "Wishlisted" : "Add to Wishlist"}
        </button>

        <button className="rounded-2xl border border-zinc-200 dark:border-zinc-800 px-4 py-3 text-sm font-medium transition hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
          Share Product
        </button>
      </div>
    </div>
  );
}

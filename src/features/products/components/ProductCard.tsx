"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "@/features/cart/store/cart.store";
import { useWishlistStore } from "@/features/wishlist/store/wishlist.store";

import { createProductSlug } from "@/lib/slug";
import { useEffect, useState } from "react";
import { Product } from "../api/product.service";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const cartItems = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  
  const wishlistItems = useWishlistStore((state) => state.items);
  const toggleItem = useWishlistStore((state) => state.toggleItem);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const cartItem = cartItems.find((i) => i.productId === product.id);
  const quantityInCart = cartItem?.quantity || 0;
  const wishlisted = wishlistItems.some((i) => i.productId === product.id);

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition hover:shadow-lg dark:hover:shadow-zinc-900/50 sm:rounded-3xl relative"
    >
      {/* Only show 'New' badge if product is marked as isNew or has a high rating as a proxy if we don't have isNew */}
      {(product.isNew || (product.averageRating && product.averageRating >= 4.8)) && (
        <div className="absolute top-3 left-3 z-10 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black">
          New
        </div>
      )}
      <Link href={`/products/${createProductSlug(product.name, product.id)}`}>
        <div className="relative overflow-hidden bg-zinc-100">
          <div className="relative aspect-[4/4]">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            ) : (
              <div className="h-full w-full bg-zinc-100" />
            )}
          </div>

          <button 
            onClick={(e) => {
              e.preventDefault();
              toggleItem({
                productId: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                categoryName: product.categoryName,
              });
            }}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm sm:right-4 sm:top-4 sm:h-10 sm:w-10 hover:bg-white"
          >
            <Heart 
              size={15} 
              className={`sm:size-[18px] transition ${mounted && wishlisted ? "fill-red-500 text-red-500" : "text-zinc-600"}`} 
            />
          </button>
        </div>
      </Link>

      <div className="p-3 sm:p-5">
        <p className="line-clamp-1 text-[11px] text-zinc-500 sm:text-sm">
          {product.categoryName ?? "Product"}
        </p>

       <Link href={`/products/${createProductSlug(product.name, product.id)}`}>
          <h3 className="mt-1 line-clamp-2 min-h-[38px] text-sm font-semibold leading-5 text-zinc-900 dark:text-zinc-100 transition hover:text-amber-600 dark:hover:text-amber-500 sm:mt-2 sm:min-h-[52px] sm:text-lg sm:leading-6">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-1 sm:mt-3">
          <Star size={13} className="fill-amber-400 text-amber-400 sm:size-[15px]" />
          <span className="text-xs font-medium text-zinc-700 sm:text-sm">
            {product.averageRating ?? 0}
          </span>
          <span className="hidden text-xs text-zinc-400 sm:inline">
            ({product.reviewCount ?? 0})
          </span>
        </div>

        <div className="mt-2 flex items-center gap-2 sm:mt-4">
          <span className="text-lg font-bold text-zinc-900 dark:text-white sm:text-2xl">
            ₹{product.price}
          </span>
          {/* Discount display */}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-zinc-400 line-through sm:text-sm">
              ₹{product.originalPrice}
            </span>
          )}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="rounded-md bg-green-100 dark:bg-green-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-green-700 dark:text-green-500 sm:text-xs">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>

        {mounted && quantityInCart > 0 ? (
          <div className="mt-3 flex w-full items-center justify-between rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-1 sm:mt-5 sm:rounded-2xl">
            <button
              onClick={() => {
                if (quantityInCart === 1) removeItem(product.id);
                else updateQuantity(product.id, quantityInCart - 1);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm transition hover:bg-zinc-100 dark:hover:bg-zinc-700 sm:h-10 sm:w-10"
            >
              -
            </button>
            <span className="text-sm font-bold text-zinc-900 dark:text-white sm:text-base">
              {quantityInCart}
            </span>
            <button
              onClick={() => updateQuantity(product.id, quantityInCart + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm transition hover:bg-zinc-100 dark:hover:bg-zinc-700 sm:h-10 sm:w-10"
            >
              +
            </button>
          </div>
        ) : (
          <button 
            onClick={() => addItem({
              productId: product.id,
              name: product.name,
              price: product.price,
              imageUrl: product.imageUrl,
              categoryName: product.categoryName,
            })}
            className="mt-3 flex w-full items-center justify-center gap-1 rounded-xl bg-[#0B1220] dark:bg-white px-3 py-2 text-xs font-medium text-white dark:text-black transition hover:bg-black dark:hover:bg-zinc-100 sm:mt-5 sm:gap-2 sm:rounded-2xl sm:py-3 sm:text-base"
          >
            <ShoppingCart size={15} className="sm:size-[18px]" />
            Add
          </button>
        )}
      </div>
    </motion.div>
  );
}
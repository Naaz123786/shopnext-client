"use client";

import { useEffect, useState } from "react";
import { useRecentlyViewedStore } from "@/features/products/store/recently-viewed.store";
import ProductCard from "@/features/products/components/ProductCard";

export default function RecentlyViewed() {
  const { items } = useRecentlyViewedStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || items.length === 0) return null;

  return (
    <section className="py-12 bg-zinc-50 dark:bg-zinc-900/30">
      <div className="mx-auto w-full xl:w-[75%] px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl">
            Recently Viewed
          </h2>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {items.map((item) => (
            <div key={item.id} className="min-w-[240px] sm:min-w-[280px] snap-start">
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

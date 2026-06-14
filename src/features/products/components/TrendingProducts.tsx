"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "../api/product.service";

export default function TrendingProducts({ products }: { products: Product[] }) {
  if (!products || products.length === 0) return null;

  // Simulate trending by taking a different slice of products
  const trending = products.slice(2, 6);

  return (
    <section className="py-16 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800 transition-colors">
      <div className="mx-auto w-full xl:w-[75%] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black text-zinc-900 dark:text-white">Trending Now</h2>
          <p className="mt-2 text-zinc-500">Best sellers this week</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trending.map((product, idx) => (
            <Link 
              key={product.id} 
              href={`/products/${product.id}`}
              className="group flex flex-col gap-4 p-4 rounded-3xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-white dark:hover:bg-zinc-900 hover:shadow-xl transition-all duration-300 relative"
            >
              {/* Rank Badge */}
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-amber-400 text-black font-black flex items-center justify-center shadow-lg border-2 border-white dark:border-zinc-950 z-10">
                {idx + 1}
              </div>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                {product.imageUrl && (
                  <Image 
                    src={product.imageUrl} 
                    alt={product.name} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-110" 
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                )}
              </div>

              <div className="flex flex-col flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-amber-500 mb-1">{product.categoryName}</p>
                <h3 className="font-bold text-sm text-zinc-900 dark:text-white line-clamp-2 mb-2 group-hover:text-amber-500 transition-colors">
                  {product.name}
                </h3>
                <p className="text-lg font-black text-zinc-900 dark:text-white mt-auto">₹{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

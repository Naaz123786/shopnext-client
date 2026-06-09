"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Category } from "../api/category.service";

type CategoryNavProps = {
  categories: Category[];
};

export default function CategoryNav({ categories }: CategoryNavProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategoryId = searchParams.get("categoryId");

  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-colors">
      <div className="mx-auto flex w-full xl:w-[75%] items-center gap-3 overflow-x-auto px-4 sm:px-6 lg:px-8 py-3 scrollbar-hide sm:gap-6">
        <button
          onClick={() => router.push("/")}
          className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium sm:text-sm transition ${
            !currentCategoryId
              ? "bg-[#0B1220] dark:bg-white text-white dark:text-black"
              : "border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          }`}
        >
          All Products
        </button>

        {categories.map((category) => {
          const isActive = currentCategoryId === String(category.id);
          return (
            <button
              key={category.id}
              onClick={() => router.push(`/products?categoryId=${category.id}`)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition sm:text-sm ${
                isActive
                  ? "bg-[#0B1220] dark:bg-amber-500 text-white dark:text-black border-transparent"
                  : "border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
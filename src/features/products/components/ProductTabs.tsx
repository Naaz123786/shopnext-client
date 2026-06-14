"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Product } from "../api/product.service";

type ProductTabsProps = {
  product: Product;
};

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "reviews", label: `Reviews (${product.reviewCount ?? 0})` },
  ];

  return (
    <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-8">
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto border-b border-zinc-200 dark:border-zinc-800 hide-scrollbar mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap px-1 py-4 mr-8 text-sm font-semibold transition-colors relative ${
              activeTab === tab.id
                ? "text-amber-500"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-amber-500 rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[200px]">
        {activeTab === "description" && (
          <div className="prose dark:prose-invert max-w-none text-sm text-zinc-600 dark:text-zinc-400">
            <p className="leading-7">
              {product.description ??
                "Premium quality product designed for modern users with a smooth shopping experience. Meticulously crafted from high-quality materials to ensure durability and lasting style."}
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-5">
              <li>High-quality materials</li>
              <li>Durable and long-lasting</li>
              <li>Modern, sleek design</li>
              <li>Perfect for everyday use</li>
            </ul>
          </div>
        )}

        {activeTab === "specifications" && (
          <div className="text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400">Brand</span>
                <span className="font-medium text-zinc-900 dark:text-white">ShopNext</span>
              </div>
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400">Category</span>
                <span className="font-medium text-zinc-900 dark:text-white">{product.categoryName ?? "General"}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400">Weight</span>
                <span className="font-medium text-zinc-900 dark:text-white">500g</span>
              </div>
              <div className="flex justify-between py-2 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-500 dark:text-zinc-400">Warranty</span>
                <span className="font-medium text-zinc-900 dark:text-white">1 Year</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start mb-8">
              <div className="text-center sm:text-left">
                <p className="text-5xl font-bold text-zinc-900 dark:text-white">{product.averageRating ?? 0}</p>
                <div className="flex items-center gap-1 mt-2 text-amber-400">
                  <Star className="fill-current" size={16} />
                  <Star className="fill-current" size={16} />
                  <Star className="fill-current" size={16} />
                  <Star className="fill-current" size={16} />
                  <Star className="text-zinc-300 dark:text-zinc-700" size={16} />
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Based on {product.reviewCount ?? 0} reviews</p>
              </div>
              <div className="flex-1 w-full max-w-sm space-y-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-2 text-sm">
                    <span className="w-4 text-zinc-500">{star}</span>
                    <Star size={12} className="text-zinc-400" />
                    <div className="flex-1 h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-400 rounded-full" 
                        style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : 5}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {[1, 2].map((i) => (
                <div key={i} className="border-t border-zinc-100 dark:border-zinc-800 pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                        U{i}
                      </div>
                      <span className="font-semibold text-sm text-zinc-900 dark:text-white">User {i}</span>
                    </div>
                    <span className="text-xs text-zinc-500">2 days ago</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2 text-amber-400">
                    <Star className="fill-current" size={12} />
                    <Star className="fill-current" size={12} />
                    <Star className="fill-current" size={12} />
                    <Star className="fill-current" size={12} />
                    <Star className="fill-current" size={12} />
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Amazing product! Exactly what I was looking for. The quality is exceptional and delivery was very fast. Highly recommend!
                  </p>
                </div>
              ))}
            </div>
            
            <button className="mt-8 w-full sm:w-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-6 py-3 text-sm font-semibold text-zinc-900 dark:text-white transition hover:bg-zinc-50 dark:hover:bg-zinc-900 shadow-sm">
              Write a Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { Product } from "../api/product.service";
import { motion, AnimatePresence } from "framer-motion";

type FeaturedProductsProps = {
  products: Product[];
};

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map(p => p.categoryName || "Other"));
    return ["All", ...Array.from(uniqueCategories)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return products.slice(0, 8);
    return products.filter(p => (p.categoryName || "Other") === activeCategory).slice(0, 8);
  }, [activeCategory, products]);

  if (!products.length) {
    return (
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl">
            Featured Products
          </h2>
          <p className="mt-4 text-zinc-500">No products available at the moment.</p>
        </div>
      </section>
    );
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
    exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.2 } }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#F8F8F8] dark:bg-black transition-colors" id="featured-products">
      <div className="mx-auto w-full xl:w-[75%] px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 tracking-tight">
              Featured Products
            </h2>
            <p className="mt-2 text-sm text-zinc-500 sm:text-lg">
              Latest products picked for you
            </p>
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-[#0B1220] dark:bg-white text-white dark:text-black shadow-[0_0_15px_rgba(251,191,36,0.3)] border-amber-400 dark:border-amber-400 border"
                    : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div 
                key={product.id} 
                variants={itemVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                layout
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/products"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-4 px-8 font-semibold text-white dark:text-black"
          >
            <span className="absolute inset-0 h-full w-full bg-[#0B1220] dark:bg-white"></span>
            <span className="absolute bottom-0 left-0 h-full w-full translate-y-full bg-amber-400 transition-all duration-300 ease-out group-hover:translate-y-0"></span>
            <span className="relative flex items-center gap-2">
              View All Products
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
"use client";

import Link from "next/link";
import ProductCard from "./ProductCard";
import { Product } from "../api/product.service";
import { motion } from "framer-motion";

type FeaturedProductsProps = {
  products: Product[];
};

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <section className="py-12 sm:py-16 bg-[#F8F8F8] dark:bg-black transition-colors">
      <div className="mx-auto w-full xl:w-[75%] px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-6 flex items-end justify-between"
        >
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl">
              Featured Products
            </h2>
            <p className="mt-1 text-sm text-zinc-500 sm:text-base">
              Latest products picked for you
            </p>
          </div>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4"
        >
          {products.slice(0, 8).map((product) => (
            <motion.div key={product.id} variants={item}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 flex justify-center"
        >
          <Link
            href="/products"
            className="rounded-2xl bg-[#0B1220] dark:bg-amber-500 px-7 py-3 text-sm font-semibold text-white dark:text-black transition hover:bg-black dark:hover:bg-amber-400"
          >
            View More Products
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
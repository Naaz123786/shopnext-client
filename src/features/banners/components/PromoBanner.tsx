"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function PromoBanner() {
  const router = useRouter();

  return (
    <section className="pb-16 sm:pb-20 bg-[#F8F8F8] dark:bg-black transition-colors">
      <div className="mx-auto w-full xl:w-[75%] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] bg-[#0B1220] px-8 py-16 lg:px-20">
          {/* Animated Glow / Orbs */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-0 top-0 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl" 
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" 
          />

          <div className="relative flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
            {/* Left */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-amber-400">
                Limited Offer
              </p>

              <h2 className="text-4xl font-bold leading-tight text-white lg:text-6xl">
                Upgrade Your Setup Today
              </h2>

              <p className="mt-6 text-lg leading-8 text-zinc-300">
                Premium electronics, accessories and lifestyle products
                curated for modern users.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 text-sm font-medium text-amber-400/80">
                <span>10K+ Products</span>
                <span className="hidden sm:inline">•</span>
                <span>50K+ Customers</span>
                <span className="hidden sm:inline">•</span>
                <span>4.8★ Rating</span>
              </div>
            </motion.div>

            {/* Right */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-4 z-10"
            >
              <button 
                onClick={() => router.push('/products')}
                className="rounded-2xl bg-amber-400 px-8 py-4 font-semibold text-black transition hover:scale-105"
              >
                Shop Collection
              </button>

              <button 
                onClick={() => router.push('/products?sort=discount')}
                className="rounded-2xl border border-white/10 bg-white/10 px-8 py-4 font-medium text-white backdrop-blur transition hover:bg-white/20"
              >
                Explore Deals
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
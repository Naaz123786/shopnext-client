"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CategoryShowcase() {
  const showcaseCategories = [
    {
      id: 1,
      name: "Smartphones",
      desc: "Latest models & flagship devices",
      slug: "smartphones",
      color: "from-blue-600/80 to-indigo-900/90",
      bgClass: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      id: 2,
      name: "Cosmetics",
      desc: "Premium beauty & skincare",
      slug: "cosmetics",
      color: "from-pink-500/80 to-rose-900/90",
      bgClass: "bg-pink-50 dark:bg-pink-900/20"
    },
    {
      id: 3,
      name: "Laptops",
      desc: "High performance machines",
      slug: "laptops",
      color: "from-emerald-500/80 to-teal-900/90",
      bgClass: "bg-emerald-50 dark:bg-emerald-900/20"
    }
  ];

  return (
    <section className="py-12 sm:py-20 bg-white dark:bg-zinc-950 transition-colors">
      <div className="mx-auto w-full xl:w-[75%] px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-8 flex items-end justify-between"
        >
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl">
              Shop by Category
            </h2>
            <p className="mt-1 text-sm text-zinc-500 sm:text-base">
              Explore our wide range of collections
            </p>
          </div>
          <Link href="/products" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-amber-500 hover:text-amber-600 transition-colors">
            View All Categories <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 min-h-[500px]">
          {/* Main Large Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group"
          >
            <Link 
              href={`/products?category=${showcaseCategories[0].slug}`}
              className="relative block w-full h-full min-h-[480px] overflow-hidden rounded-[32px]"
            >
              <div className={`absolute inset-0 ${showcaseCategories[0].bgClass}`} />
              <div className={`absolute inset-0 bg-gradient-to-tr ${showcaseCategories[0].color} opacity-90 transition-opacity duration-500 group-hover:opacity-100`} />
              
              {/* Dot Pattern Overlay */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
              
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent mix-blend-overlay" />
              
              <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12">
                <span className="mb-3 inline-block rounded-full bg-white/20 backdrop-blur px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white w-fit shadow-sm">
                  Featured Collection
                </span>
                <h3 className="text-3xl sm:text-5xl font-black text-white mb-3 tracking-tight group-hover:scale-[1.02] transition-transform origin-left">
                  {showcaseCategories[0].name}
                </h3>
                <p className="text-white/80 text-lg mb-8 max-w-md">
                  {showcaseCategories[0].desc}
                </p>
                <div className="inline-flex w-fit items-center gap-2 rounded-2xl bg-white px-8 py-4 font-bold text-black transition group-hover:bg-amber-400 shadow-xl group-hover:shadow-amber-400/30">
                  Shop {showcaseCategories[0].name}
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Right Side Stacked Cards */}
          <div className="grid grid-rows-2 gap-4 sm:gap-6">
            {showcaseCategories.slice(1).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group h-full min-h-[240px]"
              >
                <Link 
                  href={`/products?category=${category.slug}`}
                  className="relative block w-full h-full overflow-hidden rounded-[32px]"
                >
                  <div className={`absolute inset-0 ${category.bgClass}`} />
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-90 transition-opacity duration-500 group-hover:opacity-100`} />
                  
                  {/* Dot Pattern Overlay */}
                  <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />

                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent mix-blend-overlay" />

                  <div className="absolute inset-0 flex flex-col justify-center p-8 sm:p-10">
                    <h3 className="text-2xl sm:text-4xl font-black text-white mb-2 tracking-tight group-hover:translate-x-2 transition-transform">
                      {category.name}
                    </h3>
                    <p className="text-white/80 mb-6">
                      {category.desc}
                    </p>
                    <div className="inline-flex w-fit items-center gap-2 rounded-xl bg-white/20 backdrop-blur border border-white/30 px-6 py-3 font-semibold text-white transition group-hover:bg-white group-hover:text-black shadow-lg">
                      Explore
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 sm:hidden flex justify-center">
          <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold text-amber-500">
            View All Categories <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

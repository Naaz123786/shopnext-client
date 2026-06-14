"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../../products/api/product.service";

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4 mt-6 mb-2">
      {[
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds }
      ].map((item, i) => (
        <div key={item.label} className="flex flex-col items-center">
          <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-white/10 backdrop-blur border border-white/20 text-2xl font-bold text-white shadow-lg">
            {item.value.toString().padStart(2, '0')}
          </div>
          <span className="mt-2 text-xs font-medium uppercase tracking-wider text-amber-400">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function PromoBanner({ products = [] }: { products?: Product[] }) {
  const router = useRouter();
  
  const saleProducts = products.slice(0, 3);

  return (
    <section className="pb-16 sm:pb-24 bg-[#F8F8F8] dark:bg-black transition-colors">
      <div className="mx-auto w-full xl:w-[75%] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] bg-[#0B1220] px-8 py-16 lg:px-20 lg:py-20 shadow-2xl">
          {/* Animated Glow / Orbs */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-0 top-0 h-96 w-96 rounded-full bg-amber-500/20 blur-[100px]" 
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-blue-500/20 blur-[100px]" 
          />
          
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

          <div className="relative flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-center">
            {/* Left */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-1.5 border border-red-500/20 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <p className="text-xs font-bold uppercase tracking-wider text-red-400">
                  Ends Soon
                </p>
              </div>

              <h2 className="text-4xl font-black leading-[1.1] text-white lg:text-6xl tracking-tight">
                Exclusive Deals.<br />Limited Time Only.
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-zinc-300 max-w-xl">
                Get up to 40% off on premium electronics, accessories, and lifestyle products. Don't miss out on these incredible savings.
              </p>

              <CountdownTimer />

            </motion.div>

            {/* Right */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col gap-4 z-10 w-full sm:w-auto"
            >
              <button 
                onClick={() => router.push('/products')}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-amber-400 px-8 py-4 font-bold text-black transition hover:scale-[1.02] shadow-[0_0_20px_rgba(251,191,36,0.3)] w-full sm:w-auto"
              >
                <span className="relative flex items-center gap-2">
                  Claim Your Discount
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </span>
              </button>

              <p className="text-center text-sm font-medium text-zinc-400 mt-2 mb-8 lg:mb-0">
                No promo code needed.
              </p>
            </motion.div>

            {/* Sale Products */}
            {saleProducts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 w-full lg:w-auto"
              >
                {saleProducts.map((product) => (
                  <Link 
                    href={`/products/${product.id}`} 
                    key={product.id}
                    className="group bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-3 flex flex-col gap-3 transition-colors"
                  >
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-zinc-900 border border-white/5">
                      {product.imageUrl && (
                        <Image 
                          src={product.imageUrl} 
                          alt={product.name} 
                          fill 
                          className="object-cover transition duration-500 group-hover:scale-110" 
                          sizes="150px"
                        />
                      )}
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                        {product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 30}% OFF
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400 line-clamp-1">{product.categoryName}</p>
                      <h3 className="text-sm font-medium text-white line-clamp-1 group-hover:text-amber-400 transition-colors">{product.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-bold text-amber-400">₹{product.price}</span>
                        <span className="text-xs text-zinc-500 line-through">₹{product.originalPrice || Math.round(product.price * 1.3)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
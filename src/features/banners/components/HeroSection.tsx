"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Banner } from "../api/banner.service";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

type HeroSectionProps = {
  banners: Banner[];
};

export default function HeroSection({ banners }: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const activeBanners = banners.filter((banner) => banner.isActive);

  useEffect(() => {
    if (activeBanners.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % activeBanners.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [activeBanners.length]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % activeBanners.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) =>
      prev === 0 ? activeBanners.length - 1 : prev - 1
    );
  };

  const slideContent = [
    {
      badge: "New Collection",
      title: "Upgrade Your Shopping Experience",
      desc: "Discover premium products, exclusive offers, and a smooth modern ecommerce experience built for every device."
    },
    {
      badge: "Limited Edition",
      title: "Elevate Your Everyday Style",
      desc: "Explore our latest arrivals featuring premium materials and modern designs crafted for your lifestyle."
    },
    {
      badge: "Special Offer",
      title: "Unbeatable Deals on Tech",
      desc: "Get up to 40% off on top electronics and gadgets. Limited time offers you don't want to miss."
    }
  ];

  if (!activeBanners.length) return null;

  const currentContent = slideContent[activeIndex % slideContent.length];

  return (
    <section className="bg-[#F8F8F8] dark:bg-black py-4 sm:py-6">
      <div className="mx-auto w-full xl:w-[75%] px-4 sm:px-6 lg:px-8">
        <div className="relative min-h-[480px] overflow-hidden rounded-[28px] bg-[#0B1220] shadow-xl lg:min-h-[540px] lg:rounded-[36px]">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={activeBanners[activeIndex].imageUrl}
                alt="ShopNext banner"
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          <div className="relative z-10 flex min-h-[480px] items-center px-6 py-10 sm:px-10 lg:min-h-[540px] lg:px-20">
            <div className="max-w-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400 sm:mb-4 sm:text-sm">
                    {currentContent.badge}
                  </p>

                  <h1 className="max-w-3xl text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-7xl">
                    {currentContent.title}
                  </h1>

                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-200 sm:mt-6 sm:text-lg sm:leading-8">
                    {currentContent.desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-6 flex flex-col gap-3 sm:mt-10 sm:flex-row"
              >
                <button 
                  onClick={() => router.push('/products')}
                  className="rounded-full bg-amber-400 px-7 py-3 text-sm font-semibold text-black shadow-xl transition hover:scale-105 sm:px-9 sm:py-4 sm:text-base"
                >
                  Shop Now
                </button>

                <button 
                  onClick={() => {
                    const el = document.getElementById("featured-products");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    else router.push('/products');
                  }}
                  className="rounded-full border border-white/20 bg-white/10 px-7 py-3 text-sm font-medium text-white shadow-xl backdrop-blur transition hover:bg-white/20 sm:px-9 sm:py-4 sm:text-base"
                >
                  Explore Deals
                </button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-8 hidden max-w-md items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur lg:flex"
              >
                <div className="flex -space-x-3">
                  <div className="h-10 w-10 rounded-full border-2 border-white bg-zinc-300" />
                  <div className="h-10 w-10 rounded-full border-2 border-white bg-zinc-400" />
                  <div className="h-10 w-10 rounded-full border-2 border-white bg-zinc-500" />
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    Trusted by 20K+ customers
                  </p>

                  <p className="text-xs text-zinc-300">
                    Premium products with fast delivery
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {activeBanners.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white backdrop-blur transition hover:bg-black/50 sm:flex"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white backdrop-blur transition hover:bg-black/50 sm:flex"
              >
                <ChevronRight size={22} />
              </button>

              <div className="absolute bottom-0 left-0 right-0 z-20 flex h-1.5 bg-white/20">
                {activeBanners.map((banner, index) => (
                  <div
                    key={banner.id}
                    className="h-full flex-1 relative overflow-hidden"
                  >
                    {index === activeIndex && (
                      <motion.div
                        key={`progress-${activeIndex}`}
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 4.5, ease: "linear" }}
                        className="absolute left-0 top-0 h-full bg-amber-400"
                      />
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
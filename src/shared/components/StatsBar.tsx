"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Users, Star, LayoutGrid, Truck } from "lucide-react";
import { useRef } from "react";

// CountUp component
function CountUp({ end, suffix = "", duration = 1.5 }: { end: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function: easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  // Special handling for the rating which is a float
  const displayValue = end === 4.8 ? (count === 4 ? "4.8" : count.toString()) : count.toString();

  return <span ref={ref}>{displayValue}{suffix}</span>;
}

export default function StatsBar() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const stats = [
    { label: "Happy Customers", end: 20000, suffix: "+", icon: Users },
    { label: "Average Rating", end: 4.8, suffix: "★", icon: Star },
    { label: "Premium Categories", end: 100, suffix: "+", icon: LayoutGrid },
    { label: "Free Shipping", end: 1, suffix: "", isText: true, textValue: "Always", icon: Truck },
  ];

  if (!hasMounted) return null;

  return (
    <section className="bg-white dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-800 py-6 sm:py-8 transition-colors relative z-10">
      <div className="mx-auto w-full xl:w-[75%] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center justify-center text-center px-4 py-6 rounded-2xl bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900/50 dark:to-zinc-950/20 border border-zinc-100 dark:border-zinc-800/50"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-500 shadow-sm">
                  <Icon size={24} />
                </div>
                <h4 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight mb-1">
                  {stat.isText ? stat.textValue : <CountUp end={stat.end} suffix={stat.suffix} />}
                </h4>
                <p className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

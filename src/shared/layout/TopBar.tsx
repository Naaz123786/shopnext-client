"use client";

import { ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

export default function TopBar() {
  return (
    <div className="hidden border-b border-zinc-800 bg-[#0B1220] dark:bg-black text-zinc-300 lg:block overflow-hidden whitespace-nowrap">
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "-100%" }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 30,
        }}
        className="mx-auto flex items-center px-4 py-2 text-sm gap-24"
      >
        <div className="flex items-center gap-24 shrink-0">
          <div className="flex items-center gap-2.5">
            <Truck size={16} className="text-amber-500" />
            <span>Free shipping on orders over ₹999</span>
          </div>

          <div className="flex items-center gap-2.5">
            <RotateCcw size={16} className="text-amber-500" />
            <span>30 Days Easy Returns</span>
          </div>
          
          <div className="flex items-center gap-2.5">
            <ShieldCheck size={16} className="text-amber-500" />
            <span>Secure Payment</span>
          </div>
        </div>

        {/* Duplicate for seamless looping */}
        <div className="flex items-center gap-24 shrink-0">
          <div className="flex items-center gap-2.5">
            <Truck size={16} className="text-amber-500" />
            <span>Free shipping on orders over ₹999</span>
          </div>

          <div className="flex items-center gap-2.5">
            <RotateCcw size={16} className="text-amber-500" />
            <span>30 Days Easy Returns</span>
          </div>
          
          <div className="flex items-center gap-2.5">
            <ShieldCheck size={16} className="text-amber-500" />
            <span>Secure Payment</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
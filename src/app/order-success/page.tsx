"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import Footer from "@/shared/layout/Footer";

export default function OrderSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const orderId = searchParams.get("id");

  useEffect(() => {
    setMounted(true);
    if (!orderId) {
      router.push("/");
    }
  }, [orderId, router]);

  if (!mounted || !orderId) return null;

  return (
    <main className="min-h-screen bg-[#F8F8F8] dark:bg-black text-zinc-900 dark:text-zinc-100 flex flex-col transition-colors">
      <div className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        
        <div className="bg-white dark:bg-zinc-950 p-8 sm:p-12 rounded-[40px] shadow-xl border border-zinc-200 dark:border-zinc-800 text-center max-w-lg w-full relative overflow-hidden">
          
          {/* Confetti / Decoration Background */}
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-green-50 to-transparent dark:from-green-900/20 dark:to-transparent -z-10" />
          
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-500 mb-8 animate-bounce-short">
            <CheckCircle size={48} />
          </div>

          <h1 className="text-3xl sm:text-4xl font-black mb-4 text-zinc-900 dark:text-white">Order Confirmed!</h1>
          
          <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-lg">
            Thank you for your purchase. We've received your order and are getting it ready for shipment.
          </p>

          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-6 mb-8 border border-zinc-100 dark:border-zinc-800">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Order Reference</p>
            <p className="font-mono text-xl font-bold text-zinc-900 dark:text-white mb-4">{orderId}</p>
            
            <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800 my-4" />
            
            <p className="text-sm text-zinc-600 dark:text-zinc-400 flex items-center justify-center gap-2">
              <Package size={16} /> Estimated delivery: <span className="font-semibold text-zinc-900 dark:text-white">3-5 business days</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/orders" 
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border-2 border-zinc-200 dark:border-zinc-800 px-6 py-4 font-semibold transition hover:border-zinc-900 dark:hover:border-white hover:bg-zinc-50 dark:hover:bg-zinc-900"
            >
              Track Order
            </Link>
            <Link 
              href="/products" 
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#0B1220] dark:bg-amber-500 px-6 py-4 font-bold text-white dark:text-black transition hover:bg-black dark:hover:bg-amber-400 shadow-lg"
            >
              Continue Shopping <ArrowRight size={18} />
            </Link>
          </div>
        </div>

      </div>
      <Footer />
    </main>
  );
}

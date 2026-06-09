"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  };

  return (
    <section className="bg-[#F8F8F8] dark:bg-black py-12 sm:py-20 transition-colors">
      <div className="relative mx-auto w-full xl:w-[75%] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] bg-[#0B1220] px-8 py-14 shadow-2xl">
          {/* Radial gradient glow */}
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/20 blur-[100px] pointer-events-none" />

          <div className="relative mx-auto max-w-3xl text-center z-10">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-amber-500">
              Newsletter
            </p>

            <h2 className="text-4xl font-bold text-white">
              Stay Updated
            </h2>

            <p className="mt-4 text-lg text-zinc-300">
              Subscribe to get updates on new arrivals, exclusive offers,
              and premium product launches.
            </p>

            {/* Form */}
            {status === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-10 flex flex-col items-center justify-center gap-3 rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-black">
                  <Check size={24} />
                </div>
                <p className="text-lg font-medium text-white">Successfully Subscribed!</p>
                <p className="text-sm text-zinc-400">Keep an eye on your inbox.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-14 flex-1 rounded-2xl border border-white/10 bg-white/5 px-5 text-white outline-none focus:border-amber-500/50 focus:bg-white/10 transition backdrop-blur placeholder:text-zinc-500"
                />

                <button 
                  type="submit"
                  disabled={status === "loading" || !email}
                  className="h-14 rounded-2xl bg-amber-500 px-8 font-medium text-black transition hover:bg-amber-400 disabled:opacity-70 flex items-center justify-center min-w-[140px]"
                >
                  {status === "loading" ? (
                    <span className="h-5 w-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
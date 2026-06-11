"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ShieldCheck, Mail, Sparkles } from "lucide-react";

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
    <section className="bg-[#FFFBF0] dark:bg-zinc-900 py-16 sm:py-24 transition-colors">
      <div className="relative mx-auto w-full xl:w-[75%] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] bg-[#0B1220] px-8 py-16 sm:py-20 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]">
          {/* Radial gradient glow */}
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />

          <div className="relative mx-auto max-w-3xl text-center z-10">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-amber-500 font-bold">
              Newsletter
            </p>

            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Stay Updated
            </h2>

            <p className="mt-4 text-lg text-zinc-300 max-w-xl mx-auto">
              Subscribe to get updates on new arrivals, exclusive offers,
              and premium product launches.
            </p>

            {/* Form */}
            {status === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-10 flex flex-col items-center justify-center gap-3 rounded-3xl bg-white/5 border border-white/10 p-8 backdrop-blur shadow-2xl max-w-md mx-auto"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
                  <Check size={32} strokeWidth={3} />
                </div>
                <p className="text-xl font-bold text-white mt-2">Successfully Subscribed!</p>
                <p className="text-zinc-400">Keep an eye on your inbox for our next update.</p>
              </motion.div>
            ) : (
              <div className="mt-10 max-w-xl mx-auto">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="h-16 flex-1 rounded-2xl border border-white/10 bg-white/5 px-6 text-white outline-none focus:border-amber-500/50 focus:bg-white/10 transition backdrop-blur placeholder:text-zinc-500 text-lg shadow-inner"
                  />

                  <button 
                    type="submit"
                    disabled={status === "loading" || !email}
                    className="h-16 rounded-2xl bg-amber-500 px-10 font-bold text-black transition hover:bg-amber-400 disabled:opacity-70 flex items-center justify-center min-w-[160px] shadow-lg shadow-amber-500/20 text-lg hover:scale-105"
                  >
                    {status === "loading" ? (
                      <span className="h-6 w-6 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </form>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm font-medium text-zinc-400">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={18} className="text-emerald-400" />
                    No spam ever
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles size={18} className="text-amber-400" />
                    Weekly deals
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-blue-400" />
                    Early access
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
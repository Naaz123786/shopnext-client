"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const [hasMounted, setHasMounted] = useState(false);
  const phoneNumber = "1234567890"; // Dummy number, user can update later

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 group print:hidden"
      aria-label="Chat with us on WhatsApp"
    >
      <div className="relative flex items-center justify-center">
        {/* Pulse rings */}
        <div className="absolute inset-0 rounded-full bg-emerald-500 opacity-20 animate-ping" style={{ animationDuration: '2s' }} />
        <div className="absolute inset-0 rounded-full bg-emerald-500 opacity-30 animate-pulse" style={{ animationDuration: '3s' }} />
        
        {/* Main button */}
        <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-emerald-500 text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110 hover:shadow-emerald-500/30 border-2 border-white dark:border-zinc-900">
          <MessageCircle size={28} className="fill-white" />
        </div>

        {/* Tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl bg-white dark:bg-zinc-800 px-4 py-2 text-sm font-bold text-zinc-900 dark:text-white shadow-xl opacity-0 translate-x-4 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 border border-zinc-100 dark:border-zinc-700">
          Chat with us
          {/* Arrow */}
          <div className="absolute top-1/2 -right-2 -translate-y-1/2 border-8 border-transparent border-l-white dark:border-l-zinc-800" />
        </div>
      </div>
    </a>
  );
}

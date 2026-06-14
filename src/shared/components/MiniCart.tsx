"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, X, ArrowRight, Trash2 } from "lucide-react";
import { useCartStore } from "@/features/cart/store/cart.store";

export default function MiniCart({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeItem, getTotalPrice, getTotalCount, updateQuantity } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-zinc-950 shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShoppingCart size={20} />
            Your Cart
            <span className="text-sm font-medium bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded-full text-zinc-600 dark:text-zinc-300">
              {getTotalCount()}
            </span>
          </h2>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center text-zinc-400">
                <ShoppingCart size={32} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Your cart is empty</h3>
                <p className="text-zinc-500 text-sm mt-1">Looks like you haven't added anything yet.</p>
              </div>
              <button 
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-[#0B1220] dark:bg-white text-white dark:text-black font-semibold rounded-xl hover:bg-black dark:hover:bg-zinc-200 transition"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-4">
                  <div className="relative w-20 h-20 rounded-xl bg-zinc-100 dark:bg-zinc-900 overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-800">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800" />
                    )}
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-sm font-semibold text-zinc-900 dark:text-white line-clamp-2">
                          <Link href={`/products/${item.productId}`} onClick={onClose} className="hover:text-amber-500 transition-colors">
                            {item.name}
                          </Link>
                        </h4>
                        <button 
                          onClick={() => removeItem(item.productId)}
                          className="text-zinc-400 hover:text-red-500 transition-colors p-1 -mr-1 rounded-md"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-sm font-bold text-zinc-900 dark:text-white mt-1">₹{item.price}</p>
                    </div>

                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
                        <button 
                          onClick={() => { if(item.quantity > 1) updateQuantity(item.productId, item.quantity - 1); }}
                          disabled={item.quantity <= 1}
                          className="w-7 h-7 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white disabled:opacity-50"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-semibold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-zinc-600 dark:text-zinc-400 font-medium">Subtotal</span>
              <span className="text-xl font-bold text-zinc-900 dark:text-white">₹{getTotalPrice()}</span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">Shipping and taxes calculated at checkout.</p>
            
            <div className="flex gap-3 flex-col sm:flex-row">
              <Link 
                href="/cart" 
                onClick={onClose}
                className="flex-1 flex justify-center items-center px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-700 transition"
              >
                View Cart
              </Link>
              <Link 
                href="/checkout" 
                onClick={onClose}
                className="flex-1 flex justify-center items-center gap-2 px-4 py-3 rounded-xl bg-[#0B1220] dark:bg-amber-500 text-white dark:text-black font-semibold hover:bg-black dark:hover:bg-amber-400 transition"
              >
                Checkout <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

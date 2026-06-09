"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ArrowRight, ShoppingCart, Tag, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import Footer from "@/shared/layout/Footer";
import { useCartStore } from "@/features/cart/store/cart.store";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalCount, getTotalPrice, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen bg-[#F8F8F8] dark:bg-black text-zinc-900 dark:text-zinc-100 flex flex-col">
        <div className="flex-1 py-10 sm:py-16">
          <div className="mx-auto w-full xl:w-[75%] px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
            {/* Skeleton loader could go here */}
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F8F8] dark:bg-black text-zinc-900 dark:text-zinc-100 flex flex-col transition-colors">
      <div className="flex-1 py-10 sm:py-16">
        <div className="mx-auto w-full xl:w-[75%] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              Shopping Cart
              <span className="text-sm font-medium bg-zinc-200 dark:bg-zinc-800 px-3 py-1 rounded-full text-zinc-600 dark:text-zinc-300">
                {getTotalCount()} items
              </span>
            </h1>
            {items.length > 0 && (
              <button 
                onClick={clearCart} 
                className="text-sm font-medium text-red-500 hover:text-red-600 hover:underline flex items-center gap-2 px-4 py-2 rounded-xl transition hover:bg-red-50 dark:hover:bg-red-500/10 self-start sm:self-auto"
              >
                <Trash2 size={16} /> Clear Cart
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="rounded-[32px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-12 text-center shadow-xl shadow-zinc-200/20 dark:shadow-none">
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-500/10 mb-8 relative">
                <ShoppingCart size={48} className="text-amber-500" />
                <div className="absolute top-0 right-0 w-8 h-8 bg-white dark:bg-zinc-950 rounded-full flex items-center justify-center text-xl">
                  🛒
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-white">Your cart is feeling lonely</h2>
              <p className="text-zinc-500 dark:text-zinc-400 mb-10 max-w-md mx-auto">
                Looks like you haven't added anything to your cart yet. Explore our top categories and find something you love!
              </p>
              <Link href="/products" className="inline-flex items-center gap-2 rounded-2xl bg-[#0B1220] dark:bg-amber-500 px-8 py-4 font-semibold text-white dark:text-black transition hover:bg-black dark:hover:bg-amber-400 hover:scale-105 transform duration-200 shadow-lg hover:shadow-xl">
                Continue Shopping <ArrowRight size={20} />
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1.2fr_400px]">
              {/* Cart Items List */}
              <div className="space-y-5">
                {items.map((item) => (
                  <div key={item.productId} className="flex flex-col sm:flex-row gap-5 rounded-[28px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 sm:p-5 shadow-sm relative group hover:shadow-md transition-shadow">
                    
                    <button 
                      onClick={() => removeItem(item.productId)}
                      className="absolute right-4 top-4 text-zinc-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-500/10 z-10 opacity-100 lg:opacity-0 group-hover:opacity-100"
                      title="Remove Item"
                    >
                      <Trash2 size={18} />
                    </button>

                    <Link href={`/products/${item.productId}`} className="shrink-0 block">
                      <div className="relative h-28 w-28 sm:h-36 sm:w-36 overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                        {item.imageUrl ? (
                          <Image src={item.imageUrl} alt={item.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 640px) 112px, 144px" />
                        ) : (
                          <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800" />
                        )}
                      </div>
                    </Link>
                    
                    <div className="flex flex-1 flex-col justify-between py-1">
                      <div className="pr-8">
                        <p className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-1.5">{item.categoryName || "Product"}</p>
                        <h3 className="font-bold text-lg leading-tight text-zinc-900 dark:text-white mb-2">
                          <Link href={`/products/${item.productId}`} className="hover:text-amber-500 transition-colors line-clamp-2">{item.name}</Link>
                        </h3>
                        <p className="text-2xl font-bold text-zinc-900 dark:text-white">₹{item.price}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-5 sm:mt-0">
                        <div className="flex items-center gap-1 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-1 bg-zinc-50 dark:bg-zinc-900/50">
                          <button 
                            onClick={() => {
                              if(item.quantity > 1) updateQuantity(item.productId, item.quantity - 1);
                            }}
                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition shadow-sm text-zinc-600 dark:text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-bold text-sm text-zinc-900 dark:text-white">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition shadow-sm text-zinc-600 dark:text-zinc-300"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mb-0.5">Item Total</p>
                          <p className="text-lg font-bold text-zinc-900 dark:text-white">₹{item.price * item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div>
                <div className="rounded-[32px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-8 shadow-xl shadow-zinc-200/20 dark:shadow-none sticky top-24">
                  <h3 className="text-xl font-bold mb-6 text-zinc-900 dark:text-white flex items-center gap-2">
                    Order Summary
                  </h3>
                  
                  {/* Promo Code */}
                  <div className="mb-8 relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                      <Tag size={16} />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Enter promo code" 
                      className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-3 pl-10 pr-24 text-sm outline-none focus:border-amber-500 dark:focus:border-amber-500 transition-colors"
                    />
                    <button className="absolute right-2 top-2 bottom-2 bg-[#0B1220] dark:bg-white text-white dark:text-black px-4 rounded-xl text-xs font-bold hover:bg-black dark:hover:bg-zinc-200 transition">
                      Apply
                    </button>
                  </div>

                  <div className="space-y-4 text-sm mb-6">
                    <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                      <span>Subtotal ({getTotalCount()} items)</span>
                      <span className="font-medium text-zinc-900 dark:text-white">₹{getTotalPrice()}</span>
                    </div>
                    <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                      <span>Shipping</span>
                      <span className="font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded text-xs uppercase tracking-wider">Free</span>
                    </div>
                    <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                      <span>Tax</span>
                      <span className="font-medium text-zinc-900 dark:text-white">Calculated at checkout</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-dashed border-zinc-200 dark:border-zinc-800 pt-6 mb-8 relative">
                    <div className="absolute -left-10 -top-3 w-6 h-6 rounded-full bg-[#F8F8F8] dark:bg-black border-r border-zinc-200 dark:border-zinc-800" />
                    <div className="absolute -right-10 -top-3 w-6 h-6 rounded-full bg-[#F8F8F8] dark:bg-black border-l border-zinc-200 dark:border-zinc-800" />
                    
                    <div className="flex justify-between items-end">
                      <span className="text-lg font-bold text-zinc-900 dark:text-white">Total</span>
                      <span className="text-3xl font-black text-amber-500">₹{getTotalPrice()}</span>
                    </div>
                  </div>

                  <Link href="/checkout" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0B1220] dark:bg-amber-500 px-6 py-4 font-bold text-white dark:text-black transition hover:bg-black dark:hover:bg-amber-400 shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-200">
                    Proceed to Checkout <ArrowRight size={18} />
                  </Link>

                  <div className="mt-8 grid grid-cols-3 gap-2">
                    <div className="flex flex-col items-center text-center gap-2 p-2">
                      <div className="bg-zinc-100 dark:bg-zinc-900 p-2 rounded-full text-zinc-600 dark:text-zinc-400">
                        <ShieldCheck size={18} />
                      </div>
                      <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Secure<br/>Payment</span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-2 p-2">
                      <div className="bg-zinc-100 dark:bg-zinc-900 p-2 rounded-full text-zinc-600 dark:text-zinc-400">
                        <Truck size={18} />
                      </div>
                      <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Free<br/>Shipping</span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-2 p-2">
                      <div className="bg-zinc-100 dark:bg-zinc-900 p-2 rounded-full text-zinc-600 dark:text-zinc-400">
                        <RotateCcw size={18} />
                      </div>
                      <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Easy<br/>Returns</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}

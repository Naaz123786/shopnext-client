"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ShoppingCart, Heart, ArrowRight, Check } from "lucide-react";
import Footer from "@/shared/layout/Footer";
import { useWishlistStore } from "@/features/wishlist/store/wishlist.store";
import { useCartStore } from "@/features/cart/store/cart.store";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const cartItems = useCartStore((state) => state.items);
  const addItemToCart = useCartStore((state) => state.addItem);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCart = (item: any) => {
    addItemToCart({
      productId: item.productId,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      categoryName: item.categoryName,
    });
  };

  const handleMoveAllToCart = () => {
    items.forEach(item => {
      if (!cartItems.some(ci => ci.productId === item.productId)) {
        addItemToCart({
          productId: item.productId,
          name: item.name,
          price: item.price,
          imageUrl: item.imageUrl,
          categoryName: item.categoryName,
        });
      }
    });
    clearWishlist();
  };

  if (!mounted) {
    return (
      <main className="min-h-screen bg-[#F8F8F8] dark:bg-black text-zinc-900 dark:text-zinc-100 flex flex-col">
        <div className="flex-1 py-10 sm:py-16">
          <div className="mx-auto w-full xl:w-[75%] px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F8F8] dark:bg-black text-zinc-900 dark:text-zinc-100 flex flex-col transition-colors pb-24 sm:pb-0">
      
      {/* Hero Header */}
      <div className="bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto w-full xl:w-[75%] px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 px-3 py-1.5 rounded-full text-sm font-semibold mb-4">
                <Heart size={16} className="fill-amber-500" />
                <span>Your Collection</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black mb-3 text-zinc-900 dark:text-white tracking-tight">
                My Wishlist
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-xl">
                Keep track of items you love. Save them for later or move them to your cart when you're ready to buy.
              </p>
            </div>
            
            {items.length > 0 && (
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleMoveAllToCart}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-2xl bg-[#0B1220] dark:bg-amber-500 px-6 py-3.5 font-bold text-white dark:text-black transition hover:bg-black dark:hover:bg-amber-400 shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-200"
                >
                  <ShoppingCart size={18} />
                  Move All to Cart
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 py-10 sm:py-16">
        <div className="mx-auto w-full xl:w-[75%] px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold flex items-center gap-2">
              Saved Items
              <span className="text-sm font-medium bg-zinc-200 dark:bg-zinc-800 px-3 py-0.5 rounded-full text-zinc-600 dark:text-zinc-300">
                {items.length}
              </span>
            </h2>
            {items.length > 0 && (
              <button 
                onClick={clearWishlist} 
                className="text-sm font-medium text-red-500 hover:text-red-600 hover:underline px-4 py-2 rounded-xl transition hover:bg-red-50 dark:hover:bg-red-500/10"
              >
                Clear All
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="rounded-[32px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-12 text-center shadow-xl shadow-zinc-200/20 dark:shadow-none">
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-rose-50 dark:bg-rose-500/10 mb-8 relative">
                <Heart size={48} className="text-rose-500" />
                <div className="absolute top-0 right-0 w-8 h-8 bg-white dark:bg-zinc-950 rounded-full flex items-center justify-center text-xl">
                  ✨
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-white">Your wishlist is empty</h2>
              <p className="text-zinc-500 dark:text-zinc-400 mb-10 max-w-md mx-auto">
                Save items you love and buy them later. Start exploring our collections to find your next favorite thing.
              </p>
              <Link href="/products" className="inline-flex items-center gap-2 rounded-2xl bg-[#0B1220] dark:bg-amber-500 px-8 py-4 font-semibold text-white dark:text-black transition hover:bg-black dark:hover:bg-amber-400 hover:scale-105 transform duration-200 shadow-lg hover:shadow-xl">
                Browse Products <ArrowRight size={20} />
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((item) => {
                const inCart = cartItems.some(ci => ci.productId === item.productId);
                
                return (
                  <div key={item.productId} className="flex flex-col rounded-[28px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 shadow-sm relative group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    
                    <button 
                      onClick={() => removeItem(item.productId)}
                      className="absolute right-6 top-6 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 dark:bg-black/70 backdrop-blur shadow-sm text-zinc-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/20 transition-colors opacity-100 sm:opacity-0 group-hover:opacity-100"
                      title="Remove from wishlist"
                    >
                      <Trash2 size={18} />
                    </button>

                    <Link href={`/products/${item.productId}`} className="relative aspect-[4/4] w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 block mb-5 border border-zinc-100 dark:border-zinc-800">
                      {item.imageUrl && (
                        <Image src={item.imageUrl} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                      )}
                    </Link>
                    
                    <div className="flex flex-1 flex-col justify-between px-1">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-amber-500 mb-1.5">{item.categoryName || "Product"}</p>
                        <h3 className="font-bold text-base leading-tight mb-3 text-zinc-900 dark:text-white line-clamp-2 min-h-[40px]">
                          <Link href={`/products/${item.productId}`} className="hover:text-amber-500 transition-colors">{item.name}</Link>
                        </h3>
                        <p className="text-2xl font-black text-zinc-900 dark:text-white mb-5">₹{item.price}</p>
                      </div>
                      
                      {inCart ? (
                        <div className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 px-4 py-3.5 text-sm font-bold text-emerald-600 dark:text-emerald-500 cursor-default">
                          <Check size={18} />
                          In Cart
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleAddToCart(item)}
                          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-100 dark:bg-zinc-800 px-4 py-3.5 text-sm font-bold transition hover:bg-[#0B1220] dark:hover:bg-amber-500 hover:text-white dark:hover:text-black text-zinc-900 dark:text-white"
                        >
                          <ShoppingCart size={18} />
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      
      <Footer />

      {/* Mobile Sticky Bottom Action Bar */}
      {mounted && items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 sm:hidden z-40 pb-safe">
          <button 
            onClick={handleMoveAllToCart}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0B1220] dark:bg-amber-500 px-6 py-4 font-bold text-white dark:text-black transition hover:bg-black dark:hover:bg-amber-400 shadow-lg"
          >
            <ShoppingCart size={18} />
            Move All to Cart
          </button>
        </div>
      )}
    </main>
  );
}

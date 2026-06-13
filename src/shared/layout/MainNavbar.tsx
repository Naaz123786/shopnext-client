"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronDown, Heart, LogOut, MapPin, Menu, X,
  Package, Search, ShoppingCart, User, UserCircle,
} from "lucide-react";
import { useAuth } from "@/features/auth/AuthContext";
import { SearchProduct, searchProducts } from "@/features/products/api/product-search.service";
import { useCartStore } from "@/features/cart/store/cart.store";
import { useWishlistStore } from "@/features/wishlist/store/wishlist.store";
import ThemeToggle from "@/shared/components/ThemeToggle";

export default function MainNavbar() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { user, loading, logout } = useAuth();
  
  // Stores
  const cartCount = useCartStore((s) => s.getTotalCount());
  const wishlistCount = useWishlistStore((s) => s.items.length);

  const query = keyword.trim();
  const showDropdown = query.length >= 2;

  const handleSearch = () => {
    if (!query) return;
    setKeyword("");
    setSearchOpen(false);
    router.push(`/products?keyword=${encodeURIComponent(query)}`);
  };

  const handleLogout = () => {
    logout();
    setAccountOpen(false);
    setMobileOpen(false);
    router.push("/");
  };

  return (
    <>
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 sticky top-0 z-40 transition-colors">
        <div className="mx-auto flex w-full xl:w-[75%] items-center justify-between px-4 sm:px-6 lg:px-8 py-3 lg:py-4">

          {/* LEFT - Logo */}
          <div
            onClick={() => router.push("/")}
            className="flex cursor-pointer items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0B1220] dark:bg-white text-white dark:text-black">
              <ShoppingCart size={18} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-2xl">
              Shop<span className="text-amber-500">Next</span>
            </h1>
          </div>

          {/* CENTER - Search bar (desktop only) */}
          <div className="hidden lg:flex flex-1 mx-8 max-w-2xl relative">
            <div className="flex w-full items-center overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-colors">
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-2.5 text-sm text-zinc-900 dark:text-white bg-transparent outline-none placeholder:text-zinc-400"
              />
              <button
                onClick={handleSearch}
                className="bg-[#0B1220] px-4 py-2.5 text-white transition hover:bg-black"
              >
                <Search size={17} />
              </button>
            </div>
            {showDropdown && (
              <div className="absolute left-0 top-12 z-50 w-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl">
                <SearchDropdown keyword={query} onSelect={() => setKeyword("")} />
              </div>
            )}
          </div>

          {/* RIGHT - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            
            <Link href="/wishlist" className="relative text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition">
              <Heart size={21} />
              {wishlistCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-semibold text-black">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link href="/cart" className="relative text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-semibold text-black">
                  {cartCount}
                </span>
              )}
            </Link>

            {loading ? (
              <div className="h-9 w-28 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-800" />
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setAccountOpen((p) => !p)}
                  className="flex items-center gap-2 rounded-xl px-3 py-1.5 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-700 font-semibold text-sm">
                    {user.name?.[0]?.toUpperCase() ?? "U"}
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Hello, {user.name?.split(" ")[0]}</p>
                    <p className="flex items-center gap-0.5 text-sm font-semibold text-zinc-900 dark:text-white">
                      Account <ChevronDown size={13} />
                    </p>
                  </div>
                </button>

                {accountOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setAccountOpen(false)} />
                    <div className="absolute right-0 top-12 z-50 w-72 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl">
                      <div className="border-b border-zinc-100 dark:border-zinc-800 p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-500 font-bold text-base">
                            {user.name?.[0]?.toUpperCase() ?? "U"}
                          </div>
                          <div>
                            <p className="font-semibold text-zinc-900 dark:text-white">{user.name}</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        {[
                          { icon: <UserCircle size={17} />, label: "Profile", path: "/profile" },
                          { icon: <Package size={17} />, label: "Orders", path: "/orders" },
                          { icon: <MapPin size={17} />, label: "Addresses", path: "/address" },
                        ].map((item) => (
                          <button
                            key={item.path}
                            onClick={() => { setAccountOpen(false); router.push(item.path); }}
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          >
                            {item.icon} {item.label}
                          </button>
                        ))}
                        <button
                          onClick={() => { setAccountOpen(false); router.push("/profile?edit=true"); }}
                          className="mt-1.5 flex w-full items-center justify-center rounded-xl bg-amber-500 px-3 py-2.5 text-sm font-semibold text-black hover:bg-amber-400"
                        >
                          Update Profile
                        </button>
                      </div>
                      <div className="border-t border-zinc-100 dark:border-zinc-800 p-2">
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                        >
                          <LogOut size={17} /> Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.push("/login")}
                  className="rounded-xl border border-zinc-200 dark:border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/register")}
                  className="rounded-xl bg-[#0B1220] dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-black hover:bg-black dark:hover:bg-zinc-200 transition"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* RIGHT - Mobile icons */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            
            {/* Search icon */}
            <button
              onClick={() => setSearchOpen((p) => !p)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
            >
              <Search size={18} />
            </button>

            {/* Cart */}
            <Link href="/cart" className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-semibold text-black">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen((p) => !p)}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0B1220] dark:bg-white text-white dark:text-black"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - expands below navbar */}
        {searchOpen && (
          <div className="border-t border-zinc-100 dark:border-zinc-800 px-4 py-3 lg:hidden">
            <div className="flex items-center overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-colors">
              <input
                autoFocus
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-2.5 text-sm text-zinc-900 dark:text-white bg-transparent outline-none placeholder:text-zinc-400"
              />
              <button
                onClick={handleSearch}
                className="bg-[#0B1220] px-4 py-2.5 text-white"
              >
                <Search size={17} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-[82%] max-w-xs bg-white dark:bg-zinc-950 flex flex-col shadow-2xl transition-colors">

            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 dark:border-zinc-800">
              <div
                onClick={() => { setMobileOpen(false); router.push("/"); }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0B1220] text-white">
                  <ShoppingCart size={16} />
                </div>
                <span className="text-lg font-bold text-zinc-900 dark:text-white">
                  Shop<span className="text-amber-500">Next</span>
                </span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              >
                <X size={17} />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">

              {/* User section */}
              {loading ? (
                <div className="h-16 animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-800" />
              ) : user ? (
                <div className="flex items-center gap-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 px-4 py-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-500 font-bold text-base">
                    {user.name?.[0]?.toUpperCase() ?? "U"}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-zinc-900 dark:text-white truncate">{user.name}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{user.email}</p>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2.5">
                  <button
                    onClick={() => { setMobileOpen(false); router.push("/login"); }}
                    className="flex-1 rounded-xl border border-zinc-200 dark:border-zinc-700 py-2.5 text-sm font-medium text-zinc-800 dark:text-zinc-200"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => { setMobileOpen(false); router.push("/register"); }}
                    className="flex-1 rounded-xl bg-[#0B1220] dark:bg-white py-2.5 text-sm font-medium text-white dark:text-black"
                  >
                    Register
                  </button>
                </div>
              )}

              {/* Nav links */}
              <nav className="flex flex-col gap-0.5">
                {[
                  { label: "Home", path: "/" },
                  { label: "Products", path: "/products" },
                ].map((item) => (
                  <button
                    key={item.path}
                    onClick={() => { setMobileOpen(false); router.push(item.path); }}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-left"
                  >
                    {item.label}
                  </button>
                ))}

                {user && (
                  <>
                    <div className="my-1 border-t border-zinc-100 dark:border-zinc-800" />
                    {[
                      { icon: <UserCircle size={17} />, label: "Profile", path: "/profile" },
                      { icon: <Package size={17} />, label: "Orders", path: "/orders" },
                      { icon: <MapPin size={17} />, label: "Addresses", path: "/address" },
                    ].map((item) => (
                      <button
                        key={item.path}
                        onClick={() => { setMobileOpen(false); router.push(item.path); }}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      >
                        {item.icon} {item.label}
                      </button>
                    ))}
                  </>
                )}
              </nav>
            </div>

            {/* Drawer Footer - Logout */}
            {user && (
              <div className="border-t border-zinc-100 dark:border-zinc-800 px-4 py-3">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                >
                  <LogOut size={17} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function SearchDropdown({ keyword, onSelect }: { keyword: string; onSelect: () => void }) {
  const [products, setProducts] = useState<SearchProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = keyword.trim();
    if (q.length < 2) { setProducts([]); return; }
    let ignore = false;
    const t = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await searchProducts(q);
        if (!ignore) setProducts(Array.isArray(res) ? res : []);
      } catch {
        if (!ignore) setProducts([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    }, 400);
    return () => { ignore = true; clearTimeout(t); };
  }, [keyword]);

  if (loading) return <SearchSkeleton />;
  if (!products.length) return <p className="p-4 text-sm text-zinc-500">No products found</p>;

  return (
    <div className="max-h-[360px] overflow-y-auto p-2">
      {products.map((p) => (
        <Link
          key={p.id}
          href={`/products/${p.slug ?? p.id}`}
          onClick={onSelect}
          className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <div className="h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
            {p.imageUrl
              ? <img src={p.imageUrl} alt={p.name} className="h-full w-full object-cover" />
              : <div className="h-full w-full bg-zinc-200 dark:bg-zinc-700" />
            }
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-zinc-900 dark:text-white">{p.name}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">₹{p.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

function SearchSkeleton() {
  return (
    <div className="space-y-3 p-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex animate-pulse items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
          <div className="flex-1 space-y-2">
            <div className="h-3.5 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-3 w-1/3 rounded bg-zinc-200 dark:bg-zinc-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
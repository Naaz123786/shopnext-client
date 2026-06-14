import { redirect } from "next/navigation";
import Link from "next/link";
import { Search as SearchIcon, ArrowRight, Frown } from "lucide-react";
import { getFeaturedProducts } from "@/features/products/api/product.service";
import ProductCard from "@/features/products/components/ProductCard";
import Footer from "@/shared/layout/Footer";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;

  if (!q) {
    redirect("/products");
  }

  // We are using featured products and doing local filtering as backend doesn't have search by name endpoint yet
  let allProducts = [];
  try {
    allProducts = await getFeaturedProducts();
  } catch (error) {
    console.error("Failed to fetch products for search:", error);
  }

  const query = q.toLowerCase();
  
  // Basic search across name and category
  const results = allProducts.filter(
    (p) => 
      p.name.toLowerCase().includes(query) || 
      (p.categoryName && p.categoryName.toLowerCase().includes(query))
  );

  return (
    <main className="min-h-screen bg-[#F8F8F8] dark:bg-black text-zinc-900 dark:text-zinc-100 flex flex-col transition-colors">
      <div className="flex-1 py-8 sm:py-12">
        <div className="mx-auto w-full xl:w-[75%] px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
            <p className="text-sm text-zinc-500 mb-2">Search results for</p>
            <h1 className="text-3xl sm:text-4xl font-bold flex items-center gap-3">
              "{q}"
              <span className="text-sm font-medium bg-zinc-200 dark:bg-zinc-800 px-3 py-1 rounded-full text-zinc-600 dark:text-zinc-300">
                {results.length} items
              </span>
            </h1>
          </div>

          {/* Search bar inside page to refine */}
          <div className="mb-10 max-w-2xl">
            <form action="/search" method="GET" className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                <SearchIcon size={20} />
              </div>
              <input 
                type="text" 
                name="q"
                defaultValue={q}
                placeholder="Search for products, categories..." 
                className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 pl-12 pr-24 text-base outline-none focus:border-amber-500 dark:focus:border-amber-500 transition-all shadow-sm focus:shadow-md"
              />
              <button type="submit" className="absolute right-2 top-2 bottom-2 bg-[#0B1220] dark:bg-amber-500 text-white dark:text-black px-6 rounded-xl font-bold hover:bg-black dark:hover:bg-amber-400 transition">
                Search
              </button>
            </form>
          </div>

          {results.length === 0 ? (
            <div className="rounded-[32px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-12 text-center shadow-sm max-w-3xl mx-auto my-12">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 mb-6 text-zinc-400">
                <Frown size={48} />
              </div>
              <h2 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-white">No results found for "{q}"</h2>
              <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-md mx-auto">
                We couldn't find anything matching your search. Try adjusting your keyword or browsing our categories.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/products" className="flex items-center gap-2 rounded-xl bg-[#0B1220] dark:bg-amber-500 px-6 py-3 font-semibold text-white dark:text-black transition hover:bg-black dark:hover:bg-amber-400">
                  Browse All Products <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}

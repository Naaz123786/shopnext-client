
import { getCategories } from "@/features/categories/api/category.service";
import CategoryNav from "@/features/categories/components/CategoryNav";
import { getFeaturedProducts } from "@/features/products/api/product.service";
import ProductCard from "@/features/products/components/ProductCard";
import Footer from "@/shared/layout/Footer";

import Link from "next/link";

type ProductsPageProps = {
  searchParams: Promise<{
    keyword?: string;
    categoryId?: string;
  }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  const keyword = params.keyword?.toLowerCase() || "";
  const categoryId = params.categoryId || "";

  let categories = [];
  let products = [];

  try {
    const results = await Promise.allSettled([
      getCategories(),
      getFeaturedProducts(),
    ]);

    categories = results[0].status === "fulfilled" ? results[0].value : [];
    products = results[1].status === "fulfilled" ? results[1].value : [];
  } catch (error) {
    console.error("Failed to fetch products page data:", error);
  }

  const filteredProducts = products.filter((product) => {
    const matchesKeyword =
      !keyword ||
      product.name.toLowerCase().includes(keyword);

    const matchesCategory =
      !categoryId ||
      String(product.categoryId) === String(categoryId);

    return matchesKeyword && matchesCategory;
  });

  const selectedCategory = categories.find(
    (category) => String(category.id) === categoryId
  );

  return (
    <main className="min-h-screen bg-[#F8F8F8] dark:bg-black text-zinc-900 dark:text-zinc-100 transition-colors">
      <CategoryNav categories={categories} />

      {/* Header */}
      <section className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-colors">
        <div className="mx-auto w-full xl:w-[75%] px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="text-sm text-zinc-500 hover:text-black"
            >
              Home
            </Link>

            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
              {selectedCategory
                ? selectedCategory.name
                : keyword
                ? `Search: ${keyword}`
                : "All Products"}
            </h1>

            <p className="max-w-2xl text-zinc-500 dark:text-zinc-400">
              Explore premium products with modern responsive
              ecommerce experience.
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-10 sm:py-14 bg-[#F8F8F8] dark:bg-black transition-colors">
        <div className="mx-auto w-full xl:w-[75%] px-4 sm:px-6 lg:px-8">
          {filteredProducts.length ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-center">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                No Products Found
              </h2>

              <p className="mt-3 max-w-md text-zinc-500 dark:text-zinc-400">
                Try another search keyword or browse different
                categories.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Heart,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
  Zap,
  Tag,
} from "lucide-react";
import { getIdFromSlug } from "@/lib/slug";
import { getCategories } from "@/features/categories/api/category.service";
import { getFeaturedProducts, getProductById } from "@/features/products/api/product.service";

import CategoryNav from "@/features/categories/components/CategoryNav";
import Newsletter from "@/shared/components/Newsletter";
import Footer from "@/shared/layout/Footer";
import ProductCard from "@/features/products/components/ProductCard";
import ProductActions from "@/features/products/components/ProductActions";
import ImageGallery from "@/features/products/components/ImageGallery";
import ProductTabs from "@/features/products/components/ProductTabs";
import ProductViewTracker from "@/features/products/components/ProductViewTracker";

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const productId = getIdFromSlug(slug);

  if (!productId) notFound();

  let categories = [];
  let product = null;
  let latestProducts = [];

  try {
    const results = await Promise.allSettled([
      getCategories(),
      getProductById(productId),
      getFeaturedProducts(),
    ]);

    categories = results[0].status === "fulfilled" ? results[0].value : [];
    product = results[1].status === "fulfilled" ? results[1].value : null;
    latestProducts = results[2].status === "fulfilled" ? results[2].value : [];
  } catch (error) {
    console.error("Failed to fetch product details:", error);
  }

  if (!product) notFound();

  const productImages = [
    product.imageUrl,
    product.imageUrl,
    product.imageUrl,
    product.imageUrl,
  ].filter(Boolean) as string[];

  const relatedProducts = latestProducts
    .filter((item) => item.id !== product.id)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-[#F8F8F8] dark:bg-black text-zinc-900 dark:text-zinc-100">
      <ProductViewTracker product={product} />
      <CategoryNav categories={categories} />

      <section className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="mx-auto w-full xl:w-[75%] px-4 sm:px-6 lg:px-8 py-4 text-sm text-zinc-500">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-black">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-900">{product.name}</span>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="mx-auto grid w-full xl:w-[75%] gap-8 px-4 sm:px-6 lg:px-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 sm:p-6">
            <ImageGallery images={productImages} productName={product.name} />
          </div>

          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 sm:p-8">
            <p className="text-sm font-medium text-amber-600">
              {product.categoryName ?? "Product"}
            </p>

            <h1 className="mt-3 text-3xl font-bold leading-tight text-zinc-900 dark:text-white sm:text-5xl">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="fill-amber-400 text-amber-400" size={18} />
                <span className="font-semibold">
                  {product.averageRating ?? 0}
                </span>
                <span className="text-sm text-zinc-500">
                  ({product.reviewCount ?? 0} reviews)
                </span>
              </div>

              <span className="h-1 w-1 rounded-full bg-zinc-300" />
              <span className="text-sm text-green-600">In Stock</span>
            </div>

            <p className="mt-6 text-4xl font-bold text-zinc-900 dark:text-white">
              ₹{product.price}
            </p>

            <div className="mt-5 rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-900/10 p-4">
              <div className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-amber-500">
                <Tag size={18} className="text-amber-600" />
                Available Offers
              </div>

              <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                <li>• 10% instant discount on selected bank cards</li>
                <li>• Free delivery on eligible orders</li>
                <li>• No-cost EMI options coming soon</li>
              </ul>
            </div>

            <p className="mt-5 leading-8 text-zinc-600 dark:text-zinc-400">
              {product.description ??
                "Premium quality product designed for modern users with a smooth shopping experience."}
            </p>

            <ProductActions product={product} />

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 p-4">
                <Truck size={22} className="text-zinc-700 dark:text-zinc-300" />
                <p className="mt-2 text-sm font-semibold">Fast Delivery</p>
              </div>

              <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 p-4">
                <ShieldCheck size={22} className="text-zinc-700 dark:text-zinc-300" />
                <p className="mt-2 text-sm font-semibold">Secure Payment</p>
              </div>

              <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 p-4">
                <RotateCcw size={22} className="text-zinc-700 dark:text-zinc-300" />
                <p className="mt-2 text-sm font-semibold">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="mx-auto w-full xl:w-[75%] px-4 sm:px-6 lg:px-8">
          <ProductTabs product={product} />
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="pb-16">
          <div className="mx-auto w-full xl:w-[75%] px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
                Trending Products
              </h2>

              <p className="mt-1 text-sm text-zinc-500 sm:text-base">
                Currently showing latest products. Later this section can use a
                dedicated trending API.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Newsletter />
      <Footer />
    </main>
  );
}
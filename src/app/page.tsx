import { getBanners } from "@/features/banners/api/banner.service";
import { getCategories } from "@/features/categories/api/category.service";
import { getFeaturedProducts } from "@/features/products/api/product.service";
import CategoryNav from "@/features/categories/components/CategoryNav";
import FeaturedProducts from "@/features/products/components/FeaturedProducts";
import CategoryShowcase from "@/features/categories/components/CategoryShowcase";

import HeroSection from "@/features/banners/components/HeroSection";
import PromoBanner from "@/features/banners/components/PromoBanner";
import Newsletter from "@/shared/components/Newsletter";
import Footer from "@/shared/layout/Footer";
import StatsBar from "@/shared/components/StatsBar";
import Testimonials from "@/shared/components/Testimonials";
import WhatsAppButton from "@/shared/components/WhatsAppButton";

export default async function Home() {
  let banners = [];
  let categories = [];
  let products = [];

  try {
    const results = await Promise.allSettled([
      getBanners(),
      getCategories(),
      getFeaturedProducts(),
    ]);

    banners = results[0].status === "fulfilled" ? results[0].value : [];
    categories = results[1].status === "fulfilled" ? results[1].value : [];
    products = results[2].status === "fulfilled" ? results[2].value : [];
  } catch (error) {
    console.error("Failed to fetch homepage data:", error);
  }

  return (
    <main className="min-h-screen bg-[#F8F8F8] dark:bg-black text-zinc-900 dark:text-zinc-100 transition-colors">
      <CategoryNav categories={categories} />
      <HeroSection banners={banners} />
      <StatsBar />
      <FeaturedProducts products={products} />
      <CategoryShowcase />
      <PromoBanner />
      <Testimonials />
      <Newsletter />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
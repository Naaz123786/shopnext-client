import Link from "next/link";

import {
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-colors">
      {/* Main Footer */}
      <div className="mx-auto grid w-full xl:w-[75%] gap-12 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:grid-cols-2 lg:grid-cols-5">
        {/* Brand */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Shop<span className="text-amber-500">Next</span>
          </h2>

          <p className="mt-5 leading-7 text-zinc-500 dark:text-zinc-400">
            Modern scalable ecommerce platform focused on premium UI,
            performance, and production-ready architecture.
          </p>

          {/* Social Icons */}
          <div className="mt-6 flex items-center gap-4">
            <button className="group flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 transition hover:border-[#1877F2] hover:bg-[#1877F2]/10 text-zinc-600 dark:text-zinc-400">
              <FaFacebookF size={16} className="transition group-hover:text-[#1877F2]" />
            </button>

            <button className="group flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 transition hover:border-[#E4405F] hover:bg-[#E4405F]/10 text-zinc-600 dark:text-zinc-400">
              <FaInstagram size={16} className="transition group-hover:text-[#E4405F]" />
            </button>

            <button className="group flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 transition hover:border-[#1DA1F2] hover:bg-[#1DA1F2]/10 text-zinc-600 dark:text-zinc-400">
              <FaTwitter size={16} className="transition group-hover:text-[#1DA1F2]" />
            </button>

            <button className="group flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 transition hover:border-[#333] hover:bg-[#333]/10 dark:hover:border-white dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-400">
              <FaGithub size={16} className="transition group-hover:text-[#333] dark:group-hover:text-white" />
            </button>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Company
          </h3>

          <div className="mt-5 flex flex-col gap-3 text-zinc-500 dark:text-zinc-400">
            <Link href="/" className="hover:text-amber-500 transition-colors">About Us</Link>
            <Link href="/" className="hover:text-amber-500 transition-colors">Careers</Link>
            <Link href="/" className="hover:text-amber-500 transition-colors">Blog</Link>
            <Link href="/" className="hover:text-amber-500 transition-colors">Contact</Link>
          </div>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Support
          </h3>

          <div className="mt-5 flex flex-col gap-3 text-zinc-500 dark:text-zinc-400">
            <Link href="/" className="hover:text-amber-500 transition-colors">Help Center</Link>
            <Link href="/" className="hover:text-amber-500 transition-colors">Shipping</Link>
            <Link href="/" className="hover:text-amber-500 transition-colors">Returns</Link>
            <Link href="/" className="hover:text-amber-500 transition-colors">Privacy Policy</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Contact
          </h3>

          <div className="mt-5 space-y-3 text-zinc-500 dark:text-zinc-400">
            <p>imshivendra29@gmail.com</p>
            <p>+91 8303729968</p>
            <p>Noida, In</p>
          </div>

          {/* CTA */}
          <button className="mt-6 rounded-2xl bg-[#0B1220] dark:bg-amber-500 px-6 py-3 text-sm font-medium text-white dark:text-black transition hover:bg-black dark:hover:bg-amber-400">
            Contact Us
          </button>
        </div>

        {/* Get the App */}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Get the App
          </h3>

          <div className="mt-5 flex flex-col gap-3">
            <button className="flex items-center gap-3 rounded-xl bg-zinc-900 dark:bg-white px-4 py-3 text-white dark:text-black transition hover:bg-black dark:hover:bg-zinc-200 w-44">
              <div className="text-2xl">🍎</div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider text-zinc-300 dark:text-zinc-500">Download on the</p>
                <p className="font-semibold text-sm leading-none">App Store</p>
              </div>
            </button>
            <button className="flex items-center gap-3 rounded-xl bg-zinc-900 dark:bg-white px-4 py-3 text-white dark:text-black transition hover:bg-black dark:hover:bg-zinc-200 w-44">
              <div className="text-2xl">▶️</div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider text-zinc-300 dark:text-zinc-500">GET IT ON</p>
                <p className="font-semibold text-sm leading-none">Google Play</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto flex w-full xl:w-[75%] flex-col items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-6 text-sm text-zinc-500 dark:text-zinc-400 md:flex-row">
          <p>© 2026 ShopNext. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-amber-500 transition-colors">Terms</Link>
            <Link href="/" className="hover:text-amber-500 transition-colors">Privacy</Link>
            <Link href="/" className="hover:text-amber-500 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
"use client";

import { motion } from "framer-motion";
import { Star, CheckCircle } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Sarah Jenkins",
      initials: "SJ",
      color: "bg-blue-500",
      review: "Absolutely love the fast shipping! The smartphone I ordered came in perfect condition and was exactly as described.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      initials: "MC",
      color: "bg-emerald-500",
      review: "The quality of the cosmetics here is top notch. Plus the customer service team was incredibly helpful when I had a question.",
      rating: 5
    },
    {
      id: 3,
      name: "Aisha Patel",
      initials: "AP",
      color: "bg-rose-500",
      review: "Found the best deals on laptops. The interface is super clean and shopping was a breeze. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-zinc-950 transition-colors border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto w-full xl:w-[75%] px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">
            Loved by our customers
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto text-lg">
            Don't just take our word for it. Here is what people are saying about their ShopNext experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="rounded-[32px] bg-[#F8F8F8] dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 sm:p-10 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] transition-all duration-300 relative group"
            >
              <div className="absolute top-8 right-8 text-zinc-200 dark:text-zinc-800 transition-colors group-hover:text-amber-100 dark:group-hover:text-amber-900/30">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 21L16.439 16.5C17.653 14.364 18.236 12.399 18.188 10.603C18.141 8.808 17.433 7.502 16.064 6.685C14.694 5.867 13.067 5.666 11.182 6.082L10.741 6.182L11.009 6.554C11.517 7.254 11.758 8.016 11.733 8.839C11.708 9.662 11.393 10.378 10.789 10.985C10.185 11.593 9.421 11.884 8.497 11.859C7.574 11.834 6.84 11.515 6.294 10.902C5.748 10.288 5.487 9.548 5.512 8.681C5.537 7.814 5.828 6.942 6.386 6.065C6.943 5.188 7.747 4.417 8.796 3.751L9.123 3.541L8.718 3.513C6.732 3.374 5.034 3.791 3.626 4.764C2.217 5.736 1.341 7.159 0.997 9.032C0.654 10.905 0.941 13.061 1.859 15.499L4.475 22.378L14.017 21ZM22.569 21L24.991 16.5C26.205 14.364 26.788 12.399 26.74 10.603C26.693 8.808 25.985 7.502 24.616 6.685C23.246 5.867 21.619 5.666 19.734 6.082L19.293 6.182L19.561 6.554C20.069 7.254 20.31 8.016 20.285 8.839C20.26 9.662 19.945 10.378 19.341 10.985C18.737 11.593 17.973 11.884 17.049 11.859C16.126 11.834 15.392 11.515 14.846 10.902C14.3 10.288 14.039 9.548 14.064 8.681C14.089 7.814 14.38 6.942 14.938 6.065C15.495 5.188 16.299 4.417 17.348 3.751L17.675 3.541L17.27 3.513C15.284 3.374 13.586 3.791 12.178 4.764C10.769 5.736 9.893 7.159 9.549 9.032C9.206 10.905 9.493 13.061 10.411 15.499L13.027 22.378L22.569 21Z" />
                </svg>
              </div>

              <div className="flex gap-1 mb-6 text-amber-500">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-amber-500" />
                ))}
              </div>

              <p className="text-zinc-700 dark:text-zinc-300 text-lg sm:text-xl leading-relaxed mb-10 font-medium relative z-10">
                "{review.review}"
              </p>

              <div className="flex items-center gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-6">
                <div className="relative">
                  <div className={`h-12 w-12 rounded-full ${review.color} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                    {review.initials}
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-[#F8F8F8] dark:bg-zinc-900 rounded-full p-0.5">
                    <CheckCircle size={16} className="text-emerald-500 fill-emerald-100 dark:fill-emerald-900/30" />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-zinc-900 dark:text-white text-base">
                    {review.name}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Verified Buyer
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

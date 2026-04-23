"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import type { NewsPost } from "@/lib/data/news";

const INTERVAL_MS = 5000;

interface NewsBlogProps {
  locale: string;
  posts: NewsPost[];
}

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-SA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function NewsBlog({ locale, posts }: NewsBlogProps) {
  const isAr = locale === "ar";
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % posts.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [posts.length]);

  const featured = posts[activeIndex];
  const rest = posts.filter((_, i) => i !== activeIndex).slice(0, 4);

  return (
    <section className="py-24" style={{ background: "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <span
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full"
              style={{ background: "rgba(var(--color-brand-green-rgb),0.1)", color: "var(--color-brand-green-dark)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--color-brand-green)" }} />
              {isAr ? "الأخبار والإعلام" : "News & Media"}
            </span>
            <h2
              className="font-black leading-tight mb-3"
              style={{ fontSize: "clamp(26px, 3.5vw, 44px)", color: "#0f2b1f" }}
            >
              {isAr ? "ابقَ على اطلاع بأحدث أخبارنا" : "Stay Updated with Our Latest News"}
            </h2>
            <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "#4B7563" }}>
              {isAr
                ? "ابقَ على اطلاع بأحدث الأخبار والإعلانات والتغطيات الإعلامية الخاصة بفيزيوتريو."
                : "Stay updated with the latest news, announcements, and media coverage from PhysioTrio."}
            </p>
          </div>
          <Link
            href={`/${locale}/news`}
            className="inline-flex items-center gap-2 text-sm font-semibold shrink-0 px-5 py-2.5 rounded-full transition-all hover:opacity-80"
            style={{ border: "1.5px solid rgba(var(--color-brand-green-rgb),0.4)", color: "var(--color-brand-green-dark)" }}
          >
            {isAr ? "جميع المقالات" : "All Articles"}
            <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Layout: featured left + stack right */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-6">

          {/* Featured post — auto-rotates */}
          <div className="relative" style={{ minHeight: "480px" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={featured.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="h-full"
              >
                <Link href={`/${locale}/news/${featured.slug}`} className="group block h-full">
                  <div
                    className="relative h-full rounded-3xl overflow-hidden flex flex-col"
                    style={{ minHeight: "480px", background: "#0f2b1f" }}
                  >
                    <Image
                      src={featured.image}
                      alt={isAr ? featured.title.ar : featured.title.en}
                      fill
                      sizes="(max-width:1024px) 100vw, 60vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(7,25,15,0.96) 0%, rgba(7,25,15,0.5) 50%, rgba(7,25,15,0.1) 100%)" }}
                    />
                    <div className="relative z-10 mt-auto p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className="text-xs font-bold px-3 py-1 rounded-full"
                          style={{ background: "var(--color-brand-green)", color: "white" }}
                        >
                          {isAr ? featured.category.ar : featured.category.en}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
                          <Clock size={11} />
                          {featured.readMinutes} {isAr ? "دقائق" : "min read"}
                        </span>
                      </div>
                      <h3
                        className="font-black text-white leading-snug mb-3 transition-colors group-hover:text-green-300"
                        style={{ fontSize: "clamp(20px, 2.5vw, 28px)" }}
                      >
                        {isAr ? featured.title.ar : featured.title.en}
                      </h3>
                      <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.65)", maxWidth: "520px" }}>
                        {isAr ? featured.excerpt.ar : featured.excerpt.en}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                          <Calendar size={11} />
                          {formatDate(featured.date, locale)}
                        </span>
                        <span
                          className="inline-flex items-center gap-1.5 text-xs font-bold transition-all group-hover:gap-3"
                          style={{ color: "var(--color-brand-green)" }}
                        >
                          {isAr ? "اقرأ المقال" : "Read article"}
                          <ArrowRight size={13} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
              {posts.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className="transition-all rounded-full"
                  style={{
                    width: i === activeIndex ? "20px" : "6px",
                    height: "6px",
                    background: i === activeIndex ? "var(--color-brand-green)" : "rgba(255,255,255,0.4)",
                  }}
                  aria-label={`Go to post ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Side stack */}
          <div className="flex flex-col gap-4">
            {rest.map((post) => (
              <Link
                key={post.id}
                href={`/${locale}/news/${post.slug}`}
                className="group flex gap-4 p-4 rounded-2xl transition-all hover:shadow-md"
                style={{ border: "1px solid #e8f5ee", background: "#fafffe" }}
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={post.image}
                    alt={isAr ? post.title.ar : post.title.en}
                    fill
                    sizes="80px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    unoptimized
                  />
                </div>
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <span
                      className="inline-block text-xs font-bold mb-1.5 px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(var(--color-brand-green-rgb),0.1)", color: "var(--color-brand-green-dark)" }}
                    >
                      {isAr ? post.category.ar : post.category.en}
                    </span>
                    <h4
                      className="text-sm font-bold leading-snug line-clamp-2 transition-colors group-hover:text-green-700"
                      style={{ color: "#0f2b1f" }}
                    >
                      {isAr ? post.title.ar : post.title.en}
                    </h4>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-xs" style={{ color: "#6B9E82" }}>
                      <Clock size={10} />
                      {post.readMinutes} {isAr ? "د" : "min"}
                    </span>
                    <span className="flex items-center gap-1 text-xs" style={{ color: "#6B9E82" }}>
                      <Calendar size={10} />
                      {formatDate(post.date, locale)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}

            {/* CTA card */}
            <div
              className="p-5 rounded-2xl flex flex-col gap-3"
              style={{ background: "linear-gradient(135deg, #0f2b1f 0%, #1a5c3a 100%)" }}
            >
              <p className="text-sm font-bold text-white leading-snug">
                {isAr ? "هل لديك سؤال حول حالتك الصحية؟" : "Have a question about your condition?"}
              </p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                {isAr
                  ? "تواصل مع أخصائيينا للحصول على إجابات مخصصة."
                  : "Connect with our specialists for personalized answers."}
              </p>
              <Link
                href={`/${locale}/book`}
                className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-full self-start transition-all hover:opacity-90"
                style={{ background: "var(--color-brand-green)", color: "white" }}
              >
                {isAr ? "استشارة مجانية" : "Free Consultation"}
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

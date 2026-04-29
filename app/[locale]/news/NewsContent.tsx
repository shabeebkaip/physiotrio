"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight, Search, Newspaper, ExternalLink } from "lucide-react";
import { BookingCTABand } from "@/components/common/BookingCTABand";
import { newsPosts, type NewsPost } from "@/lib/data/news";

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function NewsCard({ post, locale, isAr, index }: { post: NewsPost; locale: string; isAr: boolean; index: number }) {
  const href = post.externalUrl ?? `/${locale}/news/${post.slug}`;
  const isExternal = !!post.externalUrl;

  return (
    <motion.article
      className="group bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:border-brand-purple hover:shadow-xl hover:-translate-y-1"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <Image
          src={post.image}
          alt={isAr ? post.title.ar : post.title.en}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(10,20,30,0.45) 100%)" }} />
        {/* Category badge on image */}
        <div className="absolute top-3 left-3">
          <span
            className="text-xs font-bold px-3 py-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.95)", color: "var(--color-brand-purple)" }}
          >
            {isAr ? post.category.ar : post.category.en}
          </span>
        </div>
        {isExternal && (
          <div className="absolute top-3 right-3">
            <span
              className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: "rgba(0,0,0,0.55)", color: "white", backdropFilter: "blur(4px)" }}
            >
              <ExternalLink size={10} />
              {isAr ? "رابط خارجي" : "External"}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-3 text-xs" style={{ color: "#9CA3AF" }}>
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            {formatDate(post.date, locale)}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {post.readMinutes} {isAr ? "دقائق" : "min read"}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-base leading-snug mb-2 line-clamp-2" style={{ color: "#111827" }}>
          {isAr ? post.title.ar : post.title.en}
        </h3>

        {/* Excerpt */}
        <p className="text-sm leading-relaxed mb-5 flex-1 line-clamp-3" style={{ color: "#6B7280" }}>
          {isAr ? post.excerpt.ar : post.excerpt.en}
        </p>

        {/* CTA */}
        {isExternal ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
            style={{ background: "var(--color-brand-purple)" }}
          >
            {isAr ? "اقرأ المزيد" : "Read More"} <ExternalLink size={13} />
          </a>
        ) : (
          <Link
            href={href}
            className="flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90"
            style={{ background: "rgba(136,7,114,0.07)", color: "var(--color-brand-purple)", border: "1px solid rgba(136,7,114,0.2)" }}
          >
            {isAr ? "اقرأ المزيد" : "Read More"} <ArrowRight size={13} />
          </Link>
        )}
      </div>
    </motion.article>
  );
}

function FeaturedCard({ post, locale, isAr }: { post: NewsPost; locale: string; isAr: boolean }) {
  const href = post.externalUrl ?? `/${locale}/news/${post.slug}`;
  const isExternal = !!post.externalUrl;

  return (
    <motion.article
      className="group relative rounded-2xl overflow-hidden bg-white border border-gray-200 hover:shadow-2xl transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="grid md:grid-cols-2 min-h-[340px]">
        {/* Image side */}
        <div className="relative overflow-hidden bg-gray-100 min-h-[240px] md:min-h-0">
          <Image
            src={post.image}
            alt={isAr ? post.title.ar : post.title.en}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            unoptimized
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 60%, white 100%)" }} />
        </div>

        {/* Content side */}
        <div className="p-8 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="text-xs font-bold px-3 py-1 rounded-full"
              style={{ background: "rgba(136,7,114,0.08)", color: "var(--color-brand-purple)" }}
            >
              {isAr ? post.category.ar : post.category.en}
            </span>
            <span
              className="text-xs font-bold px-3 py-1 rounded-full"
              style={{ background: "rgba(136,7,114,0.08)", color: "var(--color-brand-purple)" }}
            >
              {isAr ? "مميز" : "Featured"}
            </span>
          </div>

          <h2 className="font-black text-xl md:text-2xl leading-snug mb-3" style={{ color: "#111827" }}>
            {isAr ? post.title.ar : post.title.en}
          </h2>

          <p className="text-sm leading-relaxed mb-6 line-clamp-3" style={{ color: "#6B7280" }}>
            {isAr ? post.excerpt.ar : post.excerpt.en}
          </p>

          <div className="flex items-center gap-4 mb-6 text-xs" style={{ color: "#9CA3AF" }}>
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {formatDate(post.date, locale)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              {post.readMinutes} {isAr ? "دقائق" : "min read"}
            </span>
          </div>

          {isExternal ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 w-fit"
              style={{ background: "var(--color-brand-purple)" }}
            >
              {isAr ? "اقرأ الخبر" : "Read Article"} <ExternalLink size={13} />
            </a>
          ) : (
            <Link
              href={href}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 w-fit"
              style={{ background: "var(--color-brand-purple)" }}
            >
              {isAr ? "اقرأ الخبر" : "Read Article"} <ArrowRight size={13} />
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}

interface Props { locale: string; ctaBook: string; ctaWhatsapp: string; ctaTitle: string; }

export function NewsContent({ locale, ctaBook, ctaWhatsapp, ctaTitle }: Props) {
  const isAr = locale === "ar";
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Build category list from data
  const categories = useMemo(() => {
    const cats = Array.from(new Set(newsPosts.map(p => isAr ? p.category.ar : p.category.en)));
    return cats;
  }, [isAr]);

  const filtered = useMemo(() => {
    let result = newsPosts;
    if (activeCategory !== "all") {
      result = result.filter(p => (isAr ? p.category.ar : p.category.en) === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.en.toLowerCase().includes(q) ||
        p.title.ar.includes(q) ||
        p.excerpt.en.toLowerCase().includes(q) ||
        p.excerpt.ar.includes(q)
      );
    }
    return result;
  }, [activeCategory, searchQuery, isAr]);

  const featured = filtered.find(p => p.featured);
  const rest = filtered.filter(p => !p.featured || searchQuery.trim() || activeCategory !== "all");

  return (
    <main>
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <section className="pt-36 pb-10" style={{ background: "#ffffff", borderBottom: "1px solid #eef2f6" }}>
        <div className="max-w-7xl mx-auto px-6">

          {/* Title row */}
          <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
            <div>
              <span
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full"
                style={{ background: "rgba(136,7,114,0.07)", color: "var(--color-brand-purple)" }}
              >
                <Newspaper size={11} strokeWidth={2.5} />
                {isAr ? "الأخبار والتحديثات" : "News & Updates"}
              </span>
              <h1
                className="font-black leading-tight mb-3"
                style={{ fontSize: "clamp(28px, 4vw, 48px)", color: "#111827" }}
              >
                {isAr ? "آخر الأخبار" : "Latest News"}
              </h1>
              <p className="text-sm max-w-xl" style={{ color: "#6B7280" }}>
                {isAr
                  ? "تابع آخر أخبار فيزيوتريو وبرجيل العربية — فعاليات، إنجازات، وتحديثات من مراكزنا"
                  : "Stay up to date with PhysioTrio & Burjeel Arabia — events, milestones and centre updates"}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-3xl font-black" style={{ color: "#111827" }}>{newsPosts.length}</p>
              <p className="text-xs" style={{ color: "#9CA3AF" }}>{isAr ? "خبر" : "articles"}</p>
            </div>
          </div>

          {/* Search bar */}
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl mb-6"
            style={{ background: "#f8fafc", border: "1px solid #eef2f6" }}
          >
            <Search size={16} style={{ color: "#9CA3AF" }} className="shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={isAr ? "ابحث في الأخبار..." : "Search news..."}
              className="flex-1 bg-transparent text-sm placeholder:text-gray-400"
              style={{ color: "#111827", outline: "none", boxShadow: "none" }}
              dir={isAr ? "rtl" : "ltr"}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs font-semibold px-2 py-0.5 rounded-md transition-colors hover:bg-gray-200"
                style={{ color: "#9CA3AF" }}
              >
                {isAr ? "مسح" : "Clear"}
              </button>
            )}
          </div>

          {/* Category filters */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setActiveCategory("all")}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={{
                background: activeCategory === "all" ? "var(--color-brand-purple)" : "transparent",
                color: activeCategory === "all" ? "white" : "#6B7280",
                border: `1.5px solid ${activeCategory === "all" ? "var(--color-brand-purple)" : "#E5E7EB"}`,
              }}
            >
              {isAr ? "الكل" : "All"}
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                style={{
                  background: activeCategory === cat ? "var(--color-brand-purple)" : "transparent",
                  color: activeCategory === cat ? "white" : "#6B7280",
                  border: `1.5px solid ${activeCategory === cat ? "var(--color-brand-purple)" : "#E5E7EB"}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <section className="py-12" style={{ background: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + "|" + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Featured post — only shown in "all" view without search */}
              {featured && !searchQuery.trim() && activeCategory === "all" && (
                <div className="mb-10">
                  <FeaturedCard post={featured} locale={locale} isAr={isAr} />
                </div>
              )}

              {/* Grid */}
              {rest.length > 0 && (
                <>
                  {featured && !searchQuery.trim() && activeCategory === "all" && (
                    <h3 className="text-lg font-bold mb-6" style={{ color: "#1a1a2e" }}>
                      {isAr ? "أخبار أخرى" : "More News"}
                    </h3>
                  )}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {rest.map((post, i) => (
                      <NewsCard key={post.id} post={post} locale={locale} isAr={isAr} index={i} />
                    ))}
                  </div>
                </>
              )}

              {/* Empty state */}
              {filtered.length === 0 && (
                <motion.div className="text-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Search size={32} className="mx-auto mb-3" style={{ color: "#E5E7EB" }} />
                  <p className="text-base font-semibold mb-1" style={{ color: "#374151" }}>
                    {isAr ? "لا توجد نتائج" : "No articles found"}
                  </p>
                  <p className="text-sm" style={{ color: "#9CA3AF" }}>
                    {isAr ? "جرب كلمات بحث مختلفة أو فئة أخرى" : "Try a different search term or category"}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <BookingCTABand locale={locale} title={ctaTitle} bookText={ctaBook} whatsappText={ctaWhatsapp} />
    </main>
  );
}

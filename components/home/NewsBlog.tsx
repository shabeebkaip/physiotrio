"use client";

import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import type { NewsPost } from "@/lib/data/news";

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
  const visible = posts.slice(0, 3);

  return (
    <section className="py-20 md:py-28 border-t border-gray-100" style={{
      background: "#F8FAFC",
      backgroundImage: "radial-gradient(circle, rgba(11,22,44,0.055) 1px, transparent 1px)",
      backgroundSize: "28px 28px",
    }}>
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-6 h-px" style={{ background: "var(--color-brand-green)" }} />
              <span
                className="text-[10px] font-black uppercase tracking-[0.22em]"
                style={{ color: "var(--color-brand-green)" }}
              >
                {isAr ? "الأخبار والإعلام" : "News & Media"}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black leading-tight" style={{ color: "#0B162C" }}>
              {isAr ? "ابقَ على اطلاع بأحدث أخبارنا" : "Latest News & Updates"}
            </h2>
          </div>
          <Link
            href={`/${locale}/news`}
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-bold shrink-0 transition-colors hover:opacity-70"
            style={{ color: "#0B162C" }}
          >
            {isAr ? "جميع المقالات" : "All Articles"}
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {visible.map((post) => (
            <Link
              key={post.id}
              href={post.externalUrl ?? `/${locale}/news/${post.slug}`}
              target={post.externalUrl ? "_blank" : undefined}
              rel={post.externalUrl ? "noopener noreferrer" : undefined}
              className="group flex flex-col bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all duration-200"
            >
              {/* Category bar */}
              <div className="h-1" style={{ background: "var(--color-brand-green)" }} />

              <div className="p-6 flex flex-col flex-1">
                {/* Category + read time */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                    style={{
                      background: "rgba(var(--color-brand-green-rgb),0.08)",
                      color: "var(--color-brand-green)",
                    }}
                  >
                    {isAr ? post.category.ar : post.category.en}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock size={11} />
                    {post.readMinutes} {isAr ? "د" : "min"}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-bold text-base leading-snug mb-2 flex-1"
                  style={{ color: "#0B162C" }}
                >
                  {isAr ? post.title.ar : post.title.en}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-5">
                  {isAr ? post.excerpt.ar : post.excerpt.en}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar size={11} />
                    {formatDate(post.date, locale)}
                  </span>
                  <span
                    className="flex items-center gap-1 text-xs font-bold transition-all group-hover:gap-2"
                    style={{ color: "var(--color-brand-purple)" }}
                  >
                    {isAr ? "اقرأ" : "Read"}
                    <ArrowRight size={11} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href={`/${locale}/news`}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-md text-sm font-bold border-2 transition-all text-[#0B162C] hover:bg-[#0B162C] hover:border-[#0B162C] hover:text-white"
            style={{ borderColor: "#0B162C" }}
          >
            {isAr ? "جميع المقالات" : "All Articles"}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

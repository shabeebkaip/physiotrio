"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import type { NewsPost } from "@/lib/data/news";

interface NewsBlogProps {
  locale: string;
  posts: NewsPost[];
}

const CATEGORY_COLOR: Record<string, string> = {
  Partnership: "#0d6efd",
  Events: "#7c3aed",
  "Company News": "#059669",
  Leadership: "#b45309",
  Expansion: "#dc2626",
};

function formatDate(dateStr: string, locale: string) {
  return new Date(dateStr).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-SA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getCategoryColor(en: string) {
  return CATEGORY_COLOR[en] ?? "var(--color-brand-green)";
}

export function NewsBlog({ locale, posts }: NewsBlogProps) {
  const isAr = locale === "ar";
  const featured = posts[0];
  const secondary = posts.slice(1, 4);

  if (!featured) return null;

  return (
    <section
      className="py-20 sm:py-28"
      style={{ background: "#f4f6f8" }}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: "var(--color-brand-green)" }}
          >
            {isAr ? "الأخبار والإعلام" : "News & Media"}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
              {isAr ? "آخر أخبار فيزيوتريو" : "Latest from PhysioTrio"}
            </h2>
            <Link
              href={`/${locale}/news`}
              className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:opacity-80"
              style={{ border: "1.5px solid #d1d5db", color: "#374151" }}
            >
              {isAr ? "جميع المقالات" : "All Articles"}
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>

        {/* Featured article — horizontal editorial card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-5"
        >
          <Link
            href={featured.externalUrl ?? `/${locale}/news/${featured.slug}`}
            target={featured.externalUrl ? "_blank" : undefined}
            rel={featured.externalUrl ? "noopener noreferrer" : undefined}
            className="group grid sm:grid-cols-[1fr_42%] bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
          >
            {/* Content */}
            <div className="flex flex-col justify-between p-7 sm:p-9 order-2 sm:order-1">
              <div>
                <span
                  className="inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded mb-4"
                  style={{
                    background: `${getCategoryColor(featured.category.en)}18`,
                    color: getCategoryColor(featured.category.en),
                  }}
                >
                  {isAr ? featured.category.ar : featured.category.en}
                </span>
                <h3
                  className="font-bold text-gray-900 leading-snug mb-3 transition-colors group-hover:text-green-800"
                  style={{ fontSize: "clamp(18px, 2vw, 24px)" }}
                >
                  {isAr ? featured.title.ar : featured.title.en}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                  {isAr ? featured.excerpt.ar : featured.excerpt.en}
                </p>
              </div>
              <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100">
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={11} />
                    {formatDate(featured.date, locale)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={11} />
                    {featured.readMinutes} {isAr ? "د قراءة" : "min read"}
                  </span>
                </div>
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-bold transition-all group-hover:gap-3"
                  style={{ color: "var(--color-brand-green)" }}
                >
                  {isAr ? "اقرأ المقال" : "Read article"}
                  <ArrowRight size={13} />
                </span>
              </div>
            </div>

            {/* Image */}
            <div className="relative order-1 sm:order-2" style={{ minHeight: "260px" }}>
              <Image
                src={featured.image}
                alt={isAr ? featured.title.ar : featured.title.en}
                fill
                sizes="(max-width:640px) 100vw, 42vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
            </div>
          </Link>
        </motion.div>

        {/* Secondary articles — 3-column row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {secondary.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <Link
                href={post.externalUrl ?? `/${locale}/news/${post.slug}`}
                target={post.externalUrl ? "_blank" : undefined}
                rel={post.externalUrl ? "noopener noreferrer" : undefined}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all h-full"
              >
                {/* Thumbnail */}
                <div className="relative" style={{ height: "180px" }}>
                  <Image
                    src={post.image}
                    alt={isAr ? post.title.ar : post.title.en}
                    fill
                    sizes="(max-width:640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <span
                    className="inline-block text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded mb-3 self-start"
                    style={{
                      background: `${getCategoryColor(post.category.en)}15`,
                      color: getCategoryColor(post.category.en),
                    }}
                  >
                    {isAr ? post.category.ar : post.category.en}
                  </span>
                  <h4 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 mb-3 flex-1 transition-colors group-hover:text-green-800">
                    {isAr ? post.title.ar : post.title.en}
                  </h4>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <span className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Calendar size={10} />
                      {formatDate(post.date, locale)}
                    </span>
                    <span
                      className="text-xs font-semibold transition-opacity group-hover:opacity-75"
                      style={{ color: "var(--color-brand-green)" }}
                    >
                      {isAr ? "اقرأ" : "Read →"}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

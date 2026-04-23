"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import type { Program } from "@/lib/data/programs";

interface ProgramsTeaserProps {
  locale: string;
  programs: Program[];
}

const CATEGORY_STYLE: Record<string, { accent: string; label: { en: string; ar: string } }> = {
  rehabilitation: {
    accent: "var(--color-brand-green)",
    label: { en: "Rehabilitation", ar: "تأهيل" },
  },
  package: {
    accent: "var(--color-brand-purple)",
    label: { en: "Package", ar: "باقة" },
  },
  "womens-health": {
    accent: "#be185d",
    label: { en: "Women's Health", ar: "صحة المرأة" },
  },
  neurological: {
    accent: "#4338ca",
    label: { en: "Neurological", ar: "عصبي" },
  },
};

const PREVIEW_COUNT = 3;

export function ProgramsTeaser({ locale, programs }: ProgramsTeaserProps) {
  const isAr = locale === "ar";
  const preview = programs.slice(0, PREVIEW_COUNT);
  const featured = preview[0];
  const rest = preview.slice(1);

  return (
    <section className="py-20 sm:py-28 bg-white border-t border-gray-100" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--color-brand-green)" }}>
              {isAr ? "البرامج العلاجية" : "Programs & Packages"}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
              {isAr ? "برامج مصممة لحالتك" : "Programs Built Around Your Condition"}
            </h2>
          </div>
          <Link
            href={`/${locale}/packages`}
            className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:opacity-80"
            style={{ border: "1.5px solid #d1fae5", color: "var(--color-brand-green-dark)" }}
          >
            {isAr ? `جميع البرامج (${programs.length})` : `All Programs (${programs.length})`}
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Layout: 1 featured (left) + 2 stacked (right) */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4">

          {/* Featured program */}
          {featured && (() => {
            const style = CATEGORY_STYLE[featured.category] ?? CATEGORY_STYLE.package;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative bg-gray-950 rounded-2xl overflow-hidden flex flex-col p-8 sm:p-10"
                style={{ minHeight: "420px" }}
              >
                {/* Left accent bar */}
                <div
                  className="absolute top-0 left-0 bottom-0 w-1 rounded-l-2xl"
                  style={{ background: style.accent }}
                />

                {/* Category */}
                <span
                  className="inline-block text-xs font-bold uppercase tracking-widest mb-6 px-2.5 py-1 rounded-md self-start"
                  style={{ background: `${style.accent}22`, color: style.accent }}
                >
                  {isAr ? style.label.ar : style.label.en}
                </span>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-2">
                  {isAr ? featured.title.ar : featured.title.en}
                </h3>
                <p className="text-sm italic mb-6" style={{ color: style.accent }}>
                  {isAr ? featured.tagline.ar : featured.tagline.en}
                </p>
                <p className="text-sm text-gray-400 leading-relaxed mb-8 max-w-md">
                  {isAr ? featured.overview.ar : featured.overview.en}
                </p>

                {/* Includes */}
                <ul className="space-y-2 mb-8">
                  {featured.includes.slice(0, 4).map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: style.accent }} />
                      {isAr ? item.ar : item.en}
                    </li>
                  ))}
                  {featured.includes.length > 4 && (
                    <li className="text-xs font-semibold" style={{ color: style.accent }}>
                      +{featured.includes.length - 4} {isAr ? "المزيد" : "more"}
                    </li>
                  )}
                </ul>

                <div className="mt-auto">
                  <Link
                    href={`/${locale}/packages/${featured.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{ background: style.accent }}
                  >
                    {isAr ? "تفاصيل البرنامج" : "View Program"}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            );
          })()}

          {/* Right stack */}
          <div className="flex flex-col gap-4">
            {rest.map((program, i) => {
              const style = CATEGORY_STYLE[program.category] ?? CATEGORY_STYLE.package;
              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (i + 1) * 0.08 }}
                  className="relative bg-white rounded-2xl border border-gray-200 p-6 flex flex-col flex-1 hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-6 right-6 h-0.5 rounded-full"
                    style={{ background: style.accent }}
                  />

                  <div className="flex items-start justify-between mb-3 pt-2">
                    <span
                      className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded"
                      style={{ color: style.accent, background: `${style.accent}15` }}
                    >
                      {isAr ? style.label.ar : style.label.en}
                    </span>
                  </div>

                  <h3 className="font-bold text-gray-900 leading-snug mb-1">
                    {isAr ? program.title.ar : program.title.en}
                  </h3>
                  <p className="text-xs italic mb-4" style={{ color: style.accent }}>
                    {isAr ? program.tagline.ar : program.tagline.en}
                  </p>

                  <ul className="space-y-1.5 mb-5">
                    {program.includes.slice(0, 2).map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-gray-500">
                        <Check size={12} className="mt-0.5 shrink-0" style={{ color: style.accent }} />
                        {isAr ? item.ar : item.en}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/${locale}/packages/${program.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold mt-auto transition-opacity hover:opacity-75"
                    style={{ color: style.accent }}
                  >
                    {isAr ? "عرض البرنامج" : "View Program"}
                    <ArrowRight size={13} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <Link
            href={`/${locale}/packages`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm text-white transition-all hover:opacity-90"
            style={{ background: "var(--color-brand-green)" }}
          >
            {isAr ? `استعرض جميع البرامج — ${programs.length} برنامجًا` : `Explore All ${programs.length} Programs`}
            <ArrowRight size={15} />
          </Link>
        </div>

      </div>
    </section>
  );
}

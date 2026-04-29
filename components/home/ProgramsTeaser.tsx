"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Calendar } from "lucide-react";

import type { Program } from "@/lib/data/programs";

const CATEGORY_STYLE: Record<string, {
  color: string; bg: string; border: string;
  label: { en: string; ar: string };
}> = {
  rehabilitation: {
    color: "var(--color-brand-green-dark)",
    bg: "rgba(var(--color-brand-green-rgb),0.09)",
    border: "rgba(var(--color-brand-green-rgb),0.25)",
    label: { en: "Rehabilitation", ar: "تأهيل" },
  },
  package: {
    color: "var(--color-brand-purple)",
    bg: "rgba(var(--color-brand-purple-rgb),0.08)",
    border: "rgba(var(--color-brand-purple-rgb),0.22)",
    label: { en: "Package", ar: "باقة" },
  },
  "womens-health": {
    color: "#be185d",
    bg: "rgba(236,72,153,0.08)",
    border: "rgba(236,72,153,0.22)",
    label: { en: "Women's Health", ar: "صحة المرأة" },
  },
  neurological: {
    color: "#4338ca",
    bg: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.22)",
    label: { en: "Neurological", ar: "عصبي" },
  },
};

interface ProgramsTeaserProps {
  locale: string;
  programs: Program[];
}

const PREVIEW_COUNT = 3;

export function ProgramsTeaser({ locale, programs }: ProgramsTeaserProps) {
  const isAr = locale === "ar";
  const preview = programs.slice(0, PREVIEW_COUNT);

  return (
    <section className="py-24" style={{ background: "#f8fffe" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <span
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full"
              style={{ background: "rgba(var(--color-brand-green-rgb),0.10)", color: "var(--color-brand-green-dark)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--color-brand-green)" }} />
              {isAr ? "البرامج العلاجية" : "Programs & Packages"}
            </span>
            <h2
              className="font-black leading-tight mb-2"
              style={{ fontSize: "clamp(26px, 3.5vw, 44px)", color: "#0f2b1f" }}
            >
              {isAr ? "برامج علاجية مصممة لك" : "Treatment Programs Designed For You"}
            </h2>
            <p className="text-base" style={{ color: "#4B7563" }}>
              {isAr
                ? "كل برنامج مصمم بعناية لحالتك، من التقييم الشامل حتى العودة الكاملة."
                : "Each program is carefully designed for your condition, from full assessment to complete recovery."}
            </p>
          </div>
          <Link
            href={`/${locale}/packages`}
            className="inline-flex items-center gap-2 text-sm font-semibold shrink-0 px-5 py-2.5 rounded-full transition-all hover:opacity-80 whitespace-nowrap"
            style={{ border: "1.5px solid rgba(var(--color-brand-green-rgb),0.35)", color: "var(--color-brand-green-dark)" }}
          >
            {isAr ? `جميع البرامج (${programs.length})` : `All Programs (${programs.length})`}
            <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Programs grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {preview.map((program, i) => {
            const style = CATEGORY_STYLE[program.category] ?? CATEGORY_STYLE.package;
            const num = String(i + 1).padStart(2, "0");

            return (
              <motion.div
                key={program.id}
                className="bg-white rounded-2xl flex flex-col group overflow-hidden"
                style={{
                  border: "1px solid #E5EEEA",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.45 }}
                whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(0,0,0,0.10)", transition: { duration: 0.2 } }}
              >
                {/* Colored left-side accent + top bar */}
                <div
                  className="h-1 w-full shrink-0"
                  style={{ background: `linear-gradient(to right, ${style.color} 0%, transparent 100%)` }}
                />

                <div className="p-6 flex flex-col flex-1">

                  {/* Number badge + category */}
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className="font-black text-2xl leading-none tabular-nums"
                      style={{ color: style.bg === "rgba(var(--color-brand-green-rgb),0.09)" ? "rgba(var(--color-brand-green-rgb),0.20)" : `${style.color}22` }}
                    >
                      {num}
                    </span>
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full"
                      style={{ background: style.bg, color: style.color, border: `1px solid ${style.border}` }}
                    >
                      {isAr ? style.label.ar : style.label.en}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-black text-lg leading-snug mb-2"
                    style={{ color: "#0f2b1f" }}
                  >
                    {isAr ? program.title.ar : program.title.en}
                  </h3>

                  {/* Tagline */}
                  <p
                    className="text-sm font-medium mb-4 leading-relaxed"
                    style={{ color: style.color }}
                  >
                    {isAr ? program.tagline.ar : program.tagline.en}
                  </p>

                  {/* Divider */}
                  <div className="h-px mb-4" style={{ background: "#EDF3F0" }} />

                  {/* Overview */}
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "#4B7563" }}>
                    {isAr ? program.overview.ar : program.overview.en}
                  </p>

                  {/* Includes */}
                  <ul className="space-y-2 mb-5">
                    {program.includes.slice(0, 3).map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm" style={{ color: "#374151" }}>
                        <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: "var(--color-brand-green)" }} />
                        {isAr ? item.ar : item.en}
                      </li>
                    ))}
                    {program.includes.length > 3 && (
                      <li
                        className="text-xs font-bold pl-6"
                        style={{ color: style.color }}
                      >
                        +{program.includes.length - 3} {isAr ? "المزيد" : "more"}
                      </li>
                    )}
                  </ul>

                  {/* Spacer */}
                  <div className="flex-1" />

                  {/* Result callout */}
                  <div
                    className="flex items-start gap-2.5 px-4 py-3 rounded-xl mb-5 text-sm font-semibold"
                    style={{ background: style.bg, color: style.color }}
                  >
                    <CheckCircle2 size={15} className="shrink-0 mt-0.5" strokeWidth={2.5} />
                    {isAr ? program.result.ar : program.result.en}
                  </div>

                  {/* Primary CTA — Book Now */}
                  <Link
                    href={`/${locale}/book/riyadh?program=${program.slug}`}
                    className="w-full py-3 rounded-xl text-sm font-bold text-center flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 mb-2"
                    style={{ background: "var(--color-brand-green)", color: "white" }}
                  >
                    <Calendar size={14} />
                    {isAr ? "احجز الآن" : "Book Now"}
                  </Link>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href={`/${locale}/packages`}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #0f2b1f 0%, var(--color-brand-green) 100%)",
              color: "white",
              boxShadow: "0 4px 20px rgba(var(--color-brand-green-rgb),0.35)",
            }}
          >
            {isAr
              ? `استعرض جميع البرامج — ${programs.length} برنامجًا`
              : `Explore All ${programs.length} Programs`}
            <ArrowRight size={15} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

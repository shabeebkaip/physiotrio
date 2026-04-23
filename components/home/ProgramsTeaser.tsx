"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import type { Program } from "@/lib/data/programs";

interface ProgramsTeaserProps {
  locale: string;
  programs: Program[];
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string; label: { en: string; ar: string } }> = {
  rehabilitation: {
    bg: "rgba(var(--color-brand-green-rgb),0.08)",
    text: "var(--color-brand-green-dark)",
    border: "rgba(var(--color-brand-green-rgb),0.25)",
    label: { en: "Rehabilitation", ar: "تأهيل" },
  },
  package: {
    bg: "rgba(var(--color-brand-purple-rgb),0.07)",
    text: "var(--color-brand-purple)",
    border: "rgba(var(--color-brand-purple-rgb),0.2)",
    label: { en: "Package", ar: "باقة" },
  },
  "womens-health": {
    bg: "rgba(236,72,153,0.07)",
    text: "#be185d",
    border: "rgba(236,72,153,0.2)",
    label: { en: "Women's Health", ar: "صحة المرأة" },
  },
  neurological: {
    bg: "rgba(99,102,241,0.07)",
    text: "#4338ca",
    border: "rgba(99,102,241,0.2)",
    label: { en: "Neurological", ar: "عصبي" },
  },
};

const PREVIEW_COUNT = 3;

export function ProgramsTeaser({ locale, programs }: ProgramsTeaserProps) {
  const isAr = locale === "ar";
  const preview = programs.slice(0, PREVIEW_COUNT);

  return (
    <section className="py-24" style={{ background: "#fafffe" }}>
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
              style={{ background: "rgba(var(--color-brand-green-rgb),0.1)", color: "var(--color-brand-green-dark)" }}
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
            style={{ border: "1.5px solid rgba(var(--color-brand-green-rgb),0.4)", color: "var(--color-brand-green-dark)" }}
          >
            {isAr ? `جميع البرامج (${programs.length})` : `All Programs (${programs.length})`}
            <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Programs grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {preview.map((program, i) => {
            const colors = CATEGORY_COLORS[program.category];
            return (
              <motion.div
                key={program.id}
                className="bg-white rounded-2xl overflow-hidden flex flex-col group"
                style={{ border: "1px solid #e4f2eb" }}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                {/* Top accent bar */}
                <div className="h-1" style={{ background: `linear-gradient(to right, var(--color-brand-green), var(--color-brand-purple))` }} />

                <div className="p-6 flex flex-col flex-1">
                  {/* Icon + category */}
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl leading-none">{program.icon}</span>
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
                    >
                      {isAr ? colors.label.ar : colors.label.en}
                    </span>
                  </div>

                  {/* Title + tagline */}
                  <h3 className="font-black text-base leading-snug mb-2" style={{ color: "#0f2b1f" }}>
                    {isAr ? program.title.ar : program.title.en}
                  </h3>
                  <p className="text-xs font-medium mb-4 italic" style={{ color: "var(--color-brand-green-dark)" }}>
                    {isAr ? program.tagline.ar : program.tagline.en}
                  </p>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "#4B7563" }}>
                    {isAr ? program.overview.ar : program.overview.en}
                  </p>

                  {/* Includes — show first 3 */}
                  <ul className="space-y-1.5 mb-5">
                    {program.includes.slice(0, 3).map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs" style={{ color: "#374151" }}>
                        <CheckCircle2 size={13} className="mt-0.5 shrink-0" style={{ color: "var(--color-brand-green)" }} />
                        {isAr ? item.ar : item.en}
                      </li>
                    ))}
                    {program.includes.length > 3 && (
                      <li className="text-xs font-semibold" style={{ color: "var(--color-brand-green-dark)" }}>
                        +{program.includes.length - 3} {isAr ? "المزيد" : "more"}
                      </li>
                    )}
                  </ul>

                  {/* Result pill */}
                  <div
                    className="px-3 py-2 rounded-xl text-xs font-semibold mb-5"
                    style={{ background: "rgba(var(--color-brand-green-rgb),0.07)", color: "#1a5c3a" }}
                  >
                    ✓ {isAr ? program.result.ar : program.result.en}
                  </div>

                  {/* Spacer */}
                  <div className="flex-1" />

                  {/* CTA */}
                  <Link
                    href={`/${locale}/packages/${program.slug}`}
                    className="w-full py-2.5 rounded-xl text-sm font-bold text-center flex items-center justify-center gap-2 transition-all group-hover:gap-3"
                    style={{ background: "var(--color-brand-green)", color: "white" }}
                  >
                    {isAr ? "تفاصيل البرنامج" : "View Program"}
                    <ChevronRight size={14} />
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

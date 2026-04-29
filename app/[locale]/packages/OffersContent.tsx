"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, Calendar, Lock, ArrowRight, Phone,
  Search, X, MapPin, SlidersHorizontal, Zap,
} from "lucide-react";
import { BookingCTABand } from "@/components/common/BookingCTABand";
import { packages, type Package } from "@/lib/data/packages";
import { useLocation } from "@/lib/context/LocationContext";

// ─── Category meta ─────────────────────────────────────────────────────────

const ALL_CATEGORIES = ["All", ...Array.from(new Set(packages.map((p) => p.category)))];

const CAT_AR: Record<string, string> = {
  All: "الكل",
  "Sports Rehabilitation": "إعادة تأهيل رياضية",
  Orthopedic: "عظام ومفاصل",
  Spine: "العمود الفقري",
  Neurological: "أعصاب",
  "Women's Health": "صحة المرأة",
  Geriatric: "كبار السن",
  Recovery: "التعافي",
  Sports: "الرياضة",
};

const CAT_COLORS: Record<string, { bg: string; text: string; border: string; bar: string }> = {
  "Sports Rehabilitation": { bg: "rgba(76,175,80,0.09)",   text: "#2d6a4f",                             border: "rgba(76,175,80,0.22)",   bar: "#4caf50" },
  Orthopedic:             { bg: "rgba(136,7,114,0.08)",   text: "var(--color-brand-purple)",           border: "rgba(136,7,114,0.2)",    bar: "var(--color-brand-purple)" },
  Spine:                  { bg: "rgba(245,158,11,0.09)",  text: "#92400e",                             border: "rgba(245,158,11,0.22)",  bar: "#f59e0b" },
  Neurological:           { bg: "rgba(59,130,246,0.09)",  text: "#1e40af",                             border: "rgba(59,130,246,0.22)",  bar: "#3b82f6" },
  "Women's Health":       { bg: "rgba(236,72,153,0.09)",  text: "#9d174d",                             border: "rgba(236,72,153,0.22)",  bar: "#ec4899" },
  Recovery:               { bg: "rgba(16,185,129,0.09)",  text: "#065f46",                             border: "rgba(16,185,129,0.22)",  bar: "#10b981" },
  Sports:                 { bg: "rgba(239,68,68,0.09)",   text: "#991b1b",                             border: "rgba(239,68,68,0.22)",   bar: "#ef4444" },
};

const DEFAULT_COLOR = { bg: "rgba(107,114,128,0.08)", text: "#374151", border: "rgba(107,114,128,0.2)", bar: "#6b7280" };

// ─── Package Card ───────────────────────────────────────────────────────────

function PackageCard({ pkg, locale, isAr, index }: { pkg: Package; locale: string; isAr: boolean; index: number }) {
  const color = CAT_COLORS[pkg.category] ?? DEFAULT_COLOR;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.22, delay: Math.min(index * 0.04, 0.2) }}
      className="bg-white rounded-2xl overflow-hidden flex flex-col group"
      style={{
        border: "1px solid rgba(0,0,0,0.07)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
      whileHover={{ y: -3, boxShadow: "0 10px 36px rgba(0,0,0,0.10)" }}
    >
      {/* Colour accent bar */}
      <div className="h-1 shrink-0" style={{ background: color.bar }} />

      <div className="p-5 flex flex-col flex-1">

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <span
            className="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
            style={{ background: color.bg, color: color.text, border: `1px solid ${color.border}` }}
          >
            {isAr ? (CAT_AR[pkg.category] ?? pkg.category) : pkg.category}
          </span>

          {pkg.badge && (
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
              style={{ background: "rgba(255,193,7,0.13)", color: "#78350f", border: "1px solid rgba(255,193,7,0.28)" }}>
              <Zap size={9} className="inline mr-0.5" strokeWidth={2.5} />
              {isAr ? pkg.badge.ar : pkg.badge.en}
            </span>
          )}

          {pkg.featured && !pkg.badge && (
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full"
              style={{ background: "rgba(76,175,80,0.10)", color: "#1a5c3a", border: "1px solid rgba(76,175,80,0.22)" }}>
              {isAr ? "الأكثر طلباً" : "Popular"}
            </span>
          )}

          {pkg.privateService && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full"
              style={{ background: "#fce4ec", color: "#880e4f", border: "1px solid rgba(136,14,79,0.2)" }}>
              <Lock size={9} strokeWidth={2.5} />
              {isAr ? "للسيدات فقط" : "Women Only"}
            </span>
          )}

          {pkg.branch !== "all" && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full ml-auto"
              style={{ background: "#f3f4f6", color: "#374151", border: "1px solid #e5e7eb" }}>
              <MapPin size={9} strokeWidth={2.5} />
              {pkg.branch === "riyadh" ? (isAr ? "الرياض" : "Riyadh") : (isAr ? "مكة" : "Makkah")}
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="font-black text-base leading-snug mb-2" style={{ color: "#111827" }}>
          {isAr ? pkg.name.ar : pkg.name.en}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "#6B7280" }}>
          {isAr ? pkg.description.ar : pkg.description.en}
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-4 pb-4 mb-4" style={{ borderBottom: "1px solid #f3f4f6" }}>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={14} style={{ color: color.bar }} />
            <span className="text-sm font-black" style={{ color: "#111827" }}>{pkg.sessions}</span>
            <span className="text-xs" style={{ color: "#9CA3AF" }}>{isAr ? "جلسة" : "sessions"}</span>
          </div>

          {pkg.validityDays && (
            <div className="flex items-center gap-1.5">
              <Calendar size={13} style={{ color: "#9CA3AF" }} />
              <span className="text-xs" style={{ color: "#6B7280" }}>
                {pkg.validityDays}{isAr ? " يوم" : " days"}
              </span>
            </div>
          )}

          {(pkg.tamaraEligible || pkg.tabbyEligible) && (
            <div className="flex items-center gap-1 ml-auto">
              {pkg.tamaraEligible && (
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded"
                  style={{ background: "#e8f5e9", color: "#1b5e20" }}>Tamara</span>
              )}
              {pkg.tabbyEligible && (
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded"
                  style={{ background: "#e3f2fd", color: "#0d47a1" }}>Tabby</span>
              )}
            </div>
          )}
        </div>

        {/* CTA */}
        <Link
          href={`/${locale}/book/${pkg.branch === "all" ? "riyadh" : pkg.branch}?package=${pkg.slug}`}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
          style={{ background: "var(--color-brand-purple)" }}
        >
          {isAr ? "احجز الآن" : "Book Now"}
          <ArrowRight size={14} />
        </Link>

        {/* Call alternative */}
        <a
          href="tel:8001000246"
          dir="ltr"
          className="flex items-center justify-center gap-1.5 mt-2.5 text-xs font-medium"
          style={{ color: "#9CA3AF" }}
        >
          <Phone size={11} />
          {isAr ? "أو اتصل بنا" : "or call us"}
        </a>

      </div>
    </motion.div>
  );
}

// ─── Main Content ───────────────────────────────────────────────────────────

interface Props { locale: string; ctaBook: string; ctaWhatsapp: string; ctaTitle: string; }

export function OffersContent({ locale, ctaBook, ctaWhatsapp, ctaTitle }: Props) {
  const isAr = locale === "ar";
  const { location } = useLocation();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let result = packages;

    // Branch filter from global location context
    if (location !== "all") {
      result = result.filter((p) => p.branch === "all" || p.branch === location);
    }

    // Category filter
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Text search across name + description
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (p) =>
          p.name.en.toLowerCase().includes(q) ||
          p.name.ar.includes(searchQuery.trim()) ||
          p.description.en.toLowerCase().includes(q) ||
          p.description.ar.includes(searchQuery.trim()) ||
          p.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeCategory, searchQuery, location]);

  const hasActiveFilters = activeCategory !== "All" || searchQuery.trim() !== "";

  return (
    <main>

      {/* ── Light clinical header with search ── */}
      <section
        className="pt-36 pb-0"
        style={{ background: "#ffffff", borderBottom: "1px solid #eef2f6" }}
      >
        <div className="max-w-7xl mx-auto px-6">

          {/* Top meta row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <span
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full"
                style={{ background: "rgba(136,7,114,0.07)", color: "var(--color-brand-purple)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--color-brand-purple)" }} />
                {isAr ? "البرامج والباقات" : "Programs & Packages"}
              </span>
              <h1
                className="font-black mb-2"
                style={{ fontSize: "clamp(26px, 3.5vw, 44px)", color: "#111827", lineHeight: 1.15 }}
              >
                {isAr ? "اختر باقتك المناسبة" : "Find Your Package"}
              </h1>
              <p className="text-sm" style={{ color: "#6B7280", maxWidth: 480 }}>
                {isAr
                  ? "جميع الباقات مصممة من معالجين مرخصين من وزارة الصحة"
                  : "All packages designed by MOH-licensed therapists across Riyadh & Makkah"}
              </p>
            </div>

            {/* Stat chips */}
            <div className="hidden sm:flex items-center gap-6">
              {[
                { val: packages.length, label: isAr ? "باقة" : "packages" },
                { val: "35+", label: isAr ? "معالج" : "therapists" },
                { val: "2", label: isAr ? "فرع" : "branches" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl font-black" style={{ color: "#111827" }}>{s.val}</p>
                  <p className="text-xs" style={{ color: "#9CA3AF" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Search bar — sits at the bottom of the header, overlapping into filter section */}
          <div className="relative max-w-2xl -mb-6 z-10">
            <div
              className="flex items-center gap-3 px-5 rounded-2xl"
              style={{
                background: "#F9FAFB",
                border: "1.5px solid #E5E7EB",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                height: 56,
              }}
            >
              <Search size={16} style={{ color: "#9CA3AF", flexShrink: 0 }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isAr
                    ? "ابحث... مثال: آلام الركبة، الكتف، الظهر"
                    : "Search... e.g. knee pain, shoulder, back injury"
                }
                className="flex-1 bg-transparent text-sm placeholder:text-gray-400"
                style={{ color: "#111827", outline: "none", boxShadow: "none" }}
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setSearchQuery("")}
                    className="p-1.5 rounded-full shrink-0"
                    style={{ background: "#E5E7EB", color: "#6B7280" }}
                  >
                    <X size={13} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>

      {/* ── Filter bar + card grid ── */}
      <section className="pb-10 pt-14" style={{ background: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-6">

          {/* Category filter pills */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <SlidersHorizontal size={14} className="shrink-0" style={{ color: "#9CA3AF" }} />

            {ALL_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              const color = cat !== "All" ? (CAT_COLORS[cat] ?? DEFAULT_COLOR) : null;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
                  style={{
                    background: isActive ? (color?.bar ?? "var(--color-brand-purple)") : "white",
                    color: isActive ? "white" : (color?.text ?? "#374151"),
                    border: `1px solid ${isActive ? "transparent" : (color?.border ?? "#e5e7eb")}`,
                    boxShadow: isActive ? "0 2px 10px rgba(0,0,0,0.15)" : "0 1px 3px rgba(0,0,0,0.05)",
                  }}
                >
                  {isAr ? (CAT_AR[cat] ?? cat) : cat}
                </button>
              );
            })}

            {/* Result count + clear */}
            <div className="ml-auto flex items-center gap-3">
              <span className="text-sm" style={{ color: "#9CA3AF" }}>
                {filtered.length} {isAr ? "نتيجة" : filtered.length === 1 ? "result" : "results"}
              </span>
              <AnimatePresence>
                {hasActiveFilters && (
                  <motion.button
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 6 }}
                    onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{ background: "white", color: "#6B7280", border: "1px solid #e5e7eb" }}
                  >
                    <X size={11} />
                    {isAr ? "مسح الكل" : "Clear all"}
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Cards */}
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <motion.div
                key="grid"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                <AnimatePresence>
                  {filtered.map((pkg, i) => (
                    <PackageCard key={pkg.id} pkg={pkg} locale={locale} isAr={isAr} index={i} />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-24"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{ background: "rgba(136,7,114,0.07)" }}
                >
                  <Search size={24} style={{ color: "var(--color-brand-purple)" }} />
                </div>
                <h3 className="text-lg font-black mb-2" style={{ color: "#111827" }}>
                  {isAr ? "لا توجد نتائج" : "No packages found"}
                </h3>
                <p className="text-sm mb-6 max-w-xs mx-auto" style={{ color: "#9CA3AF" }}>
                  {isAr
                    ? "جرب كلمات بحث مختلفة أو غيّر الفئة"
                    : "Try different search terms or change the category filter"}
                </p>
                <button
                  onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                  className="px-6 py-2.5 rounded-full text-sm font-bold text-white"
                  style={{ background: "var(--color-brand-purple)" }}
                >
                  {isAr ? "مسح الفلاتر" : "Clear Filters"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Help note */}
          <div
            className="mt-10 flex items-start gap-3 p-5 rounded-2xl"
            style={{ background: "white", border: "1px solid #e8ecf0" }}
          >
            <Phone size={16} style={{ color: "var(--color-brand-green)", marginTop: 2, flexShrink: 0 }} />
            <p className="text-sm" style={{ color: "#4B7563" }}>
              {isAr
                ? "غير متأكد من الباقة المناسبة لك؟ تواصل مع فريقنا على "
                : "Not sure which package suits you? Call our team on "}
              <a href="tel:8001000246" dir="ltr" className="font-bold" style={{ color: "var(--color-brand-purple)" }}>
                800 100 0246
              </a>
              {isAr ? " وسيساعدونك في الاختيار." : " and they will help you choose."}
            </p>
          </div>

        </div>
      </section>

      {/* Payment methods */}
      <section className="py-6" style={{ background: "white", borderTop: "1px solid #f0f0f0" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#9CA3AF" }}>
              {isAr ? "طرق الدفع" : "Payment"}
            </p>
            {["Visa", "Mastercard", "Mada", "Apple Pay", "STC Pay", "Tamara", "Tabby"].map((m) => (
              <span
                key={m}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg"
                style={{ background: "#f8fafc", color: "#374151", border: "1px solid #e5e7eb" }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      <BookingCTABand locale={locale} title={ctaTitle} bookText={ctaBook} whatsappText={ctaWhatsapp} />
    </main>
  );
}

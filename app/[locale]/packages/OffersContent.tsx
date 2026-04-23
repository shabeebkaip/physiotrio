"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Calendar, Clock, Lock, ArrowRight, Phone } from "lucide-react";
import { BookingCTABand } from "@/components/common/BookingCTABand";
import { packages, type Package } from "@/lib/data/packages";

const CATEGORIES = ["All", "Sports Rehabilitation", "Orthopedic", "Neurological", "Women's Health", "Geriatric"];

const CAT_AR: Record<string, string> = {
  "All": "الكل",
  "Sports Rehabilitation": "إعادة تأهيل رياضية",
  "Orthopedic": "عظام ومفاصل",
  "Neurological": "أعصاب",
  "Women's Health": "صحة المرأة",
  "Geriatric": "كبار السن",
};

interface Props { locale: string; ctaBook: string; ctaWhatsapp: string; ctaTitle: string; }

function PackageRow({ pkg, locale, isAr, index }: { pkg: Package; locale: string; isAr: boolean; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className="bg-white rounded-xl overflow-hidden"
      style={{ border: "1px solid #e8f0eb" }}
    >
      {/* Green top accent on featured */}
      {pkg.featured && (
        <div className="h-0.5" style={{ background: "linear-gradient(to right, var(--color-brand-green), var(--color-brand-purple))" }} />
      )}

      <div className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">

          {/* Left: info */}
          <div className="flex-1 min-w-0">
            {/* Category + tags */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ background: "#f0f7f3", color: "#2d6a4f" }}>
                {isAr ? (CAT_AR[pkg.category] ?? pkg.category) : pkg.category}
              </span>
              {pkg.badge && (
                <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: "rgba(var(--color-brand-green-rgb),0.12)", color: "var(--color-brand-green-dark)" }}>
                  {isAr ? pkg.badge.ar : pkg.badge.en}
                </span>
              )}
              {pkg.privateService && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded" style={{ background: "#fce4ec", color: "#880e4f" }}>
                  <Lock size={9} /> {isAr ? "للسيدات فقط" : "Women Only"}
                </span>
              )}
            </div>

            {/* Name */}
            <h3 className="font-bold text-base leading-snug mb-1.5" style={{ color: "#0f2b1f" }}>
              {isAr ? pkg.name.ar : pkg.name.en}
            </h3>

            {/* Description */}
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#4B7563", maxWidth: "560px" }}>
              {isAr ? pkg.description.ar : pkg.description.en}
            </p>

            {/* Specs row */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "#0f2b1f" }}>
                <CheckCircle2 size={14} style={{ color: "var(--color-brand-green)" }} />
                {pkg.sessions} {isAr ? "جلسة" : "sessions"}
              </span>
              {pkg.validityDays && (
                <span className="flex items-center gap-1.5 text-sm" style={{ color: "#6B7280" }}>
                  <Calendar size={13} />
                  {pkg.validityDays} {isAr ? "يوم صلاحية" : "days validity"}
                </span>
              )}
              {(pkg.tamaraEligible || pkg.tabbyEligible) && (
                <span className="flex items-center gap-1.5 text-xs" style={{ color: "#6B7280" }}>
                  <Clock size={11} />
                  {isAr ? "تقسيط متاح" : "Instalment available"}
                  {pkg.tamaraEligible && <span className="font-bold ml-1" style={{ color: "#1a5c3a" }}>Tamara</span>}
                  {pkg.tabbyEligible && <span className="font-bold ml-1" style={{ color: "#1565c0" }}>Tabby</span>}
                </span>
              )}
            </div>
          </div>

          {/* Right: CTA */}
          <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2 shrink-0 sm:pt-1">
            <Link
              href={`/${locale}/book/${pkg.branch === "all" ? "riyadh" : pkg.branch}?package=${pkg.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white transition-all hover:opacity-90 whitespace-nowrap"
              style={{ background: "var(--color-brand-green)" }}
            >
              {isAr ? "احجز الآن" : "Book Now"}
              <ArrowRight size={13} />
            </Link>
            <a
              href="tel:8001000246"
              className="inline-flex items-center gap-1.5 text-xs font-medium whitespace-nowrap"
              style={{ color: "#6B7280" }}
            >
              <Phone size={11} />
              {isAr ? "أو اتصل بنا" : "or call us"}
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function OffersContent({ locale, ctaBook, ctaWhatsapp, ctaTitle }: Props) {
  const isAr = locale === "ar";
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? packages : packages.filter(p => p.category === activeCategory);

  return (
    <main>
      {/* Page header — clean, no image hero */}
      <section className="pt-36 pb-12" style={{ background: "#f6fdf9", borderBottom: "1px solid #e4f2eb" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <span
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full"
              style={{ background: "rgba(var(--color-brand-green-rgb),0.12)", color: "var(--color-brand-green-dark)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-brand-green)" }} />
              {isAr ? "البرامج والباقات" : "Programs & Packages"}
            </span>
            <h1 className="font-black mb-3" style={{ fontSize: "clamp(28px, 4vw, 48px)", color: "#0f2b1f" }}>
              {isAr ? "باقات العلاج الطبيعي" : "Physiotherapy Packages"}
            </h1>
            <p className="text-base leading-relaxed mb-6" style={{ color: "#4B7563" }}>
              {isAr
                ? "جميع الباقات مصممة من قبل معالجين مرخصين من وزارة الصحة. اختر الباقة المناسبة لحالتك واحجز مباشرة."
                : "All packages are designed by MOH-licensed therapists. Choose what fits your condition and book directly."}
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6">
              {[
                { val: packages.length, label: isAr ? "باقة متاحة" : "packages available" },
                { val: "35+", label: isAr ? "معالج مرخص" : "licensed therapists" },
                { val: "2", label: isAr ? "فرع نشط" : "active branches" },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-2xl font-black" style={{ color: "#0f2b1f" }}>{s.val}</p>
                  <p className="text-xs" style={{ color: "#4B7563" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category filter + list */}
      <section className="py-12" style={{ background: "#fafffe" }}>
        <div className="max-w-7xl mx-auto px-6">

          {/* Category tabs */}
          <div className="flex gap-2 flex-wrap mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{
                  background: activeCategory === cat ? "var(--color-brand-green)" : "white",
                  color: activeCategory === cat ? "white" : "#4B7563",
                  border: `1px solid ${activeCategory === cat ? "var(--color-brand-green)" : "#d4e8da"}`,
                }}
              >
                {isAr ? (CAT_AR[cat] ?? cat) : cat}
              </button>
            ))}
          </div>

          {/* Package list */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {filtered.map((pkg, i) => (
                <PackageRow key={pkg.id} pkg={pkg} locale={locale} isAr={isAr} index={i} />
              ))}

              {filtered.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-base" style={{ color: "#9CA3AF" }}>
                    {isAr ? "لا توجد باقات في هذه الفئة حالياً" : "No packages in this category yet"}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Help note */}
          <div className="mt-10 flex items-start gap-3 p-5 rounded-xl" style={{ background: "white", border: "1px solid #e4f2eb" }}>
            <Phone size={16} style={{ color: "var(--color-brand-green)", marginTop: 2, flexShrink: 0 }} />
            <p className="text-sm" style={{ color: "#4B7563" }}>
              {isAr
                ? "غير متأكد من الباقة المناسبة لك؟ تواصل مع فريقنا على "
                : "Not sure which package suits you? Call our team on "}
              <a href="tel:8001000246" className="font-bold" style={{ color: "#0f2b1f" }}>800 100 0246</a>
              {isAr ? " وسيساعدونك في الاختيار." : " and they will help you choose."}
            </p>
          </div>
        </div>
      </section>

      {/* Accepted payment */}
      <section className="py-8" style={{ background: "white", borderTop: "1px solid #e4f2eb" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#9CA3AF" }}>
              {isAr ? "طرق الدفع" : "Payment"}
            </p>
            {["Visa", "Mastercard", "Mada", "Apple Pay", "STC Pay", "Tamara", "Tabby"].map((m) => (
              <span key={m} className="text-xs font-semibold px-3 py-1.5 rounded-md" style={{ background: "#f6fdf9", color: "#0f2b1f", border: "1px solid #e4f2eb" }}>
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

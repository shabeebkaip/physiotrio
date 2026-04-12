"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Calendar, Sparkles, ArrowRight, Tag, Lock } from "lucide-react";
import { BookingCTABand } from "@/components/common/BookingCTABand";
import { packages, type Package } from "@/lib/data/packages";

const categories = ["All", "Sports Rehabilitation", "Orthopedic", "Neurological", "Women's Health", "Geriatric"];
const categoriesAr: Record<string, string> = {
  "All": "الكل",
  "Sports Rehabilitation": "إعادة تأهيل رياضية",
  "Orthopedic": "عظام ومفاصل",
  "Neurological": "أعصاب",
  "Women's Health": "صحة المرأة",
  "Geriatric": "كبار السن",
};

const paymentMethods = ["Visa", "Mastercard", "Mada", "Apple Pay", "STC Pay"];

interface Props { locale: string; ctaBook: string; ctaWhatsapp: string; ctaTitle: string; }

function PackageCard({ pkg, locale, isAr, index }: { pkg: Package; locale: string; isAr: boolean; index: number }) {
  return (
    <motion.div
      className="group bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:border-brand-purple hover:shadow-xl hover:-translate-y-1"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
    >
      {pkg.image ? (
        <div className="relative h-44 overflow-hidden bg-gray-100">
          <Image
            src={pkg.image}
            alt={isAr ? pkg.name.ar : pkg.name.en}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(10,20,30,0.5) 100%)" }}
          />
          {pkg.featured && (
            <div
              className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
              style={{ background: "rgba(255,255,255,0.95)", color: "var(--color-brand-purple)" }}
            >
              <Sparkles size={10} /> {isAr ? "مميز" : "Featured"}
            </div>
          )}
          {pkg.badge && (
            <div className="absolute bottom-3 left-4">
              <span
                className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: "var(--color-brand-purple)", color: "white" }}
              >
                {isAr ? pkg.badge.ar : pkg.badge.en}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="h-2 bg-gray-50" />
      )}

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {pkg.privateService && (
            <span
              className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: "rgba(var(--color-brand-green-rgb),0.1)", color: "var(--color-brand-green-dark)" }}
            >
              <Lock size={10} />{isAr ? "للسيدات فقط" : "Women Only"}
            </span>
          )}
          <span
            className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: "rgba(var(--color-brand-purple-rgb),0.08)", color: "var(--color-brand-purple)" }}
          >
            <Tag size={9} />{pkg.category}
          </span>
        </div>

        <h3 className="font-bold text-base leading-snug mb-2" style={{ color: "#1a1a2e" }}>
          {isAr ? pkg.name.ar : pkg.name.en}
        </h3>
        <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "#6B7280" }}>
          {isAr ? pkg.description.ar : pkg.description.en}
        </p>

        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{ background: "rgba(var(--color-brand-purple-rgb),0.08)", color: "var(--color-brand-purple)" }}
          >
            <CheckCircle2 size={11} />{pkg.sessions} {isAr ? "جلسة" : "sessions"}
          </span>
          {pkg.validityDays && (
            <span
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ background: "#F1F5F9", color: "#6B7280" }}
            >
              <Calendar size={11} />{pkg.validityDays} {isAr ? "يوم" : "days"}
            </span>
          )}
        </div>

        {(pkg.tamaraEligible || pkg.tabbyEligible) && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs" style={{ color: "#9CA3AF" }}>{isAr ? "تقسيط:" : "Instalment:"}</span>
            {pkg.tamaraEligible && (
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-md" style={{ background: "#e8f5e9", color: "var(--color-brand-green-dark)" }}>Tamara</span>
            )}
            {pkg.tabbyEligible && (
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-md" style={{ background: "#e3f2fd", color: "#1565c0" }}>Tabby</span>
            )}
          </div>
        )}

        <Link
          href={`/${locale}/book/${pkg.branch === "all" ? "riyadh" : pkg.branch}?package=${pkg.slug}`}
          className="flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
          style={{ background: "var(--color-brand-purple)" }}
        >
          {isAr ? "احجز هذه الباقة" : "Book This Package"} <ArrowRight size={13} />
        </Link>
      </div>
    </motion.div>
  );
}

export function OffersContent({ locale, ctaBook, ctaWhatsapp, ctaTitle }: Props) {
  const isAr = locale === "ar";
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? packages : packages.filter(p => p.category === activeCategory);
  const featured = filtered.filter(p => p.featured);
  const rest = filtered.filter(p => !p.featured);

  return (
    <main>
      {/* Hero */}
      <section
        className="relative overflow-hidden flex flex-col justify-end"
        style={{ height: "70vh", minHeight: "420px" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=85&fit=crop"
          alt="PhysioTrio Offers & Packages"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(10,20,30,0.88) 0%, rgba(10,20,30,0.45) 60%, rgba(10,20,30,0.15) 100%)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-14 md:pb-20 w-full">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.15)", color: "white", backdropFilter: "blur(8px)" }}
          >
            {isAr ? "العروض والباقات" : "Offers & Packages"}
          </span>
          <h1
            className="font-bold text-white leading-tight mb-4"
            style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
          >
            {isAr ? "ابدأ رحلتك اليوم" : "Start Your Journey Today"}
          </h1>
          <p
            className="text-lg md:text-xl max-w-xl"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            {isAr
              ? "باقات متخصصة لكل حالة. دفع مرن مع تمارا وتابي."
              : "Specialised packages for every condition. Flexible payment with Tamara & Tabby."}
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section header + filter */}
          <div className="mb-10">
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
              style={{ background: "rgba(var(--color-brand-purple-rgb),0.08)", color: "var(--color-brand-purple)" }}
            >
              {isAr ? "الباقات" : "Packages"}
            </span>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#1a1a2e" }}>
                  {isAr ? "اختر باقتك" : "Choose Your Package"}
                </h2>
                <p className="text-base max-w-xl" style={{ color: "#6B7280" }}>
                  {isAr
                    ? "جميع الباقات تشمل جلسات مع معالجين مرخصين من وزارة الصحة السعودية"
                    : "All packages include sessions with MOH-licensed therapists"}
                </p>
              </div>

              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
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
                    {isAr ? (categoriesAr[cat] ?? cat) : cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {featured.length > 0 && (
                <>
                  <div className="flex items-center gap-2 mb-6">
                    <Sparkles size={16} style={{ color: "var(--color-brand-purple)" }} />
                    <h3 className="text-lg font-bold" style={{ color: "#1a1a2e" }}>
                      {isAr ? "الباقات المميزة" : "Featured Packages"}
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
                    {featured.map((pkg, i) => (
                      <PackageCard key={pkg.id} pkg={pkg} locale={locale} isAr={isAr} index={i} />
                    ))}
                  </div>
                </>
              )}

              {rest.length > 0 && (
                <>
                  {featured.length > 0 && (
                    <h3 className="text-lg font-bold mb-6" style={{ color: "#1a1a2e" }}>
                      {isAr ? "باقات أخرى" : "More Packages"}
                    </h3>
                  )}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {rest.map((pkg, i) => (
                      <PackageCard key={pkg.id} pkg={pkg} locale={locale} isAr={isAr} index={i} />
                    ))}
                  </div>
                </>
              )}

              {filtered.length === 0 && (
                <motion.div className="text-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p className="text-base" style={{ color: "#9CA3AF" }}>
                    {isAr ? "لا توجد باقات في هذه الفئة" : "No packages in this category yet"}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Payment strip */}
      <section className="py-12" style={{ background: "var(--color-surface-light)", borderTop: "1px solid #F3F4F6" }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-5"
            style={{ color: "#9CA3AF" }}
          >
            {isAr ? "طرق الدفع المقبولة" : "Accepted Payment Methods"}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="px-4 py-2 rounded-full text-xs font-semibold"
                style={{ background: "white", color: "#6B7280", border: "1px solid #E5E7EB" }}
              >
                {method}
              </span>
            ))}
            <span
              className="px-4 py-2 rounded-full text-xs font-bold"
              style={{ background: "#e8f5e9", color: "var(--color-brand-green-dark)", border: "1px solid rgba(var(--color-brand-green-rgb),0.25)" }}
            >
              Tamara
            </span>
            <span
              className="px-4 py-2 rounded-full text-xs font-bold"
              style={{ background: "#e3f2fd", color: "#1565c0", border: "1px solid rgba(21,101,192,0.2)" }}
            >
              Tabby
            </span>
          </div>
        </div>
      </section>

      <BookingCTABand locale={locale} title={ctaTitle} bookText={ctaBook} whatsappText={ctaWhatsapp} />
    </main>
  );
}

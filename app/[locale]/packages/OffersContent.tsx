"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Calendar, ArrowRight, Tag, Lock, Star } from "lucide-react";
import { BookingCTABand } from "@/components/common/BookingCTABand";
import { packages, type Package } from "@/lib/data/packages";

const categories = ["All", "Sports Rehabilitation", "Orthopedic", "Neurological", "Women's Health", "Geriatric", "Spine"];
const categoriesAr: Record<string, string> = {
  "All": "الكل",
  "Sports Rehabilitation": "إعادة تأهيل رياضية",
  "Orthopedic": "عظام ومفاصل",
  "Neurological": "أعصاب",
  "Women's Health": "صحة المرأة",
  "Geriatric": "كبار السن",
  "Spine": "العمود الفقري",
};

const CATEGORY_COLORS: Record<string, string> = {
  "Sports Rehabilitation": "bg-brand-green",
  "Orthopedic": "bg-brand-purple",
  "Neurological": "bg-blue-400",
  "Women's Health": "bg-rose-400",
  "Geriatric": "bg-amber-400",
  "Spine": "bg-teal-400",
};

const paymentMethods = ["Visa", "Mastercard", "Mada", "Apple Pay", "STC Pay"];

interface Props { locale: string; ctaBook: string; ctaWhatsapp: string; ctaTitle: string; }

function PackageCard({ pkg, locale, isAr }: { pkg: Package; locale: string; isAr: boolean }) {
  const accentClass = CATEGORY_COLORS[pkg.category] ?? "bg-brand-purple";

  return (
    <div className="bg-white rounded-2xl border border-gray-200 hover:border-brand-purple/25 hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden">
      {/* Accent bar */}
      <div className={`h-1 w-full ${accentClass}`} />

      <div className="p-5 flex flex-col flex-1">
        {/* Badges */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {pkg.featured && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700">
              <Star size={9} fill="currentColor" /> {isAr ? "مميز" : "Featured"}
            </span>
          )}
          {pkg.privateService && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-rose-50 text-rose-600">
              <Lock size={9} />{isAr ? "للسيدات فقط" : "Women Only"}
            </span>
          )}
          {pkg.badge && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-brand-purple/8 text-brand-purple">
              {isAr ? pkg.badge.ar : pkg.badge.en}
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-md bg-gray-100 text-gray-500 ms-auto">
            <Tag size={9} />{isAr ? categoriesAr[pkg.category] ?? pkg.category : pkg.category}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-2">
          {isAr ? pkg.name.ar : pkg.name.en}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-3 mb-4 flex-1">
          {isAr ? pkg.description.ar : pkg.description.en}
        </p>

        {/* Sessions + validity */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="flex items-center gap-1 text-xs font-medium text-gray-700 bg-gray-100 px-2.5 py-1 rounded-md">
            <CheckCircle2 size={11} className="text-brand-purple" />
            {pkg.sessions} {isAr ? "جلسة" : "sessions"}
          </span>
          {pkg.validityDays && (
            <span className="flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
              <Calendar size={11} />
              {pkg.validityDays} {isAr ? "يوم" : "days"}
            </span>
          )}
        </div>

        {/* Instalment */}
        {(pkg.tamaraEligible || pkg.tabbyEligible) && (
          <div className="flex items-center gap-1.5 mb-4">
            <span className="text-[10px] text-gray-400">{isAr ? "تقسيط متاح:" : "Instalment:"}</span>
            {pkg.tamaraEligible && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-green-50 text-green-700">Tamara</span>
            )}
            {pkg.tabbyEligible && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">Tabby</span>
            )}
          </div>
        )}

        {/* CTA */}
        <Link
          href={`/${locale}/book/${pkg.branch === "all" ? "riyadh" : pkg.branch}?package=${pkg.slug}`}
          className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold text-white bg-brand-purple hover:opacity-90 transition-opacity"
        >
          {isAr ? "احجز هذه الباقة" : "Book This Package"}
          <ArrowRight size={12} className={isAr ? "rotate-180" : ""} />
        </Link>
      </div>
    </div>
  );
}

export function OffersContent({ locale, ctaBook, ctaWhatsapp, ctaTitle }: Props) {
  const isAr = locale === "ar";
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? packages : packages.filter(p => p.category === activeCategory);

  return (
    <main dir={isAr ? "rtl" : "ltr"}>

      {/* Hero */}
      <section className="pt-36 pb-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-purple mb-4 block">
            {isAr ? "الباقات" : "Packages"}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            {isAr ? "باقاتنا العلاجية" : "Treatment Packages"}
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">
            {isAr
              ? "باقات متخصصة لكل حالة مع معالجين مرخصين من وزارة الصحة. دفع مرن مع تمارا وتابي."
              : "Specialised packages for every condition with MOH-licensed therapists. Flexible payment with Tamara & Tabby."}
          </p>
        </div>
      </section>

      {/* Packages grid */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Category filter */}
          <div className="flex gap-2 mb-10 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 border"
                style={{
                  background: activeCategory === cat ? "var(--color-brand-purple)" : "white",
                  color: activeCategory === cat ? "white" : "#6B7280",
                  borderColor: activeCategory === cat ? "var(--color-brand-purple)" : "#E5E7EB",
                }}
              >
                {isAr ? (categoriesAr[cat] ?? cat) : cat}
              </button>
            ))}
            <span className="self-center text-sm text-gray-400 ms-2">
              {filtered.length} {isAr ? "باقة" : "packages"}
            </span>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} locale={locale} isAr={isAr} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-sm text-gray-400">
                {isAr ? "لا توجد باقات في هذه الفئة" : "No packages in this category yet"}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Payment methods */}
      <section className="py-10 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-4">
            {isAr ? "طرق الدفع المقبولة" : "Accepted Payment Methods"}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {paymentMethods.map((method) => (
              <span key={method} className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-500 bg-gray-50 border border-gray-200">
                {method}
              </span>
            ))}
            <span className="px-4 py-2 rounded-lg text-xs font-bold text-green-700 bg-green-50 border border-green-100">Tamara</span>
            <span className="px-4 py-2 rounded-lg text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100">Tabby</span>
          </div>
        </div>
      </section>

      <BookingCTABand locale={locale} title={ctaTitle} bookText={ctaBook} whatsappText={ctaWhatsapp} />
    </main>
  );
}

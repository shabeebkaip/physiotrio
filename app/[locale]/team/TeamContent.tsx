"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Globe, Shield, MapPin } from "lucide-react";
import { BookingCTABand } from "@/components/common/BookingCTABand";
import { therapists } from "@/lib/data/therapists";

const specializationLabels: Record<string, { en: string; ar: string }> = {
  "physiotherapy": { en: "Physiotherapy", ar: "علاج طبيعي" },
  "manual-therapy": { en: "Manual Therapy", ar: "العلاج اليدوي" },
  "sports-physiotherapy": { en: "Sports", ar: "رياضي" },
  "neurological-rehabilitation": { en: "Neuro Rehab", ar: "تأهيل عصبي" },
  "geriatric-physiotherapy": { en: "Geriatric", ar: "كبار السن" },
  "pediatric-physiotherapy": { en: "Pediatric", ar: "أطفال" },
  "womens-health": { en: "Women's Health", ar: "صحة المرأة" },
  "device-based-therapy": { en: "Device Therapy", ar: "علاج بالأجهزة" },
  "hydrotherapy": { en: "Hydrotherapy", ar: "علاج مائي" },
};

const AVATAR_COLORS = [
  { bg: "bg-brand-purple/10", text: "text-brand-purple" },
  { bg: "bg-brand-green/10", text: "text-brand-green" },
  { bg: "bg-blue-50", text: "text-blue-600" },
  { bg: "bg-amber-50", text: "text-amber-600" },
  { bg: "bg-rose-50", text: "text-rose-600" },
  { bg: "bg-teal-50", text: "text-teal-600" },
];

interface Props { locale: string; ctaBook: string; ctaWhatsapp: string; ctaTitle: string; }

export function TeamContent({ locale, ctaBook, ctaWhatsapp, ctaTitle }: Props) {
  const isAr = locale === "ar";
  const [activeBranch, setActiveBranch] = useState<"all" | "riyadh" | "makkah">("all");

  const filtered = activeBranch === "all"
    ? therapists
    : therapists.filter(t => t.branches.includes(activeBranch));

  return (
    <main dir={isAr ? "rtl" : "ltr"}>

      {/* ── Hero ── */}
      <section className="pt-36 pb-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-purple mb-4 block">
            {isAr ? "فريقنا" : "Our Team"}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            {isAr ? "معالجونا المتخصصون" : "Our Specialist Therapists"}
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">
            {isAr
              ? "50+ معالج طبيعي مرخص من وزارة الصحة السعودية. خبرات متنوعة. نتائج موثوقة."
              : "50+ MOH-licensed therapists across Riyadh and Makkah. Diverse expertise. Proven results."}
          </p>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Filter */}
          <div className="flex gap-2 mb-10 flex-wrap">
            {(["all", "riyadh", "makkah"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setActiveBranch(b)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-150 border"
                style={{
                  background: activeBranch === b ? "var(--color-brand-purple)" : "white",
                  color: activeBranch === b ? "white" : "#6B7280",
                  borderColor: activeBranch === b ? "var(--color-brand-purple)" : "#E5E7EB",
                }}
              >
                {b === "all"
                  ? (isAr ? "كل الفروع" : "All Branches")
                  : b === "riyadh"
                    ? (isAr ? "الرياض" : "Riyadh")
                    : (isAr ? "مكة المكرمة" : "Makkah")}
              </button>
            ))}
            <span className="self-center text-sm text-gray-400 ms-2">
              {filtered.length} {isAr ? "معالج" : "therapists"}
            </span>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((therapist, i) => {
              const color = AVATAR_COLORS[i % AVATAR_COLORS.length];
              const branch = therapist.branches[0] || "riyadh";
              const name = isAr ? therapist.name.ar : therapist.name.en;
              const firstName = name.split(" ")[0];

              return (
                <div
                  key={therapist.id}
                  className="bg-white rounded-2xl border border-gray-200 hover:border-brand-purple/25 hover:shadow-md transition-all duration-200 flex flex-col"
                >
                  {/* Card top: avatar + name + title */}
                  <div className="p-5 flex items-start gap-4 border-b border-gray-100">
                    <div className={`w-14 h-14 rounded-xl ${color.bg} flex items-center justify-center shrink-0`}>
                      <span className={`text-xl font-bold ${color.text}`}>
                        {therapist.initials}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 leading-tight mb-0.5 line-clamp-2">
                        {name}
                      </h3>
                      <p className="text-xs text-gray-500 leading-snug line-clamp-2">
                        {isAr ? therapist.title.ar : therapist.title.en}
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="px-5 pt-4">
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                      {isAr ? therapist.bio.ar : therapist.bio.en}
                    </p>
                  </div>

                  {/* Specializations */}
                  <div className="px-5 pt-3 pb-2 flex flex-wrap gap-1.5 flex-1 content-start">
                    {therapist.specializations.slice(0, 3).map(spec => (
                      <span
                        key={spec}
                        className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md"
                      >
                        {isAr ? specializationLabels[spec]?.ar ?? spec : specializationLabels[spec]?.en ?? spec}
                      </span>
                    ))}
                  </div>

                  {/* Meta */}
                  <div className="px-5 pb-4 pt-3 border-t border-gray-100 mt-auto">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1 text-[11px] text-gray-400">
                          <MapPin size={10} className="shrink-0" />
                          {therapist.branches.map(br =>
                            br === "riyadh"
                              ? (isAr ? "الرياض" : "Riyadh")
                              : (isAr ? "مكة" : "Makkah")
                          ).join(" · ")}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-gray-400">
                          <Globe size={10} className="shrink-0" />
                          {therapist.languages.slice(0, 2).join(" · ")}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-[11px] text-gray-400">
                        <Shield size={10} className="text-brand-green shrink-0" />
                        {therapist.yearsExp} {isAr ? "سنة" : "yrs"}
                      </span>
                    </div>

                    <Link
                      href={`/${locale}/book/${branch}?therapist=${therapist.id}`}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold text-white bg-brand-purple hover:opacity-90 transition-opacity w-full"
                    >
                      {isAr ? `احجز مع ${firstName}` : `Book with ${firstName}`}
                      <ArrowRight size={12} className={isAr ? "rotate-180" : ""} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* MOH notice */}
          <p className="text-center text-sm mt-12 text-gray-400">
            <Shield size={13} className="inline mr-1.5 text-brand-green" />
            {isAr
              ? "جميع معالجينا مرخصون بالكامل من وزارة الصحة السعودية ويحملون مؤهلات معترفاً بها دولياً."
              : "All therapists are MOH-licensed and hold internationally recognised qualifications."}
          </p>
        </div>
      </section>

      <BookingCTABand locale={locale} title={ctaTitle} bookText={ctaBook} whatsappText={ctaWhatsapp} />
    </main>
  );
}

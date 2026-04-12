"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Globe, ArrowRight, Shield } from "lucide-react";
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

const branchColors: Record<string, string> = {
  riyadh: "var(--color-brand-purple)",
  makkah: "var(--color-brand-green)",
};

interface Props { locale: string; ctaBook: string; ctaWhatsapp: string; ctaTitle: string; }

export function TeamContent({ locale, ctaBook, ctaWhatsapp, ctaTitle }: Props) {
  const isAr = locale === "ar";
  const [activeBranch, setActiveBranch] = useState<"all" | "riyadh" | "makkah">("all");

  const filtered = activeBranch === "all" ? therapists : therapists.filter(t => t.branches.includes(activeBranch));

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden flex flex-col justify-end"
        style={{ height: "70vh", minHeight: "420px" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1920&q=85&fit=crop"
          alt="PhysioTrio Team"
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
            {isAr ? "فريقنا" : "Meet Our Team"}
          </span>
          <h1
            className="font-bold text-white leading-tight mb-4"
            style={{ fontSize: "clamp(36px, 5vw, 60px)" }}
          >
            {isAr ? "معالجون متخصصون" : "Specialist Therapists"}
          </h1>
          <p
            className="text-lg md:text-xl max-w-xl"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            {isAr
              ? "50+ معالج طبيعي مرخص من وزارة الصحة السعودية. خبرات متنوعة. نتائج موثوقة."
              : "50+ MOH-licensed therapists. Diverse expertise. Proven results."}
          </p>
        </div>
      </section>

      {/* ── Team Grid ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section header */}
          <div className="mb-10">
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
              style={{ background: "rgba(var(--color-brand-purple-rgb),0.08)", color: "var(--color-brand-purple)" }}
            >
              {isAr ? "الفريق" : "Our Team"}
            </span>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div>
                <h2
                  className="text-3xl md:text-4xl font-bold mb-3"
                  style={{ color: "#1a1a2e" }}
                >
                  {isAr ? "تعرف على معالجينا" : "Meet the Therapists"}
                </h2>
                <p className="text-base max-w-xl" style={{ color: "#6B7280" }}>
                  {isAr
                    ? "اختر الفرع لعرض الفريق المتاح في موقعك"
                    : "Filter by branch to find the team available near you"}
                </p>
              </div>

              {/* Branch filter */}
              <div className="flex gap-2 flex-wrap">
                {(["all", "riyadh", "makkah"] as const).map((b) => (
                  <button
                    key={b}
                    onClick={() => setActiveBranch(b)}
                    className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                    style={{
                      background: activeBranch === b ? "var(--color-brand-purple)" : "transparent",
                      color: activeBranch === b ? "white" : "#6B7280",
                      border: `1.5px solid ${activeBranch === b ? "var(--color-brand-purple)" : "#E5E7EB"}`,
                    }}
                  >
                    {b === "all"
                      ? (isAr ? "كل الفروع" : "All Branches")
                      : b === "riyadh"
                        ? (isAr ? "الرياض" : "Riyadh")
                        : (isAr ? "مكة المكرمة" : "Makkah")}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBranch}
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {filtered.map((therapist, i) => (
                <motion.div
                  key={therapist.id}
                  className="group bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-brand-purple hover:shadow-xl hover:-translate-y-1 flex flex-col"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                >
                  {/* Photo area */}
                  <div className="relative h-52 overflow-hidden bg-gray-100">
                    {therapist.image ? (
                      <Image
                        src={therapist.image}
                        alt={isAr ? therapist.name.ar : therapist.name.en}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #f0f9fa, var(--color-brand-purple-muted))" }}>
                        <span className="font-black text-6xl" style={{ color: "rgba(var(--color-brand-purple-rgb),0.15)" }}>{therapist.initials}</span>
                      </div>
                    )}

                    {/* Rating badge */}
                    <div
                      className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
                      style={{ background: "rgba(255,255,255,0.95)", color: "var(--color-brand-purple)" }}
                    >
                      <Star size={10} fill="#f59e0b" stroke="none" />
                      {therapist.rating.toFixed(1)}
                    </div>

                    {/* Branch dots */}
                    <div className="absolute top-3 left-3 flex gap-1">
                      {therapist.branches.map(br => (
                        <div
                          key={br}
                          className="w-2 h-2 rounded-full"
                          style={{ background: branchColors[br] ?? "#ccc" }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-5 flex flex-col flex-1">
                    {/* Name + title — fixed height area */}
                    <p className="font-bold text-base leading-snug mb-0.5 line-clamp-2 min-h-[2.75rem]" style={{ color: "#1a1a2e" }}>
                      {isAr ? therapist.name.ar : therapist.name.en}
                    </p>
                    <p className="text-xs mb-3" style={{ color: "#6B7280" }}>
                      {isAr ? therapist.title.ar : therapist.title.en}
                    </p>

                    {/* Bio — clamped to 3 lines */}
                    <p className="text-xs leading-relaxed mb-4 line-clamp-3 min-h-[3.75rem]" style={{ color: "#6B7280" }}>
                      {isAr ? therapist.bio.ar : therapist.bio.en}
                    </p>

                    {/* Specializations — fixed height area */}
                    <div className="flex flex-wrap gap-1.5 mb-4 min-h-[3.5rem] content-start">
                      {therapist.specializations.slice(0, 3).map(spec => (
                        <span
                          key={spec}
                          className="text-xs px-2.5 py-0.5 rounded-full font-semibold h-fit"
                          style={{ background: "rgba(var(--color-brand-purple-rgb),0.08)", color: "var(--color-brand-purple)" }}
                        >
                          {isAr ? specializationLabels[spec]?.ar ?? spec : specializationLabels[spec]?.en ?? spec}
                        </span>
                      ))}
                    </div>

                    {/* Meta row */}
                    <div className="flex items-center justify-between text-xs mb-4 mt-auto" style={{ color: "#9CA3AF" }}>
                      <span className="flex items-center gap-1">
                        <Globe size={11} />
                        {therapist.languages.slice(0, 2).join(" · ")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Shield size={11} style={{ color: "var(--color-brand-green)" }} />
                        {therapist.yearsExp} {isAr ? "سنة" : "yrs"}
                      </span>
                    </div>

                    {/* CTA */}
                    <Link
                      href={`/${locale}/book/${therapist.branches[0]}?therapist=${therapist.id}`}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-full text-xs font-bold text-white transition-all duration-300 group-hover:opacity-90"
                      style={{ background: "var(--color-brand-purple)" }}
                    >
                      {isAr
                        ? `احجز مع ${therapist.name.ar.split(" ")[0]}`
                        : `Book with ${therapist.name.en.split(" ")[0]}`}
                      <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* MOH notice */}
          <motion.p
            className="text-center text-sm mt-14"
            style={{ color: "#9CA3AF" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Shield size={14} className="inline mr-1.5" style={{ color: "var(--color-brand-green)" }} />
            {isAr
              ? "جميع معالجينا مرخصون بالكامل من وزارة الصحة السعودية ويحملون مؤهلات معترفاً بها دولياً."
              : "All therapists are MOH-licensed and hold internationally recognised qualifications."}
          </motion.p>
        </div>
      </section>

      <BookingCTABand locale={locale} title={ctaTitle} bookText={ctaBook} whatsappText={ctaWhatsapp} />
    </main>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Globe, Shield, ArrowRight, MapPin } from "lucide-react";
import { BookingCTABand } from "@/components/common/BookingCTABand";
import { therapists, type Therapist } from "@/lib/data/therapists";
import { useLocation } from "@/lib/context/LocationContext";

const specializationLabels: Record<string, { en: string; ar: string }> = {
  "physiotherapy":               { en: "Physiotherapy",  ar: "علاج طبيعي" },
  "manual-therapy":              { en: "Manual Therapy", ar: "العلاج اليدوي" },
  "sports-physiotherapy":        { en: "Sports",         ar: "رياضي" },
  "neurological-rehabilitation": { en: "Neuro Rehab",    ar: "تأهيل عصبي" },
  "geriatric-physiotherapy":     { en: "Geriatric",      ar: "كبار السن" },
  "pediatric-physiotherapy":     { en: "Pediatric",      ar: "أطفال" },
  "womens-health":               { en: "Women's Health", ar: "صحة المرأة" },
  "device-based-therapy":        { en: "Device Therapy", ar: "علاج بالأجهزة" },
  "hydrotherapy":                { en: "Hydrotherapy",   ar: "علاج مائي" },
};

const branchMeta: Record<string, { en: string; ar: string; color: string; bg: string }> = {
  riyadh: { en: "Riyadh", ar: "الرياض",      color: "var(--color-brand-purple)", bg: "rgba(136,7,114,0.07)" },
  makkah: { en: "Makkah", ar: "مكة المكرمة", color: "var(--color-brand-green)",  bg: "rgba(76,175,80,0.07)" },
};

function AvatarCircle({ initials, branches }: { initials: string; branches: string[] }) {
  const isPurple = (branches[0] ?? "riyadh") === "riyadh";
  return (
    <div
      className="relative flex-shrink-0 flex items-center justify-center rounded-full select-none"
      style={{
        width: 64,
        height: 64,
        background: isPurple
          ? "linear-gradient(135deg, #880772 0%, #A8389A 100%)"
          : "linear-gradient(135deg, #388e3c 0%, #4caf50 100%)",
        boxShadow: isPurple
          ? "0 4px 16px rgba(136,7,114,0.28)"
          : "0 4px 16px rgba(76,175,80,0.28)",
      }}
    >
      <span className="text-white font-black text-lg tracking-tight leading-none">{initials}</span>
      {branches.length > 1 && (
        <span
          className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center"
          style={{ background: "var(--color-brand-green)", fontSize: 7, color: "white", fontWeight: 700 }}
        >
          +1
        </span>
      )}
    </div>
  );
}

function TherapistCard({ therapist, i, isAr, locale }: { therapist: Therapist; i: number; isAr: boolean; locale: string }) {
  const primaryBranch = therapist.branches[0] ?? "riyadh";
  const branch = branchMeta[primaryBranch];

  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex flex-col"
      style={{ border: "1px solid #E5E7EB" }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: Math.min(i * 0.035, 0.35) }}
    >
      {/* Branch accent bar */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${branch.color} 0%, transparent 100%)` }} />

      <div className="p-4 flex gap-4 items-start">
        <AvatarCircle initials={therapist.initials} branches={therapist.branches} />

        <div className="flex-1 min-w-0">
          {/* Name + rating */}
          <div className="flex items-start justify-between gap-2 mb-0.5">
            <h3 className="font-bold text-sm leading-snug" style={{ color: "#1a1a2e" }}>
              {isAr ? therapist.name.ar : therapist.name.en}
            </h3>
            <span
              className="flex items-center gap-1 text-xs font-bold flex-shrink-0 px-2 py-0.5 rounded-full"
              style={{ background: "rgba(245,158,11,0.10)", color: "#b45309" }}
            >
              <Star size={9} fill="#f59e0b" stroke="none" />
              {therapist.rating.toFixed(1)}
            </span>
          </div>

          {/* Title */}
          <p className="text-xs mb-2 font-medium" style={{ color: branch.color }}>
            {isAr ? therapist.title.ar : therapist.title.en}
          </p>

          {/* Bio */}
          <p className="text-xs leading-relaxed mb-2.5 line-clamp-2" style={{ color: "#6B7280" }}>
            {isAr ? therapist.bio.ar : therapist.bio.en}
          </p>

          {/* Specializations */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {therapist.specializations.slice(0, 3).map(spec => (
              <span
                key={spec}
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: branch.bg, color: branch.color }}
              >
                {isAr ? specializationLabels[spec]?.ar ?? spec : specializationLabels[spec]?.en ?? spec}
              </span>
            ))}
            {therapist.specializations.length > 3 && (
              <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "#F3F4F6", color: "#6B7280" }}>
                +{therapist.specializations.length - 3}
              </span>
            )}
          </div>

          {/* Meta + book */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 text-xs flex-wrap" style={{ color: "#9CA3AF" }}>
              <span className="flex items-center gap-1">
                <Shield size={10} style={{ color: "var(--color-brand-green)" }} />
                {therapist.yearsExp}{isAr ? " سنة" : " yrs"}
              </span>
              <span className="flex items-center gap-1">
                <Globe size={10} />
                {therapist.languages.slice(0, 2).join(" · ")}
              </span>
            </div>
            <Link
              href={`/${locale}/book/${primaryBranch}?therapist=${therapist.id}`}
              className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full transition-opacity duration-200 hover:opacity-80 flex-shrink-0"
              style={{ background: branch.color, color: "white" }}
            >
              {isAr ? "احجز" : "Book"}
              <ArrowRight size={10} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface Props { locale: string; ctaBook: string; ctaWhatsapp: string; ctaTitle: string; }

export function TeamContent({ locale, ctaBook, ctaWhatsapp, ctaTitle }: Props) {
  const isAr = locale === "ar";
  const { location } = useLocation();
  const [activeBranch, setActiveBranch] = useState<"all" | "riyadh" | "makkah">("all");

  // Sync with global location context whenever it changes
  useEffect(() => {
    setActiveBranch(location);
  }, [location]);

  const riyadhTherapists = therapists.filter(t => t.branches.includes("riyadh"));
  const makkahTherapists = therapists.filter(t => t.branches.includes("makkah"));
  const filtered = activeBranch === "all" ? therapists : therapists.filter(t => t.branches.includes(activeBranch));

  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden flex flex-col justify-center"
        style={{ minHeight: "48vh", background: "linear-gradient(135deg, #1a0014 0%, #2d0026 40%, #0d1a0e 100%)" }}
      >
        <div className="absolute rounded-full pointer-events-none" style={{ width: 480, height: 480, top: "-120px", right: "-80px", background: "radial-gradient(circle, rgba(136,7,114,0.22) 0%, transparent 70%)" }} />
        <div className="absolute rounded-full pointer-events-none" style={{ width: 360, height: 360, bottom: "-100px", left: "-60px", background: "radial-gradient(circle, rgba(76,175,80,0.18) 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest mb-5 px-3 py-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)" }}
          >
            {isAr ? "فريقنا" : "Meet Our Team"}
          </span>
          <h1 className="font-black text-white mb-5 leading-tight" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
            {isAr ? "معالجون متخصصون" : "Specialist Therapists"}
          </h1>
          <p className="text-lg max-w-2xl mb-10" style={{ color: "rgba(255,255,255,0.65)" }}>
            {isAr
              ? "فريق من أكثر من 50 معالجاً طبيعياً مرخصاً من وزارة الصحة السعودية، يجمع بين خبرات متنوعة ونتائج موثوقة."
              : "A team of 50+ MOH-licensed physiotherapists combining diverse expertise and proven results."}
          </p>
          <div className="flex flex-wrap gap-4">
            {[
              { value: "50+",                          label: isAr ? "معالج مرخص"  : "Licensed Therapists" },
              { value: isAr ? "الرياض" : "Riyadh",    label: `${riyadhTherapists.length} ${isAr ? "معالج" : "therapists"}`, color: "var(--color-brand-purple)" },
              { value: isAr ? "مكة"    : "Makkah",    label: `${makkahTherapists.length} ${isAr ? "معالج" : "therapists"}`, color: "var(--color-brand-green)" },
              { value: "MOH",                          label: isAr ? "مرخص"        : "Licensed" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col px-5 py-3 rounded-xl" style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.10)" }}>
                <span className="font-black text-xl" style={{ color: s.color ?? "white" }}>{s.value}</span>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ──────────────────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20" style={{ background: "#F9FAFB" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Header + filter */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "#1a1a2e" }}>
                {isAr ? "تعرف على معالجينا" : "Meet the Therapists"}
              </h2>
              <p className="text-sm mt-1" style={{ color: "#6B7280" }}>
                {activeBranch === "all"
                  ? (isAr ? `${therapists.length} معالج في جميع الفروع` : `${therapists.length} therapists across all branches`)
                  : (isAr ? `${filtered.length} معالج في ${branchMeta[activeBranch].ar}` : `${filtered.length} therapists in ${branchMeta[activeBranch].en}`)}
              </p>
            </div>
            <div className="flex gap-1 p-1 rounded-xl" style={{ background: "white", border: "1px solid #E5E7EB" }}>
              {(["all", "riyadh", "makkah"] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setActiveBranch(b)}
                  className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                  style={{
                    background: activeBranch === b ? (b === "makkah" ? "var(--color-brand-green)" : "var(--color-brand-purple)") : "transparent",
                    color: activeBranch === b ? "white" : "#6B7280",
                  }}
                >
                  {b === "all" ? (isAr ? "الكل" : "All") : b === "riyadh" ? (isAr ? "الرياض" : "Riyadh") : (isAr ? "مكة" : "Makkah")}
                </button>
              ))}
            </div>
          </div>

          {/* Cards */}
          <AnimatePresence mode="wait">
            {activeBranch === "all" ? (
              /* Side-by-side columns — both branches visible at the top */
              <motion.div
                key="all"
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {(["riyadh", "makkah"] as const).map((branchKey) => {
                  const col = branchMeta[branchKey];
                  const colList = branchKey === "riyadh" ? riyadhTherapists : makkahTherapists;
                  return (
                    <div key={branchKey}>
                      {/* Column header */}
                      <div className="flex items-center gap-3 mb-5 pb-3" style={{ borderBottom: `2px solid ${col.color}` }}>
                        <div className="w-3 h-3 rounded-full" style={{ background: col.color }} />
                        <span className="font-bold text-base" style={{ color: col.color }}>
                          {isAr ? col.ar : col.en}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full ml-auto" style={{ background: col.bg, color: col.color }}>
                          {colList.length} {isAr ? "معالج" : "therapists"}
                        </span>
                      </div>
                      <div className="flex flex-col gap-3">
                        {colList.map((therapist, i) => (
                          <TherapistCard key={therapist.id} therapist={therapist} i={i} isAr={isAr} locale={locale} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            ) : (
              /* Single branch — full width */
              <motion.div
                key={activeBranch}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {filtered.map((therapist, i) => (
                  <TherapistCard key={therapist.id} therapist={therapist} i={i} isAr={isAr} locale={locale} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* MOH notice */}
          <motion.div
            className="flex items-center justify-center gap-2 mt-12 text-sm"
            style={{ color: "#9CA3AF" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Shield size={14} style={{ color: "var(--color-brand-green)" }} />
            {isAr
              ? "جميع معالجينا مرخصون من وزارة الصحة السعودية ويحملون مؤهلات معترفاً بها دولياً."
              : "All therapists are fully MOH-licensed and hold internationally recognised qualifications."}
          </motion.div>
        </div>
      </section>

      <BookingCTABand locale={locale} title={ctaTitle} bookText={ctaBook} whatsappText={ctaWhatsapp} />
    </main>
  );
}

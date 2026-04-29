"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, ExternalLink, MapPin, Home, ArrowRight,
  Phone, Shield, Users, Star,
} from "lucide-react";
import { useLocation } from "@/lib/context/LocationContext";

const VITALITY_NAVY = "#102b5c";
const VITALITY_GOLD = "#ba995d";
const VITALITY_LOGO = "https://vitality.sa/api/files/uploads/1768987231289-373016008_674317974576110_4045906671374322318_n.jpg";

const STEPS = [
  {
    en: { title: "Book Online", desc: "Select Home Care, choose your city, preferred therapist, date and time — all in under 3 minutes." },
    ar: { title: "احجز عبر الإنترنت", desc: "اختر الرعاية المنزلية ومدينتك والمعالج المفضل والتاريخ والوقت — كل ذلك في أقل من 3 دقائق." },
  },
  {
    en: { title: "Therapist Arrives", desc: "Your MOH-licensed therapist arrives at your home with all necessary equipment, on time." },
    ar: { title: "وصول المعالج", desc: "يصل معالجك المرخص من وزارة الصحة إلى منزلك بجميع المعدات اللازمة، في الوقت المحدد." },
  },
  {
    en: { title: "Treatment at Home", desc: "Receive professional physiotherapy in your own space. A personalised plan is created and updated each visit." },
    ar: { title: "العلاج في المنزل", desc: "احصل على علاج طبيعي احترافي في مساحتك الخاصة. يتم إنشاء خطة شخصية وتحديثها في كل زيارة." },
  },
];

const BENEFITS = [
  { en: "No travel — treatment in your home",          ar: "لا حاجة للتنقل — العلاج في منزلك" },
  { en: "Same MOH-licensed therapists from our clinics", ar: "نفس المعالجين المرخصين من عياداتنا" },
  { en: "All equipment brought by the therapist",       ar: "جميع المعدات يحضرها المعالج" },
  { en: "Ideal for post-surgical & elderly patients",   ar: "مثالي لمرضى ما بعد الجراحة وكبار السن" },
  { en: "Private, comfortable environment",             ar: "بيئة خاصة ومريحة" },
  { en: "Flexible scheduling including evenings",       ar: "جدولة مرنة تشمل المساء" },
];

const PHYSIO_FEATURES = [
  { en: "Home visits by certified PhysioTrio therapists",  ar: "زيارات منزلية من معالجي فيزيوتريو المعتمدين" },
  { en: "Personalized recovery plan tailored to your condition", ar: "خطة علاجية مخصصة حسب حالتك" },
  { en: "Dedicated specialist assigned to each patient",   ar: "معالج متخصص مخصص لكل مريض" },
  { en: "Continuous monitoring and progress evaluation",   ar: "متابعة مستمرة وتقييم دوري للتقدم" },
];

const VITALITY_FEATURES = [
  { en: "Certified therapists serving all Riyadh areas",   ar: "معالجون معتمدون يغطون جميع أحياء الرياض" },
  { en: "VIP premium home visit experience",               ar: "تجربة زيارة منزلية فاخرة VIP" },
  { en: "Dedicated therapist per patient",                 ar: "معالج مخصص لكل مريض" },
  { en: "Regular progress evaluation & reports",           ar: "تقييمات دورية وتقارير حالة منتظمة" },
];

type City = "all" | "makkah" | "riyadh";

interface Props { locale: string; }

export function HomeCareContent({ locale }: Props) {
  const isAr = locale === "ar";
  const { location, setLocation } = useLocation();
  const city = location as City;
  const setCity = (c: City) => setLocation(c);

  const showPhysio   = city === "all" || city === "makkah";
  const showVitality = city === "all" || city === "riyadh";

  const cityOptions: { key: City; en: string; ar: string }[] = [
    { key: "all",    en: "All Locations", ar: "كل المواقع" },
    { key: "makkah", en: "Makkah",        ar: "مكة المكرمة" },
    { key: "riyadh", en: "Riyadh",        ar: "الرياض" },
  ];

  return (
    <div>

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <section className="pt-36 pb-0" style={{ background: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-6">

          {/* Top row */}
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div>
              <span
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full"
                style={{ background: "rgba(136,7,114,0.07)", color: "var(--color-brand-purple)" }}
              >
                <Home size={11} strokeWidth={2.5} />
                {isAr ? "الرعاية المنزلية" : "Home Care"}
              </span>
              <h1 className="font-black leading-tight mb-3" style={{ fontSize: "clamp(28px, 4vw, 48px)", color: "#111827" }}>
                {isAr ? "العلاج الطبيعي في منزلك" : "Physiotherapy at Your Home"}
              </h1>
              <p className="text-sm max-w-xl" style={{ color: "#6B7280" }}>
                {isAr
                  ? "معالج طبيعي مرخص من وزارة الصحة يزور منزلك — فيزيوتريو في مكة المكرمة، وفيتاليتي في الرياض."
                  : "An MOH-licensed physiotherapist visits your home — PhysioTrio in Makkah, Vitality in Riyadh."}
              </p>
            </div>

            {/* City selector */}
            <div className="flex items-center gap-2 p-1 rounded-full shrink-0" style={{ background: "#f3f4f6" }}>
              {cityOptions.map(opt => (
                <button
                  key={opt.key}
                  onClick={() => setCity(opt.key)}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                  style={{
                    background: city === opt.key ? "white" : "transparent",
                    color: city === opt.key ? "var(--color-brand-purple)" : "#6B7280",
                    boxShadow: city === opt.key ? "0 1px 6px rgba(0,0,0,0.10)" : "none",
                  }}
                >
                  {isAr ? opt.ar : opt.en}
                </button>
              ))}
            </div>
          </div>

          {/* Provider poster cards */}
          <AnimatePresence mode="popLayout">
            <div className={`grid gap-0 ${showPhysio && showVitality ? "lg:grid-cols-2" : "grid-cols-1 max-w-2xl"}`}>

              {/* ── PhysioTrio poster ─────────────────────── */}
              {showPhysio && (
                <motion.div
                  key="physio"
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                  className="relative overflow-hidden flex flex-col"
                  style={{ minHeight: 520 }}
                >
                  {/* Background image */}
                  <div className="absolute inset-0">
                    <Image
                      src="/center-images/DSC07597.jpg"
                      alt="PhysioTrio Makkah"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(136,7,114,0.82) 0%, rgba(30,0,26,0.92) 100%)" }} />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-8 lg:p-10 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
                          <Home size={15} className="text-white" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-white/70">PhysioTrio</span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.15)", color: "white" }}>
                        <MapPin size={10} /> {isAr ? "مكة المكرمة" : "Makkah"}
                      </span>
                    </div>

                    <h2 className="text-2xl font-black text-white mb-2 leading-snug">
                      {isAr ? "الرعاية المنزلية من فيزيوتريو" : "Home Care by PhysioTrio"}
                    </h2>
                    <p className="text-sm mb-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                      {isAr
                        ? "يقدم فريق فيزيوتريو في مكة المكرمة خدمة العلاج الطبيعي المنزلي مباشرةً، حيث يزورك معالجون مرخصون من وزارة الصحة في منزلك."
                        : "PhysioTrio's Makkah team delivers home physiotherapy directly to your door. MOH-licensed therapists visit you for professional, one-on-one rehabilitation."}
                    </p>

                    <ul className="space-y-2.5 mb-8 flex-1">
                      {PHYSIO_FEATURES.map((f, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-sm text-white/85">
                          <CheckCircle2 size={14} className="shrink-0 text-green-400" />
                          {isAr ? f.ar : f.en}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/${locale}/book/makkah`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white transition-all hover:opacity-90"
                        style={{ background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.4)" }}
                      >
                        {isAr ? "احجز زيارة منزلية" : "Book Home Visit"} <ArrowRight size={14} />
                      </Link>
                      <a
                        href="tel:8001000246"
                        dir="ltr"
                        className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full text-sm font-semibold text-white/75 transition-all hover:text-white"
                      >
                        <Phone size={13} /> 800 100 0246
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── Vitality poster ───────────────────────── */}
              {showVitality && (
                <motion.div
                  key="vitality"
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25, delay: 0.05 }}
                  className="relative overflow-hidden flex flex-col"
                  style={{ minHeight: 520 }}
                >
                  {/* Background image */}
                  <div className="absolute inset-0">
                    <Image
                      src="/center-images/DSC07303.jpg"
                      alt="Vitality Riyadh"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, rgba(16,43,92,0.85) 0%, rgba(6,18,42,0.95) 100%)` }} />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-8 lg:p-10 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-6">
                      <Image src={VITALITY_LOGO} alt="Vitality" width={70} height={26} className="object-contain rounded" unoptimized />
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "rgba(186,153,93,0.2)", color: VITALITY_GOLD, border: `1px solid rgba(186,153,93,0.3)` }}>
                        <MapPin size={10} /> {isAr ? "الرياض والمدن الأخرى" : "Riyadh & Cities"}
                      </span>
                    </div>

                    <h2 className="text-2xl font-black text-white mb-2 leading-snug">
                      {isAr ? "الرعاية المنزلية من فيتاليتي" : "Home Care by Vitality"}
                    </h2>
                    <p className="text-sm mb-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
                      {isAr
                        ? "تُقدَّم خدمة العلاج الطبيعي المنزلي الفاخر في الرياض وسائر المدن من خلال فيتاليتي، الشريك الموثوق لمجموعة برجيل القابضة."
                        : "Premium home physiotherapy across Riyadh and other cities is delivered through Vitality — Burjeel Arabia's trusted home care partner."}
                    </p>

                    <ul className="space-y-2.5 mb-8 flex-1">
                      {VITALITY_FEATURES.map((f, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-sm text-white/85">
                          <CheckCircle2 size={14} className="shrink-0" style={{ color: VITALITY_GOLD }} />
                          {isAr ? f.ar : f.en}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://vitality.sa/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all hover:opacity-90"
                        style={{ background: VITALITY_GOLD, color: VITALITY_NAVY }}
                      >
                        <ExternalLink size={14} />
                        {isAr ? "زيارة فيتاليتي" : "Visit Vitality"}
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section className="py-16" style={{ background: "#ffffff", borderTop: "1px solid #eef2f6" }}>
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] mb-10 text-center" style={{ color: "#9CA3AF" }}>
            {isAr ? "كيف يعمل" : "How it works"}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((step, i) => (
              <div key={i} className="relative">
                {/* Connector line */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-5 left-[calc(50%+20px)] right-[-calc(50%-20px)] h-px" style={{ background: "#E5E7EB", width: "calc(100% - 40px)", left: "calc(50% + 20px)" }} />
                )}
                <div className="flex flex-col items-center text-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm mb-4 z-10 relative"
                    style={{ background: "var(--color-brand-purple)" }}
                  >
                    {i + 1}
                  </div>
                  <h3 className="font-black text-sm mb-2" style={{ color: "#111827" }}>
                    {isAr ? step.ar.title : step.en.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                    {isAr ? step.ar.desc : step.en.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Home Care ─────────────────────────────────────────────────── */}
      <section className="py-16" style={{ background: "#f8fafc", borderTop: "1px solid #eef2f6" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Benefits list */}
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] mb-6" style={{ color: "#9CA3AF" }}>
                {isAr ? "لماذا الرعاية المنزلية؟" : "Why Home Care?"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BENEFITS.map((b, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white"
                    style={{ border: "1px solid #eef2f6" }}
                  >
                    <CheckCircle2 size={16} className="shrink-0" style={{ color: "var(--color-brand-green)" }} />
                    <span className="text-sm font-medium" style={{ color: "#374151" }}>
                      {isAr ? b.ar : b.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Info cards */}
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-white" style={{ border: "1px solid rgba(136,7,114,0.12)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(136,7,114,0.08)" }}>
                    <Shield size={18} style={{ color: "var(--color-brand-purple)" }} />
                  </div>
                  <h3 className="font-bold" style={{ color: "#111827" }}>
                    {isAr ? "معالجون مرخصون" : "Licensed Therapists"}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                  {isAr
                    ? "جميع معالجي الرعاية المنزلية مرخصون من وزارة الصحة السعودية ومدربون على بروتوكولات العلاج في المنزل."
                    : "All home care therapists are MOH-licensed and trained in home treatment protocols."}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white" style={{ border: "1px solid rgba(76,175,80,0.15)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(76,175,80,0.08)" }}>
                    <Users size={18} style={{ color: "var(--color-brand-green)" }} />
                  </div>
                  <h3 className="font-bold" style={{ color: "#111827" }}>
                    {isAr ? "مثالي لـ" : "Ideal For"}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                  {isAr
                    ? "مرضى ما بعد الجراحة، كبار السن، المرضى الذين يعانون من محدودية في الحركة، الأمهات بعد الولادة."
                    : "Post-surgical patients, elderly patients, those with limited mobility, post-natal mothers."}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white" style={{ border: "1px solid #eef2f6" }}>
                <div className="flex items-center gap-3 mb-2">
                  <Star size={15} style={{ color: VITALITY_GOLD }} />
                  <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#9CA3AF" }}>
                    {isAr ? "تحت مظلة برجيل" : "Burjeel Arabia"}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                  {isAr
                    ? "كلا الخدمتين — فيزيوتريو وفيتاليتي — تابعتان لمجموعة برجيل القابضة وتلتزمان بأعلى معايير الرعاية الصحية."
                    : "Both PhysioTrio and Vitality operate under the Burjeel Arabia umbrella, upholding the highest clinical care standards in Saudi Arabia."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CheckCircle2, ExternalLink, MapPin, Home, ArrowRight, Phone,
} from "lucide-react";
import { useLocation } from "@/lib/context/LocationContext";

// ─── Brand tokens ──────────────────────────────────────────────────────────

const VITALITY_NAVY = "#102b5c";
const VITALITY_GOLD = "#ba995d";
const VITALITY_LOGO = "https://vitality.sa/api/files/uploads/1768987231289-373016008_674317974576110_4045906671374322318_n.jpg";

// ─── Static content ─────────────────────────────────────────────────────────

const FEATURES = [
  { en: "Home visits by certified physiotherapists",                ar: "زيارات منزلية من معالجين طبيعيين معتمدين" },
  { en: "Personalized recovery plan tailored to your condition",    ar: "خطة علاجية مخصصة حسب حالتك" },
  { en: "Dedicated specialist assigned to each patient",            ar: "معالج متخصص مخصص لكل مريض" },
  { en: "Continuous monitoring and progress evaluation",            ar: "متابعة مستمرة وتقييم دوري للتقدم" },
];

interface Props {
  locale: string;
}

// ─── Provider Card ──────────────────────────────────────────────────────────

function PhysioTrioCard({ isAr, isActive }: { isAr: boolean; isActive: boolean }) {
  return (
    <motion.div
      layout
      className="flex flex-col rounded-2xl overflow-hidden h-full"
      style={{
        border: isActive ? "2px solid var(--color-brand-purple)" : "1px solid #eef2f6",
        boxShadow: isActive ? "0 8px 40px rgba(136,7,114,0.12)" : "0 2px 12px rgba(0,0,0,0.04)",
        background: "#ffffff",
      }}
    >
      {/* Top accent */}
      <div className="h-1" style={{ background: "linear-gradient(90deg, var(--color-brand-purple), var(--color-brand-green))" }} />

      <div className="p-7 flex flex-col flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Home size={16} style={{ color: "var(--color-brand-purple)" }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-brand-purple)" }}>
                PhysioTrio
              </span>
            </div>
            <h2 className="text-xl font-black" style={{ color: "#111827" }}>
              {isAr ? "الرعاية المنزلية — فيزيوتريو" : "Home Care by PhysioTrio"}
            </h2>
          </div>
          {isActive && (
            <span
              className="shrink-0 inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full"
              style={{ background: "rgba(136,7,114,0.08)", color: "var(--color-brand-purple)", border: "1px solid rgba(136,7,114,0.18)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--color-brand-purple)" }} />
              {isAr ? "متاح في موقعك" : "Available near you"}
            </span>
          )}
        </div>

        {/* Coverage badge */}
        <span
          className="inline-flex items-center gap-1.5 self-start text-xs font-semibold px-3 py-1 rounded-full mb-4"
          style={{ background: "rgba(76,175,80,0.08)", color: "#2d6a4f", border: "1px solid rgba(76,175,80,0.2)" }}
        >
          <MapPin size={11} strokeWidth={2.5} />
          {isAr ? "مكة المكرمة" : "Makkah"}
        </span>

        <p className="text-sm leading-relaxed mb-6" style={{ color: "#4B5563" }}>
          {isAr
            ? "يقدم فريق فيزيوتريو في مكة المكرمة خدمة العلاج الطبيعي المنزلي مباشرةً، حيث يزورك معالجون مرخصون من وزارة الصحة في منزلك لتلقي رعاية احترافية متكاملة."
            : "PhysioTrio's Makkah team delivers home physiotherapy directly to your door. MOH-licensed therapists visit you at home for professional, one-on-one rehabilitation care."}
        </p>

        {/* Feature list */}
        <ul className="space-y-2.5 mb-7 flex-1">
          {FEATURES.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "#374151" }}>
              <CheckCircle2 size={15} className="shrink-0 mt-0.5" style={{ color: "var(--color-brand-green)" }} />
              {isAr ? f.ar : f.en}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="flex flex-wrap gap-3 pt-5" style={{ borderTop: "1px solid #f3f4f6" }}>
          <Link
            href={`/${isAr ? "ar" : "en"}/book/makkah`}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-90 hover:shadow-lg"
            style={{ background: "var(--color-brand-purple)" }}
          >
            {isAr ? "احجز زيارة منزلية" : "Book Home Visit"}
            <ArrowRight size={14} />
          </Link>
          <a
            href="tel:8001000246"
            dir="ltr"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:bg-gray-50"
            style={{ color: "#374151", border: "1.5px solid #E5E7EB" }}
          >
            <Phone size={13} />
            800 100 0246
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function VitalityCard({ isAr, isActive }: { isAr: boolean; isActive: boolean }) {
  return (
    <motion.div
      layout
      className="flex flex-col rounded-2xl overflow-hidden h-full"
      style={{
        border: isActive ? `2px solid ${VITALITY_NAVY}` : "1px solid #eef2f6",
        boxShadow: isActive ? `0 8px 40px rgba(16,43,92,0.12)` : "0 2px 12px rgba(0,0,0,0.04)",
        background: "#ffffff",
      }}
    >
      {/* Vitality accent bar */}
      <div className="h-1" style={{ background: `linear-gradient(90deg, ${VITALITY_NAVY}, ${VITALITY_GOLD})` }} />

      <div className="p-7 flex flex-col flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div>
            <Image
              src={VITALITY_LOGO}
              alt="Vitality"
              width={80}
              height={32}
              className="object-contain rounded mb-2"
              unoptimized
            />
            <h2 className="text-xl font-black" style={{ color: "#111827" }}>
              {isAr ? "الرعاية المنزلية — فيتاليتي" : "Home Care by Vitality"}
            </h2>
          </div>
          {isActive && (
            <span
              className="shrink-0 inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full"
              style={{ background: `rgba(16,43,92,0.07)`, color: VITALITY_NAVY, border: `1px solid rgba(16,43,92,0.18)` }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: VITALITY_NAVY }} />
              {isAr ? "متاح في موقعك" : "Available near you"}
            </span>
          )}
        </div>

        {/* Coverage badge */}
        <span
          className="inline-flex items-center gap-1.5 self-start text-xs font-semibold px-3 py-1 rounded-full mb-4"
          style={{ background: `rgba(16,43,92,0.06)`, color: VITALITY_NAVY, border: `1px solid rgba(16,43,92,0.15)` }}
        >
          <MapPin size={11} strokeWidth={2.5} />
          {isAr ? "الرياض والمدن الأخرى" : "Riyadh & Other Cities"}
        </span>

        <p className="text-sm leading-relaxed mb-6" style={{ color: "#4B5563" }}>
          {isAr
            ? "تُقدَّم خدمة العلاج الطبيعي المنزلي الفاخر في الرياض وسائر المدن من خلال فيتاليتي، الشريك الموثوق للرعاية المنزلية التابع لمجموعة برجيل القابضة، لتوفير رعاية متكاملة داخل منزلك."
            : "Premium home physiotherapy across Riyadh and other cities is delivered through Vitality — Burjeel Arabia's trusted home care partner — bringing comprehensive rehabilitation care to your home."}
        </p>

        {/* Feature list */}
        <ul className="space-y-2.5 mb-7 flex-1">
          {FEATURES.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "#374151" }}>
              <CheckCircle2 size={15} className="shrink-0 mt-0.5" style={{ color: VITALITY_GOLD }} />
              {isAr ? f.ar : f.en}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="flex flex-wrap gap-3 pt-5" style={{ borderTop: "1px solid #f3f4f6" }}>
          <a
            href="https://vitality.sa/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:opacity-90 hover:shadow-lg"
            style={{ background: VITALITY_NAVY, color: VITALITY_GOLD }}
          >
            <ExternalLink size={14} />
            {isAr ? "زيارة موقع فيتاليتي" : "Visit Vitality Website"}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main ───────────────────────────────────────────────────────────────────

export function HomeCareContent({ locale }: Props) {
  const isAr = locale === "ar";
  const { location } = useLocation();

  // Which provider is "active" (highlighted) for the selected location
  const physioActive  = location === "makkah" || location === "all";
  const vitalityActive = location === "riyadh" || location === "all";

  // Determine display order — relevant provider first
  const makkahFirst = location === "makkah";

  const label = {
    all:    { en: "All Locations",   ar: "كل المواقع" },
    riyadh: { en: "Riyadh",          ar: "الرياض" },
    makkah: { en: "Makkah",          ar: "مكة المكرمة" },
  }[location];

  return (
    <main>

      {/* ── Clinical header ─────────────────────────────────────────────── */}
      <section
        className="pt-36 pb-12"
        style={{ background: "#ffffff", borderBottom: "1px solid #eef2f6" }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <motion.span
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full"
            style={{ background: "rgba(136,7,114,0.07)", color: "var(--color-brand-purple)" }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Home size={11} strokeWidth={2.5} />
            {isAr ? "الرعاية المنزلية" : "Home Care"}
          </motion.span>

          <motion.h1
            className="font-black mb-3 leading-tight"
            style={{ fontSize: "clamp(28px, 4vw, 48px)", color: "#111827" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.07 }}
          >
            {isAr ? "العلاج الطبيعي في منزلك" : "Physiotherapy at Your Home"}
          </motion.h1>

          <motion.p
            className="text-sm max-w-xl mb-6"
            style={{ color: "#6B7280" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.13 }}
          >
            {isAr
              ? "رعاية علاج طبيعي احترافية تُقدَّم مباشرةً إلى منزلك — من فيزيوتريو في مكة المكرمة، ومن فيتاليتي في الرياض وسائر المدن."
              : "Professional physiotherapy care delivered directly to your door — by PhysioTrio in Makkah, and by Vitality in Riyadh and other cities."}
          </motion.p>

          {/* Location indicator */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
            style={{ background: "#f8fafc", border: "1px solid #e5e7eb", color: "#374151" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.18 }}
          >
            <MapPin size={13} style={{ color: "var(--color-brand-purple)" }} />
            {isAr ? "موقعك المحدد: " : "Selected location: "}
            <span className="font-black" style={{ color: "var(--color-brand-purple)" }}>
              {isAr ? label.ar : label.en}
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── Provider cards ──────────────────────────────────────────────── */}
      <section className="py-12" style={{ background: "#f8fafc" }}>
        <div className="max-w-5xl mx-auto px-6">

          {/* Context note when a specific location is selected */}
          {location !== "all" && (
            <motion.div
              className="flex items-start gap-3 p-4 rounded-xl mb-8"
              style={{ background: "white", border: "1px solid #eef2f6" }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <MapPin size={15} className="shrink-0 mt-0.5" style={{ color: "var(--color-brand-purple)" }} />
              <p className="text-sm" style={{ color: "#374151" }}>
                {location === "makkah"
                  ? (isAr
                    ? "بناءً على موقعك في مكة المكرمة، تُقدِّم فيزيوتريو خدمة الرعاية المنزلية مباشرةً. كما يمكنك الاستفادة من خدمات فيتاليتي عند الحاجة."
                    : "Based on your Makkah location, PhysioTrio directly provides home care. You can also access Vitality services when needed.")
                  : (isAr
                    ? "بناءً على موقعك في الرياض، تُقدِّم فيتاليتي خدمة الرعاية المنزلية كشريك موثوق لفيزيوتريو. كما تتوفر خدمة مكة المكرمة من خلال فيزيوتريو مباشرةً."
                    : "Based on your Riyadh location, Vitality provides home care as PhysioTrio's trusted partner. Makkah home care is also available directly through PhysioTrio.")}
              </p>
            </motion.div>
          )}

          {/* Two-column card layout — reorder based on location */}
          <div className={`grid md:grid-cols-2 gap-6 items-stretch ${makkahFirst ? "" : "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1"}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <PhysioTrioCard isAr={isAr} isActive={physioActive} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 }}
            >
              <VitalityCard isAr={isAr} isActive={vitalityActive} />
            </motion.div>
          </div>

          {/* Bottom reassurance note */}
          <motion.p
            className="text-center text-xs mt-8"
            style={{ color: "#9CA3AF" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            {isAr
              ? "كلا الخدمتين تابعتان لمجموعة برجيل القابضة وتلتزمان بأعلى معايير الرعاية الصحية"
              : "Both services are under the Burjeel Arabia umbrella and uphold the highest standards of clinical care"}
          </motion.p>

        </div>
      </section>

    </main>
  );
}

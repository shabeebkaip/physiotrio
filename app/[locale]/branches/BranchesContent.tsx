"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Users, Stethoscope, ArrowRight, CheckCircle2 } from "lucide-react";
import { BookingCTABand } from "@/components/common/BookingCTABand";
import { StatsSection } from "@/components/home/StatsSection";
import { branches } from "@/lib/data/branches";

const cityImages: Record<string, string> = {
  riyadh: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=800&q=80",
  makkah: "/makkah.jpg",
  dammam: "https://images.unsplash.com/photo-1570516002611-6b0cf9d0f8c9?w=800&q=80",
};

interface Props { locale: string; ctaBook: string; ctaWhatsapp: string; ctaTitle: string; }

export function BranchesContent({ locale, ctaBook, ctaWhatsapp, ctaTitle }: Props) {
  const isAr = locale === "ar";

  return (
    <main>
      {/* ── Branches Hero — light & pleasant ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#ffffff", minHeight: 520 }}
      >
        {/* Subtle decorative blobs */}
        <div className="absolute pointer-events-none" style={{ top: "-60px", right: "-60px", width: 400, height: 400, background: "radial-gradient(circle, rgba(var(--color-brand-purple-rgb),0.07) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div className="absolute pointer-events-none" style={{ bottom: "0", left: "10%", width: 280, height: 280, background: "radial-gradient(circle, rgba(var(--color-brand-green-rgb),0.06) 0%, transparent 70%)", borderRadius: "50%" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-36 pb-14 sm:pb-20 grid md:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* ── Left: text ── */}
          <div>
            <motion.span
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-5 px-3 py-1.5 rounded-full"
              style={{ background: "rgba(var(--color-brand-purple-rgb),0.08)", color: "var(--color-brand-purple)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--color-brand-green)" }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {isAr ? "فروعنا" : "Our Branches"}
            </motion.span>

            <motion.h1
              className="font-black leading-tight mb-5"
              style={{ fontSize: "clamp(28px, 5vw, 64px)", color: "#1a1a2e" }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {isAr ? "نحن بالقرب منك" : "We Are\nNear You"}
            </motion.h1>

            <motion.p
              className="text-lg mb-8 max-w-md"
              style={{ color: "#6B7280", lineHeight: 1.7 }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {isAr
                ? "ثلاثة فروع متكاملة في المملكة العربية السعودية — الرياض، مكة المكرمة، والدمام قريباً"
                : "Three fully equipped branches across Saudi Arabia — Riyadh, Makkah & Dammam coming soon."}
            </motion.p>

            {/* Location pills */}
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              {[
                { label: isAr ? "الرياض" : "Riyadh", active: true },
                { label: isAr ? "مكة المكرمة" : "Makkah", active: true },
                { label: isAr ? "الدمام — قريباً" : "Dammam — Soon", active: false },
              ].map((loc) => (
                <span
                  key={loc.label}
                  className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full"
                  style={loc.active
                    ? { background: "rgba(var(--color-brand-purple-rgb),0.08)", color: "var(--color-brand-purple)", border: "1px solid rgba(var(--color-brand-purple-rgb),0.2)" }
                    : { background: "#F8FAFC", color: "#9CA3AF", border: "1px solid #E5E7EB" }
                  }
                >
                  {loc.active
                    ? <CheckCircle2 size={13} style={{ color: "var(--color-brand-green)" }} />
                    : <MapPin size={12} style={{ color: "#D1D5DB" }} />
                  }
                  {loc.label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Right: floating city cards on light background ── */}
          <div className="relative hidden md:flex items-center justify-center h-72">
            {/* Riyadh — large card, left/back */}
            <motion.div
              className="absolute rounded-2xl overflow-hidden"
              style={{ width: 220, height: 260, left: 20, top: 0, boxShadow: "0 16px 48px rgba(0,0,0,0.12)", zIndex: 1 }}
              initial={{ opacity: 0, y: 40, rotate: -3 }}
              animate={{ opacity: 1, y: 0, rotate: -4 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <Image src={cityImages.riyadh} alt="Riyadh" fill className="object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(var(--color-brand-purple-rgb),0.75) 0%, transparent 55%)" }} />
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-bold text-base">{isAr ? "الرياض" : "Riyadh"}</p>
                <p className="text-xs font-light" style={{ color: "rgba(255,255,255,0.8)" }}>{isAr ? "نشط" : "Active"}</p>
              </div>
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full" style={{ background: "var(--color-brand-green)", boxShadow: "0 0 6px var(--color-brand-green)" }} />
            </motion.div>

            {/* Makkah — large card, right/front */}
            <motion.div
              className="absolute rounded-2xl overflow-hidden"
              style={{ width: 220, height: 260, right: 20, top: 20, boxShadow: "0 20px 56px rgba(0,0,0,0.14)", zIndex: 2 }}
              initial={{ opacity: 0, y: 40, rotate: 3 }}
              animate={{ opacity: 1, y: 0, rotate: 4 }}
              transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
            >
              <Image src={cityImages.makkah} alt="Makkah" fill className="object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(var(--color-brand-purple-rgb),0.75) 0%, transparent 55%)" }} />
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-bold text-base">{isAr ? "مكة المكرمة" : "Makkah"}</p>
                <p className="text-xs font-light" style={{ color: "rgba(255,255,255,0.8)" }}>{isAr ? "نشط" : "Active"}</p>
              </div>
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full" style={{ background: "var(--color-brand-green)", boxShadow: "0 0 6px var(--color-brand-green)" }} />
            </motion.div>

            {/* Dammam — small "coming soon" card, bottom center */}
            <motion.div
              className="absolute rounded-xl overflow-hidden"
              style={{ width: 160, height: 100, bottom: -10, left: "50%", transform: "translateX(-50%)", boxShadow: "0 8px 24px rgba(0,0,0,0.1)", zIndex: 3 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
            >
              <Image src={cityImages.dammam} alt="Dammam" fill className="object-cover" style={{ filter: "grayscale(60%) brightness(1.1)" }} />
              <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(4px)" }}>
                <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: "var(--color-brand-purple)", color: "#fff" }}>
                  {isAr ? "الدمام — قريباً" : "Dammam — Soon"}
                </span>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Soft bottom divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, #E5E7EB 30%, #E5E7EB 70%, transparent)" }} />
      </section>

      {/* Stats — same design language as homepage */}
      <StatsSection locale={locale} />

      {/* Branch cards */}
      <section className="py-14 sm:py-24" style={{ background: "#F8FAFC" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
              style={{ background: "rgba(var(--color-brand-purple-rgb),0.08)", color: "var(--color-brand-purple)" }}
            >
              {isAr ? "اختر فرعك" : "Find Your Branch"}
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight" style={{ color: "#1a1a2e" }}>
              {isAr ? "فروعنا في المملكة" : "Our Locations"}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {branches.map((branch, i) => (
              <motion.div
                key={branch.id}
                className="rounded-2xl bg-white overflow-hidden relative group"
                style={{
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                  opacity: branch.comingSoon ? 0.85 : 1,
                }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={!branch.comingSoon ? { y: -6, boxShadow: "0 20px 48px rgba(0,0,0,0.1)" } : {}}
              >
                {/* City photo */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={cityImages[branch.id] ?? cityImages.riyadh}
                    alt={isAr ? branch.city.ar : branch.city.en}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 h-16"
                    style={{ background: "linear-gradient(to top, rgba(255,255,255,0.6), transparent)" }}
                  />

                  {/* Coming Soon overlay */}
                  {branch.comingSoon && (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(6px)" }}
                    >
                      <span
                        className="px-5 py-2 rounded-full font-bold text-sm text-white"
                        style={{ background: "var(--color-brand-purple)" }}
                      >
                        {isAr ? "قريباً" : "Coming Soon"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3" style={{ color: "#1a1a2e" }}>
                    {isAr ? branch.city.ar : branch.city.en}
                  </h3>

                  <div className="space-y-2 mb-5">
                    <div className="flex items-start gap-2">
                      <MapPin size={14} style={{ color: "var(--color-brand-purple)", marginTop: 2 }} className="flex-shrink-0" />
                      <p className="text-sm" style={{ color: "#6B7280" }}>
                        {isAr ? branch.address.ar : branch.address.en}
                      </p>
                    </div>
                    {!branch.comingSoon && (
                      <>
                        <div className="flex items-center gap-2">
                          <Phone size={13} style={{ color: "var(--color-brand-purple)" }} className="flex-shrink-0" />
                          <span className="text-sm" style={{ color: "#6B7280" }}>{branch.phone}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Clock size={13} style={{ color: "var(--color-brand-purple)", marginTop: 2 }} className="flex-shrink-0" />
                          <p className="text-xs" style={{ color: "#9CA3AF" }}>
                            {isAr ? branch.hours.ar : branch.hours.en}
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  {!branch.comingSoon && (
                    <div className="flex gap-2 mb-5">
                      <span
                        className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: "#F1F5F9", color: "var(--color-brand-purple)" }}
                      >
                        <Users size={11} />
                        {branch.therapistCount} {isAr ? "معالج" : "Therapists"}
                      </span>
                      <span
                        className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: "#F1F5F9", color: "var(--color-brand-green)" }}
                      >
                        <Stethoscope size={11} />
                        {branch.serviceCount} {isAr ? "خدمة" : "Services"}
                      </span>
                    </div>
                  )}

                  {!branch.comingSoon && (
                    <div className="flex gap-3">
                      <a
                        href={`https://maps.google.com/?q=${branch.coordinates.lat},${branch.coordinates.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 rounded-full text-sm font-semibold text-center transition-all hover:bg-gray-50"
                        style={{ border: "1.5px solid var(--color-brand-purple)", color: "var(--color-brand-purple)" }}
                      >
                        {isAr ? "الاتجاهات" : "Directions"}
                      </a>
                      <Link
                        href={`/${locale}/book/${branch.id}`}
                        className="flex-1 py-2.5 rounded-full text-sm font-semibold text-center text-white transition-all hover:opacity-90 flex items-center justify-center gap-1.5"
                        style={{ background: "var(--color-brand-purple)" }}
                      >
                        {isAr ? "احجز" : "Book"} <ArrowRight size={13} />
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp help strip */}
      <section className="py-10" style={{ background: "#F8FAFC", borderTop: "1px solid #E5E7EB" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-bold text-lg" style={{ color: "#1a1a2e" }}>
              {isAr ? "هل تحتاج مساعدة في اختيار الفرع؟" : "Need help choosing a branch?"}
            </p>
            <p className="text-sm" style={{ color: "#6B7280" }}>
              {isAr ? "فريقنا متاح على واتساب" : "Our team is available on WhatsApp"}
            </p>
          </div>
          <a
            href="https://wa.me/966500000001"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-full font-bold text-white transition-all hover:scale-105"
            style={{ background: "#25D366" }}
          >
            WhatsApp {isAr ? "←" : "→"}
          </a>
        </div>
      </section>

      <BookingCTABand locale={locale} title={ctaTitle} bookText={ctaBook} whatsappText={ctaWhatsapp} />
    </main>
  );
}

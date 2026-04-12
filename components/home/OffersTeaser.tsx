"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface OffersTeaserProps {
  locale: string;
  eyebrow: string;
  title: string;
  viewAllText: string;
  purchaseText: string;
}

const features = {
  en: ["Initial assessment included", "3 physiotherapy sessions", "Personalized treatment plan", "Progress tracking report"],
  ar: ["يشمل التقييم الأولي", "3 جلسات علاج طبيعي", "خطة علاجية مخصصة", "تقرير تتبع التقدم"]
};

export function OffersTeaser({ locale, eyebrow, title, viewAllText, purchaseText }: OffersTeaserProps) {
  const items = locale === "ar" ? features.ar : features.en;

  return (
    <section className="py-8 px-4 md:px-8" style={{ background: "#ffffff" }}>
      <div className="max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-[32px] md:rounded-[40px] py-16 px-8 md:px-16" style={{ background: "var(--color-brand-green)" }}>
        {/* Decorative blobs */}
        <div
          className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: "rgba(255,255,255,0.15)", filter: "blur(48px)" }}
        />
        <div
          className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: "rgba(var(--color-brand-purple-rgb),0.25)", filter: "blur(40px)" }}
        />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.2)", color: "white" }}
            >
              {eyebrow}
            </span>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
              {title}
            </h2>

            <p className="text-white/80 text-lg font-light mb-6">
              {locale === "ar" ? "ابدأ رحلة تعافيك اليوم" : "Start your recovery journey today"}
            </p>

            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-6xl font-black text-white">350</span>
              <span className="text-2xl font-bold text-white/80">SAR</span>
              <span className="text-sm text-white/60 line-through ml-2">450 SAR</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${locale}/offers`}
                className="px-7 py-3.5 rounded-full font-bold transition-all hover:scale-105"
                style={{ background: "white", color: "var(--color-brand-green)" }}
              >
                {viewAllText}
              </Link>
              <Link
                href={`/${locale}/book/riyadh?package=starter`}
                className="px-7 py-3.5 rounded-full font-bold transition-all hover:scale-105"
                style={{ background: "var(--color-brand-purple)", color: "white" }}
              >
                {purchaseText}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div
              className="rounded-2xl p-8"
              style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}
            >
              <h3 className="text-white font-bold text-lg mb-5">
                {locale === "ar" ? "الباقة تشمل:" : "Package includes:"}
              </h3>
              <div className="space-y-4">
                {items.map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <CheckCircle2 size={20} className="text-white flex-shrink-0" />
                    <span className="text-white font-light">{item}</span>
                  </motion.div>
                ))}
              </div>

              <div
                className="mt-6 pt-4 flex items-center gap-2"
                style={{ borderTop: "1px solid rgba(255,255,255,0.2)" }}
              >
                <span className="text-xs text-white/70">
                  {locale === "ar" ? "متاح للتقسيط مع" : "Split with"}
                </span>
                {["Tamara", "Tabby"].map(b => (
                  <span
                    key={b}
                    className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{ background: "rgba(255,255,255,0.25)", color: "white" }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      </div>
      </div>
    </section>
  );
}

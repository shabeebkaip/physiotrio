"use client";

import { motion } from "framer-motion";
import { Dumbbell, Cable, Activity, Footprints, Syringe, Wind, HeartPulse, Zap, StretchHorizontal } from "lucide-react";

const TECHNOLOGIES = [
  { en: "Free Weights & Strength Training", ar: "أجهزة الأوزان الحرة وتمارين القوة", Icon: Dumbbell },
  { en: "Cable Resistance Machines", ar: "أجهزة الكابلات المقاومة", Icon: Cable },
  { en: "Balance & Coordination Equipment", ar: "أجهزة التوازن والتناسق الحركي", Icon: Activity },
  { en: "Anti-Gravity Treadmill", ar: "جهاز السير المضاد للجاذبية", Icon: Footprints },
  { en: "Dry Needling", ar: "الإبر الجافة", Icon: Syringe },
  { en: "Dry Cupping Therapy", ar: "الحجامة الجافة", Icon: Wind },
  { en: "Therapeutic Exercises", ar: "التمارين العلاجية", Icon: HeartPulse },
  { en: "Electrotherapy", ar: "العلاج الكهربائي", Icon: Zap },
  { en: "Functional Strength Training", ar: "أجهزة التدريب الوظيفي للقوة", Icon: StretchHorizontal },
];

interface TechnologiesStripProps {
  locale: string;
}

export function TechnologiesStrip({ locale }: TechnologiesStripProps) {
  const isAr = locale === "ar";

  return (
    <section className="py-16" style={{ background: "#0f2b1f" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <span
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1.5 rounded-full"
              style={{ background: "rgba(var(--color-brand-green-rgb),0.15)", color: "var(--color-brand-green)", border: "1px solid rgba(var(--color-brand-green-rgb),0.25)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-brand-green)" }} />
              {isAr ? "التقنيات والأجهزة" : "Technologies & Equipment"}
            </span>
            <h2 className="font-black text-white" style={{ fontSize: "clamp(22px, 2.5vw, 32px)" }}>
              {isAr ? "أحدث الأجهزة والتقنيات العلاجية" : "State-of-the-Art Treatment Technology"}
            </h2>
          </div>
          <p
            className="text-sm max-w-xs leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            {isAr
              ? "نوظّف أحدث الأجهزة والتقنيات لضمان أفضل نتائج العلاج."
              : "We leverage the latest equipment and techniques to ensure the best treatment outcomes."}
          </p>
        </motion.div>

        {/* Technologies grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {TECHNOLOGIES.map((tech, i) => (
            <motion.div
              key={tech.en}
              className="flex flex-col items-center text-center gap-3 px-4 py-5 rounded-2xl group cursor-default"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.45 }}
              whileHover={{
                background: "rgba(var(--color-brand-green-rgb),0.1)",
                borderColor: "rgba(var(--color-brand-green-rgb),0.3)",
                y: -3,
                transition: { duration: 0.2 },
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                style={{ background: "rgba(var(--color-brand-green-rgb),0.12)" }}
              >
                <tech.Icon size={20} style={{ color: "var(--color-brand-green)" }} strokeWidth={1.5} />
              </div>
              <span
                className="text-xs font-semibold leading-snug"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                {isAr ? tech.ar : tech.en}
              </span>
            </motion.div>
          ))}

          {/* Count card */}
          <motion.div
            className="flex flex-col items-center justify-center text-center gap-1 px-4 py-5 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, var(--color-brand-green) 0%, #1a5c3a 100%)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.65, duration: 0.4 }}
          >
            <span className="text-3xl font-black text-white">{TECHNOLOGIES.length}+</span>
            <span className="text-xs font-semibold text-white opacity-80">
              {isAr ? "تقنية وجهاز" : "Technologies"}
            </span>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

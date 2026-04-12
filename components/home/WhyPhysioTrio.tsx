"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface WhyPhysioTrioProps {
  locale: string;
  t: {
    title: string;
    body1: string;
    body2: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    feature4Title: string;
    feature4Desc: string;
  };
}

export function WhyPhysioTrio({ locale, t }: WhyPhysioTrioProps) {
  const features = [
    { title: t.feature1Title, desc: t.feature1Desc },
    { title: t.feature2Title, desc: t.feature2Desc },
    { title: t.feature3Title, desc: t.feature3Desc },
    { title: t.feature4Title, desc: t.feature4Desc },
  ];

  return (
    <section className="py-24" style={{ background: "#ffffff" }}>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{ background: "rgba(var(--color-brand-purple-rgb),0.08)", color: "var(--color-brand-purple)" }}
          >
            {locale === "ar" ? "لماذا فيزيوتريو" : "Why PhysioTrio"}
          </span>

          <h2
            className="text-3xl md:text-4xl font-bold leading-tight mb-6"
            style={{ color: "#1a1a2e" }}
          >
            {t.title}
          </h2>

          <p className="text-base leading-relaxed mb-4" style={{ color: "#6B7280" }}>
            {t.body1}
          </p>
          <p className="text-base leading-relaxed" style={{ color: "#6B7280" }}>
            {t.body2}
          </p>

          {/* Burjeel badge */}
          <div
            className="mt-8 inline-flex items-center gap-3 px-5 py-3 rounded-xl"
            style={{ background: "rgba(var(--color-brand-purple-rgb),0.05)", border: "1px solid rgba(var(--color-brand-purple-rgb),0.12)" }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white"
              style={{ background: "var(--color-brand-purple)" }}
            >
              B
            </div>
            <div>
              <p className="text-xs font-semibold" style={{ color: "#1a1a2e" }}>Burjeel Holdings</p>
              <p className="text-xs" style={{ color: "#9CA3AF" }}>
                {locale === "ar" ? "شريكنا الموثوق" : "Our trusted parent group"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right — Features */}
        <div className="flex flex-col gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="flex gap-4 p-5 rounded-2xl transition-all hover:shadow-md"
              style={{ background: "#F8FAFC", border: "1px solid rgba(0,0,0,0.05)" }}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <div className="flex-shrink-0 mt-0.5">
                <CheckCircle2 size={20} style={{ color: "var(--color-brand-purple)" }} />
              </div>
              <div>
                <h3 className="font-semibold text-base mb-1" style={{ color: "#1a1a2e" }}>
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

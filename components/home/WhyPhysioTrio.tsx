"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, CalendarCheck2, Languages, HeartHandshake } from "lucide-react";

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

const ICONS = [ShieldCheck, CalendarCheck2, Languages, HeartHandshake];

export function WhyPhysioTrio({ locale, t }: WhyPhysioTrioProps) {
  const isAr = locale === "ar";

  const features = [
    { title: t.feature1Title, desc: t.feature1Desc, Icon: ICONS[0] },
    { title: t.feature2Title, desc: t.feature2Desc, Icon: ICONS[1] },
    { title: t.feature3Title, desc: t.feature3Desc, Icon: ICONS[2] },
    { title: t.feature4Title, desc: t.feature4Desc, Icon: ICONS[3] },
  ];

  return (
    <section className="relative overflow-hidden" style={{ minHeight: "560px" }}>

      {/* ── Background image + overlays ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://physiotherabia.com/wp-content/uploads/2023/07/B-PH03-1.jpg"
          alt="PhysioTrio Saudi Arabia clinic"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 30%" }}
        />
        {/* Dark gradient overlay with Saudi green tint */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(7,20,30,0.97) 0%, rgba(7,20,30,0.88) 45%, rgba(0,100,60,0.45) 100%)" }}
        />
        {/* Subtle Saudi green accent line at top */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: "linear-gradient(to right, transparent, #006C35, transparent)" }}
        />
        {/* Decorative purple glow */}
        <div
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(var(--color-brand-purple-rgb),0.25) 0%, transparent 70%)" }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">

        {/* Top: eyebrow + headline + body */}
        <motion.div
          className="max-w-3xl mb-16"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-5 px-3 py-1.5 rounded-full"
            style={{ background: "rgba(var(--color-brand-green-rgb),0.15)", color: "var(--color-brand-green)", border: "1px solid rgba(var(--color-brand-green-rgb),0.3)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            {isAr ? "لماذا فيزيوتريو" : "Why PhysioTrio"}
          </span>

          <h2
            className="font-black leading-tight text-white mb-5"
            style={{ fontSize: "clamp(28px, 4.5vw, 54px)" }}
          >
            {t.title}
          </h2>

          <p className="text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.65)", maxWidth: "600px" }}>
            {t.body1}
          </p>
        </motion.div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="flex flex-col gap-4 p-6 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(12px)",
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(var(--color-brand-green-rgb),0.15)", border: "1px solid rgba(var(--color-brand-green-rgb),0.25)" }}
              >
                <feature.Icon size={20} style={{ color: "var(--color-brand-green)" }} strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="font-bold text-white text-base mb-1.5 leading-snug">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA row */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link
            href={`/${locale}/book`}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white text-sm transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, var(--color-brand-purple) 0%, var(--color-brand-purple-light) 100%)", boxShadow: "0 6px 24px rgba(var(--color-brand-purple-rgb),0.45)" }}
          >
            {isAr ? "احجز موعدك الآن" : "Book Your Appointment"}
          </Link>

          {/* Burjeel badge */}
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black text-white shrink-0"
              style={{ background: "var(--color-brand-purple)" }}
            >
              B
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Burjeel Holdings</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                {isAr ? "شريكنا الموثوق" : "Our trusted parent group"}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

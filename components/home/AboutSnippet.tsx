"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface AboutSnippetProps {
  locale: string;
}

export function AboutSnippet({ locale }: AboutSnippetProps) {
  const isAr = locale === "ar";

  return (
    <section className="py-14" style={{ background: "#f6fdf9" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Year badge */}
          <div className="shrink-0 flex items-center gap-4">
            <div
              className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg, var(--color-brand-green) 0%, #1a5c3a 100%)" }}
            >
              <span className="text-xs font-semibold text-white opacity-75">{isAr ? "منذ" : "Est."}</span>
              <span className="text-2xl font-black text-white leading-none">2013</span>
            </div>
            <div className="hidden lg:block w-px h-16 self-center" style={{ background: "rgba(var(--color-brand-green-rgb),0.2)" }} />
          </div>

          {/* Text */}
          <div className="flex-1">
            <p
              className="font-medium leading-relaxed"
              style={{ fontSize: "clamp(15px, 1.5vw, 19px)", color: "#1a3d2b" }}
            >
              {isAr
                ? "تأسست فيزيوتريو عام 2013 لتكون الوجهة الأولى للعلاج الطبيعي وإعادة التأهيل في المملكة، في فرعَي الرياض ومكة المكرمة — تحت مظلة مجموعة برجيل القابضة."
                : "PhysioTrio was established in 2013 to be a leading physiotherapy destination in Saudi Arabia, serving patients across Riyadh and Makkah — under the umbrella of Burjeel Holdings."}
            </p>
          </div>

          {/* CTA */}
          <Link
            href={`/${locale}/about`}
            className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-full shrink-0 transition-all hover:opacity-80"
            style={{
              border: "1.5px solid rgba(var(--color-brand-green-rgb),0.4)",
              color: "var(--color-brand-green-dark)",
            }}
          >
            {isAr ? "اعرف أكثر" : "Our Story"}
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

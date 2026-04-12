"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Star } from "lucide-react";

interface Therapist {
  id: string;
  name: { en: string; ar: string };
  title: { en: string; ar: string };
  specializations: string[];
  branches: string[];
  languages: string[];
  yearsExp: number;
  rating: number;
  initials: string;
  image?: string | null;
}

interface TeamCarouselProps {
  locale: string;
  therapists: Therapist[];
  title: string;
  subtitle: string;
  bookWithText: string;
}

export function TeamCarousel({ locale, therapists, title, subtitle, bookWithText }: TeamCarouselProps) {
  const [isHovered, setIsHovered] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="py-24 overflow-hidden"
      style={{ background: "#ffffff" }}
    >
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{ background: "rgba(var(--color-brand-purple-rgb),0.08)", color: "var(--color-brand-purple)" }}
          >
            {locale === "ar" ? "فريقنا" : "Our Team"}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: "#1a1a2e" }}>
            {title}
          </h2>
          <p className="text-lg" style={{ color: "#6B7280" }}>
            {subtitle}
          </p>
        </motion.div>
      </div>

      <motion.div
        ref={dragRef}
        className="flex gap-5 px-6 cursor-grab active:cursor-grabbing select-none"
        drag="x"
        dragConstraints={{ right: 0, left: -((therapists.length - 2) * 320) }}
        dragElastic={0.1}
      >
        {therapists.map((therapist, i) => (
          <motion.div
            key={therapist.id}
            className="flex-shrink-0 w-72 bg-white rounded-2xl p-6 relative overflow-hidden"
            style={{ boxShadow: "0 4px 24px rgba(var(--color-brand-purple-rgb),0.08)" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
          >
            {/* Avatar */}
            {therapist.image ? (
              <div className="w-16 h-16 rounded-full mb-4 overflow-hidden relative flex-shrink-0">
                <Image
                  src={therapist.image}
                  alt={locale === "ar" ? therapist.name.ar : therapist.name.en}
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
            ) : (
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white font-black text-xl flex-shrink-0"
                style={{ background: "radial-gradient(circle, var(--color-brand-purple) 0%, var(--color-brand-green) 100%)" }}
              >
                {therapist.initials}
              </div>
            )}

            {/* Info */}
            <h3 className="font-bold text-base mb-0.5" style={{ color: "#1a1a2e" }}>
              {locale === "ar" ? therapist.name.ar : therapist.name.en}
            </h3>
            <p className="text-sm font-light mb-3" style={{ color: "#666" }}>
              {locale === "ar" ? therapist.title.ar : therapist.title.en}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              {[1,2,3,4,5].map(s => (
                <Star
                  key={s}
                  size={12}
                  fill={s <= Math.floor(therapist.rating) ? "var(--color-brand-green)" : "none"}
                  color="var(--color-brand-green)"
                />
              ))}
              <span className="text-xs font-semibold ml-1" style={{ color: "var(--color-brand-green)" }}>
                {therapist.rating}
              </span>
            </div>

            {/* Branch badge */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {therapist.branches.map(b => (
                <span
                  key={b}
                  className="text-xs px-2 py-0.5 rounded-full font-semibold capitalize"
                  style={{ background: "var(--color-brand-green-muted)", color: "var(--color-brand-green-dark)" }}
                >
                  {b}
                </span>
              ))}
            </div>

            {/* Book CTA */}
            <Link
              href={`/${locale}/book/${therapist.branches[0]}?therapist=${therapist.id}`}
              className="w-full py-2.5 rounded-full text-sm font-bold text-center block transition-all hover:scale-105"
              style={{ background: "var(--color-brand-purple)", color: "white" }}
            >
              {bookWithText} {locale === "ar" ? therapist.name.ar.split(" ")[1] : therapist.name.en.split(" ")[1]}
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center mt-8">
        <p className="text-xs font-light" style={{ color: "rgba(var(--color-brand-purple-rgb),0.5)" }}>
          ← {locale === "ar" ? "اسحب للتصفح" : "Drag to explore"} →
        </p>
      </div>
    </section>
  );
}

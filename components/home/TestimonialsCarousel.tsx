"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: string;
  quote: { en: string; ar: string };
  name: { en: string; ar: string };
  branch: { en: string; ar: string };
  stars: number;
}

interface TestimonialsCarouselProps {
  locale: string;
  testimonials: Testimonial[];
  title: string;
}

export function TestimonialsCarousel({ locale, testimonials, title }: TestimonialsCarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const testimonial = testimonials[current];
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-24 px-6" style={{ background: "#F8FAFC" }}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{ background: "rgba(var(--color-brand-purple-rgb),0.08)", color: "var(--color-brand-purple)" }}
          >
            {locale === "ar" ? "آراء مرضانا" : "Patient Stories"}
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ color: "#1a1a2e" }}
          >
            {title}
          </h2>
        </motion.div>

        {/* Card */}
        <div
          className="relative rounded-[32px] p-10 md:p-16"
          style={{ background: "#ffffff", boxShadow: "0 4px 40px rgba(0,0,0,0.06)" }}
        >
          {/* Decorative quote */}
          <div
            className="absolute top-8 left-10 text-[80px] font-black leading-none select-none"
            style={{ color: "rgba(var(--color-brand-purple-rgb),0.08)" }}
          >
            "
          </div>

          <div className="relative min-h-[200px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <blockquote
                  className="text-xl md:text-2xl font-normal leading-relaxed mb-10"
                  style={{ color: "#374151" }}
                >
                  {locale === "ar" ? testimonial.quote.ar : testimonial.quote.en}
                </blockquote>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base"
                      style={{ background: "linear-gradient(135deg, var(--color-brand-purple), var(--color-brand-green))" }}
                    >
                      {(locale === "ar" ? testimonial.name.ar : testimonial.name.en).charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-base" style={{ color: "#1a1a2e" }}>
                        {locale === "ar" ? testimonial.name.ar : testimonial.name.en}
                      </p>
                      <p className="text-sm" style={{ color: "#9CA3AF" }}>
                        {locale === "ar" ? testimonial.branch.ar : testimonial.branch.en}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={16}
                        fill={s <= testimonial.stars ? "var(--color-brand-purple)" : "none"}
                        color={s <= testimonial.stars ? "var(--color-brand-purple)" : "#D1D5DB"}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="rounded-full transition-all"
                  style={{
                    width: i === current ? "24px" : "8px",
                    height: "8px",
                    background: i === current ? "var(--color-brand-purple)" : "#D1D5DB",
                  }}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105"
                style={{ background: "#F1F5F9", color: "#6B7280" }}
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105"
                style={{ background: "var(--color-brand-purple)", color: "white" }}
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

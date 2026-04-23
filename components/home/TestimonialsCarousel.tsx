"use client";

import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

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
  title?: string;
}

export function TestimonialsCarousel({ locale, testimonials, title }: TestimonialsCarouselProps) {
  const isAr = locale === "ar";
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const count = testimonials.length;

  function goTo(index: number) {
    setFading(true);
    setTimeout(() => {
      setActive((index + count) % count);
      setFading(false);
    }, 200);
  }

  useEffect(() => {
    if (count <= 1) return;
    const timer = setInterval(() => {
      goTo(active + 1);
    }, 6000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, count]);

  const current = testimonials[active];

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="py-20 lg:py-28 bg-white"
    >
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12 text-center">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.25em] mb-3 block"
            style={{ color: "var(--color-brand-purple)" }}
          >
            {isAr ? "آراء مرضانا" : "Patient Stories"}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {title || (isAr ? "ماذا يقول مرضانا" : "What Our Patients Say")}
          </h2>
        </div>

        {/* Quote block */}
        <div className="relative">
          {/* Decorative quote mark */}
          <span
            className="absolute -top-6 select-none pointer-events-none text-[120px] leading-none font-serif"
            style={{
              color: `rgba(var(--color-brand-purple-rgb), 0.07)`,
              left: isAr ? "auto" : "-0.1em",
              right: isAr ? "-0.1em" : "auto",
              top: "-0.2em",
            }}
            aria-hidden="true"
          >
            &ldquo;
          </span>

          {/* Testimonial content */}
          <div
            className="relative text-center transition-opacity duration-200"
            style={{ opacity: fading ? 0 : 1 }}
          >
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill={i < current.stars ? "#F59E0B" : "none"}
                  className={i < current.stars ? "text-amber-400" : "text-gray-200"}
                />
              ))}
            </div>

            {/* Quote text */}
            <blockquote className="text-xl md:text-2xl italic text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto">
              &ldquo;{isAr ? current.quote.ar : current.quote.en}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex flex-col items-center gap-1">
              <p className="text-sm font-bold text-gray-900">
                {isAr ? current.name.ar : current.name.en}
              </p>
              <p className="flex items-center gap-1.5 text-xs text-gray-400">
                <MapPin size={11} />
                {isAr ? current.branch.ar : current.branch.en}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        {count > 1 && (
          <div className="mt-10 flex flex-col items-center gap-5">
            {/* Arrow buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => goTo(active - 1)}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-700 transition-colors"
                aria-label={isAr ? "التالي" : "Previous"}
              >
                <ChevronLeft size={16} className={isAr ? "rotate-180" : ""} />
              </button>
              <button
                onClick={() => goTo(active + 1)}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-700 transition-colors"
                aria-label={isAr ? "السابق" : "Next"}
              >
                <ChevronRight size={16} className={isAr ? "rotate-180" : ""} />
              </button>
            </div>

            {/* Dot indicators */}
            <div className="flex gap-2" role="tablist" aria-label={isAr ? "مؤشرات الشرائح" : "Slide indicators"}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`${isAr ? "شريحة" : "Slide"} ${i + 1}`}
                  onClick={() => goTo(i)}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? "24px" : "8px",
                    backgroundColor:
                      i === active
                        ? "var(--color-brand-purple)"
                        : "rgb(209 213 219)",
                  }}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
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

const PER_PAGE = 3;

export function TestimonialsCarousel({ locale, testimonials, title }: TestimonialsCarouselProps) {
  const isAr = locale === "ar";
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(testimonials.length / PER_PAGE);
  const visible = testimonials.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <section className="py-20 md:py-28 border-t border-gray-100" style={{
      background: "white",
      backgroundImage: "radial-gradient(circle, rgba(11,22,44,0.05) 1px, transparent 1px)",
      backgroundSize: "24px 24px",
    }}>
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-6 h-px" style={{ background: "var(--color-brand-green)" }} />
              <span
                className="text-[10px] font-black uppercase tracking-[0.22em]"
                style={{ color: "var(--color-brand-green)" }}
              >
                {isAr ? "آراء مرضانا" : "Patient Stories"}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black leading-tight" style={{ color: "#0B162C" }}>
              {title}
            </h2>
          </div>

          {/* Prev / Next */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-all hover:border-gray-400 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={18} style={{ color: "#0B162C" }} />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-all hover:border-gray-400 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight size={18} style={{ color: "#0B162C" }} />
              </button>
            </div>
          )}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {visible.map((t) => (
            <div
              key={t.id}
              className="flex flex-col bg-white border border-gray-100 rounded-xl p-6 hover:shadow-sm transition-shadow duration-200"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={14}
                    fill={s <= t.stars ? "var(--color-brand-green)" : "none"}
                    color={s <= t.stars ? "var(--color-brand-green)" : "#d1d5db"}
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-gray-700 leading-relaxed flex-1 mb-5">
                &ldquo;{isAr ? t.quote.ar : t.quote.en}&rdquo;
              </p>

              {/* Patient */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black text-white shrink-0"
                  style={{ background: "var(--color-brand-purple)" }}
                >
                  {(isAr ? t.name.ar : t.name.en).charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold leading-none mb-0.5" style={{ color: "#0B162C" }}>
                    {isAr ? t.name.ar : t.name.en}
                  </p>
                  <p className="text-xs text-gray-400">
                    {isAr ? t.branch.ar : t.branch.en}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Page indicator */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className="rounded-full transition-all duration-200"
                style={{
                  width: i === page ? "24px" : "8px",
                  height: "8px",
                  background: i === page ? "var(--color-brand-purple)" : "#d1d5db",
                }}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

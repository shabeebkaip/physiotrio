"use client";

import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

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
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Entrance animation
  useGSAP(() => {
    gsap.fromTo(
      ".testim-header-anim",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
      }
    );

    gsap.fromTo(
      ".testim-card-anim",
      { opacity: 0, y: 40, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.2)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
      }
    );
  }, { scope: sectionRef });

  // Animate content on change
  useGSAP(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, { dependencies: [current], scope: sectionRef });

  const testimonial = testimonials[current];
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-6 bg-white overflow-hidden border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        
        <div className="testim-header-anim text-center mb-16">
          <span
            className="inline-block text-sm font-bold uppercase tracking-widest mb-4 px-4 py-1.5 rounded-full bg-brand-green/10 text-brand-green"
          >
            {locale === "ar" ? "آراء مرضانا" : "Patient Stories"}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B162C]">
            {title}
          </h2>
        </div>

        {/* Card */}
        <div
          className="testim-card-anim relative rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 md:p-16 border border-gray-100 bg-[#F8FAFC]"
          style={{ boxShadow: "0 20px 40px -10px rgba(0,0,0,0.05)" }}
        >
          {/* Decorative quote Mark */}
          <div
            className="absolute top-6 left-8 sm:top-10 sm:left-12 text-[100px] font-black leading-none select-none text-brand-purple/10"
          >
            "
          </div>

          <div className="relative min-h-[220px] flex flex-col justify-between">
            <div ref={contentRef}>
              <blockquote className="text-xl sm:text-2xl md:text-3xl font-bold leading-relaxed mb-10 text-[#0B162C] relative z-10 italic">
                {locale === "ar" ? testimonial.quote.ar : testimonial.quote.en}
              </blockquote>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-2">
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg border-2 border-white"
                    style={{ background: "linear-gradient(135deg, var(--color-brand-purple) 0%, var(--color-brand-green) 100%)" }}
                  >
                    {(locale === "ar" ? testimonial.name.ar : testimonial.name.en).charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-black text-lg text-[#0B162C]">
                      {locale === "ar" ? testimonial.name.ar : testimonial.name.en}
                    </h4>
                    <p className="text-sm font-bold text-brand-purple">
                      {locale === "ar" ? testimonial.branch.ar : testimonial.branch.en}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-1 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={18}
                      fill={s <= testimonial.stars ? "var(--color-brand-green)" : "none"}
                      color={s <= testimonial.stars ? "var(--color-brand-green)" : "#e5e7eb"}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Container */}
          <div className="flex items-center justify-between mt-10 pt-8 border-t border-gray-200/60">
            {/* Dots */}
            <div className="flex gap-2.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? "32px" : "10px",
                    height: "10px",
                    background: i === current ? "var(--color-brand-purple)" : "#cbd5e1",
                  }}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next */}
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all bg-white border border-gray-200 hover:border-brand-purple hover:text-brand-purple"
                aria-label="Previous"
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all bg-brand-purple text-white shadow-md hover:opacity-90 hover:-translate-y-0.5"
                aria-label="Next"
              >
                <ChevronRight size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

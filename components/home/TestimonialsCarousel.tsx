"use client";

import { useState, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

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
  const isAr = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const animateIn = () => {
    if (!bodyRef.current) return;
    gsap.fromTo(bodyRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
  };

  const goTo = (idx: number) => {
    if (!bodyRef.current) { setCurrent(idx); return; }
    gsap.to(bodyRef.current, {
      opacity: 0, y: -10, duration: 0.22, ease: "power2.in",
      onComplete: () => { setCurrent(idx); animateIn(); },
    });
  };

  const prev = () => goTo((current - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((current + 1) % testimonials.length);
  const t = testimonials[current];

  useGSAP(() => {
    gsap.from(".testim-hdr", {
      opacity: 0, y: 30, duration: 0.7, stagger: 0.12, ease: "power2.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 82%", toggleActions: "play none none none" },
    });
    gsap.from(".testim-card", {
      opacity: 0, y: 50, scale: 0.97, duration: 0.8, ease: "back.out(1.2)",
      scrollTrigger: { trigger: sectionRef.current, start: "top 78%", toggleActions: "play none none none" },
    });
  }, { scope: sectionRef });

  const initial = (isAr ? t.name.ar : t.name.en).charAt(0);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 relative overflow-hidden" style={{ background: "#F8FAF9" }}>
      {/* World Map Watermark Overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none fill-[#0f2d1f]">
        <svg viewBox="0 0 1000 500" className="w-full h-full">
           <path d="M123,45 L130,50 L140,48 Z" /> {/* Simplified path for demonstration, in real I'll use a better one if needed */}
           {/* I'll use a high-quality SVG pattern for the map */}
           <image href="https://raw.githubusercontent.com/Anmol-Baranwal/World-Map-SVG/master/worldmap.svg" width="1000" height="500" opacity="0.3" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[960px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="testim-hdr inline-block text-xs font-bold uppercase tracking-[0.20em] px-5 py-2 rounded-full mb-5"
            style={{ background: "rgba(76,175,80,0.12)", color: "#388e3c", border: "1px solid rgba(76,175,80,0.22)" }}>
            {isAr ? "آراء مرضانا" : "Patient Testimonials"}
          </span>
          <h2 className="testim-hdr text-4xl sm:text-5xl font-black leading-tight" style={{ color: "#0f2d1f" }}>
            {isAr ? "ماذا يقول مرضانا عنا" : "What Our Patients Say About Us"}
          </h2>
        </div>

        {/* Card - Centered as per reference */}
        <div
          className="testim-card relative bg-white rounded-[2rem] p-10 sm:p-14 lg:p-20 overflow-hidden text-center"
          style={{ boxShadow: "0 25px 70px rgba(15, 45, 31, 0.08)", border: "1px solid #E6EEEC" }}
        >
          {/* Quote icon at top center */}
          <div className="flex justify-center mb-10">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "#0f2d1f" }}>
              <Quote size={28} className="text-white" fill="currentColor" />
            </div>
          </div>

          <div ref={bodyRef} className="relative flex flex-col items-center">
            {/* Stars */}
            <div className="flex gap-1 mb-8">
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={22}
                  fill={s <= t.stars ? "#f59e0b" : "none"}
                  color={s <= t.stars ? "#f59e0b" : "#e5e7eb"}
                />
              ))}
            </div>

            {/* Quote text */}
            <blockquote className="text-xl sm:text-2xl md:text-3xl font-black italic leading-[1.6] mb-12" style={{ color: "#0f2d1f" }}>
              "{isAr ? t.quote.ar : t.quote.en}"
            </blockquote>

            {/* Author */}
            <div className="flex flex-col items-center gap-2">
              <h4 className="text-lg font-black" style={{ color: "#0f2d1f" }}>
                {isAr ? t.name.ar : t.name.en}
              </h4>
              <p className="text-sm font-bold uppercase tracking-wider text-brand-green">
                {isAr ? t.branch.ar : t.branch.en}
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-16 pt-10 border-t border-gray-100">
             <button
               onClick={prev} aria-label="Previous"
               className="group w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 border border-gray-200 hover:bg-[#0f2d1f] hover:border-[#0f2d1f]"
             >
               <ChevronLeft size={24} className="text-gray-400 group-hover:text-white" />
             </button>

             <div className="flex gap-3">
               {testimonials.map((_, i) => (
                 <button
                   key={i} onClick={() => goTo(i)}
                   className="h-2 rounded-full transition-all duration-300"
                   style={{ 
                     width: i===current ? "32px" : "10px", 
                     background: i===current ? "#0f2d1f" : "#E6EEEC" 
                   }}
                 />
               ))}
             </div>

             <button
               onClick={next} aria-label="Next"
               className="group w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 border border-gray-200 hover:bg-[#0f2d1f] hover:border-[#0f2d1f]"
             >
               <ChevronRight size={24} className="text-gray-400 group-hover:text-white" />
             </button>
          </div>
        </div>
      </div>
    </section>
  );
}

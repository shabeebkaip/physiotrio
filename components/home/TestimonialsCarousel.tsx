"use client";

import { useState, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2, MapPin } from "lucide-react";
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

export function TestimonialsCarousel({ locale, testimonials }: TestimonialsCarouselProps) {
  const [current, setCurrent] = useState(0);
  const isAr = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const ekgRef = useRef<SVGSVGElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const animateIn = () => {
    if (!coreRef.current) return;
    const tl = gsap.timeline();
    
    tl.fromTo(coreRef.current, 
      { opacity: 0, y: 15, scale: 0.98, filter: "blur(4px)" },
      { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.5, ease: "power2.out" }
    );

    // EKG Pulse on transition
    gsap.fromTo(ekgRef.current,
      { opacity: 0.05, stroke: "#E6EEEC" },
      { opacity: 0.2, stroke: "#388e3c", duration: 0.4, yoyo: true, repeat: 1, ease: "sine.inOut" }
    );
  };

  const goTo = (idx: number) => {
    if (isAnimating || idx === current) return;
    setIsAnimating(true);

    gsap.to(coreRef.current, {
      opacity: 0,
      y: -10,
      filter: "blur(4px)",
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setCurrent(idx);
        animateIn();
        setIsAnimating(false);
      },
    });
  };

  const prev = () => goTo((current - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((current + 1) % testimonials.length);

  useGSAP(() => {
    // Reveal Header
    gsap.from(".testim-reveal", {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      }
    });

    // Main Card Entry
    gsap.from(".testim-card-outer", {
      opacity: 0,
      y: 50,
      scale: 0.95,
      duration: 1,
      ease: "back.out(1.2)",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });
  }, { scope: sectionRef });

  const t = testimonials[current];

  return (
    <section 
      ref={sectionRef} 
      dir={isAr ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-[#F8FAF9] py-24 lg:py-48"
    >
      {/* ── Background Clinical Logic ── */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10 pointer-events-none">
        <svg 
            ref={ekgRef}
            viewBox="0 0 1000 200" 
            className="w-full h-auto stroke-[#E6EEEC] stroke-[2] fill-none transition-colors duration-700"
        >
            <path d="M0,100 L200,100 L220,80 L240,120 L260,20 L280,180 L300,100 L500,100 L520,80 L540,120 L560,20 L580,180 L600,100 L1000,100" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Header Block */}
        <div className="mb-20 text-center">
          <div className="testim-reveal mb-6 inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-brand-green/5 px-5 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-brand-green">
            <CheckCircle2 size={12} className="text-brand-green" />
            {isAr ? "مجتمع فيزيوتريو" : "THE PHYSIOTRIO COMMUNITY"}
          </div>
          <h2 className="testim-reveal text-4xl font-black leading-tight text-[#0f2d1f] sm:text-6xl">
            {isAr ? (
              <>
                قصص <span className="text-brand-green">النجاح</span> <br />
                التي تلهمنا
              </>
            ) : (
              <>
                STORIES OF <br />
                <span className="text-brand-green">TRUE RECOVERY</span>
              </>
            )}
          </h2>
        </div>

        {/* ── The Clinical Spotlight Card ── */}
        <div className="testim-card-outer relative mx-auto w-full max-w-4xl">
          {/* Surface Shadow Layers */}
          <div className="absolute -inset-4 z-[-1] rounded-[3.5rem] bg-[#0f2d1f]/[0.02] blur-2xl" />
          
          <div 
            className="relative overflow-hidden rounded-[3rem] bg-white p-10 shadow-[0_40px_100px_-20px_rgba(15,45,31,0.12)] border border-[#E6EEEC] md:p-20"
          >
            {/* Top Detail: Clinical Badge */}
            <div className="absolute top-10 left-10 md:left-20">
                <div className="flex items-center gap-1.5 opacity-40">
                    <Quote size={20} className="text-[#0f2d1f] fill-[#0f2d1f]" />
                    <span className="h-px w-8 bg-[#0f2d1f]/20" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0f2d1f]">
                        {isAr ? "شهادة مريض" : "PATIENT TESTIMONY"}
                    </span>
                </div>
            </div>

            <div ref={coreRef} className="relative z-10 flex flex-col items-center">
              {/* Recovery Ring & Initial */}
              <div className="relative mb-12 flex h-24 w-24 items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-brand-green/10 bg-brand-green/5 blur-sm" />
                <div className="absolute inset-2 rounded-full border-2 border-dashed border-brand-green/20 animate-[spin_10s_linear_infinite]" />
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-[#0f2d1f] text-2xl font-black text-white shadow-xl">
                  {t.name.en.charAt(0)}
                </div>
              </div>

              {/* Stars */}
              <div className="mb-10 flex gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={28}
                    fill="#f59e0b"
                    className="text-[#f59e0b] drop-shadow-[0_2px_10px_rgba(245,158,11,0.2)]"
                  />
                ))}
              </div>

              {/* Quote text */}
              <blockquote className="max-w-3xl text-2xl font-black italic leading-[1.5] text-[#0f2d1f] md:text-3xl lg:text-4xl">
                &ldquo;{isAr ? t.quote.ar : t.quote.en}&rdquo;
              </blockquote>

              {/* Author Meta */}
              <div className="mt-16 flex flex-col items-center gap-6">
                <div className="flex flex-col items-center">
                    <h4 className="text-2xl font-black tracking-tight text-[#0f2d1f]">
                        {isAr ? t.name.ar : t.name.en}
                    </h4>
                    <div className="mt-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-brand-green">
                        <MapPin size={14} />
                        {isAr ? t.branch.ar : t.branch.en}
                    </div>
                </div>
              </div>
            </div>

            {/* Premium Controls & Tracker */}
            <div className="mt-24 flex items-center justify-between border-t border-gray-50 pt-12">
                 <button
                    onClick={prev}
                    disabled={isAnimating}
                    className="group flex h-16 w-16 items-center justify-center rounded-full border border-gray-100 bg-white shadow-lg transition-all hover:bg-[#0f2d1f] hover:border-[#0f2d1f] active:scale-95 disabled:opacity-30"
                 >
                    <ChevronLeft size={28} className="text-gray-400 transition-colors group-hover:text-white" />
                 </button>

                 <div className="relative flex min-w-[200px] flex-col items-center gap-4">
                    <div className="flex gap-4">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                className={`h-2 rounded-full transition-all duration-500 ${
                                    i === current ? "w-12 bg-brand-green" : "w-2 bg-gray-100 hover:bg-gray-200"
                                }`}
                                aria-label={`Go to testimonial ${i + 1}`}
                            />
                        ))}
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-300">
                        {current + 1} / {testimonials.length} {isAr ? "قصص" : "SUCCESS STORIES"}
                    </span>
                 </div>

                 <button
                    onClick={next}
                    disabled={isAnimating}
                    className="group flex h-16 w-16 items-center justify-center rounded-full border border-gray-100 bg-white shadow-lg transition-all hover:bg-[#0f2d1f] hover:border-[#0f2d1f] active:scale-95 disabled:opacity-30"
                 >
                    <ChevronRight size={28} className="text-gray-400 transition-colors group-hover:text-white" />
                 </button>
            </div>
          </div>
        </div>

        {/* Clinical Proof Ribbon */}
        <div className="testim-reveal mt-20 flex items-center justify-center opacity-30">
             <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
                 <div className="flex items-center gap-4">
                    <span className="text-3xl font-black text-[#0f2d1f]">50k+</span>
                    <span className="max-w-[80px] text-[9px] font-bold uppercase leading-tight tracking-widest">{isAr ? "مريض سعيد" : "HAPPY PATIENTS"}</span>
                 </div>
                 <div className="hidden h-8 w-px bg-gray-200 md:block" />
                 <div className="flex items-center gap-4">
                    <span className="text-3xl font-black text-[#0f2d1f]">99%</span>
                    <span className="max-w-[80px] text-[9px] font-bold uppercase leading-tight tracking-widest">{isAr ? "معدل الرضا" : "SUCCESS RATE"}</span>
                 </div>
                 <div className="hidden h-8 w-px bg-gray-200 md:block" />
                 <div className="flex items-center gap-4">
                    <span className="text-3xl font-black text-[#0f2d1f]">10+</span>
                    <span className="max-w-[80px] text-[9px] font-bold uppercase leading-tight tracking-widest">{isAr ? "أطباء مختصين" : "EXPERT DOCTORS"}</span>
                 </div>
             </div>
        </div>
      </div>
    </section>
  );
}

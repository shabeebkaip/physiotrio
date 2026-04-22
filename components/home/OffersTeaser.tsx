"use client";

import Link from "next/link";
import { useRef } from "react";
import Image from "next/image";
import { CheckCircle2, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Counter } from "@/components/common/Counter";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

interface OffersTeaserProps {
  locale: string; eyebrow: string; title: string;
  viewAllText: string; purchaseText: string;
}

const features = {
  en: ["Initial assessment included", "3 physiotherapy sessions", "Personalized treatment plan", "Progress tracking report"],
  ar: ["يشمل التقييم الأولي", "3 جلسات علاج طبيعي", "خطة علاجية مخصصة", "تقرير تتبع التقدم"],
};

export function OffersTeaser({ locale, eyebrow, title, viewAllText, purchaseText }: OffersTeaserProps) {
  const isAr = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const items = isAr ? features.ar : features.en;

  useGSAP(() => {
    // Reveal image side
    gsap.from(".offer-img-wrapper", {
      opacity: 0, x: isAr ? 50 : -50, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
    });
    // Reveal text elements sequentially
    gsap.from(".offer-text-el", {
      opacity: 0, y: 30, duration: 0.8, stagger: 0.1, ease: "power2.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} dir={isAr ? "rtl" : "ltr"} className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Image Side (Side-by-Side Offset) ── */}
          <div className="offer-img-wrapper relative w-full h-[400px] sm:h-[500px] lg:h-[600px] mb-12 lg:mb-0 grid grid-cols-2 gap-4 sm:gap-6">
              
              {/* Image 1 (Left/Top) */}
              <div className="relative w-full h-[90%] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-xl shadow-brand-purple/5 group cursor-pointer">
                  <Image 
                    src="/images/home/excel1.jpg"
                    alt="Physiotherapy session" 
                    fill 
                    className="object-cover transition-transform duration-[800ms] group-hover:scale-110" 
                  />
                  {/* Template Shine Hover Effect */}
                  <div className="absolute top-0 -left-[100%] z-10 block w-1/2 h-full -skew-x-[25deg] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-[800ms] ease-in-out group-hover:left-[150%]" />
              </div>

              {/* Image 2 (Right/Offset down) */}
              <div className="relative w-full h-[90%] mt-[15%] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-xl shadow-brand-purple/5 group cursor-pointer">
                  <Image 
                    src="/images/home/excel2.jpg"
                    alt="Advanced Rehabilitation" 
                    fill 
                    className="object-cover transition-transform duration-[800ms] group-hover:scale-110" 
                  />
                  {/* Template Shine Hover Effect */}
                  <div className="absolute top-0 -left-[100%] z-10 block w-1/2 h-full -skew-x-[25deg] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-[800ms] ease-in-out group-hover:left-[150%]" />
              </div>

              {/* Limited badge */}
              {/* <div className={`absolute z-20 top-6 ${isAr ? 'right-6' : 'left-6'} px-5 py-2.5 rounded-full bg-white/95 backdrop-blur-md border border-brand-purple/10 shadow-[0_10px_40px_rgba(136,7,114,0.15)]`}>
                <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-brand-purple">
                  {isAr ? "عرض محدود" : "Limited Offer"}
                </span>
              </div> */}
          </div>

          {/* ── Content Side ── */}
          <div className="flex flex-col justify-center">
            
            {/* Header Area */}
            <div className="offer-text-el mb-6">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] px-5 py-2 rounded-full mb-6 bg-brand-green/10 text-brand-green border border-brand-green/20">
                {eyebrow}
              </span>
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black text-physio-dark leading-tight -tracking-wide">
                 {title}
              </h2>
            </div>

            <p className="offer-text-el text-lg font-medium leading-relaxed text-gray-500 mb-10 max-w-lg">
              {isAr
                ? "ابدأ رحلة تعافيك بعرض حصري يشمل كل ما تحتاجه للعودة إلى حياتك الطبيعية بقوة ويقين."
                : "Start your recovery journey with our exclusive starter package designed to restore your full mobility and confidence."}
            </p>

            {/* Price Block */}
            <div className="offer-text-el flex items-end gap-5 mb-10 pb-10 border-b border-gray-100">
              <div className="flex items-start leading-none text-brand-green">
                <span className="text-6xl lg:text-7xl font-black tabular-nums tracking-tighter">
                   <Counter end={350} />
                </span>
                <span className="text-xl font-black ml-2 mt-2 tracking-widest">SAR</span>
              </div>
              <div className="flex flex-col mb-2">
                <span className="font-bold line-through text-lg text-gray-300">450 SAR</span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md w-max mt-1 bg-brand-purple/10 text-brand-purple tracking-widest">
                  {isAr ? "وفّر 100 ريال" : "Save 100 SAR"}
                </span>
              </div>
            </div>

            {/* Features List */}
            <div className="offer-text-el grid sm:grid-cols-2 gap-x-6 gap-y-4 mb-12">
              {items.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={20} strokeWidth={2.5} className="text-brand-purple flex-shrink-0 mt-0.5" />
                  <span className="text-base font-bold text-physio-dark">{item}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="offer-text-el flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/${locale}/book/riyadh?package=starter`}
                  className="group flex-1 inline-flex justify-center items-center gap-3 px-8 py-5 rounded-full font-bold text-base text-white transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-brand-purple to-brand-purple-dark shadow-[0_8px_28px_rgba(136,7,114,0.3)]"
                >
                  {purchaseText}
                  <span className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1.5 bg-white/20">
                    <ArrowRight size={16} className={isAr ? "rotate-180" : ""} />
                  </span>
                </Link>
                <Link
                  href={`/${locale}/offers`}
                  className="flex-1 inline-flex justify-center items-center px-8 py-5 rounded-full font-bold text-base transition-all duration-300 border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
                >
                  {viewAllText}
                </Link>
              </div>

              {/* Financing */}
              <div className="flex items-center gap-3 pt-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                  {isAr ? "متاح للتقسيط عبر" : "Split Payments With"}
                </span>
                <div className="flex gap-2">
                  {["Tamara", "Tabby"].map(b => (
                    <span key={b} className="text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-[0.2em] bg-brand-purple/5 text-brand-purple border border-brand-purple/10">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

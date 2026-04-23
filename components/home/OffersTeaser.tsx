"use client";

import Link from "next/link";
import { useRef } from "react";
import Image from "next/image";
import { CheckCircle2, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Counter } from "@/components/common/Counter";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface OffersTeaserProps {
  locale: string;
  eyebrow: string;
  title: string;
  viewAllText: string;
  purchaseText: string;
}

const features = {
  en: ["Initial assessment included", "3 physiotherapy sessions", "Personalized treatment plan", "Progress tracking report"],
  ar: ["يشمل التقييم الأولي", "3 جلسات علاج طبيعي", "خطة علاجية مخصصة", "تقرير تتبع التقدم"]
};

export function OffersTeaser({ locale, eyebrow, title, viewAllText, purchaseText }: OffersTeaserProps) {
  const items = locale === "ar" ? features.ar : features.en;
  const sectionRef = useRef<HTMLElement>(null);
  const isAr = locale === "ar";

  useGSAP(() => {
    // Parallax on the left image
    gsap.to(".offer-parallax-img", {
      y: isAr ? 50 : -50,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

    // Content stagger entrance
    gsap.fromTo(
      ".offer-content-anim",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
      }
    );

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-6 md:px-12 bg-[#F8FAFC]">
      <div className="max-w-[1300px] mx-auto">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-2xl border border-gray-100">
          <div className="grid lg:grid-cols-2">
            
            {/* ── Left Side: Massive Parallax Image ── */}
            <div className={`relative w-full h-[350px] lg:h-auto overflow-hidden ${isAr ? 'order-1 lg:order-2' : ''}`}>
              <div className="offer-parallax-img absolute inset-0 w-full h-[120%] -top-[10%]">
                <Image
                  src="/center-images/DSC07750.jpg"
                  alt="Physiotherapy stretching"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-brand-purple/10 mix-blend-multiply" />
              </div>
              
              {/* Floating Limited Badge */}
              <div className="absolute top-6 left-6 lg:top-10 lg:left-10 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg border border-white/50">
                <span className="text-sm font-black text-brand-purple uppercase tracking-widest">
                  {eyebrow}
                </span>
              </div>
            </div>

            {/* ── Right Side: Clean Content Box ── */}
            <div className={`p-8 sm:p-12 md:p-16 lg:p-20 relative flex flex-col justify-center ${isAr ? 'order-2 lg:order-1' : ''}`}>
              
              <h2 className="offer-content-anim text-4xl sm:text-5xl font-black text-[#0B162C] mb-6 leading-[1.1]">
                {title}
              </h2>

              <p className="offer-content-anim text-gray-500 font-medium text-lg leading-relaxed mb-10">
                {isAr ? "ابدأ رحلة تعافيك اليوم بعرض حصري يتضمن كل ما تحتاجه للعودة إلى نشاطك المعتاد." : "Start your recovery journey today with our exclusive starter package designed to bring your mobility back."}
              </p>

              {/* Price Lockup */}
              <div className="offer-content-anim flex items-end gap-3 mb-10 pb-10 border-b border-gray-100">
                <div className="flex items-start text-brand-green leading-none drop-shadow-sm">
                  <span className="text-6xl sm:text-7xl font-black tabular-nums">
                    <Counter end={350} />
                  </span>
                  <span className="text-xl font-black ml-2 mt-2">SAR</span>
                </div>
                <div className="flex flex-col mb-1.5 ml-2">
                  <span className="text-gray-400 font-bold line-through text-lg">450 SAR</span>
                  <span className="text-xs font-bold text-brand-purple uppercase bg-brand-purple/10 px-2 py-0.5 rounded-md w-max mt-1">
                    Save 100 SAR
                  </span>
                </div>
              </div>

              {/* Package Features Grid */}
              <div className="offer-content-anim grid sm:grid-cols-2 gap-x-6 gap-y-4 mb-12">
                {items.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-brand-purple flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span className="text-[#0B162C] font-bold">{item}</span>
                  </div>
                ))}
              </div>

              {/* Actions & Payment Info */}
              <div className="offer-content-anim flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={`/${locale}/book/riyadh?package=starter`}
                    className="flex-1 inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full font-black text-white bg-brand-purple shadow-[0_8px_20px_-6px_rgba(var(--color-brand-purple-rgb),0.5)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_24px_-6px_rgba(var(--color-brand-purple-rgb),0.6)] group"
                  >
                    {purchaseText}
                    <ArrowRight size={18} className={`transition-transform duration-300 ${isAr ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                  </Link>
                  <Link
                    href={`/${locale}/offers`}
                    className="flex-1 inline-flex justify-center items-center px-8 py-4 rounded-full font-bold text-[#0B162C] bg-[#F8FAFC] border border-gray-200 transition-all hover:bg-gray-100"
                  >
                    {viewAllText}
                  </Link>
                </div>

                {/* Payment split badges */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    {isAr ? "متاح للتقسيط عبر" : "Split with"}
                  </span>
                  <div className="flex gap-2">
                    {["Tamara", "Tabby"].map(b => (
                      <span key={b} className="text-[10px] font-black px-2.5 py-1 rounded-md bg-[#F1F5F9] text-gray-500 uppercase tracking-wider border border-gray-200">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
    gsap.to(".offer-img", {
      y: -40, ease: "none",
      scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.2 },
    });
    gsap.from(".offer-hdr", {
      opacity: 0, y: 28, duration: 0.7, stagger: 0.11, ease: "power2.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
    });
    gsap.from(".offer-body", {
      opacity: 0, y: 24, duration: 0.65, stagger: 0.09, ease: "power2.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-12" style={{ background: "#fff" }}>
      <div className="max-w-[1280px] mx-auto">

        {/* Section header */}
        <div className="offer-hdr text-center mb-12">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.18em] px-5 py-2 rounded-full mb-4"
            style={{ background: "rgba(76,175,80,0.12)", color: "#388e3c", border: "1px solid rgba(76,175,80,0.22)" }}>
            {eyebrow}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black" style={{ color: "#0f2d1f" }}>{title}</h2>
        </div>

        {/* Main card */}
        <div className="overflow-hidden bg-white rounded-3xl" style={{ boxShadow: "0 24px 70px rgba(136,7,114,0.10)", border: "1.5px solid rgba(136,7,114,0.08)" }}>
          <div className="grid lg:grid-cols-2">

            {/* Image side */}
            <div className={`relative h-72 lg:h-auto overflow-hidden ${isAr ? "order-1 lg:order-2" : ""}`}>
              <div className="offer-img absolute inset-0 w-full" style={{ top: "-10%", height: "120%" }}>
                <Image src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80"
                  alt="Physiotherapy session" fill className="object-cover" />
                <div className="absolute inset-0" style={{ background: "rgba(136,7,114,0.06)", mixBlendMode: "multiply" }} />
              </div>
              {/* Limited badge */}
              <div className="absolute top-6 left-6 px-5 py-2.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", border: "1px solid rgba(136,7,114,0.14)" }}>
                <span className="text-sm font-black uppercase tracking-widest" style={{ color: "#880772" }}>
                  {isAr ? "عرض محدود" : "Limited Offer"}
                </span>
              </div>
            </div>

            {/* Content side */}
            <div className={`p-8 sm:p-12 md:p-16 flex flex-col justify-center ${isAr ? "order-2 lg:order-1 text-right" : ""}`}>

              <p className="offer-body text-lg font-medium leading-relaxed mb-10" style={{ color: "#4a6b59" }}>
                {isAr
                  ? "ابدأ رحلة تعافيك بعرض حصري يشمل كل ما تحتاجه للعودة إلى حياتك الطبيعية."
                  : "Start your recovery journey with our exclusive starter package designed to restore your full mobility."}
              </p>

              {/* Price */}
              <div className="offer-body flex items-end gap-4 mb-10 pb-10"
                style={{ borderBottom: "1.5px solid rgba(136,7,114,0.08)" }}>
                <div className="flex items-start leading-none" style={{ color: "#4caf50" }}>
                  <span className="text-6xl sm:text-7xl font-black tabular-nums"><Counter end={350} /></span>
                  <span className="text-xl font-black ml-2 mt-2">SAR</span>
                </div>
                <div className="flex flex-col mb-2">
                  <span className="font-bold line-through text-lg text-gray-400">450 SAR</span>
                  <span className="text-xs font-bold uppercase px-2 py-0.5 rounded-md w-max mt-1"
                    style={{ color: "#880772", background: "rgba(136,7,114,0.08)" }}>
                    {isAr ? "وفّر 100 ريال" : "Save 100 SAR"}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="offer-body grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-12">
                {items.map((item, i) => (
                  <div key={i} className={`flex items-start gap-2.5 ${isAr ? "flex-row-reverse" : ""}`}>
                    <CheckCircle2 size={17} strokeWidth={2.5} style={{ color: "#880772", flexShrink: 0, marginTop: "2px" }} />
                    <span className="text-sm font-semibold" style={{ color: "#0f2d1f" }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="offer-body flex flex-col gap-5">
                <div className={`flex flex-col sm:flex-row gap-4 ${isAr ? "sm:flex-row-reverse" : ""}`}>
                  <Link
                    href={`/${locale}/book/riyadh?package=starter`}
                    className="group flex-1 inline-flex justify-center items-center gap-3 px-8 py-4 rounded-full font-bold text-base text-white transition-all duration-300 hover:-translate-y-1"
                    style={{ background: "linear-gradient(135deg,#880772,#5E0450)", boxShadow: "0 8px 28px rgba(136,7,114,0.32)" }}
                  >
                    {purchaseText}
                    <span className="w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1"
                      style={{ background: "rgba(255,255,255,0.22)" }}>
                      <ArrowRight size={14} className={isAr ? "-scale-x-100" : ""} />
                    </span>
                  </Link>
                  <Link
                    href={`/${locale}/offers`}
                    className="flex-1 inline-flex justify-center items-center px-8 py-4 rounded-full font-bold text-base transition-all duration-300"
                    style={{ color: "#880772", border: "2px solid #880772", background: "transparent" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background="#880772"; el.style.color="#fff"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background="transparent"; el.style.color="#880772"; }}
                  >
                    {viewAllText}
                  </Link>
                </div>

                <div className={`flex items-center gap-3 ${isAr ? "flex-row-reverse" : ""}`}>
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                    {isAr ? "متاح للتقسيط عبر" : "Split with"}
                  </span>
                  <div className="flex gap-2">
                    {["Tamara", "Tabby"].map(b => (
                      <span key={b} className="text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider"
                        style={{ background: "rgba(136,7,114,0.07)", color: "#880772", border: "1px solid rgba(136,7,114,0.13)" }}>
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

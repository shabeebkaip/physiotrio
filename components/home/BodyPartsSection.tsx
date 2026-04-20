"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

type BodyPart = {
  en: string;
  ar: string;
  icon: string; // inline SVG path or symbol
};

const bodyParts: BodyPart[] = [
  { en: "Neck Pain",     ar: "ألم الرقبة",   icon: "M12 3 C12 3 12 7 12 10 M10 10 Q12 8 14 10" },
  { en: "Shoulder Pain", ar: "ألم الكتف",    icon: "M5 9 Q12 4 19 9" },
  { en: "Hip Pain",      ar: "ألم الورك",    icon: "M8 16 Q12 12 16 16" },
  { en: "Knee Pain",     ar: "ألم الركبة",   icon: "M12 8 L12 20 M9 14 L15 14" },
  { en: "Elbow Pain",    ar: "ألم الكوع",    icon: "M6 8 Q12 14 18 8" },
  { en: "Back Pain",     ar: "ألم الظهر",    icon: "M12 4 L12 20 M8 8 Q12 6 16 8 M8 16 Q12 18 16 16" },
  { en: "Hand Pain",     ar: "ألم اليد",     icon: "M9 12 L9 6 M12 11 L12 5 M15 12 L15 7 M7 14 Q12 18 17 14" },
  { en: "Foot Pain",     ar: "ألم القدم",    icon: "M6 18 Q12 12 18 18" },
  { en: "Ankle Pain",    ar: "ألم الكاحل",   icon: "M8 20 Q12 15 16 20" },
];

export function BodyPartsSection({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(".bp-card",
      { opacity: 0, y: 30, scale: 0.94 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none none" },
      }
    );
    gsap.fromTo(".bp-hdr",
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 88%", toggleActions: "play none none none" },
      }
    );
    setTimeout(() => ScrollTrigger.refresh(), 500);
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      dir={isAr ? "rtl" : "ltr"}
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "#0f2d1f" }}
    >
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      {/* Glow blobs */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(136,7,114,0.18) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(76,175,80,0.12) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-[1300px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className={`flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-16 ${isAr ? "md:flex-row-reverse" : ""}`}>
          <div className={isAr ? "text-right" : "text-left"}>
            <span
              className="bp-hdr inline-block text-xs font-bold uppercase tracking-[0.18em] px-5 py-2 rounded-full mb-5"
              style={{ background: "rgba(136,7,114,0.25)", color: "#c97ec0", border: "1px solid rgba(136,7,114,0.40)" }}
            >
              {isAr ? "أين تشعر بالألم؟" : "Pain Location"}
            </span>
            <h2
              className="bp-hdr text-4xl sm:text-5xl font-black leading-tight"
              style={{ color: "#fff" }}
            >
              {isAr ? "أين تحتاج إلى الاهتمام؟" : "Where Do You Need Attention?"}
            </h2>
          </div>
          <p
            className={`bp-hdr text-base leading-relaxed max-w-sm ${isAr ? "text-right" : "text-left"}`}
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            {isAr
              ? "نصمم خطة علاجية مخصصة بناءً على مكان ألمك وطبيعة حالتك."
              : "We design a personalized treatment plan based on your pain location and the nature of your condition."}
          </p>
        </div>

        {/* Body parts 3-column grid (detailed cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bodyParts.map((part, i) => (
            <Link
              key={i}
              href={`/${locale}/services`}
              className="bp-card group flex items-center gap-6 p-6 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-white/5"
              style={{
                background: "rgba(255,255,255,0.03)",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(76,175,80,0.12)";
                el.style.borderColor = "rgba(76,175,80,0.30)";
                el.style.transform = "translateX(5px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.03)";
                el.style.borderColor = "rgba(255,255,255,0.05)";
                el.style.transform = "translateX(0)";
              }}
            >
              {/* Icon circle box */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 border border-white/10 transition-all duration-350 group-hover:bg-brand-green group-hover:border-brand-green"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white group-hover:scale-110 transition-transform"
                >
                  <path d={part.icon} />
                </svg>
              </div>
              <span
                className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-brand-green"
              >
                {isAr ? part.ar : part.en}
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className={`mt-14 flex ${isAr ? "justify-end" : "justify-start"}`}>
          <Link
            href={`/${locale}/book/riyadh`}
            className="inline-flex items-center gap-3 px-9 py-4 rounded-full font-bold text-base text-white transition-all duration-300 hover:-translate-y-1"
            style={{ background: "linear-gradient(135deg,#880772,#5E0450)", boxShadow: "0 8px 28px rgba(136,7,114,0.40)" }}
          >
            {isAr ? "احجز جلستك الآن" : "Book Your Session"}
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.20)" }}
            >
              <ArrowRight size={15} className={isAr ? "-scale-x-100" : ""} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

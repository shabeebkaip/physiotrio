"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface BookingCTABandProps {
  locale: string;
  title: string;
  bookText: string;
  whatsappText: string;
}

export function BookingCTABand({ locale, title, bookText, whatsappText }: BookingCTABandProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isAr = locale === "ar";

  useGSAP(() => {
    gsap.fromTo(
      ".cta-band-anim",
      { opacity: 0, scale: 0.95, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-12 px-4 sm:px-6 md:px-12 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div
          className="cta-band-anim relative overflow-hidden rounded-[2rem] md:rounded-[3rem] py-12 sm:py-16 px-8 sm:px-12 md:px-20 shadow-2xl"
          style={{ background: "linear-gradient(135deg, var(--color-brand-purple) 0%, #301f68 100%)" }}
        >
          {/* Decorative blur blobs */}
          <div
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
            style={{ background: "rgba(var(--color-brand-green-rgb),0.3)", filter: "blur(70px)" }}
          />
          <div
            className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: "rgba(255,255,255,0.1)", filter: "blur(50px)" }}
          />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-10">
            <h2
              className="text-2xl sm:text-3xl md:text-5xl font-black text-white max-w-2xl leading-tight text-center md:text-start"
            >
              {title}
            </h2>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Primary CTA — Pharma pill button */}
              <Link
                href={`/${locale}/book/riyadh`}
                className="inline-flex items-center gap-3 pl-8 pr-3 py-3 rounded-full font-bold text-base transition-all hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.5)] hover:-translate-y-1 group bg-white text-[#0B162C]"
              >
                {bookText}
                <span
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:bg-brand-purple group-hover:text-white"
                  style={{ background: "var(--color-brand-green)", color: "white" }}
                >
                  <ArrowRight size={18} className={`transition-transform ${isAr ? 'rotate-180 group-hover:rotate-180' : ''}`} />
                </span>
              </Link>

              <a
                href="https://wa.me/966500000001"
                className="text-white/80 text-sm font-bold tracking-wide hover:text-white transition-colors underline decoration-white/30 underline-offset-4 hover:decoration-white"
              >
                {whatsappText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

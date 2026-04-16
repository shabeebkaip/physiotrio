"use client";

import { useRef, useState } from "react";
import {
  ShieldCheck, Activity, Clock, Users,
  ArrowRight
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface WhyPhysioTrioProps {
  locale: string;
  t: {
    title: string;
    body1: string;
    body2: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    feature4Title: string;
    feature4Desc: string;
  };
}

export function WhyPhysioTrio({ locale, t }: WhyPhysioTrioProps) {
  const isAr = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<number | null>(0);

  const features = [
    {
      num: "01",
      title: t.feature1Title,
      desc: t.feature1Desc,
      icon: ShieldCheck,
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80",
      accent: "var(--color-brand-green)",
      accentLight: "rgba(var(--color-brand-green-rgb), 0.06)",
      stat: { value: "100%", label: isAr ? "معتمد" : "Accredited" },
    },
    {
      num: "02",
      title: t.feature2Title,
      desc: t.feature2Desc,
      icon: Activity,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80",
      accent: "var(--color-brand-purple)",
      accentLight: "rgba(var(--color-brand-purple-rgb), 0.06)",
      stat: { value: "22+", label: isAr ? "سنة خبرة" : "Yrs Exp" },
    },
    {
      num: "03",
      title: t.feature3Title,
      desc: t.feature3Desc,
      icon: Clock,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
      accent: "var(--color-brand-green)",
      accentLight: "rgba(var(--color-brand-green-rgb), 0.06)",
      stat: { value: "24/7", label: isAr ? "دعم" : "Support" },
    },
    {
      num: "04",
      title: t.feature4Title,
      desc: t.feature4Desc,
      icon: Users,
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80",
      accent: "var(--color-brand-purple)",
      accentLight: "rgba(var(--color-brand-purple-rgb), 0.06)",
      stat: { value: "10K+", label: isAr ? "مريض" : "Patients" },
    },
  ];

  useGSAP(() => {
    gsap.fromTo(".why-top-anim",
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
      }
    );
    gsap.fromTo(".why-col-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "back.out(1.2)",
        scrollTrigger: { trigger: ".why-cols-row", start: "top 82%" }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white overflow-hidden border-t border-gray-100">
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">

        {/* ── Top Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="why-top-anim flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-brand-green" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-brand-green">
                {isAr ? "لماذا فيزيوتريو" : "Why Choose Us"}
              </span>
            </div>
            <h2 className="why-top-anim text-4xl sm:text-5xl md:text-[3.5rem] font-black text-[#0B162C] leading-[1.08] mb-0">
              {t.title}
            </h2>
          </div>
          <p className="why-top-anim text-lg font-medium text-gray-400 max-w-sm leading-relaxed md:mb-2">
            {t.body1}
          </p>
        </div>

        {/* ── Hover-Expand Column Cards ── */}
        <div
          className="why-cols-row flex gap-4 h-[520px] sm:h-[560px]"
          onMouseLeave={() => setHovered(0)}
        >
          {features.map((f, i) => {
            const Icon = f.icon;
            const isActive = hovered === i;

            return (
              <div
                key={i}
                className="why-col-card relative overflow-hidden rounded-[2rem] cursor-pointer flex-shrink-0 transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)]"
                style={{
                  flex: isActive ? "3.5" : "1",
                  background: isActive ? "var(--color-brand-purple)" : "#F8FAFC",
                  border: `1.5px solid ${isActive ? "var(--color-brand-purple)" : "#E5E7EB"}`,
                }}
                onMouseEnter={() => setHovered(i)}
              >
                {/* Image — visible only when active */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ opacity: isActive ? 1 : 0 }}
                >
                  <Image
                    src={f.image}
                    alt={f.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    unoptimized
                  />
                  {/* Dark overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B162C]/80 via-[#0B162C]/30 to-transparent" />
                </div>

                {/* Inactive state — vertical number + icon */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-between py-8 transition-opacity duration-300"
                  style={{ opacity: isActive ? 0 : 1 }}
                >
                  <span
                    className="text-xs font-black uppercase tracking-[0.2em] rotate-180 [writing-mode:vertical-rl] text-gray-300"
                    style={{ writingMode: "vertical-rl" }}
                  >
                    {f.num}
                  </span>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: f.accentLight, color: f.accent }}
                  >
                    <Icon size={20} strokeWidth={2.5} />
                  </div>
                  <span
                    className="text-xs font-black uppercase tracking-[0.18em] rotate-180 [writing-mode:vertical-rl] text-gray-400"
                    style={{ writingMode: "vertical-rl" }}
                  >
                    {f.title.split(" ").slice(0, 2).join(" ")}
                  </span>
                </div>

                {/* Active state — full content */}
                <div
                  className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10 transition-all duration-500"
                  style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? "auto" : "none" }}
                >
                  {/* Number + Icon Row */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-6xl font-black text-white/15 leading-none">{f.num}</span>
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(255,255,255,0.15)", color: "white" }}
                    >
                      <Icon size={22} strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 leading-tight">
                    {f.title}
                  </h3>

                  {/* Divider */}
                  <div className="w-12 h-0.5 bg-brand-green mb-4 rounded-full" />

                  {/* Stat Pill */}
                  <div className="inline-flex items-center gap-2 mb-6 w-max">
                    <span className="text-3xl font-black text-brand-green">{f.stat.value}</span>
                    <span className="text-xs font-bold text-white/60 uppercase tracking-widest">{f.stat.label}</span>
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/${locale}/services`}
                    className="group inline-flex items-center gap-2 text-sm font-bold text-white/80 hover:text-white transition-colors"
                  >
                    {isAr ? "اعرف أكثر" : "Learn more"}
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

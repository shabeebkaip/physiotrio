"use client";

import { useRef } from "react";
import { 
  Users, 
  Award, 
  ArrowRight, 
  ShieldCheck, 
  Activity, 
  Zap, 
  Heart, 
  Sparkles 
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

interface WhyPhysioTrioProps {
  locale: string;
  t: {
    title: string; body1: string; body2: string;
    feature1Title: string; feature1Desc: string;
    feature2Title: string; feature2Desc: string;
    feature3Title: string; feature3Desc: string;
    feature4Title: string; feature4Desc: string;
    bookAppointment: string;
  };
}

export function WhyPhysioTrio({ locale, t }: WhyPhysioTrioProps) {
  const isAr = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);

  const features = [
    { icon: Activity, title: t.feature1Title },
    { icon: Zap, title: t.feature2Title },
    { icon: Heart, title: t.feature3Title },
    { icon: Sparkles, title: t.feature4Title },
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });

    tl.from(".why-img", { opacity: 0, x: isAr ? 40 : -40, duration: 1, ease: "power3.out" })
      .from(".why-badge", { opacity: 0, y: 20, duration: 0.6 }, "-=0.6")
      .from(".why-title", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
      .from(".why-desc", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
      .from(".why-feat", { opacity: 0, y: 20, stagger: 0.1, duration: 0.6 }, "-=0.4")
      .from(".why-footer", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
      .from(".why-float", { scale: 0, opacity: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.2");

  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      dir={isAr ? "rtl" : "ltr"}
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* ── Left Column: Clinical Image ── */}
          <div className="relative order-2 lg:order-1">
            <div className="why-img relative aspect-[5/6] md:aspect-square w-full rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80"
                alt="Clinical Excellence"
                fill
                className="object-cover"
                unoptimized
              />
              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-black/5" />
            </div>

            {/* Floating Experience Card */}
            <div className={`why-float absolute bottom-8 ${isAr ? "-left-4 md:-left-12" : "-right-4 md:-right-12"} bg-white p-6 md:p-8 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex items-center gap-5 z-20`}>
              <div className="w-16 h-16 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                <Award size={32} />
              </div>
              <div>
                <div className="text-4xl font-black text-physio-dark leading-none mb-1">15+</div>
                <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                  {isAr ? "سنوات الخبرة" : "Years Of Experience"}
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Column: Content ── */}
          <div className="order-1 lg:order-2">
            {/* Pill Badge */}
            <div className="why-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 border border-brand-green/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              <span className="text-xs font-black text-brand-green uppercase tracking-[0.2em]">
                {isAr ? "لماذا نحن" : "Why PhysioTrio"}
              </span>
            </div>

            {/* Headline */}
            <h2 className="why-title text-4xl md:text-5xl lg:text-6xl font-black text-physio-dark leading-[1.1] tracking-tight mb-8">
               {isAr ? "نحن الأفضل في العلاج الطبيعي" : "We Are The Best For Physiotherapy"}
            </h2>

            {/* Description */}
            <p className="why-desc text-lg text-gray-500 font-medium leading-relaxed mb-12 max-w-xl">
               {t.body1}
            </p>

            {/* Feature Grid (2x2) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10 mb-16">
              {features.map((item, idx) => (
                <div key={idx} className="why-feat group flex items-center gap-5 transition-transform hover:translate-y-[-2px]">
                   <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-green/5 border border-brand-green/10 flex items-center justify-center text-brand-green transition-all group-hover:bg-brand-green group-hover:text-white group-hover:shadow-lg">
                      <item.icon size={22} />
                   </div>
                   <h3 className="font-bold text-physio-dark text-lg leading-tight transition-colors group-hover:text-brand-green">
                      {item.title}
                   </h3>
                </div>
              ))}
            </div>

            {/* Footer Profile & CTA */}
            <div className="why-footer flex flex-col md:flex-row items-center justify-between gap-10 border-t border-gray-100 pt-10">
              {/* Profile Card */}
              <div className={`flex items-center gap-4 ${isAr ? "flex-row-reverse" : ""}`}>
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-brand-green p-0.5">
                   <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image 
                        src="https://images.unsplash.com/photo-1559839734-2b71f1536783?w=400&q=80" 
                        alt="Specialist" 
                        fill 
                        className="object-cover"
                        unoptimized
                      />
                   </div>
                </div>
                <div className={isAr ? "text-right" : "text-left"}>
                   <p className="text-base font-black text-physio-dark leading-tight">{isAr ? "د. شيماء العتيبي" : "Dr. Shaima Al-Otaibi"}</p>
                   <p className="text-xs font-bold text-brand-green uppercase tracking-widest">{isAr ? "أخصائية أولى" : "Lead Physiotherapist"}</p>
                </div>
              </div>

              {/* Action Button */}
              <Link
                href={`/${locale}/book/riyadh`}
                className="group relative flex h-16 items-center justify-center gap-6 rounded-full bg-brand-green px-10 text-base font-black text-white shadow-xl shadow-brand-green/30 transition-all hover:scale-105 active:scale-95 sm:w-auto"
              >
                {t.bookAppointment}
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-all group-hover:bg-white group-hover:text-brand-green">
                  <ArrowRight size={18} className={`${isAr ? "rotate-180" : ""}`} />
                </div>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

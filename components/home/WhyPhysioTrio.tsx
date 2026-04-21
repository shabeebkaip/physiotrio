"use client";

import { useRef } from "react";
import { Zap, Heart, Gauge, Users, ArrowRight, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";
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
  const containerRef = useRef<HTMLDivElement>(null);

  const features = [
    { icon: Zap, title: t.feature1Title, desc: t.feature1Desc },
    { icon: Heart, title: t.feature2Title, desc: t.feature2Desc },
    { icon: Gauge, title: t.feature3Title, desc: t.feature3Desc },
    { icon: Users, title: t.feature4Title, desc: t.feature4Desc },
  ];

  useGSAP(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(".why-image-wrapper", 
      { opacity: 0, x: isAr ? 40 : -40 },
      {
        opacity: 1, x: 0, duration: 1.2, ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" },
      }
    );

    gsap.fromTo(".why-content-block > *", 
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" },
      }
    );

    gsap.fromTo(".why-stat-node", 
      { scale: 0, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 1, stagger: 0.2, ease: "elastic.out(1, 0.75)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none none" },
      }
    );

  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      dir={isAr ? "rtl" : "ltr"}
      className="relative py-24 md:py-36 bg-[#FBFBFD] overflow-hidden"
    >
      {/* Structural Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-green/[0.02] -skew-x-12 translate-x-1/4" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={containerRef} className="grid lg:grid-cols-12 gap-16 items-center">

          {/* ────── LEFT: Visual Storytelling ────── */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="why-image-wrapper relative">
              {/* Image Frame */}
              <div className="relative aspect-[4/5] md:aspect-square w-full max-w-lg mx-auto bg-[#E6EEEC] rounded-[48px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border-8 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80"
                  alt="Clinical Excellence at PhysioTrio"
                  fill
                  className="object-cover transition-transform duration-[3s] hover:scale-110"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating Stat Nodes (Branded) */}
              <div className="why-stat-node absolute -top-6 -left-6 md:-left-12 bg-white p-5 md:p-7 rounded-[32px] shadow-[0_20px_50px_rgba(15,45,31,0.12)] border border-[#eff3f1] z-20">
                <div className="flex flex-col items-center">
                   <div className="w-14 h-14 rounded-2xl bg-brand-green flex items-center justify-center mb-3 shadow-[0_10px_20px_-5px_rgba(76,175,80,0.4)]">
                      <Sparkles className="text-white" size={24} />
                   </div>
                   <div className="text-3xl font-black text-[#1d1d1f] tracking-tight">22+</div>
                   <div className="text-[10px] font-black text-brand-green uppercase tracking-widest">{isAr ? "سنوات" : "Years"}</div>
                </div>
              </div>

              <div className="why-stat-node absolute -bottom-6 -right-6 md:-right-12 bg-white p-5 md:p-7 rounded-[32px] shadow-[0_20px_50px_rgba(136,7,114,0.12)] border border-[#f5f1f5] z-20">
                <div className="flex flex-col items-center">
                   <div className="w-14 h-14 rounded-2xl bg-brand-purple flex items-center justify-center mb-3 shadow-[0_10px_20px_-5px_rgba(136,7,114,0.4)]">
                      <TrendingUp className="text-white" size={24} />
                   </div>
                   <div className="text-3xl font-black text-[#1d1d1f] tracking-tight">10K+</div>
                   <div className="text-[10px] font-black text-brand-purple uppercase tracking-widest">{isAr ? "مريض" : "Patients"}</div>
                </div>
              </div>
            </div>
          </div>

          {/* ────── RIGHT: Branded Content ────── */}
          <div className="lg:col-span-6 py-8 order-1 lg:order-2 why-content-block">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-brand-green/20 bg-brand-green/5 mb-8">
               <ShieldCheck size={16} className="text-brand-green" />
               <span className="text-[11px] font-black text-brand-green uppercase tracking-[0.2em]">{isAr ? "لماذا نحن" : "Why Choose PhysioTrio"}</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-[#1d1d1f] tracking-tighter leading-[1.05] mb-8">
              {isAr ? "تميزنا الطبي يضمن نتائجك" : "Experience Elite Therapeutic Care"}
            </h2>

            <p className="text-lg text-gray-500 font-medium leading-relaxed mb-12 max-w-xl">
              {t.body1}
            </p>

            {/* Feature Grid (Clean Branded Version) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12 mb-16">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="group relative flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-brand-green to-emerald-600 flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="text-white" size={22} />
                    </div>
                    <div>
                      <h3 className="font-black text-[#1d1d1f] text-base mb-1 tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-gray-500 font-medium leading-normal">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Branded CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-8 border-t border-gray-100 pt-12">
              <Link
                href={`/${locale}/book/riyadh`}
                className="group relative px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest text-white overflow-hidden shadow-2xl transition-all hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-[#0F2D1F]" />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-green to-brand-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center gap-3">
                  {t.bookAppointment}
                  <ArrowRight size={18} className={`transition-transform group-hover:translate-x-2 ${isAr ? "rotate-180" : ""}`} />
                </span>
              </Link>
              
              <div className={`flex items-center gap-3 ${isAr ? "flex-row-reverse" : ""}`}>
                <div className="w-12 h-12 rounded-full border-2 border-brand-green shadow-sm overflow-hidden relative">
                   <Image 
                     src="https://images.unsplash.com/photo-1559839734-2b71f1536783?w=1200&q=80" 
                     alt="Physiotherapy Expert" 
                     fill 
                     className="object-cover"
                     unoptimized
                   />
                </div>
                <div>
                   <p className="text-xs font-black text-[#1d1d1f] tracking-tight">{isAr ? "خبراء معتمدون" : "Certified Specialists"}</p>
                   <p className="text-[10px] font-bold text-brand-green uppercase tracking-widest">{isAr ? "رعاية فائقة" : "Elite Standards"}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

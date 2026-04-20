"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Users, Stethoscope } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface Branch {
  id: string;
  comingSoon: boolean;
  city: { en: string; ar: string };
  address: { en: string; ar: string };
  hours: { en: string; ar: string };
  therapistCount: number;
  serviceCount: number;
}

interface BranchesPreviewProps {
  locale: string;
  branches: Branch[];
  title: string;
  getDirectionsText: string;
  bookHereText: string;
  comingSoonText: string;
  therapistsText: string;
  servicesText: string;
}

const cityImages: Record<string, string> = {
  riyadh: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=800&q=80",
  makkah: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80",
  dammam: "https://images.unsplash.com/photo-1570516002611-6b0cf9d0f8c9?w=800&q=80",
};

export function BranchesPreview({ locale, branches, title, getDirectionsText, bookHereText, comingSoonText, therapistsText, servicesText }: BranchesPreviewProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Header anm
    gsap.fromTo(
      ".branch-header-anim",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );

    // Cards staggered entrance
    gsap.fromTo(
      ".branch-card",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: ".branch-grid-container",
          start: "top 85%",
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span
            className="branch-header-anim inline-block text-sm font-bold uppercase tracking-widest mb-4 px-4 py-1.5 rounded-full bg-brand-purple/10 text-brand-purple"
          >
            {locale === "ar" ? "فروعنا" : "Our Branches"}
          </span>
          <h2 className="branch-header-anim text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight text-[#0B162C]">
            {title}
          </h2>
        </div>

        {/* Grid */}
        <div className="branch-grid-container grid grid-cols-1 md:grid-cols-3 gap-8">
          {branches.map((branch, i) => (
            <div
              key={branch.id}
              className="branch-card opacity-0 bg-white overflow-hidden relative group transition-all duration-300 hover:shadow-[0_24px_48px_-12px_rgba(var(--color-brand-purple-rgb),0.15)] hover:-translate-y-2 border border-gray-100"
              style={{
                opacity: branch.comingSoon ? 0.85 : 1,
                borderRadius: i % 2 === 0 ? "60px 12px 60px 12px" : "12px 60px 12px 60px"
              }}
            >
              {/* City photo */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <Image
                  src={cityImages[branch.id] ?? cityImages.riyadh}
                  alt={locale === "ar" ? branch.city.ar : branch.city.en}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.12]"
                />
                
                {/* Coming Soon overlay */}
                {branch.comingSoon && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm">
                    <span className="px-6 py-2.5 rounded-full font-bold text-sm text-white bg-brand-purple shadow-lg">
                      {comingSoonText}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-black mb-4 text-[#0B162C]">
                  {locale === "ar" ? branch.city.ar : branch.city.en}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-purple/5 flex items-center justify-center flex-shrink-0">
                      <MapPin size={14} className="text-brand-purple" />
                    </div>
                    <p className="text-sm text-gray-500 mt-1.5 font-medium leading-snug">
                      {locale === "ar" ? branch.address.ar : branch.address.en}
                    </p>
                  </div>
                  
                  {!branch.comingSoon && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-purple/5 flex items-center justify-center flex-shrink-0">
                        <Clock size={14} className="text-brand-purple" />
                      </div>
                      <p className="text-sm text-gray-500 mt-1.5 font-medium">
                        {locale === "ar" ? branch.hours.ar : branch.hours.en}
                      </p>
                    </div>
                  )}
                </div>

                {!branch.comingSoon && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-[#f1f5f9] text-brand-purple">
                      <Users size={12} />
                      {branch.therapistCount} {therapistsText}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-[#f1f5f9] text-brand-green">
                      <Stethoscope size={12} />
                      {branch.serviceCount} {servicesText}
                    </span>
                  </div>
                )}

                {!branch.comingSoon && (
                  <div className="flex gap-3">
                    <a
                      href={`https://maps.google.com/?q=${branch.city.en}+PhysioTrio`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 rounded-full text-sm font-bold text-center transition-all border-2 border-brand-purple text-brand-purple hover:bg-brand-purple/5"
                    >
                      {getDirectionsText}
                    </a>
                    <Link
                      href={`/${locale}/book/${branch.id}`}
                      className="flex-1 py-3 rounded-full text-sm font-bold text-center text-white transition-all bg-brand-purple hover:shadow-[0_8px_16px_-4px_rgba(var(--color-brand-purple-rgb),0.4)] hover:-translate-y-0.5"
                    >
                      {bookHereText}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

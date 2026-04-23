"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  Dumbbell, Brain, Hand, Baby, Zap,
  Activity, Stethoscope, ArrowRight, Clock, LucideIcon
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface Service {
  id: string;
  slug: string;
  name: { en: string; ar: string };
  shortDesc: { en: string; ar: string };
  durationMinutes: number;
  icon: string;
  featured: boolean;
}

interface ServicesGridProps {
  locale: string;
  services: Service[];
  title: string;
  subtitle: string;
  bookNowText: string;
}

const iconMap: Record<string, LucideIcon> = {
  bone: Stethoscope,
  run: Dumbbell,
  brain: Brain,
  hands: Hand,
  child: Baby,
  spine: Activity,
  lotus: Activity,
  "arrow-up": Activity,
  zap: Zap,
};

export function ServicesGrid({ locale, services, title, subtitle }: ServicesGridProps) {
  const isAr = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".srv-card",
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.07,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      }
    );
    gsap.fromTo(
      ".srv-heading",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-20 md:py-28" style={{
      background: "#F8FAFC",
      backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36'%3E%3Cpath d='M18 8v20M8 18h20' stroke='rgba(11,22,44,0.045)' stroke-width='1'/%3E%3C/svg%3E\")",
      backgroundSize: "36px 36px",
    }}>
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="srv-heading flex items-center gap-2.5 mb-4">
              <span className="w-6 h-px" style={{ background: "var(--color-brand-green)" }} />
              <span
                className="text-[10px] font-black uppercase tracking-[0.22em]"
                style={{ color: "var(--color-brand-green)" }}
              >
                {isAr ? "تخصصاتنا" : "Our Specialties"}
              </span>
            </div>
            <h2
              className="srv-heading text-3xl md:text-4xl font-black leading-tight"
              style={{ color: "#0B162C" }}
            >
              {title}
            </h2>
          </div>
          <p className="srv-heading text-base text-gray-500 max-w-sm leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Grid — compact 4-col, no descriptions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {services.map((service) => {
            const Icon = iconMap[service.icon] ?? Stethoscope;
            const name = isAr ? service.name.ar : service.name.en;

            return (
              <div key={service.id} className="srv-card opacity-0">
                <Link
                  href={`/${locale}/services/${service.slug}`}
                  className="group flex items-center gap-4 bg-white rounded-xl px-5 py-4 border border-gray-100 transition-all duration-200 hover:border-[var(--color-brand-purple)] hover:shadow-sm"
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-[rgba(var(--color-brand-purple-rgb),0.08)]"
                    style={{ background: "#F1F5F9" }}
                  >
                    <Icon size={18} strokeWidth={1.75} style={{ color: "var(--color-brand-purple)" }} />
                  </div>

                  {/* Name + duration */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold leading-snug truncate" style={{ color: "#0B162C" }}>
                      {name}
                    </h3>
                    <span className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                      <Clock size={10} />
                      {service.durationMinutes} {isAr ? "دقيقة" : "min"}
                    </span>
                  </div>

                  {/* Arrow */}
                  <ArrowRight
                    size={14}
                    className="flex-shrink-0 transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
                    style={{ color: "var(--color-brand-purple)" }}
                  />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-md text-sm font-bold border-2 transition-all text-[#0B162C] hover:bg-[#0B162C] hover:border-[#0B162C] hover:text-white"
            style={{ borderColor: "#0B162C" }}
          >
            {isAr ? "جميع الخدمات" : "View All Services"}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

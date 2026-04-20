"use client";

import { useRef } from "react";
import { Stethoscope, ShieldAlert, MessageSquare } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

interface FeatureItem {
  icon: React.ElementType;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}

const features: FeatureItem[] = [
  {
    icon: Stethoscope,
    titleEn: "Expert Therapists",
    titleAr: "معالجون متخصصون",
    descEn: "Our team of licensed and certified physiotherapists bring years of hands-on clinical expertise.",
    descAr: "فريقنا من المعالجين المرخصين والمعتمدين يمتلك سنوات من الخبرة السريرية العملية.",
  },
  {
    icon: ShieldAlert,
    titleEn: "Emergency Service",
    titleAr: "خدمة طوارئ",
    descEn: "Our emergency physiotherapy services provide prompt, effective care to manage pain and start recovery fast.",
    descAr: "خدمات العلاج الطبيعي الطارئة لدينا توفر رعاية سريعة وفعّالة لإدارة الألم وبدء التعافي.",
  },
  {
    icon: MessageSquare,
    titleEn: "Free Consultation",
    titleAr: "استشارة مجانية",
    descEn: "Our mission is to enhance your quality of life. Book a free first consultation with no obligations.",
    descAr: "مهمتنا تعزيز جودة حياتك. احجز استشارتك الأولى مجانًا بدون أي التزامات.",
  },
];

export function FeaturesStrip({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".feat-col", {
      opacity: 0,
      y: 30,
      duration: 0.7,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      dir={isAr ? "rtl" : "ltr"}
      style={{ background: "#0f2d1f" }}
      className="relative overflow-hidden"
    >
      {/* Subtle dot pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-[1300px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            const isLast = i === features.length - 1;
            return (
              <div
                key={i}
                className="feat-col group flex flex-col sm:flex-row items-start gap-5 px-8 py-10 cursor-default"
                style={{
                  borderRight: !isLast && !isAr ? "1px solid rgba(255,255,255,0.08)" : undefined,
                  borderLeft: !isLast && isAr ? "1px solid rgba(255,255,255,0.08)" : undefined,
                }}
              >
                {/* Icon square */}
                <div
                  className="shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg"
                  style={{
                    background: "rgba(76,175,80,0.15)",
                    border: "1.5px solid rgba(76,175,80,0.3)",
                  }}
                >
                  <Icon size={26} strokeWidth={2} style={{ color: "#81c784" }} />
                </div>

                <div>
                  <h3
                    className="text-lg font-black mb-2 leading-snug"
                    style={{ color: "#fff" }}
                  >
                    {isAr ? f.titleAr : f.titleEn}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {isAr ? f.descAr : f.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

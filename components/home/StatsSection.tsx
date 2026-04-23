"use client";

import { useRef } from "react";
import { Counter } from "@/components/common/Counter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const stats = [
  {
    value: 10000,
    suffix: "+",
    label: { en: "Patients Treated", ar: "مريض تلقى العلاج" },
    note: { en: "Since 2013", ar: "منذ ٢٠١٣" },
  },
  {
    value: 50,
    suffix: "+",
    label: { en: "Licensed Therapists", ar: "معالج مرخص" },
    note: { en: "MOH certified", ar: "معتمد من وزارة الصحة" },
  },
  {
    value: 22,
    suffix: "+",
    label: { en: "Years Combined Experience", ar: "سنة خبرة مجمّعة" },
    note: { en: "Senior clinical team", ar: "فريق سريري متقدم" },
  },
  {
    value: 9,
    suffix: "",
    label: { en: "Specialties", ar: "تخصصات علاجية" },
    note: { en: "Under one roof", ar: "تحت سقف واحد" },
  },
];

export function StatsSection({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".stat-item",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="border-y border-gray-100"
      style={{
        background: "white",
        backgroundImage: "radial-gradient(circle, rgba(11,22,44,0.055) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12 py-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
          {stats.map((s, i) => (
            <div
              key={i}
              className="stat-item opacity-0 flex flex-col justify-center py-10 px-8"
            >
              <p
                className="font-black leading-none mb-2"
                style={{ fontSize: "clamp(36px, 3.5vw, 52px)", color: "#0B162C" }}
              >
                <Counter end={s.value} />
                <span style={{ color: "var(--color-brand-purple)" }}>{s.suffix}</span>
              </p>
              <p className="text-sm font-bold text-gray-700 mb-1">
                {isAr ? s.label.ar : s.label.en}
              </p>
              <p className="text-xs text-gray-400 font-medium">
                {isAr ? s.note.ar : s.note.en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

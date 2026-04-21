"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { 
  ArrowRight, 
  Stethoscope, 
  Activity, 
  Zap, 
  HeartPulse, 
  ShieldCheck, 
  MoveUpRight 
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type BodyPart = {
  en: string;
  ar: string;
  id: string;
  descEn: string;
  descAr: string;
  icon: any;
};

const bodyParts: BodyPart[] = [
  {
    en: "Neck Pain",
    ar: "ألم الرقبة",
    id: "neck",
    descEn: "Relief for stiffness, cervical strain, and chronic tension.",
    descAr: "علاج لتيبس الرقبة، الإجهاد العنقي، والتوتر المزمن.",
    icon: Stethoscope,
  },
  {
    en: "Shoulder Pain",
    ar: "ألم الكتف",
    id: "shoulder",
    descEn: "Support for frozen shoulder and rotator cuff issues.",
    descAr: "دعم لعلاج تجمد الكتف ومشاكل الكفة المدورة.",
    icon: Activity,
  },
  {
    en: "Back Pain",
    ar: "ألم الظهر",
    id: "back",
    descEn: "Solutions for disc issues, sciatica, and lower back relief.",
    descAr: "حلول لمشاكل الانزلاق الغضروفي وآلام أسفل الظهر.",
    icon: Zap,
  },
  {
    en: "Elbow Pain",
    ar: "ألم الكوع",
    id: "elbow",
    descEn: "Treatments for tennis elbow and repetitive strain.",
    descAr: "علاجات لمرفق التنس وإصابات الإجهاد المتكرر.",
    icon: HeartPulse,
  },
  {
    en: "Hip Pain",
    ar: "ألم الورك",
    id: "hip",
    descEn: "Improve movement and reduce joint inflammation.",
    descAr: "تحسين الحركة وتقليل التهابات المفاصل.",
    icon: ShieldCheck,
  },
  {
    en: "Knee Pain",
    ar: "ألم الركبة",
    id: "knee",
    descEn: "Care for injuries, swelling, and ligament instability.",
    descAr: "رعاية للإصابات والتورم وعدم ثبات الأربطة.",
    icon: Stethoscope,
  },
];

export function BodyPartsSection({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Header Animation
      gsap.fromTo(
        ".bp-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Grid Items Animation
      gsap.fromTo(
        ".bp-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      dir={isAr ? "rtl" : "ltr"}
      className="bg-[#07150f] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header Section */}
        <div className="mb-20 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <div className="bp-header mb-5 inline-flex items-center rounded-full bg-brand-green/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-green">
              {isAr ? "مجالات التركيز" : "Areas of Focus"}
            </div>
            <h2 className="bp-header text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              {isAr ? (
                <>
                  اختر المنطقة <br /> <span className="text-brand-green">التي تؤلمك</span>
                </>
              ) : (
                <>
                  Choose the area <br /> <span className="text-brand-green">that needs care</span>
                </>
              )}
            </h2>
          </div>
          <p className="bp-header max-w-lg text-lg leading-relaxed text-white/50">
            {isAr
              ? "نقدم رعاية متخصصة لكل منطقة من مناطق الجسم لضمان تعافي آمن وسريع بمساعدة فريقنا المحترف."
              : "We provide specialized care for every part of your body, ensuring a safe and rapid recovery journey with our expert team."}
          </p>
        </div>

        {/* Minimalist Grid */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {bodyParts.map((part) => (
            <Link
              key={part.id}
              href={`/${locale}/services`}
              className="bp-item group relative flex flex-col items-start gap-6 transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-white transition-colors duration-300 group-hover:bg-brand-green group-hover:text-[#07150f]">
                <part.icon size={28} strokeWidth={1.5} />
              </div>
              
              <div className="flex-1">
                <h3 className="mb-3 text-2xl font-bold text-white transition-colors duration-300 group-hover:text-brand-green">
                  {isAr ? part.ar : part.en}
                </h3>
                <p className="text-lg leading-relaxed text-white/40">
                  {isAr ? part.descAr : part.descEn}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white/20 transition-all duration-300 group-hover:gap-4 group-hover:text-brand-green">
                <span>{isAr ? "معرفة المزيد" : "Learn More"}</span>
                <MoveUpRight size={16} />
              </div>

              {/* Subtle visual separator for non-hover state */}
              <div className="absolute -left-6 top-0 hidden h-full w-px bg-white/5 lg:block first:hidden" />
            </Link>
          ))}
        </div>

        {/* Simplistic Footer CTA */}
        <div className="mt-24 flex items-center justify-center border-t border-white/5 pt-16">
          <Link
            href={`/${locale}/book/riyadh`}
            className="group flex items-center gap-4 text-xl font-bold text-white transition-all hover:text-brand-green"
          >
            <span>{isAr ? "احجز موعدك الآن" : "Book your session now"}</span>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition-all group-hover:border-brand-green group-hover:bg-brand-green group-hover:text-[#07150f]">
              <ArrowRight size={20} className={isAr ? "rotate-180" : ""} />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
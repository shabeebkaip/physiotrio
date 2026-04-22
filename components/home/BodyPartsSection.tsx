"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type BodyPart = {
  en: string;
  ar: string;
  id: string;
  // Replace these image paths with your actual icon image paths
  iconSrc: string;
};

const bodyParts: BodyPart[] = [
  {
    en: "Neck Pain",
    ar: "ألم الرقبة",
    id: "neck",
    iconSrc: "/images/home/neck.svg", // update path
  },
  {
    en: "Shoulder Pain",
    ar: "ألم الكتف",
    id: "shoulder",
    iconSrc: "/images/home/sholder.svg", // update path
  },
  {
    en: "Hip Pain",
    ar: "ألم الورك",
    id: "hip",
    iconSrc: "/images/home/hip.svg", // update path
  },
  {
    en: "Knee Pain",
    ar: "ألم الركبة",
    id: "knee",
    iconSrc: "/images/home/knee.svg", // update path
  },
  {
    en: "Elbow Pain",
    ar: "ألم الكوع",
    id: "elbow",
    iconSrc: "/images/home/elbow.svg", // update path
  },
  {
    en: "Tricep Pain",
    ar: "ألم العضلة ثلاثية",
    id: "tricep",
    iconSrc: "/images/home/tricep.svg", // update path
  },
  {
    en: "Hand Pain",
    ar: "ألم اليد",
    id: "hand",
    iconSrc: "/images/home/hand.svg", // update path
  },
  {
    en: "Foot Pain",
    ar: "ألم القدم",
    id: "foot",
    iconSrc: "/images/home/foot.svg", // update path
  },
  {
    en: "Ankle Pain",
    ar: "ألم الكاحل",
    id: "ankle",
    iconSrc: "/images/home/ankle.svg", // update path
  },
];

export function BodyPartsSection({ locale }: { locale: string }) {
  const isAr = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".bp-header",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".bp-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.07,
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
      className="relative overflow-hidden py-24 lg:py-32"
    >
      {/* Background image with dark overlay */}
      <div className="absolute inset-0 z-0">
        {/* Replace src with your actual background image path */}
        <Image
          src="/images/hero-physio.png"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark green overlay */}
        <div className="absolute inset-0 bg-[#0F2D1F]/90" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-10">
        {/* Header */}
        <div className="mb-14 text-center">

          <h2 className="bp-header text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            {isAr ? "أين تحتاج إلى الاهتمام؟" : "Where Do You Need Attention?"}
          </h2>

          <p className="bp-header mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/60">
            {isAr
              ? "نحن ندرك أن الإصابات والآلام الحادة يمكن أن تحدث بشكل غير متوقع. خدمات العلاج الطبيعي الطارئة لدينا مصممة لتوفير رعاية سريعة وفعّالة."
              : "We understand that injuries and acute pain can happen unexpectedly. Our emergency physiotherapy services are designed to provide prompt and effective care to help you manage."}
          </p>
        </div>

        {/* Grid — 3 columns, items separated by divider lines */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {bodyParts.map((part, index) => {
            const col = index % 3;
            const row = Math.floor(index / 3);

            return (
              <Link
                key={part.id}
                href={`/${locale}/services`}
                className="bp-item group flex items-center gap-4 px-8 py-6 border-b border-white/15"
              >
                {/* Icon */}
                <div className="relative h-10 w-10 flex-shrink-0 opacity-80 transition-opacity duration-200 group-hover:opacity-100">
                  <Image
                    src={part.iconSrc}
                    alt={isAr ? part.ar : part.en}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Label */}
                <span className="text-lg font-semibold text-white transition-colors duration-200 ">
                  {isAr ? part.ar : part.en}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
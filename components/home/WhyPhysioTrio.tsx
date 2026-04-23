"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, CalendarCheck, Languages, HeartHandshake } from "lucide-react";

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

const ICONS = [ShieldCheck, CalendarCheck, Languages, HeartHandshake];

const PHOTOS = [
  { src: "/center-images/DSC07444.jpg", alt: "PhysioTrio treatment room" },
  { src: "/center-images/DSC07286.jpg", alt: "PhysioTrio women's rehabilitation" },
  { src: "/center-images/DSC07771.jpg", alt: "PhysioTrio sports assessment" },
  { src: "/center-images/DSC07439.jpg", alt: "PhysioTrio electrotherapy" },
];

export function WhyPhysioTrio({ locale, t }: WhyPhysioTrioProps) {
  const isAr = locale === "ar";

  const features = [
    { Icon: ICONS[0], title: t.feature1Title, desc: t.feature1Desc },
    { Icon: ICONS[1], title: t.feature2Title, desc: t.feature2Desc },
    { Icon: ICONS[2], title: t.feature3Title, desc: t.feature3Desc },
    { Icon: ICONS[3], title: t.feature4Title, desc: t.feature4Desc },
  ];

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="py-20 lg:py-28 bg-white border-t border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — text */}
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-purple mb-4 block">
              {isAr ? "لماذا فيزيوتريو" : "Why PhysioTrio"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-5">
              {t.title}
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              {t.body1}
            </p>

            <div className="divide-y divide-gray-100 mb-10">
              {features.map(({ Icon, title, desc }, i) => (
                <div key={i} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                  <div className="w-9 h-9 rounded-lg bg-brand-purple/8 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={17} className="text-brand-purple" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-0.5">{title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href={`/${locale}/book/riyadh`}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-purple px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              {isAr ? "احجز موعداً" : "Book Appointment"}
              <ArrowRight size={14} className={isAr ? "rotate-180" : ""} />
            </Link>
          </div>

          {/* Right — 2×2 photo grid */}
          <div className="grid grid-cols-2 gap-3">
            {PHOTOS.map((photo, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-2xl bg-gray-100 ${i === 0 ? "row-span-1" : ""}`}
                style={{ aspectRatio: "4/3" }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Languages } from "lucide-react";

interface Therapist {
  id: string;
  name: { en: string; ar: string };
  title: { en: string; ar: string };
  specializations: string[];
  branches: string[];
  languages: string[];
  yearsExp: number;
  rating: number;
  initials: string;
  image?: string | null;
}

interface TeamCarouselProps {
  locale: string;
  therapists: Therapist[];
  title: string;
  subtitle: string;
  bookWithText: string;
}

const AVATAR_COLORS = [
  { bg: "bg-brand-purple/10", text: "text-brand-purple" },
  { bg: "bg-brand-green/10", text: "text-brand-green" },
  { bg: "bg-blue-50", text: "text-blue-600" },
  { bg: "bg-amber-50", text: "text-amber-600" },
];

export function TeamCarousel({ locale, therapists, title, subtitle }: TeamCarouselProps) {
  const isAr = locale === "ar";
  const display = therapists.slice(0, 8);

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="py-20 lg:py-28 bg-[#F8F9FA]"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-purple mb-3 block">
            {isAr ? "فريقنا" : "Our Team"}
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {title}
            </h2>
            <Link
              href={`/${locale}/about`}
              className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-brand-purple hover:opacity-75 transition-opacity"
            >
              {isAr ? "عرض الفريق" : "Meet the Team"}
              <ArrowRight size={14} className={isAr ? "rotate-180" : ""} />
            </Link>
          </div>
          <p className="mt-3 text-gray-500 text-base max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {display.map((th, i) => {
            const name = isAr ? th.name.ar : th.name.en;
            const role = isAr ? th.title.ar : th.title.en;
            const branch = th.branches[0] || "riyadh";
            const color = AVATAR_COLORS[i % AVATAR_COLORS.length];
            const specs = th.specializations.slice(0, 2);

            return (
              <div
                key={th.id}
                className="bg-white rounded-2xl border border-gray-200 hover:border-brand-purple/20 hover:shadow-md transition-all duration-200 flex flex-col"
              >
                {/* Card top */}
                <div className="p-5 flex items-start gap-4 border-b border-gray-100">
                  {/* Initials avatar */}
                  <div className={`w-12 h-12 rounded-xl ${color.bg} flex items-center justify-center shrink-0`}>
                    <span className={`text-base font-bold ${color.text}`}>
                      {th.initials}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 leading-tight mb-0.5 truncate">
                      {name}
                    </h3>
                    <p className="text-xs text-gray-500 leading-snug line-clamp-2">
                      {role}
                    </p>
                  </div>
                </div>

                {/* Specializations */}
                <div className="px-5 pt-4 pb-3 flex flex-wrap gap-1.5 flex-1">
                  {specs.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-5 pb-4 flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-1 text-[11px] text-gray-400">
                      <MapPin size={10} className="shrink-0" />
                      {branch.charAt(0).toUpperCase() + branch.slice(1)}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-gray-400">
                      <Languages size={10} className="shrink-0" />
                      {th.languages.join(" · ")}
                    </span>
                  </div>
                  <Link
                    href={`/${locale}/book/${branch}`}
                    className="text-[11px] font-semibold text-brand-purple hover:opacity-75 transition-opacity flex items-center gap-1 shrink-0"
                  >
                    {isAr ? "احجز" : "Book"}
                    <ArrowRight size={11} className={isAr ? "rotate-180" : ""} />
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

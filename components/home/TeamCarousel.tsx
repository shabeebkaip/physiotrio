"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Therapist {
  id: string;
  name: { en: string; ar: string };
  title: { en: string; ar: string };
  specializations: string[];
  branches: string[];
  languages: string[];
  yearsExp: number;
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
  "#880772",
  "#0B162C",
  "#0a8fa0",
  "#1e4d6e",
  "#4a7c59",
  "#7c3aed",
];

// Map slug to readable label
function formatSpecialization(slug: string, isAr: boolean): string {
  const map: Record<string, { en: string; ar: string }> = {
    "physiotherapy": { en: "Physiotherapy", ar: "العلاج الطبيعي" },
    "sports-physiotherapy": { en: "Sports", ar: "رياضي" },
    "manual-therapy": { en: "Manual Therapy", ar: "علاج يدوي" },
    "neurological-rehabilitation": { en: "Neuro Rehab", ar: "تأهيل عصبي" },
    "pediatric-physiotherapy": { en: "Pediatric", ar: "أطفال" },
    "geriatric-physiotherapy": { en: "Geriatric", ar: "كبار السن" },
    "womens-health": { en: "Women's Health", ar: "صحة المرأة" },
    "hydrotherapy": { en: "Hydrotherapy", ar: "مائي" },
    "device-based-therapy": { en: "Device Therapy", ar: "علاج بالأجهزة" },
  };
  return isAr ? (map[slug]?.ar ?? slug) : (map[slug]?.en ?? slug);
}

export function TeamCarousel({ locale, therapists, title, subtitle }: TeamCarouselProps) {
  const isAr = locale === "ar";
  const visible = therapists.slice(0, 6);

  return (
    <section className="py-20 md:py-28 border-t border-gray-100" style={{
      background: "white",
      backgroundImage: "linear-gradient(rgba(11,22,44,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(11,22,44,0.03) 1px, transparent 1px)",
      backgroundSize: "48px 48px",
    }}>
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-6 h-px" style={{ background: "var(--color-brand-green)" }} />
              <span className="text-[10px] font-black uppercase tracking-[0.22em]" style={{ color: "var(--color-brand-green)" }}>
                {isAr ? "فريقنا الطبي" : "Our Medical Team"}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black leading-tight" style={{ color: "#0B162C" }}>
              {title}
            </h2>
            <p className="text-gray-500 text-base mt-2 max-w-lg">{subtitle}</p>
          </div>

          <Link
            href={`/${locale}/team`}
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-bold shrink-0 transition-colors hover:opacity-70"
            style={{ color: "#0B162C" }}
          >
            {isAr ? "عرض الفريق كاملاً" : "View Full Team"}
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Static grid — 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((therapist, idx) => {
            const name = isAr ? therapist.name.ar : therapist.name.en;
            const role = isAr ? therapist.title.ar : therapist.title.en;
            const branch = therapist.branches[0] ?? "riyadh";
            const avatarColor = AVATAR_COLORS[idx % AVATAR_COLORS.length];
            const specs = therapist.specializations.slice(0, 2);

            return (
              <div
                key={therapist.id}
                className="flex gap-4 items-start bg-white border border-gray-100 rounded-xl p-5 hover:shadow-sm hover:border-gray-200 transition-all duration-200"
              >
                {/* Avatar */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-lg font-black text-white flex-shrink-0"
                  style={{ background: avatarColor }}
                >
                  {therapist.initials}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm leading-snug mb-0.5 truncate" style={{ color: "#0B162C" }}>
                    {name}
                  </p>
                  <p className="text-xs font-medium mb-2" style={{ color: "var(--color-brand-green)" }}>
                    {role}
                  </p>

                  {/* Specs */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {specs.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-medium px-2 py-0.5 rounded"
                        style={{ background: "#F1F5F9", color: "#6B7280" }}
                      >
                        {formatSpecialization(s, isAr)}
                      </span>
                    ))}
                  </div>

                  {/* Footer row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded capitalize"
                        style={{ background: "rgba(var(--color-brand-purple-rgb),0.07)", color: "var(--color-brand-purple)" }}
                      >
                        {branch}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {therapist.yearsExp}y exp
                      </span>
                    </div>
                    <Link
                      href={`/${locale}/book/${branch}?therapist=${therapist.id}`}
                      className="flex items-center gap-1 text-[10px] font-bold transition-colors hover:opacity-70"
                      style={{ color: "#0B162C" }}
                    >
                      {isAr ? "احجز" : "Book"}
                      <ArrowRight size={10} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile + bottom CTA */}
        <div className="mt-8 flex justify-center">
          <Link
            href={`/${locale}/team`}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-md text-sm font-bold border-2 transition-all text-[#0B162C] hover:bg-[#0B162C] hover:border-[#0B162C] hover:text-white"
            style={{ borderColor: "#0B162C" }}
          >
            {isAr ? "عرض الفريق كاملاً" : "View Full Team"}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

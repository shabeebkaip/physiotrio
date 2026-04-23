"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { Program } from "@/lib/data/programs";

interface ProgramsTeaserProps {
  locale: string;
  programs: Program[];
}

export function ProgramsTeaser({ locale, programs }: ProgramsTeaserProps) {
  const isAr = locale === "ar";
  const preview = programs.slice(0, 3);

  return (
    <section className="py-20 md:py-28 border-t border-gray-100" style={{
      background: "#F8FAFC",
      backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36'%3E%3Cpath d='M18 8v20M8 18h20' stroke='rgba(11,22,44,0.045)' stroke-width='1'/%3E%3C/svg%3E\")",
      backgroundSize: "36px 36px",
    }}>
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-6 h-px" style={{ background: "var(--color-brand-purple)" }} />
              <span
                className="text-[10px] font-black uppercase tracking-[0.22em]"
                style={{ color: "var(--color-brand-purple)" }}
              >
                {isAr ? "البرامج العلاجية" : "Programs & Packages"}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black leading-tight" style={{ color: "#0B162C" }}>
              {isAr ? "برامج علاجية مصممة لك" : "Treatment Programs Designed For You"}
            </h2>
            <p className="text-gray-500 text-base mt-2 max-w-lg">
              {isAr
                ? "كل برنامج مصمم بعناية لحالتك، من التقييم الشامل حتى العودة الكاملة."
                : "Each program is carefully tailored for your condition, from full assessment to complete recovery."}
            </p>
          </div>
          <Link
            href={`/${locale}/packages`}
            className="inline-flex items-center gap-2 text-sm font-bold shrink-0 transition-colors hover:opacity-70"
            style={{ color: "#0B162C" }}
          >
            {isAr ? `جميع البرامج (${programs.length})` : `All Programs (${programs.length})`}
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {preview.map((program) => (
            <Link
              key={program.id}
              href={`/${locale}/packages/${program.slug}`}
              className="group flex flex-col bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all duration-200"
            >
              {/* Top bar */}
              <div
                className="h-1"
                style={{ background: "linear-gradient(to right, var(--color-brand-purple), var(--color-brand-green))" }}
              />

              <div className="p-6 flex flex-col flex-1">
                {/* Icon + category */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl leading-none">{program.icon}</span>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                    style={{
                      background: "rgba(var(--color-brand-purple-rgb),0.07)",
                      color: "var(--color-brand-purple)",
                    }}
                  >
                    {isAr ? program.category : program.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-base leading-snug mb-2" style={{ color: "#0B162C" }}>
                  {isAr ? program.title.ar : program.title.en}
                </h3>
                <p className="text-xs font-medium mb-4" style={{ color: "var(--color-brand-green)" }}>
                  {isAr ? program.tagline.ar : program.tagline.en}
                </p>

                {/* Includes — 3 items */}
                <ul className="space-y-1.5 mb-5 flex-1">
                  {program.includes.slice(0, 3).map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-gray-600">
                      <CheckCircle2 size={12} className="mt-0.5 shrink-0" style={{ color: "var(--color-brand-green)" }} />
                      {isAr ? item.ar : item.en}
                    </li>
                  ))}
                </ul>

                {/* CTA row */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-400">
                    {program.includes.length > 3 ? `+${program.includes.length - 3} ${isAr ? "المزيد" : "more"}` : ""}
                  </span>
                  <span
                    className="flex items-center gap-1 text-xs font-bold transition-all group-hover:gap-2"
                    style={{ color: "var(--color-brand-purple)" }}
                  >
                    {isAr ? "التفاصيل" : "View Program"}
                    <ArrowRight size={11} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 flex justify-center">
          <Link
            href={`/${locale}/packages`}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-md text-sm font-bold border-2 transition-all text-[#0B162C] hover:bg-[#0B162C] hover:border-[#0B162C] hover:text-white"
            style={{ borderColor: "#0B162C" }}
          >
            {isAr ? "استعرض جميع البرامج" : `Explore All ${programs.length} Programs`}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

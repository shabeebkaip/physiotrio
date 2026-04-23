"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface AboutSnippetProps {
  locale: string;
}

export function AboutSnippet({ locale }: AboutSnippetProps) {
  const isAr = locale === "ar";

  return (
    <section className="border-b border-gray-100" style={{
      background: "#F8FAFC",
      backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36'%3E%3Cpath d='M18 8v20M8 18h20' stroke='rgba(11,22,44,0.04)' stroke-width='1'/%3E%3C/svg%3E\")",
      backgroundSize: "36px 36px",
    }}>
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">

          {/* Est. badge */}
          <div
            className="w-16 h-16 rounded-xl flex flex-col items-center justify-center shrink-0"
            style={{ background: "#0B162C" }}
          >
            <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.55)" }}>
              {isAr ? "منذ" : "Est."}
            </span>
            <span className="text-xl font-black text-white leading-none">2013</span>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-10 bg-gray-200 shrink-0" />

          {/* Text */}
          <p className="text-base text-gray-600 leading-relaxed flex-1">
            {isAr
              ? "تأسست فيزيوتريو عام 2013 لتكون وجهة رائدة للعلاج الطبيعي وإعادة التأهيل في المملكة، جزء من مجموعة برجيل القابضة، تخدم المرضى في الرياض ومكة المكرمة."
              : "PhysioTrio was established in 2013 as a leading physiotherapy and rehabilitation destination in Saudi Arabia. A Burjeel Holdings company, serving patients across Riyadh and Makkah."}
          </p>

          {/* CTA */}
          <Link
            href={`/${locale}/about`}
            className="inline-flex items-center gap-1.5 text-sm font-bold shrink-0 transition-colors hover:opacity-70"
            style={{ color: "#0B162C" }}
          >
            {isAr ? "قصتنا" : "Our Story"}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

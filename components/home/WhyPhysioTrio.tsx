"use client";

import Link from "next/link";
import { ShieldCheck, Activity, Clock, Users, ArrowRight, LucideIcon } from "lucide-react";

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

export function WhyPhysioTrio({ locale, t }: WhyPhysioTrioProps) {
  const isAr = locale === "ar";

  const features: { title: string; desc: string; icon: LucideIcon; stat: string; statLabel: string }[] = [
    {
      title: t.feature1Title,
      desc: t.feature1Desc,
      icon: ShieldCheck,
      stat: "100%",
      statLabel: isAr ? "معتمد وزارة الصحة" : "MOH Accredited",
    },
    {
      title: t.feature2Title,
      desc: t.feature2Desc,
      icon: Activity,
      stat: "22+",
      statLabel: isAr ? "سنة خبرة" : "Years Experience",
    },
    {
      title: t.feature3Title,
      desc: t.feature3Desc,
      icon: Clock,
      stat: "3 min",
      statLabel: isAr ? "للحجز أونلاين" : "To Book Online",
    },
    {
      title: t.feature4Title,
      desc: t.feature4Desc,
      icon: Users,
      stat: "10K+",
      statLabel: isAr ? "مريض تعافى" : "Patients Healed",
    },
  ];

  return (
    <section className="py-20 md:py-28 border-t border-gray-100" style={{
      background: "white",
      backgroundImage: "linear-gradient(rgba(11,22,44,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(11,22,44,0.03) 1px, transparent 1px)",
      backgroundSize: "48px 48px",
    }}>
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12">

        {/* Full-width header */}
        <div className="mb-12">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-6 h-px" style={{ background: "var(--color-brand-green)" }} />
            <span
              className="text-[10px] font-black uppercase tracking-[0.22em]"
              style={{ color: "var(--color-brand-green)" }}
            >
              {isAr ? "لماذا فيزيوتريو" : "Why Choose Us"}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black leading-tight" style={{ color: "#0B162C" }}>
            {t.title}
          </h2>
        </div>

        {/* Two columns: stat grid left, text right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left: 2×2 stat blocks */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col p-6 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200"
                  style={{ background: "#F8FAFC" }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: "rgba(var(--color-brand-green-rgb),0.1)" }}
                  >
                    <Icon size={16} strokeWidth={2} style={{ color: "var(--color-brand-green)" }} />
                  </div>
                  <p className="text-2xl font-black leading-none mb-0.5" style={{ color: "#0B162C" }}>
                    {f.stat}
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-wider mb-3" style={{ color: "var(--color-brand-green)" }}>
                    {f.statLabel}
                  </p>
                  <div className="w-6 h-px bg-gray-200 mb-3" />
                  <p className="text-xs font-bold leading-snug mb-1" style={{ color: "#0B162C" }}>
                    {f.title}
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Right: body + accreditations + CTA */}
          <div className="flex flex-col gap-6">
            <p className="text-base text-gray-600 leading-relaxed">{t.body1}</p>
            <p className="text-base text-gray-600 leading-relaxed">{t.body2}</p>

            {/* Accreditation list */}
            <div className="space-y-3 pt-2">
              {[
                { en: "Ministry of Health (MOH) — Fully Licensed", ar: "وزارة الصحة — مرخص بالكامل" },
                { en: "Burjeel Arabia — Trusted Healthcare Group", ar: "برجيل القابضة — مجموعة رعاية صحية موثوقة" },
                { en: "ISO Certified Clinical Standards", ar: "معايير سريرية معتمدة بشهادة ISO" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "var(--color-brand-green)" }}
                  />
                  <span className="text-sm text-gray-600">{isAr ? item.ar : item.en}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center gap-2 text-sm font-bold self-start pt-2 transition-colors hover:opacity-70"
              style={{ color: "#0B162C" }}
            >
              {isAr ? "تعرف علينا أكثر" : "Learn more about us"}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

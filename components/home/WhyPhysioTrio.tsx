import Link from "next/link";
import Image from "next/image";
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
    bookAppointment: string;
  };
}

const ICONS = [ShieldCheck, CalendarCheck, Languages, HeartHandshake];

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
      className="py-20 lg:py-28"
      style={{ backgroundColor: "#07141e" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — clinical photo */}
          <div className="relative h-80 lg:h-[520px] rounded-2xl overflow-hidden shrink-0">
            <Image
              src="/center-images/DSC07444.jpg"
              alt={isAr ? "جلسة علاج طبيعي" : "Physiotherapy session"}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Subtle dark gradient overlay at bottom */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  "linear-gradient(to top, rgba(7,20,30,0.5) 0%, transparent 50%)",
              }}
            />
          </div>

          {/* Right — content */}
          <div>
            <span
              className="text-[10px] font-bold uppercase tracking-[0.25em] mb-4 block"
              style={{ color: "var(--color-brand-green)" }}
            >
              {isAr ? "لماذا فيزيوتريو" : "Why PhysioTrio"}
            </span>

            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
              {t.title}
            </h2>

            <p className="text-white/70 text-base leading-relaxed mb-3">
              {t.body1}
            </p>
            <p className="text-white/50 text-sm leading-relaxed mb-10">
              {t.body2}
            </p>

            {/* Feature rows */}
            <div className="space-y-5 mb-10">
              {features.map(({ Icon, title, desc }, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: `rgba(var(--color-brand-green-rgb), 0.18)` }}
                  >
                    <Icon
                      size={16}
                      strokeWidth={1.75}
                      style={{ color: "var(--color-brand-green)" }}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-0.5">
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/60">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href={`/${locale}/book/riyadh`}
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "#ffffff",
                color: "var(--color-brand-purple)",
              }}
            >
              {t.bookAppointment}
              <ArrowRight size={15} className={isAr ? "rotate-180" : ""} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

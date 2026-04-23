"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

interface Service {
  id: string;
  slug: string;
  name: { en: string; ar: string };
  shortDesc: { en: string; ar: string };
  durationMinutes: number;
  icon: string;
  featured: boolean;
  image?: string;
}

interface ServicesGridProps {
  locale: string;
  services: Service[];
  title: string;
  subtitle: string;
  bookNowText: string;
}

export function ServicesGrid({ locale, services, title, subtitle }: ServicesGridProps) {
  const isAr = locale === "ar";

  return (
    <motion.section
      dir={isAr ? "rtl" : "ltr"}
      className="py-20 lg:py-28 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* Left panel — 1/3 */}
          <div className="lg:w-1/3 flex flex-col justify-between">
            <div>
              <span
                className="text-[10px] font-bold uppercase tracking-[0.25em] mb-4 block"
                style={{ color: "var(--color-brand-purple)" }}
              >
                {isAr ? "خدماتنا" : "Our Services"}
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-[1.1] mb-5">
                {title}
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-8">
                {subtitle}
              </p>
            </div>
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ color: "var(--color-brand-purple)" }}
            >
              {isAr ? "عرض جميع الخدمات" : "View All Services"}
              <ArrowRight size={14} className={isAr ? "rotate-180" : ""} />
            </Link>
          </div>

          {/* Right panel — 2/3, service rows */}
          <div className="lg:w-2/3">
            <div className="divide-y divide-gray-100">
              {services.map((service, index) => {
                const num = String(index + 1).padStart(2, "0");
                const name = isAr ? service.name.ar : service.name.en;

                return (
                  <Link
                    key={service.id}
                    href={`/${locale}/services/${service.slug}`}
                    className="group flex items-center gap-5 py-5 first:pt-0 last:pb-0 transition-colors"
                  >
                    {/* Number */}
                    <span className="text-[13px] font-mono text-gray-300 w-7 shrink-0 select-none">
                      {num}
                    </span>

                    {/* Service name */}
                    <span
                      className={`flex-1 text-base leading-snug transition-colors group-hover:opacity-80 ${
                        service.featured
                          ? "font-bold text-gray-900"
                          : "font-medium text-gray-700"
                      }`}
                    >
                      {name}
                      {service.featured && (
                        <span
                          className="ms-2 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `rgba(var(--color-brand-purple-rgb), 0.08)`,
                            color: "var(--color-brand-purple)",
                          }}
                        >
                          {isAr ? "مميز" : "Featured"}
                        </span>
                      )}
                    </span>

                    {/* Duration badge */}
                    <span className="shrink-0 flex items-center gap-1.5 text-xs text-gray-400 border border-gray-200 rounded-full px-3 py-1">
                      <Clock size={10} />
                      {service.durationMinutes}&thinsp;{isAr ? "د" : "min"}
                    </span>

                    {/* Arrow */}
                    <span
                      className="shrink-0 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center transition-all group-hover:border-transparent group-hover:text-white"
                      style={{
                        // applied via inline because Tailwind can't interpolate CSS vars in group-hover
                      }}
                      aria-hidden="true"
                    >
                      <ArrowRight
                        size={13}
                        className={`transition-colors text-gray-400 group-hover:text-[var(--color-brand-purple)] ${isAr ? "rotate-180" : ""}`}
                      />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}

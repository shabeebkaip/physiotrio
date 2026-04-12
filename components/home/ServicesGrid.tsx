"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Dumbbell, Brain, Hand, Baby, Leaf, Zap,
  MoveUp, Activity, Stethoscope, ArrowRight, LucideIcon,
} from "lucide-react";

interface Service {
  id: string;
  slug: string;
  name: { en: string; ar: string };
  shortDesc: { en: string; ar: string };
  durationMinutes: number;
  icon: string;
  featured: boolean;
}

interface ServicesGridProps {
  locale: string;
  services: Service[];
  title: string;
  subtitle: string;
  bookNowText: string;
}

const iconMap: Record<string, LucideIcon> = {
  bone: Stethoscope,
  run: Dumbbell,
  brain: Brain,
  hands: Hand,
  child: Baby,
  spine: Activity,
  lotus: Leaf,
  "arrow-up": MoveUp,
  zap: Zap,
};

export function ServicesGrid({ locale, services, title, subtitle, bookNowText }: ServicesGridProps) {
  const isAr = locale === "ar";

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{ background: "rgba(var(--color-brand-purple-rgb),0.08)", color: "var(--color-brand-purple)" }}
          >
            {isAr ? "خدماتنا" : "Our Services"}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-3 leading-tight" style={{ color: "#1a1a2e" }}>
            {title}
          </h2>
          <p className="text-lg" style={{ color: "#6B7280" }}>
            {subtitle}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Stethoscope;
            const isFeatured = service.featured;

            return (
              <motion.div
                key={service.id}
                className={isFeatured ? "sm:col-span-2 lg:col-span-2" : ""}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <Link
                  href={`/${locale}/services/${service.slug}`}
                  className="group block h-full bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:bg-brand-purple hover:border-brand-purple hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Icon box */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-white/20"
                    style={{ background: "rgba(var(--color-brand-purple-rgb),0.08)" }}
                  >
                    <Icon
                      size={22}
                      strokeWidth={1.5}
                      className="transition-colors duration-300 text-brand-purple group-hover:text-white"
                    />
                  </div>

                  {/* Name */}
                  <h3
                    className={`font-bold mb-2 leading-snug transition-colors duration-300 text-[#1a1a2e] group-hover:text-white ${isFeatured ? "text-xl" : "text-lg"}`}
                  >
                    {isAr ? service.name.ar : service.name.en}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed mb-6 transition-colors duration-300 text-[#6B7280] group-hover:text-white/80"
                  >
                    {isAr ? service.shortDesc.ar : service.shortDesc.en}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto">
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full transition-colors duration-300 group-hover:bg-white/20 group-hover:text-white"
                      style={{ background: "#F1F5F9", color: "var(--color-brand-purple)" }}
                    >
                      {service.durationMinutes} {isAr ? "دقيقة" : "min"}
                    </span>
                    <span
                      className="flex items-center gap-1 text-sm font-semibold transition-colors duration-300 text-brand-purple group-hover:text-white"
                    >
                      {bookNowText}
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

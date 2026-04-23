"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Clock, Users, Stethoscope } from "lucide-react";

interface Branch {
  id: string;
  comingSoon: boolean;
  city: { en: string; ar: string };
  address: { en: string; ar: string };
  hours: { en: string; ar: string };
  therapistCount: number;
  serviceCount: number;
}

interface BranchesPreviewProps {
  locale: string;
  branches: Branch[];
  title: string;
  getDirectionsText: string;
  bookHereText: string;
  comingSoonText: string;
  therapistsText: string;
  servicesText: string;
}

const cityImages: Record<string, string> = {
  riyadh: "/center-images/DSC07454.jpg",
  makkah: "/makkah.jpg",
  dammam: "/center-images/DSC07454.jpg",
};

export function BranchesPreview({ locale, branches, title, getDirectionsText, bookHereText, comingSoonText, therapistsText, servicesText }: BranchesPreviewProps) {
  return (
    <section className="py-14 sm:py-24" style={{ background: "#F8FAFC" }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
            style={{ background: "rgba(var(--color-brand-purple-rgb),0.08)", color: "var(--color-brand-purple)" }}
          >
            {locale === "ar" ? "فروعنا" : "Our Branches"}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight" style={{ color: "#1a1a2e" }}>
            {title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
          {branches.map((branch, i) => (
            <motion.div
              key={branch.id}
              className="rounded-2xl bg-white overflow-hidden relative group"
              style={{
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                opacity: branch.comingSoon ? 0.85 : 1,
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={!branch.comingSoon ? { y: -6, boxShadow: "0 20px 48px rgba(0,0,0,0.1)" } : {}}
            >
              {/* City photo */}
              <div className="relative h-44 sm:h-52 overflow-hidden">
                <Image
                  src={cityImages[branch.id] ?? cityImages.riyadh}
                  alt={locale === "ar" ? branch.city.ar : branch.city.en}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Subtle bottom fade into card */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-16"
                  style={{ background: "linear-gradient(to top, rgba(255,255,255,0.6), transparent)" }}
                />

                {/* Coming Soon overlay */}
                {branch.comingSoon && (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(6px)" }}
                  >
                    <span
                      className="px-5 py-2 rounded-full font-bold text-sm text-white"
                      style={{ background: "var(--color-brand-purple)" }}
                    >
                      {comingSoonText}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3" style={{ color: "#1a1a2e" }}>
                  {locale === "ar" ? branch.city.ar : branch.city.en}
                </h3>

                <div className="space-y-2 mb-5">
                  <div className="flex items-start gap-2">
                    <MapPin size={14} style={{ color: "var(--color-brand-purple)", marginTop: 2 }} className="flex-shrink-0" />
                    <p className="text-sm" style={{ color: "#6B7280" }}>
                      {locale === "ar" ? branch.address.ar : branch.address.en}
                    </p>
                  </div>
                  {!branch.comingSoon && (
                    <div className="flex items-start gap-2">
                      <Clock size={14} style={{ color: "var(--color-brand-purple)", marginTop: 2 }} className="flex-shrink-0" />
                      <p className="text-xs" style={{ color: "#9CA3AF" }}>
                        {locale === "ar" ? branch.hours.ar : branch.hours.en}
                      </p>
                    </div>
                  )}
                </div>

                {!branch.comingSoon && (
                  <div className="flex gap-2 mb-5">
                    <span
                      className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: "#F1F5F9", color: "var(--color-brand-purple)" }}
                    >
                      <Users size={11} />
                      {branch.therapistCount} {therapistsText}
                    </span>
                    <span
                      className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: "#F1F5F9", color: "var(--color-brand-green)" }}
                    >
                      <Stethoscope size={11} />
                      {branch.serviceCount} {servicesText}
                    </span>
                  </div>
                )}

                {!branch.comingSoon && (
                  <div className="flex gap-3">
                    <a
                      href={`https://maps.google.com/?q=${branch.city.en}+PhysioTrio`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 rounded-full text-sm font-semibold text-center transition-all hover:bg-gray-50"
                      style={{ border: "1.5px solid var(--color-brand-purple)", color: "var(--color-brand-purple)" }}
                    >
                      {getDirectionsText}
                    </a>
                    <Link
                      href={`/${locale}/book/${branch.id}`}
                      className="flex-1 py-2.5 rounded-full text-sm font-semibold text-center text-white transition-all hover:opacity-90"
                      style={{ background: "var(--color-brand-purple)" }}
                    >
                      {bookHereText}
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

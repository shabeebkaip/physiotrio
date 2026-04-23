"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Activity, Heart, Brain, Bone, Zap, Plus, Stethoscope } from "lucide-react";

interface BookingCTABandProps {
  locale: string;
  title: string;
  bookText: string;
  whatsappText: string;
}

export function BookingCTABand({ locale, title, bookText, whatsappText }: BookingCTABandProps) {
  const isAr = locale === "ar";

  return (
    <section dir={isAr ? "rtl" : "ltr"} className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[280px]">

          {/* Left — dark panel */}
          <div className="bg-[#111827] px-8 sm:px-12 py-12 flex flex-col justify-center gap-8 relative overflow-hidden">
            {/* Medical background elements */}
            <div className="pointer-events-none select-none absolute inset-0" aria-hidden="true">
              <Activity size={18} className="absolute top-6 right-8 text-white/[0.06] rotate-12" />
              <Heart size={14} className="absolute top-14 right-20 text-white/[0.05] -rotate-6" />
              <Plus size={16} className="absolute top-8 left-6 text-white/[0.06] rotate-45" />
              <Stethoscope size={20} className="absolute bottom-10 left-8 text-white/[0.06] -rotate-12" />
              <Brain size={15} className="absolute bottom-16 right-10 text-white/[0.05] rotate-6" />
              <Bone size={13} className="absolute bottom-6 right-24 text-white/[0.05] rotate-45" />
              <Zap size={14} className="absolute top-1/2 right-6 text-white/[0.05] -translate-y-1/2 rotate-3" />
              <Activity size={22} className="absolute bottom-8 left-1/3 text-white/[0.04] -rotate-6" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-green mb-3">
                {isAr ? "ابدأ رحلتك" : "Start Your Journey"}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                {title}
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/${locale}/book/riyadh`}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-purple px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              >
                {bookText}
                <ArrowRight size={14} className={isAr ? "rotate-180" : ""} />
              </Link>
              <a
                href="https://wa.me/966500000001"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 hover:text-white hover:border-white/40 transition-all"
              >
                <Phone size={14} />
                {whatsappText}
              </a>
            </div>
          </div>

          {/* Right — real center photo */}
          <div className="relative hidden md:block">
            <Image
              src="/center-images/DSC07546.jpg"
              alt="PhysioTrio rehabilitation center"
              fill
              className="object-cover object-center"
              sizes="50vw"
            />
            {/* Subtle dark edge fade toward the left panel */}
            <div
              className={`absolute inset-0 ${isAr ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-[#111827]/60 via-transparent to-transparent`}
            />
          </div>

        </div>
      </div>
    </section>
  );
}

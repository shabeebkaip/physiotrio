"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

interface BookingCTABandProps {
  locale: string;
  title: string;
  bookText: string;
  whatsappText: string;
}

export function BookingCTABand({ locale, title, bookText, whatsappText }: BookingCTABandProps) {
  const isAr = locale === "ar";

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="py-16 bg-white border-t border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-2xl bg-brand-purple px-8 sm:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Text */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight max-w-xl">
              {title}
            </h2>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href={`/${locale}/book/riyadh`}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand-purple hover:opacity-90 transition-opacity"
            >
              {bookText}
              <ArrowRight size={14} className={isAr ? "rotate-180" : ""} />
            </Link>
            <a
              href="https://wa.me/966500000001"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              <Phone size={14} />
              {whatsappText}
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

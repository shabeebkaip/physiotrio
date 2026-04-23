"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";

interface BookingCTABandProps {
  locale: string;
  title: string;
  bookText: string;
  whatsappText: string;
}

export function BookingCTABand({ locale, title, bookText, whatsappText }: BookingCTABandProps) {
  const isAr = locale === "ar";

  return (
    <section className="border-y border-gray-100" style={{
      background: "#0B162C",
      backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
      backgroundSize: "24px 24px",
    }}>
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12 py-14">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">

          {/* Left — title + sub */}
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white leading-snug mb-2">
              {title}
            </h2>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              {isAr
                ? "فريقنا من المتخصصين في انتظارك — احجز في 3 دقائق"
                : "Our specialist team is ready — book in under 3 minutes"}
            </p>
          </div>

          {/* Right — actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-shrink-0">
            {/* Book appointment */}
            <Link
              href={`/${locale}/book/riyadh`}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-md text-sm font-bold text-white transition-all hover:opacity-90"
              style={{ background: "var(--color-brand-purple)" }}
            >
              {bookText}
              <ArrowRight size={15} />
            </Link>

            {/* WhatsApp */}
            <a
              href="https://wa.me/9668001000246"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-md text-sm font-semibold transition-all hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.75)" }}
            >
              <MessageCircle size={15} />
              {whatsappText}
            </a>

            {/* Toll-free */}
            <a
              href="tel:8001000246"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-white"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              <Phone size={13} />
              800 100 0246
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

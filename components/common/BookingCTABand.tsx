"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface BookingCTABandProps {
  locale: string;
  title: string;
  bookText: string;
  whatsappText: string;
}

export function BookingCTABand({ locale, title, bookText, whatsappText }: BookingCTABandProps) {
  return (
    <section className="py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="relative overflow-hidden rounded-[32px] md:rounded-[40px] py-16 px-8 md:px-20"
          style={{ background: "#077688" }}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative blur blobs */}
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: "rgba(76,175,80,0.25)", filter: "blur(60px)" }}
          />
          <div
            className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: "rgba(255,255,255,0.12)", filter: "blur(48px)" }}
          />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <h2
              className="text-3xl md:text-4xl font-bold text-white max-w-lg leading-tight"
            >
              {title}
            </h2>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Primary CTA — Pharma pill button */}
              <Link
                href={`/${locale}/book/riyadh`}
                className="inline-flex items-center gap-2 pl-6 pr-2 py-2 rounded-full font-semibold text-sm transition-all hover:shadow-xl group"
                style={{ background: "#1a1a2e", color: "white" }}
              >
                {bookText}
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-0.5"
                  style={{ background: "#4caf50" }}
                >
                  <ArrowRight size={15} className="text-white" />
                </span>
              </Link>

              <a
                href="https://wa.me/966500000001"
                className="text-white/80 text-sm font-medium hover:text-white transition-colors"
              >
                {whatsappText}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

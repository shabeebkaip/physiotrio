"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface StickyBookingBarProps {
  locale: string;
  bookText: string;
  tagline?: string;
}

export function StickyBookingBar({ locale, bookText, tagline }: StickyBookingBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed top-20 left-0 right-0 z-40 flex items-center justify-between px-6 py-3"
          style={{ background: "var(--color-brand-purple)" }}
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-white text-sm font-light hidden sm:block">
            <strong className="font-bold">PhysioTrio</strong>
            {" · "}
            {tagline || (locale === "ar" ? "احجز في أقل من 3 دقائق" : "Book in under 3 minutes")}
          </p>
          <Link
            href={`/${locale}/book/riyadh`}
            className="px-5 py-1.5 rounded-full text-sm font-bold transition-all hover:scale-105"
            style={{ background: "var(--color-brand-green)", color: "white" }}
          >
            {bookText} →
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, Clock, MapPin, MessageCircle, ArrowRight, Send } from "lucide-react";
// motion is still used in the enquiry form section below
import { BookingCTABand } from "@/components/common/BookingCTABand";
import { branches } from "@/lib/data/branches";

interface Props { locale: string; ctaBook: string; ctaWhatsapp: string; ctaTitle: string; }

export function ContactContent({ locale, ctaBook, ctaWhatsapp, ctaTitle }: Props) {
  const isAr = locale === "ar";
  const activeBranches = branches.filter((b) => !b.comingSoon);

  return (
    <main>
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="bg-white border-b" style={{ borderColor: "#E5E7EB" }}>
        <div className="max-w-7xl mx-auto px-6 pt-28 pb-8" style={{ direction: isAr ? "rtl" : "ltr" }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "var(--color-brand-purple)" }}>
            {isAr ? "اتصل بنا" : "Contact Us"}
          </p>
          <h1 className="font-bold text-2xl md:text-3xl mb-1" style={{ color: "#111827" }}>
            {isAr ? "نحن هنا لمساعدتك" : "We Are Here to Help"}
          </h1>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            {isAr ? "تواصل معنا بأي طريقة تناسبك — هاتف أو بريد إلكتروني أو واتساب" : "Reach out in whatever way suits you best — phone, email, or WhatsApp"}
          </p>
        </div>
      </div>

      {/* ── Branch cards ─────────────────────────────────────────────────── */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {activeBranches.map((branch) => (
              <div
                key={branch.id}
                className="rounded-xl border p-6"
                style={{ borderColor: "#E5E7EB" }}
              >
                <h2 className="text-lg font-bold mb-5" style={{ color: "#111827" }}>
                  {isAr ? branch.city.ar : branch.city.en}
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-2.5 text-sm" style={{ color: "#4B5563" }}>
                    <MapPin size={15} className="mt-0.5 shrink-0" style={{ color: "var(--color-brand-purple)" }} />
                    {isAr ? branch.address.ar : branch.address.en}
                  </div>
                  <div className="flex items-center gap-2.5 text-sm" style={{ color: "#4B5563" }}>
                    <Phone size={15} className="shrink-0" style={{ color: "var(--color-brand-purple)" }} />
                    <a href="tel:8001000246" dir="ltr" className="hover:underline">800 100 0246</a>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm" style={{ color: "#4B5563" }}>
                    <Mail size={15} className="shrink-0" style={{ color: "var(--color-brand-purple)" }} />
                    <a href="mailto:info@physiotrio.com" className="hover:underline">info@physiotrio.com</a>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm" style={{ color: "#4B5563" }}>
                    <Clock size={15} className="mt-0.5 shrink-0" style={{ color: "var(--color-brand-purple)" }} />
                    {isAr ? branch.hours.ar : branch.hours.en}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link
                    href={`/${locale}/book/${branch.id}`}
                    className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-center text-white flex items-center justify-center gap-1.5 transition-opacity hover:opacity-90"
                    style={{ background: "var(--color-brand-purple)" }}
                  >
                    {isAr ? "احجز الآن" : "Book Now"} <ArrowRight size={13} />
                  </Link>
                  <a
                    href="https://wa.me/9668001000246"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-center text-white flex items-center justify-center gap-1.5 transition-opacity hover:opacity-90"
                    style={{ background: "#25D366" }}
                  >
                    <MessageCircle size={13} />
                    WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* General enquiry */}
      <section className="py-24" style={{ background: "white" }}>
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <motion.div
              className="flex items-center justify-center gap-2 mb-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-brand-purple)" }} />
              <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "var(--color-brand-purple)" }}>
                {isAr ? "استفسار عام" : "General Enquiry"}
              </span>
            </motion.div>
            <motion.h2
              className="font-black mb-3"
              style={{ fontSize: "clamp(28px, 3.5vw, 44px)", color: "var(--color-hero-bg)" }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {isAr ? "أرسل لنا رسالة" : "Send Us a Message"}
            </motion.h2>
            <motion.p
              className="text-sm font-light"
              style={{ color: "#888" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {isAr ? "سنرد عليك خلال ساعة عمل واحدة" : "We'll reply within one business hour"}
            </motion.p>
          </div>

          <motion.div
            className="rounded-3xl p-10"
            style={{ background: "var(--color-surface-light)", border: "1px solid rgba(var(--color-brand-purple-rgb),0.1)" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={isAr ? "الاسم الكامل" : "Full Name"}
                  className="w-full px-4 py-3.5 rounded-2xl text-sm font-light outline-none transition-all"
                  style={{ background: "white", border: "1.5px solid rgba(var(--color-brand-purple-rgb),0.15)", color: "#333" }}
                  readOnly
                />
                <input
                  type="tel"
                  placeholder={isAr ? "رقم الجوال" : "Mobile Number"}
                  className="w-full px-4 py-3.5 rounded-2xl text-sm font-light outline-none transition-all"
                  style={{ background: "white", border: "1.5px solid rgba(var(--color-brand-purple-rgb),0.15)", color: "#333" }}
                  readOnly
                />
              </div>
              <input
                type="email"
                placeholder={isAr ? "البريد الإلكتروني" : "Email Address"}
                className="w-full px-4 py-3.5 rounded-2xl text-sm font-light outline-none transition-all"
                style={{ background: "white", border: "1.5px solid rgba(var(--color-brand-purple-rgb),0.15)", color: "#333" }}
                readOnly
              />
              <textarea
                rows={4}
                placeholder={isAr ? "رسالتك..." : "Your message..."}
                className="w-full px-4 py-3.5 rounded-2xl text-sm font-light outline-none resize-none transition-all"
                style={{ background: "white", border: "1.5px solid rgba(var(--color-brand-purple-rgb),0.15)", color: "#333" }}
                readOnly
              />
              <button
                type="submit"
                className="w-full py-4 rounded-full font-bold text-white transition-all hover:scale-[1.02] hover:opacity-90 flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg, var(--color-brand-purple), var(--color-brand-green))" }}
              >
                <Send size={15} />
                {isAr ? "إرسال الرسالة" : "Send Message"}
              </button>
            </form>
            <p className="text-center text-xs mt-5" style={{ color: "#aaa" }}>
              {isAr
                ? "للمواعيد العاجلة، تواصل عبر واتساب للحصول على رد أسرع."
                : "For urgent appointments, contact via WhatsApp for a faster response."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dark WhatsApp strip */}
      <section className="py-10" style={{ background: "var(--color-hero-bg)" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold text-lg">
              {isAr ? "هل تحتاج رداً سريعاً؟" : "Need a quick response?"}
            </p>
            <p className="text-sm font-light" style={{ color: "rgba(255,255,255,0.55)" }}>
              {isAr ? "فريقنا متاح على واتساب على مدار الساعة" : "Our team is available on WhatsApp around the clock"}
            </p>
          </div>
          <a
            href="https://wa.me/9668001000246"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-full font-bold text-white transition-all hover:scale-105 flex items-center gap-2"
            style={{ background: "#25D366" }}
          >
            <MessageCircle size={16} />
            WhatsApp {isAr ? "←" : "→"}
          </a>
        </div>
      </section>

      <BookingCTABand locale={locale} title={ctaTitle} bookText={ctaBook} whatsappText={ctaWhatsapp} />
    </main>
  );
}

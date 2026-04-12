"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, Clock, MapPin, MessageCircle, ArrowRight, Send } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { BookingCTABand } from "@/components/common/BookingCTABand";
import { branches } from "@/lib/data/branches";

interface Props { locale: string; ctaBook: string; ctaWhatsapp: string; ctaTitle: string; }

export function ContactContent({ locale, ctaBook, ctaWhatsapp, ctaTitle }: Props) {
  const isAr = locale === "ar";
  const activeBranches = branches.filter((b) => !b.comingSoon);

  return (
    <main>
      <PageHero
        eyebrow={isAr ? "اتصل بنا" : "Contact Us"}
        title={isAr ? "نحن هنا لمساعدتك" : "We Are Here to Help"}
        subtitle={isAr ? "تواصل معنا بأي طريقة تناسبك — هاتف أو بريد إلكتروني أو واتساب" : "Reach out in whatever way suits you best — phone, email, or WhatsApp"}
      />

      {/* Branch cards */}
      <section className="py-24" style={{ background: "linear-gradient(180deg, var(--color-surface-light) 0%, var(--color-brand-green-muted) 100%)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <motion.div
              className="flex items-center justify-center gap-2 mb-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-brand-green)" }} />
              <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "var(--color-brand-green)" }}>
                {isAr ? "فروعنا" : "Our Branches"}
              </span>
            </motion.div>
            <motion.h2
              className="font-black mb-3"
              style={{ fontSize: "clamp(28px, 3.5vw, 48px)", color: "var(--color-hero-bg)" }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {isAr ? "معلومات الفروع" : "Branch Information"}
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {activeBranches.map((branch, i) => (
              <motion.div
                key={branch.id}
                className="bg-white rounded-3xl overflow-hidden group"
                style={{ boxShadow: "0 4px 30px rgba(var(--color-brand-purple-rgb),0.08)" }}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -8, boxShadow: "0 24px 60px rgba(var(--color-brand-purple-rgb),0.15)" }}
              >
                {/* Top accent bar */}
                <div className="h-1.5" style={{ background: "linear-gradient(90deg, var(--color-brand-green), var(--color-brand-purple))" }} />

                <div className="p-8">
                  <h3 className="text-2xl font-black mb-6" style={{ color: "var(--color-brand-purple)" }}>
                    {isAr ? branch.city.ar : branch.city.en}
                  </h3>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(var(--color-brand-purple-rgb),0.08)" }}>
                        <MapPin size={14} style={{ color: "var(--color-brand-purple)" }} />
                      </div>
                      <span className="text-sm font-light leading-relaxed mt-1.5" style={{ color: "#555" }}>
                        {isAr ? branch.address.ar : branch.address.en}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(var(--color-brand-green-rgb),0.08)" }}>
                        <Phone size={14} style={{ color: "var(--color-brand-green)" }} />
                      </div>
                      <a
                        href={`tel:${branch.phone}`}
                        className="text-sm font-medium transition-colors hover:underline"
                        style={{ color: "#444" }}
                      >
                        {branch.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(var(--color-brand-purple-rgb),0.08)" }}>
                        <Mail size={14} style={{ color: "var(--color-brand-purple)" }} />
                      </div>
                      <a
                        href={`mailto:${branch.email}`}
                        className="text-sm font-medium transition-colors hover:underline"
                        style={{ color: "#444" }}
                      >
                        {branch.email}
                      </a>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(var(--color-brand-green-rgb),0.08)" }}>
                        <Clock size={14} style={{ color: "var(--color-brand-green)" }} />
                      </div>
                      <span className="text-sm font-light leading-relaxed mt-1.5" style={{ color: "#555" }}>
                        {isAr ? branch.hours.ar : branch.hours.en}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      href={`/${locale}/book/${branch.id}`}
                      className="flex-1 py-3 rounded-full text-sm font-bold text-center text-white transition-all hover:scale-105 flex items-center justify-center gap-1.5"
                      style={{ background: "linear-gradient(135deg, var(--color-brand-purple), var(--color-brand-green))" }}
                    >
                      {isAr ? "احجز الآن" : "Book Now"} <ArrowRight size={14} />
                    </Link>
                    <a
                      href={`https://wa.me/${branch.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 rounded-full text-sm font-bold text-center text-white transition-all hover:scale-105 flex items-center justify-center gap-1.5"
                      style={{ background: "#25D366" }}
                    >
                      <MessageCircle size={14} />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </motion.div>
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
            href="https://wa.me/966500000001"
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

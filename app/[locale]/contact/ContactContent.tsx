"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Phone, Mail, Clock, MapPin, MessageCircle, ArrowRight,
  Send, CheckCircle2, PhoneCall, Headphones,
} from "lucide-react";
import { BookingCTABand } from "@/components/common/BookingCTABand";
import { branches } from "@/lib/data/branches";

interface Props { locale: string; ctaBook: string; ctaWhatsapp: string; ctaTitle: string; }

const BRANCH_COLORS: Record<string, { accent: string; bg: string }> = {
  riyadh: { accent: "var(--color-brand-purple)", bg: "rgba(136,7,114,0.06)" },
  makkah: { accent: "var(--color-brand-green)",  bg: "rgba(76,175,80,0.06)" },
};

export function ContactContent({ locale, ctaBook, ctaWhatsapp, ctaTitle }: Props) {
  const isAr = locale === "ar";
  const activeBranches = branches.filter(b => !b.comingSoon);

  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main>
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <section className="pt-36 pb-12" style={{ background: "#ffffff", borderBottom: "1px solid #eef2f6" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <span
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full"
              style={{ background: "rgba(136,7,114,0.07)", color: "var(--color-brand-purple)" }}
            >
              <Headphones size={11} strokeWidth={2.5} />
              {isAr ? "اتصل بنا" : "Contact Us"}
            </span>
            <h1
              className="font-black leading-tight mb-4"
              style={{ fontSize: "clamp(32px, 4.5vw, 56px)", color: "#111827" }}
            >
              {isAr ? "نحن هنا لمساعدتك" : "We're Here to Help"}
            </h1>
            <p className="text-base leading-relaxed" style={{ color: "#6B7280", maxWidth: 520 }}>
              {isAr
                ? "تواصل معنا بأي طريقة تناسبك — هاتف، بريد إلكتروني، أو واتساب. فريقنا متاح لك."
                : "Reach out in whatever way suits you — phone, email, or WhatsApp. Our team is ready for you."}
            </p>
          </div>

          {/* Quick contact strip */}
          <div className="flex flex-wrap gap-3 mt-8">
            {[
              { icon: PhoneCall, label: isAr ? "اتصل الآن" : "Call Now",    href: "tel:8001234567",         bg: "rgba(136,7,114,0.07)", color: "var(--color-brand-purple)" },
              { icon: MessageCircle, label: "WhatsApp",                       href: "https://wa.me/966500000001", bg: "rgba(37,211,102,0.08)", color: "#16a34a", external: true },
              { icon: Mail, label: isAr ? "راسلنا" : "Email Us",             href: "mailto:info@physiotrio.com", bg: "rgba(136,7,114,0.07)", color: "var(--color-brand-purple)" },
            ].map(({ icon: Icon, label, href, bg, color, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:shadow-md hover:-translate-y-0.5"
                style={{ background: bg, color, border: `1px solid ${color}30` }}
              >
                <Icon size={14} />
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Branches ───────────────────────────────────────────────────────── */}
      <section className="py-14" style={{ background: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--color-brand-purple)" }}>
                {isAr ? "فروعنا" : "Our Branches"}
              </p>
              <h2 className="text-2xl font-black" style={{ color: "#111827" }}>
                {isAr ? "معلومات الفروع" : "Branch Information"}
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {activeBranches.map((branch, i) => {
              const c = BRANCH_COLORS[branch.id] ?? BRANCH_COLORS.riyadh;
              return (
                <motion.div
                  key={branch.id}
                  className="bg-white rounded-2xl overflow-hidden"
                  style={{ border: "1px solid #E5E7EB" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  {/* Accent bar */}
                  <div className="h-1" style={{ background: c.accent }} />

                  <div className="p-6">
                    {/* Branch title */}
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-xl font-black" style={{ color: "#111827" }}>
                        {isAr ? branch.city.ar : branch.city.en}
                      </h3>
                      <span
                        className="text-xs font-semibold px-3 py-1 rounded-full"
                        style={{ background: c.bg, color: c.accent }}
                      >
                        {branch.therapistCount} {isAr ? "معالج" : "therapists"}
                      </span>
                    </div>

                    {/* Info rows */}
                    <div className="space-y-3 mb-6">
                      {[
                        { icon: MapPin, text: isAr ? branch.address.ar : branch.address.en, color: c.accent },
                        { icon: Phone, text: branch.phone, href: `tel:${branch.phone}`, color: c.accent },
                        { icon: Mail,  text: branch.email, href: `mailto:${branch.email}`, color: c.accent },
                        { icon: Clock, text: isAr ? branch.hours.ar : branch.hours.en, color: c.accent },
                      ].map(({ icon: Icon, text, href, color }) => (
                        <div key={text} className="flex items-start gap-3">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                            style={{ background: c.bg }}
                          >
                            <Icon size={14} style={{ color }} />
                          </div>
                          {href ? (
                            <a
                              href={href}
                              className="text-sm leading-relaxed hover:underline"
                              style={{ color: "#374151" }}
                            >
                              {text}
                            </a>
                          ) : (
                            <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>{text}</p>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        href={`/${locale}/book/${branch.id}`}
                        className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                        style={{ background: c.accent }}
                      >
                        {isAr ? "احجز الآن" : "Book Now"} <ArrowRight size={13} />
                      </Link>
                      <a
                        href={`https://wa.me/${branch.whatsapp.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                        style={{ background: "#25D366" }}
                      >
                        <MessageCircle size={13} />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Contact form ───────────────────────────────────────────────────── */}
      <section className="py-16" style={{ background: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Left — copy */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--color-brand-purple)" }}>
                {isAr ? "استفسار عام" : "General Enquiry"}
              </p>
              <h2 className="font-black text-3xl md:text-4xl leading-tight mb-4" style={{ color: "#111827" }}>
                {isAr ? "أرسل لنا رسالة" : "Send Us a Message"}
              </h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "#6B7280" }}>
                {isAr
                  ? "هل لديك سؤال حول خدماتنا أو تريد الاستفسار عن باقة معينة؟ أرسل لنا وسنرد خلال ساعة عمل."
                  : "Have a question about our services or a specific package? Send us a message and we'll reply within one business hour."}
              </p>

              {/* Response time indicators */}
              <div className="space-y-3">
                {[
                  { channel: "WhatsApp", time: isAr ? "أقل من ساعة" : "Under 1 hour",   color: "#16a34a", bg: "rgba(22,163,74,0.07)" },
                  { channel: isAr ? "هاتف" : "Phone",  time: isAr ? "فوري"    : "Instant",       color: "var(--color-brand-purple)", bg: "rgba(136,7,114,0.07)" },
                  { channel: isAr ? "بريد" : "Email",  time: isAr ? "يوم عمل" : "1 business day", color: "#6B7280", bg: "#F3F4F6" },
                ].map(({ channel, time, color, bg }) => (
                  <div
                    key={channel}
                    className="flex items-center justify-between px-4 py-3 rounded-xl"
                    style={{ background: bg }}
                  >
                    <span className="text-sm font-semibold" style={{ color: "#111827" }}>{channel}</span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "white", color }}>
                      {time}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {submitted ? (
                <div
                  className="rounded-2xl p-10 text-center"
                  style={{ background: "rgba(136,7,114,0.04)", border: "1px solid rgba(136,7,114,0.15)" }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(136,7,114,0.1)" }}
                  >
                    <CheckCircle2 size={32} style={{ color: "var(--color-brand-purple)" }} />
                  </div>
                  <h3 className="font-black text-xl mb-2" style={{ color: "#111827" }}>
                    {isAr ? "تم الإرسال!" : "Message Sent!"}
                  </h3>
                  <p className="text-sm" style={{ color: "#6B7280" }}>
                    {isAr
                      ? "شكراً لتواصلك معنا. سنرد عليك خلال ساعة عمل."
                      : "Thank you for reaching out. We'll get back to you within one business hour."}
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", message: "" }); }}
                    className="mt-6 text-sm font-semibold underline"
                    style={{ color: "var(--color-brand-purple)" }}
                  >
                    {isAr ? "إرسال رسالة أخرى" : "Send another message"}
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl p-8 space-y-4"
                  style={{ background: "#f8fafc", border: "1px solid #E5E7EB" }}
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "#374151" }}>
                        {isAr ? "الاسم الكامل" : "Full Name"} <span style={{ color: "var(--color-brand-purple)" }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder={isAr ? "الاسم الكامل" : "Your full name"}
                        dir={isAr ? "rtl" : "ltr"}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={{ background: "white", border: "1.5px solid #E5E7EB", color: "#111827" }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "#374151" }}>
                        {isAr ? "رقم الجوال" : "Mobile Number"} <span style={{ color: "var(--color-brand-purple)" }}>*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        placeholder="+966 5X XXX XXXX"
                        dir="ltr"
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={{ background: "white", border: "1.5px solid #E5E7EB", color: "#111827" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "#374151" }}>
                      {isAr ? "البريد الإلكتروني" : "Email Address"}
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder={isAr ? "example@email.com" : "example@email.com"}
                      dir="ltr"
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                      style={{ background: "white", border: "1.5px solid #E5E7EB", color: "#111827" }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "#374151" }}>
                      {isAr ? "رسالتك" : "Your Message"} <span style={{ color: "var(--color-brand-purple)" }}>*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      placeholder={isAr ? "اكتب رسالتك هنا..." : "How can we help you?"}
                      dir={isAr ? "rtl" : "ltr"}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
                      style={{ background: "white", border: "1.5px solid #E5E7EB", color: "#111827" }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90"
                    style={{ background: "var(--color-brand-purple)" }}
                  >
                    <Send size={14} />
                    {isAr ? "إرسال الرسالة" : "Send Message"}
                  </button>

                  <p className="text-center text-xs" style={{ color: "#9CA3AF" }}>
                    {isAr
                      ? "للحجز الفوري، استخدم خاصية الحجز أو تواصل عبر واتساب."
                      : "For immediate booking, use our booking system or contact via WhatsApp."}
                  </p>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      <BookingCTABand locale={locale} title={ctaTitle} bookText={ctaBook} whatsappText={ctaWhatsapp} />
    </main>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import type { Branch } from "@/lib/data/branches";
import type { Service } from "@/lib/data/services";
import type { Therapist } from "@/lib/data/therapists";
import {
  CheckCircle2, Star, Clock, Calendar, User, ChevronRight,
  Dumbbell, Brain, Hand, Baby, Leaf, Zap, MoveUp, Activity,
  Stethoscope, ArrowRight, LucideIcon,
} from "lucide-react";

interface BookingFlowProps {
  locale: string;
  branch: Branch;
  services: Service[];
  therapists: Therapist[];
}

const DAYS = {
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  ar: ["أحد", "اثن", "ثلا", "أرب", "خمي", "جمع", "سبت"],
};
const TIME_SLOTS = ["09:00", "09:45", "10:30", "11:15", "12:00", "14:00", "14:45", "15:30", "16:15", "17:00", "17:45", "18:30"];

const serviceIconMap: Record<string, LucideIcon> = {
  bone: Stethoscope, run: Dumbbell, brain: Brain, hands: Hand,
  child: Baby, spine: Activity, lotus: Leaf, "arrow-up": MoveUp, zap: Zap,
};

function getNext14Days() {
  return Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return d;
  });
}

// ─── Step Progress Bar ────────────────────────────────────────────────────────

function StepBar({ step, labels }: { step: number; labels: string[] }) {
  return (
    <div className="flex items-center justify-between mb-10">
      {labels.map((label, i) => {
        const idx = i + 1;
        const done = step > idx;
        const active = step === idx;
        return (
          <div key={i} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
                style={{
                  background: done ? "var(--color-brand-purple)" : active ? "var(--color-brand-purple)" : "#F1F5F9",
                  color: done || active ? "white" : "#9CA3AF",
                  boxShadow: active ? "0 0 0 4px rgba(var(--color-brand-purple-rgb),0.15)" : "none",
                }}
              >
                {done ? <CheckCircle2 size={16} /> : idx}
              </div>
              <span
                className="text-[10px] font-semibold uppercase tracking-wide hidden sm:block"
                style={{ color: active ? "var(--color-brand-purple)" : done ? "var(--color-brand-purple)" : "#9CA3AF" }}
              >
                {label}
              </span>
            </div>
            {i < labels.length - 1 && (
              <div
                className="flex-1 h-0.5 mx-2 mb-4 rounded-full transition-all duration-500"
                style={{ background: step > idx ? "var(--color-brand-purple)" : "#E5E7EB" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Navigation buttons ───────────────────────────────────────────────────────

function NavButtons({
  onBack, onNext, nextLabel, nextDisabled, isAr,
}: {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel: string;
  nextDisabled?: boolean;
  isAr: boolean;
}) {
  return (
    <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
      {onBack && (
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:bg-gray-100"
          style={{ background: "#F1F5F9", color: "#6B7280" }}
        >
          {isAr ? "→ عودة" : "← Back"}
        </button>
      )}
      {onNext && (
        <button
          onClick={onNext}
          disabled={nextDisabled}
          className="flex-1 inline-flex items-center justify-center gap-2 pl-6 pr-2 py-2.5 rounded-xl font-semibold text-sm text-white transition-all group"
          style={{
            background: nextDisabled ? "#E5E7EB" : "var(--color-brand-purple)",
            color: nextDisabled ? "#9CA3AF" : "white",
            cursor: nextDisabled ? "not-allowed" : "pointer",
          }}
        >
          {nextLabel}
          {!nextDisabled && (
            <span
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform group-hover:translate-x-0.5"
              style={{ background: "var(--color-brand-green)" }}
            >
              <ArrowRight size={14} />
            </span>
          )}
        </button>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function BookingFlow({ locale, branch, services, therapists }: BookingFlowProps) {
  const searchParams = useSearchParams();
  const isAr = locale === "ar";

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(
    (() => { const s = searchParams?.get("service"); return s ? (services.find((x) => x.slug === s) ?? null) : null; })()
  );
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(
    (() => { const t = searchParams?.get("therapist"); return t ? (therapists.find((x) => x.id === t) ?? null) : null; })()
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const days14 = getNext14Days();
  const stepLabels = isAr
    ? ["الخدمة", "المعالج", "الموعد", "التفاصيل", "تأكيد"]
    : ["Service", "Therapist", "Schedule", "Details", "Confirm"];

  // ── Confirmed ──────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 md:p-12 text-center border border-gray-100">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "linear-gradient(135deg, var(--color-brand-purple), var(--color-brand-green))" }}
        >
          <CheckCircle2 size={36} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: "#1a1a2e" }}>
          {isAr ? "تم الحجز بنجاح!" : "Booking Confirmed!"}
        </h2>
        <p className="text-sm mb-8 max-w-sm mx-auto leading-relaxed" style={{ color: "#6B7280" }}>
          {isAr
            ? `سيصلك تأكيد عبر SMS على ${form.phone}. يمكنك التعديل حتى 24 ساعة قبل الموعد.`
            : `A confirmation SMS will be sent to ${form.phone}. You can reschedule up to 24h before your session.`}
        </p>

        {/* Summary grid */}
        <div className="grid grid-cols-2 gap-3 mb-8 text-left">
          {[
            { label: isAr ? "الخدمة" : "Service", value: selectedService ? (isAr ? selectedService.name.ar : selectedService.name.en) : "—" },
            { label: isAr ? "الفرع" : "Branch", value: isAr ? branch.city.ar : branch.city.en },
            { label: isAr ? "التاريخ" : "Date", value: selectedDate?.toLocaleDateString(isAr ? "ar-SA" : "en-US", { weekday: "short", month: "short", day: "numeric" }) ?? "—" },
            { label: isAr ? "الوقت" : "Time", value: selectedTime ?? "—" },
          ].map((row, i) => (
            <div key={i} className="p-4 rounded-xl" style={{ background: "#F8FAFC" }}>
              <p className="text-xs font-semibold mb-1" style={{ color: "var(--color-brand-purple)" }}>{row.label}</p>
              <p className="text-sm font-medium" style={{ color: "#1a1a2e" }}>{row.value}</p>
            </div>
          ))}
        </div>

        <a
          href={`https://wa.me/${branch.whatsapp?.replace(/\D/g, "") ?? "9668001000091"}`}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90"
          style={{ background: "#25D366" }}
        >
          {isAr ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 md:p-10 border border-gray-100">
      <StepBar step={step} labels={stepLabels} />

      {/* ── Step 1: Service ─────────────────────────────────────────────── */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold mb-1" style={{ color: "#1a1a2e" }}>
            {isAr ? "اختر الخدمة" : "Choose a Service"}
          </h2>
          <p className="text-sm mb-8" style={{ color: "#6B7280" }}>
            {isAr ? "اختر نوع العلاج المناسب لاحتياجك" : "Select the treatment type that fits your needs"}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {services.map((service) => {
              const Icon = serviceIconMap[service.icon] ?? Stethoscope;
              const isSelected = selectedService?.id === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => { setSelectedService(service); setStep(2); }}
                  className="group text-left p-5 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  style={{
                    background: isSelected ? "rgba(var(--color-brand-purple-rgb),0.06)" : "white",
                    borderColor: isSelected ? "var(--color-brand-purple)" : "#E5E7EB",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                      style={{ background: isSelected ? "rgba(var(--color-brand-purple-rgb),0.12)" : "#F1F5F9" }}
                    >
                      <Icon size={18} strokeWidth={1.5} style={{ color: "var(--color-brand-purple)" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm mb-0.5" style={{ color: "#1a1a2e" }}>
                        {isAr ? service.name.ar : service.name.en}
                      </p>
                      <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "#9CA3AF" }}>
                        {isAr ? service.shortDesc.ar : service.shortDesc.en}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--color-brand-purple)" }}>
                      <Clock size={11} />
                      {service.durationMinutes} {isAr ? "دقيقة" : "min"}
                    </span>
                    <ChevronRight size={14} style={{ color: "#D1D5DB" }} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Step 2: Therapist ───────────────────────────────────────────── */}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold mb-1" style={{ color: "#1a1a2e" }}>
            {isAr ? "اختر معالجك" : "Choose Your Therapist"}
          </h2>
          <p className="text-sm mb-8" style={{ color: "#6B7280" }}>
            {isAr ? "أو تخطَّ هذه الخطوة لتخصيص أي معالج متاح" : "Or skip to assign any available therapist"}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {therapists.map((therapist) => {
              const isSelected = selectedTherapist?.id === therapist.id;
              return (
                <button
                  key={therapist.id}
                  onClick={() => { setSelectedTherapist(therapist); setStep(3); }}
                  className="text-left p-5 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  style={{
                    background: isSelected ? "rgba(var(--color-brand-purple-rgb),0.06)" : "white",
                    borderColor: isSelected ? "var(--color-brand-purple)" : "#E5E7EB",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0 overflow-hidden"
                      style={{ background: "linear-gradient(135deg, var(--color-brand-purple), var(--color-brand-green))" }}
                    >
                      {therapist.image ? (
                        <Image src={therapist.image} alt={therapist.initials} width={48} height={48} className="object-cover w-full h-full" unoptimized />
                      ) : (
                        therapist.initials
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm" style={{ color: "#1a1a2e" }}>
                        {isAr ? therapist.name.ar : therapist.name.en}
                      </p>
                      <p className="text-xs mb-1.5" style={{ color: "#9CA3AF" }}>
                        {isAr ? therapist.title.ar : therapist.title.en}
                      </p>
                      <div className="flex items-center gap-1">
                        {[1,2,3,4,5].map((s) => (
                          <Star key={s} size={10} fill={s <= Math.floor(therapist.rating) ? "var(--color-brand-purple)" : "none"} color={s <= Math.floor(therapist.rating) ? "var(--color-brand-purple)" : "#D1D5DB"} />
                        ))}
                        <span className="text-xs font-semibold ml-1" style={{ color: "var(--color-brand-purple)" }}>{therapist.rating}</span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Skip option */}
          <button
            onClick={() => { setSelectedTherapist(null); setStep(3); }}
            className="w-full py-3 rounded-xl text-sm font-medium border transition-all hover:bg-gray-50"
            style={{ borderColor: "#E5E7EB", color: "#6B7280" }}
          >
            {isAr ? "أي معالج متاح" : "Any available therapist"}
          </button>

          <NavButtons isAr={isAr} onBack={() => setStep(1)} nextLabel="" />
        </div>
      )}

      {/* ── Step 3: Date & Time ─────────────────────────────────────────── */}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-bold mb-1" style={{ color: "#1a1a2e" }}>
            {isAr ? "اختر الموعد" : "Choose Date & Time"}
          </h2>
          <p className="text-sm mb-8" style={{ color: "#6B7280" }}>
            {isAr ? "الجمعة مغلق" : "Closed on Fridays"}
          </p>

          {/* Date scroll */}
          <div className="mb-6 overflow-x-auto -mx-1 px-1 pb-2">
            <div className="flex gap-2" style={{ minWidth: "max-content" }}>
              {days14.map((day, i) => {
                const dayName = isAr ? DAYS.ar[day.getDay()] : DAYS.en[day.getDay()];
                const isFri = day.getDay() === 5;
                const isSelected = selectedDate?.toDateString() === day.toDateString();
                return (
                  <button
                    key={i}
                    onClick={() => !isFri && setSelectedDate(day)}
                    disabled={isFri}
                    className="flex flex-col items-center px-3.5 py-3 rounded-xl transition-all duration-200 min-w-[56px]"
                    style={{
                      background: isSelected ? "var(--color-brand-purple)" : "white",
                      border: `1px solid ${isSelected ? "var(--color-brand-purple)" : "#E5E7EB"}`,
                      opacity: isFri ? 0.35 : 1,
                      boxShadow: isSelected ? "0 4px 12px rgba(var(--color-brand-purple-rgb),0.25)" : "none",
                    }}
                  >
                    <span className="text-[10px] font-semibold uppercase mb-1" style={{ color: isSelected ? "rgba(255,255,255,0.7)" : "#9CA3AF" }}>
                      {dayName}
                    </span>
                    <span className="font-bold text-sm" style={{ color: isSelected ? "white" : "#1a1a2e" }}>
                      {day.getDate()}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time slots */}
          {selectedDate && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "#9CA3AF" }}>
                {isAr ? "المواعيد المتاحة" : "Available Times"}
              </p>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {TIME_SLOTS.map((time) => {
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className="py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        background: isSelected ? "var(--color-brand-purple)" : "white",
                        color: isSelected ? "white" : "#374151",
                        border: `1px solid ${isSelected ? "var(--color-brand-purple)" : "#E5E7EB"}`,
                        boxShadow: isSelected ? "0 4px 12px rgba(var(--color-brand-purple-rgb),0.25)" : "none",
                      }}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <NavButtons
            isAr={isAr}
            onBack={() => setStep(2)}
            onNext={() => setStep(4)}
            nextLabel={isAr ? "التالي" : "Next"}
            nextDisabled={!selectedDate || !selectedTime}
          />
        </div>
      )}

      {/* ── Step 4: Details ─────────────────────────────────────────────── */}
      {step === 4 && (
        <div>
          <h2 className="text-xl font-bold mb-1" style={{ color: "#1a1a2e" }}>
            {isAr ? "بياناتك الشخصية" : "Your Details"}
          </h2>
          <p className="text-sm mb-8" style={{ color: "#6B7280" }}>
            {isAr ? "معلوماتك آمنة ومشفرة" : "Your information is safe and encrypted"}
          </p>

          <div className="space-y-5">
            {[
              { key: "name", label: isAr ? "الاسم الكامل *" : "Full Name *", type: "text", placeholder: isAr ? "الاسم الكامل" : "Full Name" },
              { key: "phone", label: isAr ? "رقم الجوال *" : "Mobile Number *", type: "tel", placeholder: "+966 5X XXX XXXX" },
              { key: "email", label: isAr ? "البريد الإلكتروني (اختياري)" : "Email (optional)", type: "email", placeholder: "email@example.com" },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label className="block text-xs font-semibold mb-2" style={{ color: "#374151" }}>
                  {label}
                </label>
                <input
                  type={type}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: "white",
                    border: "1.5px solid #E5E7EB",
                    color: "#1a1a2e",
                  }}
                  placeholder={placeholder}
                  onFocus={(e) => { e.target.style.borderColor = "var(--color-brand-purple)"; e.target.style.boxShadow = "0 0 0 3px rgba(var(--color-brand-purple-rgb),0.1)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#E5E7EB"; e.target.style.boxShadow = "none"; }}
                />
              </div>
            ))}
            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: "#374151" }}>
                {isAr ? "ملاحظات إضافية (اختياري)" : "Additional Notes (optional)"}
              </label>
              <textarea
                rows={3}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
                style={{ background: "white", border: "1.5px solid #E5E7EB", color: "#1a1a2e" }}
                placeholder={isAr ? "تاريخ الإصابة، التأمين الصحي..." : "Injury history, insurance provider..."}
                onFocus={(e) => { e.target.style.borderColor = "var(--color-brand-purple)"; e.target.style.boxShadow = "0 0 0 3px rgba(var(--color-brand-purple-rgb),0.1)"; }}
                onBlur={(e) => { e.target.style.borderColor = "#E5E7EB"; e.target.style.boxShadow = "none"; }}
              />
            </div>
          </div>

          <NavButtons
            isAr={isAr}
            onBack={() => setStep(3)}
            onNext={() => setStep(5)}
            nextLabel={isAr ? "مراجعة الحجز" : "Review Booking"}
            nextDisabled={!form.name || !form.phone}
          />
        </div>
      )}

      {/* ── Step 5: Confirm ─────────────────────────────────────────────── */}
      {step === 5 && (
        <div>
          <h2 className="text-xl font-bold mb-1" style={{ color: "#1a1a2e" }}>
            {isAr ? "مراجعة وتأكيد" : "Review & Confirm"}
          </h2>
          <p className="text-sm mb-8" style={{ color: "#6B7280" }}>
            {isAr ? "تحقق من بياناتك قبل التأكيد" : "Double-check your details before confirming"}
          </p>

          <div className="rounded-2xl overflow-hidden border border-gray-100 mb-6">
            {[
              { icon: <Stethoscope size={15} />, label: isAr ? "الخدمة" : "Service", value: selectedService ? (isAr ? selectedService.name.ar : selectedService.name.en) : "—" },
              { icon: <User size={15} />, label: isAr ? "المعالج" : "Therapist", value: selectedTherapist ? (isAr ? selectedTherapist.name.ar : selectedTherapist.name.en) : (isAr ? "أي معالج متاح" : "Any available") },
              { icon: <Calendar size={15} />, label: isAr ? "التاريخ" : "Date", value: selectedDate?.toLocaleDateString(isAr ? "ar-SA" : "en-US", { weekday: "long", month: "long", day: "numeric" }) ?? "—" },
              { icon: <Clock size={15} />, label: isAr ? "الوقت" : "Time", value: selectedTime ?? "—" },
              { icon: <User size={15} />, label: isAr ? "الاسم" : "Name", value: form.name },
              { icon: <User size={15} />, label: isAr ? "الجوال" : "Mobile", value: form.phone },
            ].map((row, i, arr) => (
              <div
                key={i}
                className="flex items-center gap-4 px-5 py-4"
                style={{ borderBottom: i < arr.length - 1 ? "1px solid #F1F5F9" : "none" }}
              >
                <span style={{ color: "var(--color-brand-purple)" }}>{row.icon}</span>
                <span className="text-xs font-semibold w-20 flex-shrink-0" style={{ color: "#9CA3AF" }}>{row.label}</span>
                <span className="text-sm font-medium" style={{ color: "#1a1a2e" }}>{row.value}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-center mb-6" style={{ color: "#9CA3AF" }}>
            {isAr
              ? "بالضغط على تأكيد، أنت توافق على شروط وأحكام فيزيوتريو وسياسة الإلغاء."
              : "By confirming, you agree to PhysioTrio's Terms & Conditions and cancellation policy."}
          </p>

          <NavButtons
            isAr={isAr}
            onBack={() => setStep(4)}
            onNext={() => setSubmitted(true)}
            nextLabel={isAr ? "تأكيد الحجز" : "Confirm Booking"}
          />
        </div>
      )}
    </div>
  );
}

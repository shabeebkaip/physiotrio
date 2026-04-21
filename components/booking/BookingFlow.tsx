"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import type { Branch } from "@/lib/data/branches";
import type { Service } from "@/lib/data/services";
import type { Package } from "@/lib/data/packages";
import type { Therapist } from "@/lib/data/therapists";
import {
  CheckCircle2, Star, Clock, Calendar, User, ChevronRight,
  Dumbbell, Brain, Hand, Baby, Leaf, Zap, MoveUp, Activity,
  Stethoscope, ArrowRight, Pencil, LucideIcon, ShoppingBag,
  Sparkles, CreditCard, ShieldCheck,
} from "lucide-react";

interface BookingFlowProps {
  locale: string;
  branch: Branch;
  services: Service[];
  packages: Package[];
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

function pkgToSpecialization(category: string): string[] {
  const cat = category.toLowerCase();
  if (cat.includes("sports")) return ["sports-physiotherapy"];
  if (cat.includes("orthopedic")) return ["manual-therapy", "physiotherapy"];
  if (cat.includes("spine")) return ["manual-therapy"];
  if (cat.includes("women")) return ["womens-health"];
  if (cat.includes("neuro")) return ["neurological-rehabilitation"];
  if (cat.includes("pediatric")) return ["pediatric-physiotherapy"];
  if (cat.includes("geriatric")) return ["geriatric-physiotherapy"];
  return ["physiotherapy"];
}

// ─── Step Progress Bar ────────────────────────────────────────────────────────

function StepBar({ step, labels, onGoToStep }: {
  step: number;
  labels: string[];
  onGoToStep: (s: number) => void;
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      {labels.map((label, i) => {
        const idx = i + 1;
        const done = step > idx;
        const active = step === idx;
        return (
          <div key={i} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <button
                onClick={() => done && onGoToStep(idx)}
                disabled={!done}
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
                style={{
                  background: done || active ? "var(--color-brand-purple)" : "#F1F5F9",
                  color: done || active ? "white" : "#9CA3AF",
                  boxShadow: active ? "0 0 0 4px rgba(var(--color-brand-purple-rgb),0.15)" : "none",
                  cursor: done ? "pointer" : "default",
                }}
              >
                {done ? <CheckCircle2 size={16} /> : idx}
              </button>
              <span
                className="text-[10px] font-semibold uppercase tracking-wide hidden sm:block"
                style={{ color: active || done ? "var(--color-brand-purple)" : "#9CA3AF" }}
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

// ─── Selection chips — shows what's been picked so far ───────────────────────

function SelectionChips({
  step, selectedService, selectedPackage, selectedTherapist, selectedDate, selectedTime, isAr, onGoToStep,
}: {
  step: number;
  selectedService: Service | null;
  selectedPackage: Package | null;
  selectedTherapist: Therapist | null;
  selectedDate: Date | null;
  selectedTime: string | null;
  isAr: boolean;
  onGoToStep: (s: number) => void;
}) {
  const chips: { targetStep: number; icon: React.ReactElement; label: string }[] = [];

  if (step > 1 && (selectedPackage || selectedService)) {
    chips.push({
      targetStep: 1,
      icon: selectedPackage ? <ShoppingBag size={11} /> : <Stethoscope size={11} />,
      label: selectedPackage 
        ? (isAr ? selectedPackage.name.ar : selectedPackage.name.en)
        : (selectedService ? (isAr ? selectedService.name.ar : selectedService.name.en) : ""),
    });
  }
  if (step > 2) {
    chips.push({
      targetStep: 2,
      icon: <User size={11} />,
      label: selectedTherapist
        ? (isAr ? selectedTherapist.name.ar : selectedTherapist.name.en)
        : (isAr ? "أي معالج" : "Any therapist"),
    });
  }
  if (step > 3 && selectedDate) {
    const dateLabel = selectedDate.toLocaleDateString(isAr ? "ar-SA" : "en-US", { weekday: "short", month: "short", day: "numeric" });
    chips.push({
      targetStep: 3,
      icon: <Calendar size={11} />,
      label: selectedTime ? `${dateLabel} · ${selectedTime}` : dateLabel,
    });
  }

  if (!chips.length) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-6 pb-5 border-b border-gray-100">
      {chips.map((chip, i) => (
        <button
          key={i}
          onClick={() => onGoToStep(chip.targetStep)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:opacity-75 active:scale-95"
          style={{ background: "rgba(var(--color-brand-purple-rgb),0.08)", color: "var(--color-brand-purple)" }}
        >
          {chip.icon}
          <span>{chip.label}</span>
          <Pencil size={9} className="opacity-50 ml-0.5" />
        </button>
      ))}
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
          className="flex-1 inline-flex items-center justify-center gap-2 pl-6 pr-2 py-2.5 rounded-xl font-semibold text-sm transition-all group"
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

export function BookingFlow({ locale, branch, services, packages, therapists }: BookingFlowProps) {
  const searchParams = useSearchParams();
  const isAr = locale === "ar";

  const [step, setStep] = useState(1);
  const [activeTab, setActiveTab] = useState<"packages" | "services">("packages");
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(
    (() => { const p = searchParams?.get("package"); return p ? (packages.find((x) => x.slug === p) ?? null) : null; })()
  );
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
    ? ["الباقة", "المعالج", "الموعد", "التفاصيل", "تأكيد"]
    : ["Package", "Therapist", "Schedule", "Details", "Confirm"];

  function resetAll() {
    setStep(1);
    setSelectedPackage(null);
    setSelectedService(null);
    setSelectedTherapist(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setForm({ name: "", phone: "", email: "", notes: "" });
    setSubmitted(false);
  }

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

        <div className="grid grid-cols-2 gap-3 mb-8 text-left">
          {[
            { 
              label: isAr ? "الاختيار" : "Selection", 
              value: selectedPackage 
                ? (isAr ? selectedPackage.name.ar : selectedPackage.name.en) 
                : (selectedService ? (isAr ? selectedService.name.ar : selectedService.name.en) : "—") 
            },
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
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90 mb-4"
          style={{ background: "#25D366" }}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          {isAr ? "تواصل عبر واتساب" : "Chat on WhatsApp"}
        </a>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={resetAll}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
            style={{ background: "rgba(var(--color-brand-purple-rgb),0.08)", color: "var(--color-brand-purple)" }}
          >
            {isAr ? "حجز موعد آخر" : "Book Another Appointment"}
          </button>
          <a
            href={`/${locale}`}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-gray-100 text-center"
            style={{ background: "#F1F5F9", color: "#6B7280" }}
          >
            {isAr ? "العودة للرئيسية" : "Back to Home"}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 md:p-10 border border-gray-100">
      <StepBar step={step} labels={stepLabels} onGoToStep={setStep} />

      <SelectionChips
        step={step}
        selectedService={selectedService}
        selectedPackage={selectedPackage}
        selectedTherapist={selectedTherapist}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        isAr={isAr}
        onGoToStep={setStep}
      />

      {/* ── Step 1: Package Selection ──────────────────────────────────── */}
      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1" style={{ color: "#1a1a2e" }}>
                {isAr ? "اختر باقتك العلاجية" : "Choose Your Package"}
              </h2>
              <p className="text-sm font-medium" style={{ color: "#6B7280" }}>
                {isAr ? "باقات مصممة لنتائج أسرع وتوفير أكبر" : "Clinically designed for faster recovery and better value"}
              </p>
            </div>
          </div>

          <div className="flex gap-1 p-1 rounded-xl bg-gray-100 mb-8 w-fit">
            <button
              onClick={() => setActiveTab("packages")}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "packages" ? "bg-white text-[var(--color-brand-purple)] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              {isAr ? "الباقات" : "Packages"}
            </button>
            <button
              onClick={() => setActiveTab("services")}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "services" ? "bg-white text-[var(--color-brand-purple)] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              {isAr ? "جلسات فردية" : "Single Sessions"}
            </button>
          </div>

          {activeTab === "packages" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {packages.map((pkg) => {
                const isSelected = selectedPackage?.id === pkg.id;
                return (
                  <button
                    key={pkg.id}
                    onClick={() => { setSelectedPackage(pkg); setSelectedService(null); setStep(2); }}
                    className="group relative text-left rounded-2xl border-2 transition-all duration-300 hover:shadow-xl overflow-hidden"
                    style={{
                      background: isSelected ? "rgba(var(--color-brand-purple-rgb),0.02)" : "white",
                      borderColor: isSelected ? "var(--color-brand-purple)" : "#F1F5F9",
                    }}
                  >
                    {pkg.badge && (
                      <div 
                        className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider z-10"
                        style={{ background: "var(--color-brand-green)", color: "white" }}
                      >
                        {isAr ? pkg.badge.ar : pkg.badge.en}
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                          style={{ background: isSelected ? "rgba(var(--color-brand-purple-rgb),0.1)" : "#F8FAFC" }}
                        >
                          <ShoppingBag size={22} style={{ color: "var(--color-brand-purple)" }} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg leading-tight mb-1" style={{ color: "#1a1a2e" }}>
                            {isAr ? pkg.name.ar : pkg.name.en}
                          </h3>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1 text-xs font-bold" style={{ color: "var(--color-brand-purple)" }}>
                              <Sparkles size={12} />
                              {pkg.sessions} {isAr ? "جلسة" : "Sessions"}
                            </span>
                            {pkg.validityDays && (
                              <span className="text-[10px] text-gray-400 font-bold uppercase">
                                {isAr ? `صلاحية ${pkg.validityDays} يوم` : `${pkg.validityDays} Days Validity`}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm leading-relaxed mb-6 line-clamp-2" style={{ color: "#6B7280" }}>
                        {isAr ? pkg.description.ar : pkg.description.en}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                        <div className="flex items-center gap-2">
                          {pkg.tamaraEligible && (
                            <div className="px-2 py-1 rounded bg-[#F8FAFC] flex items-center gap-1">
                              <CreditCard size={10} className="text-gray-400" />
                              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-tight">Tamara</span>
                            </div>
                          )}
                          {pkg.tabbyEligible && (
                            <div className="px-2 py-1 rounded bg-[#F8FAFC] flex items-center gap-1">
                              <CreditCard size={10} className="text-gray-400" />
                              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-tight">Tabby</span>
                            </div>
                          )}
                        </div>
                        <ChevronRight 
                          size={18} 
                          className={`transition-transform duration-300 ${isSelected ? "translate-x-1" : "text-gray-300 group-hover:translate-x-1"}`} 
                          style={{ color: isSelected ? "var(--color-brand-purple)" : undefined }}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services.map((service) => {
                const Icon = serviceIconMap[service.icon] ?? Stethoscope;
                const isSelected = selectedService?.id === service.id;
                return (
                  <button
                    key={service.id}
                    onClick={() => { setSelectedService(service); setSelectedPackage(null); setStep(2); }}
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
          )}
        </div>
      )}

      {/* ── Step 2: Therapist ───────────────────────────────────────────── */}
      {step === 2 && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="flex items-center gap-3 mb-1">
            <User size={20} style={{ color: "var(--color-brand-purple)" }} />
            <h2 className="text-xl font-bold" style={{ color: "#1a1a2e" }}>
              {isAr ? "اختر طبيبك" : "Choose Your Specialist"}
            </h2>
          </div>
          <p className="text-sm mb-6" style={{ color: "#6B7280" }}>
            {isAr ? "نخبة من الأخصائيين المعتمدين لضمان أفضل نتائج علاجية" : "Certified experts dedicated to your recovery and well-being"}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {therapists
              .sort((a, b) => b.rating - a.rating)
              .map((therapist) => {
                const isSelected = selectedTherapist?.id === therapist.id;
                // Highlight if specialization matches selected package/service
                const categoryMatch = selectedPackage 
                  ? therapist.specializations.some(s => pkgToSpecialization(selectedPackage.category).includes(s))
                  : selectedService 
                    ? therapist.specializations.includes(selectedService.slug)
                    : false;

                return (
                  <button
                    key={therapist.id}
                    onClick={() => { setSelectedTherapist(therapist); setStep(3); }}
                    className="group relative text-left p-4 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg overflow-hidden"
                    style={{
                      background: isSelected ? "rgba(var(--color-brand-purple-rgb),0.02)" : "white",
                      borderColor: isSelected ? "var(--color-brand-purple)" : "#F1F5F9",
                    }}
                  >
                    {categoryMatch && (
                      <div className="absolute top-0 right-0 p-2">
                        <div className="px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider text-white" style={{ background: "var(--color-brand-purple)" }}>
                          {isAr ? "موصى به" : "Recommended"}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0 overflow-hidden shadow-inner"
                          style={{ background: "linear-gradient(135deg, var(--color-brand-purple), var(--color-brand-green))" }}
                        >
                          {therapist.image ? (
                            <Image src={therapist.image} alt={therapist.initials} width={64} height={64} className="object-cover w-full h-full transition-transform group-hover:scale-110" unoptimized />
                          ) : (
                            therapist.initials
                          )}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-white border-2 border-white flex items-center justify-center shadow-sm">
                          <CheckCircle2 size={12} className="text-[var(--color-brand-green)]" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm mb-0.5 truncate" style={{ color: "#1a1a2e" }}>
                          {isAr ? therapist.name.ar : therapist.name.en}
                        </h4>
                        <p className="text-[10px] font-medium mb-2 uppercase tracking-wide" style={{ color: "var(--color-brand-purple)" }}>
                          {isAr ? therapist.title.ar : therapist.title.en}
                        </p>
                        <div className="flex items-center gap-1.5">
                          <div className="flex items-center gap-0.5">
                            <Star size={10} fill="var(--color-brand-green)" color="var(--color-brand-green)" />
                            <span className="text-xs font-bold" style={{ color: "#1a1a2e" }}>{therapist.rating}</span>
                          </div>
                          <span className="text-gray-200">|</span>
                          <span className="text-[10px] font-semibold text-gray-400">
                            {therapist.yearsExp}+ {isAr ? "سنوات خبرة" : "Yrs Exp"}
                          </span>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-gray-300 transition-transform group-hover:translate-x-1" />
                    </div>
                  </button>
                );
              })}
          </div>

          <button
            onClick={() => { setSelectedTherapist(null); setStep(3); }}
            className="w-full py-4 rounded-2xl text-sm font-bold border-2 border-dashed transition-all hover:bg-gray-50 flex items-center justify-center gap-3"
            style={{
              borderColor: "#E5E7EB",
              color: "#6B7280",
            }}
          >
            <ShieldCheck size={18} className="text-gray-400" />
            {isAr ? "اختيار تلقائي لأول معالج متاح" : "Auto-assign first available therapist"}
          </button>

          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-2.5 rounded-xl text-sm font-bold transition-all hover:bg-gray-100 flex items-center gap-2"
              style={{ background: "#F1F5F9", color: "#6B7280" }}
            >
              {isAr ? "→ عودة" : "← Back"}
            </button>
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <span>Step 2 of 5</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Step 3: Date & Time ─────────────────────────────────────────── */}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-bold mb-1" style={{ color: "#1a1a2e" }}>
            {isAr ? "اختر الموعد" : "Choose Date & Time"}
          </h2>
          <p className="text-sm mb-6" style={{ color: "#6B7280" }}>
            {isAr ? "الجمعة مغلق · اختر التاريخ ثم الوقت" : "Fridays closed · Select a date then pick a time"}
          </p>

          {/* Month context label */}
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={13} style={{ color: "#9CA3AF" }} />
            <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#9CA3AF" }}>
              {days14[0].toLocaleDateString(isAr ? "ar-SA" : "en-US", { month: "long", year: "numeric" })}
            </span>
          </div>

          {/* Date scroll */}
          <div className="mb-6 overflow-x-auto -mx-1 px-1 pb-2">
            <div className="flex gap-2" style={{ minWidth: "max-content" }}>
              {days14.map((day, i) => {
                const dayName = isAr ? DAYS.ar[day.getDay()] : DAYS.en[day.getDay()];
                const isFri = day.getDay() === 5;
                const isSelected = selectedDate?.toDateString() === day.toDateString();
                const showMonthBadge = i > 0 && day.getDate() === 1;
                return (
                  <div key={i} className="flex flex-col items-center">
                    {showMonthBadge && (
                      <span className="text-[8px] font-bold uppercase mb-1 px-1.5 py-0.5 rounded" style={{ background: "#F1F5F9", color: "#6B7280" }}>
                        {day.toLocaleDateString("en-US", { month: "short" })}
                      </span>
                    )}
                    <button
                      onClick={() => { if (!isFri) { setSelectedDate(day); setSelectedTime(null); } }}
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
                  </div>
                );
              })}
            </div>
          </div>

          {/* Time slots or prompt */}
          {selectedDate ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "#9CA3AF" }}>
                {isAr ? "المواعيد المتاحة" : "Available Times"}
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {TIME_SLOTS.map((time) => {
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className="py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
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
          ) : (
            <div
              className="flex items-center justify-center gap-2 py-10 rounded-xl border border-dashed text-sm"
              style={{ borderColor: "#E5E7EB", color: "#9CA3AF" }}
            >
              <Calendar size={15} />
              {isAr ? "اختر تاريخاً لعرض المواعيد المتاحة" : "Pick a date above to see available times"}
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
          <p className="text-sm mb-6" style={{ color: "#6B7280" }}>
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
                  style={{ background: "white", border: "1.5px solid #E5E7EB", color: "#1a1a2e" }}
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
                placeholder={isAr ? "تاريخ الإصابة، مزود التأمين..." : "Injury history, insurance provider..."}
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
          <p className="text-sm mb-6" style={{ color: "#6B7280" }}>
            {isAr ? "تحقق من بياناتك — يمكنك تعديل أي حقل قبل التأكيد" : "Check your details — tap Edit on any row to change it"}
          </p>

          <div className="rounded-2xl overflow-hidden border border-gray-100 mb-6">
            {[
              { 
                icon: <ShoppingBag size={15} />, 
                label: isAr ? "الاختيار" : "Selection", 
                value: selectedPackage 
                  ? (isAr ? selectedPackage.name.ar : selectedPackage.name.en) 
                  : (selectedService ? (isAr ? selectedService.name.ar : selectedService.name.en) : "—"), 
                editStep: 1 
              },
              { icon: <User size={15} />, label: isAr ? "المعالج" : "Therapist", value: selectedTherapist ? (isAr ? selectedTherapist.name.ar : selectedTherapist.name.en) : (isAr ? "أي معالج متاح" : "Any available"), editStep: 2 },
              { icon: <Calendar size={15} />, label: isAr ? "التاريخ" : "Date", value: selectedDate?.toLocaleDateString(isAr ? "ar-SA" : "en-US", { weekday: "long", month: "long", day: "numeric" }) ?? "—", editStep: 3 },
              { icon: <Clock size={15} />, label: isAr ? "الوقت" : "Time", value: selectedTime ?? "—", editStep: 3 },
              { icon: <User size={15} />, label: isAr ? "الاسم" : "Name", value: form.name, editStep: 4 },
              { icon: <User size={15} />, label: isAr ? "الجوال" : "Mobile", value: form.phone, editStep: 4 },
            ].map((row, i, arr) => (
              <div
                key={i}
                className="flex items-center gap-4 px-5 py-4"
                style={{ borderBottom: i < arr.length - 1 ? "1px solid #F1F5F9" : "none" }}
              >
                <span style={{ color: "var(--color-brand-purple)" }}>{row.icon}</span>
                <span className="text-xs font-semibold w-20 flex-shrink-0" style={{ color: "#9CA3AF" }}>{row.label}</span>
                <span className="text-sm font-medium flex-1 min-w-0 truncate" style={{ color: "#1a1a2e" }}>{row.value}</span>
                <button
                  onClick={() => setStep(row.editStep)}
                  className="text-xs font-semibold px-2.5 py-1 rounded-lg transition-all hover:opacity-80 flex-shrink-0"
                  style={{ background: "rgba(var(--color-brand-purple-rgb),0.08)", color: "var(--color-brand-purple)" }}
                >
                  {isAr ? "تعديل" : "Edit"}
                </button>
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

"use client";

import { useRef } from "react";
import Image from "next/image";
import { Users, Star, MapPin, UserRound, Activity, LucideIcon } from "lucide-react";
import { Counter } from "@/components/common/Counter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// ─── Types ───────────────────────────────────────────────────────────────────

type IconKey = "users" | "therapist" | "star" | "map-pin" | "activity";

interface StatCardProps {
  icon: IconKey;
  value: number;
  suffix?: string;
  label?: { en: string; ar: string };
  sub?: { en: string; ar: string };
  decimals?: number;
  noBackground?: boolean;
  className?: string;
  locale: string;
}

interface ImageCardProps {
  src: string;
  alt?: string;
  className?: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const iconMap: Record<IconKey, LucideIcon> = {
  users: Users,
  therapist: UserRound,
  star: Star,
  "map-pin": MapPin,
  activity: Activity,
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function StarRating({ value, locale }: { value: number; locale: string }) {
  const full = Math.floor(value);
  return (
    <div className="flex gap-1 items-center justify-center mb-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill={i < full ? "var(--color-brand-green)" : "none"}
          stroke="var(--color-brand-green)"
          strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span className="text-xl font-black ml-2 text-[#0B162C]">
        <Counter end={value} decimals={1} />
      </span>
    </div>
  );
}

function StatCard({ icon, value, suffix = "", label, sub, decimals = 0, noBackground = false, className = "", locale }: StatCardProps) {
  const Icon = iconMap[icon];
  const isRating = icon === "star";

  return (
    <div
      className={`stat-card opacity-0 rounded-[2rem] flex flex-col items-center justify-center gap-3 min-h-[220px] p-8 transition-all duration-300 hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.08)] hover:-translate-y-2 border border-gray-100 ${
        noBackground ? "bg-transparent border-none shadow-none hover:shadow-none hover:translate-y-0" : "bg-white"
      } ${className}`}
    >
      {isRating ? (
        <>
          <StarRating value={value} locale={locale} />
          {sub && (
            <p className="text-sm font-bold text-center leading-relaxed text-gray-400 mt-2">
              {locale === "ar" ? sub.ar : sub.en}
            </p>
          )}
        </>
      ) : (
        <>
          {Icon && (
            <div className="mb-2 w-16 h-16 rounded-full bg-brand-purple/5 flex items-center justify-center text-brand-purple">
              <Icon size={32} strokeWidth={2} />
            </div>
          )}
          <span className="font-black text-[42px] md:text-[48px] leading-[1] text-[#0B162C]">
            <Counter end={value} decimals={decimals} />
            <span className="text-brand-purple">{suffix}</span>
          </span>
          {label && (
            <span className="text-sm font-bold text-gray-500 mt-1 uppercase tracking-wider">
              {locale === "ar" ? label.ar : label.en}
            </span>
          )}
        </>
      )}
    </div>
  );
}

function ImageCard({ src, alt = "PhysioTrio", className = "" }: ImageCardProps) {
  return (
    <div
      className={`stat-card opacity-0 rounded-[2rem] overflow-hidden min-h-[220px] relative group border border-gray-100 shadow-sm ${className}`}
    >
      <Image src={src} alt={alt} fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
      <div className="absolute inset-0 bg-brand-purple/10 mix-blend-multiply group-hover:bg-brand-purple/0 transition-all duration-500" />
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function StatsSection({ locale }: { locale: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isAr = locale === "ar";

  useGSAP(() => {
    gsap.fromTo(
      ".stat-card",
      { opacity: 0, scale: 0.9, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.2)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-[#f8fcfb] py-24 px-4 md:px-6 overflow-x-hidden border-t border-gray-200/60">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

        {/* ── Row 1 ── */}

        {/* Title card — spans 2 cols */}
        <div
          className="stat-card opacity-0 rounded-[2rem] p-8 md:p-12 flex flex-col justify-center col-span-1 sm:col-span-2 min-h-[220px]"
          style={{ background: "linear-gradient(135deg, #0B162C 0%, #1a2a4c 100%)" }}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest mb-4 w-max px-3 py-1 rounded-full bg-brand-purple/20 text-white">
            {isAr ? "الإحصائيات" : "Platform Stats"}
          </span>
          <h2 className="text-white font-black text-3xl md:text-4xl leading-tight mb-4">
            {isAr ? "رحلتنا بالأرقام" : "Our Journey in Numbers"}
          </h2>
          <p className="text-white/70 text-base font-medium leading-relaxed">
            {isAr
              ? "من الرياض إلى مكة، نمت فيزيوتريو لتصبح شبكة العلاج الطبيعي الأكثر ثقة في المملكة، بدعم من مجموعة برجيل القابضة."
              : "From Riyadh to Makkah, PhysioTrio has grown into Saudi Arabia's most trusted physiotherapy network — backed by Burjeel Holdings."}
          </p>
        </div>

        {/* Patients */}
        <StatCard
          locale={locale}
          icon="users"
          value={10}
          suffix="K+"
          label={{ en: "Patients Treated", ar: "مريض تلقى العلاج" }}
        />

        {/* Image 1 */}
        <ImageCard
          src="https://static.zawya.com/view/acePublic/alias/contentid/cbec1451-ab27-4cfd-aa7d-851f20a53c55/0/erabianetwork-jpg.webp?f=3%3A2&q=0.75&w=1920"
          alt="PhysioTrio clinic session"
        />

        {/* Therapists */}
        <StatCard
          locale={locale}
          icon="therapist"
          value={50}
          suffix="+"
          label={{ en: "Expert Therapists", ar: "معالج متخصص" }}
        />

        {/* ── Row 2 ── */}

        {/* Years of experience */}
        <StatCard
          locale={locale}
          icon="activity"
          value={22}
          suffix="+"
          label={{ en: "Years Experience", ar: "سنة خبرة" }}
        />

        {/* Rating — spans 2, no background */}
        <StatCard
          locale={locale}
          icon="star"
          value={4.8}
          decimals={1}
          noBackground
          className="col-span-1 sm:col-span-2"
          sub={{
            en: "Based on 500+ Google reviews. Patients across KSA love our care.",
            ar: "بناءً على أكثر من 500 تقييم. مرضانا في المملكة يثقون بخدماتنا.",
          }}
        />

        {/* Branches */}
        <StatCard
          locale={locale}
          icon="map-pin"
          value={3}
          label={{ en: "KSA Branches", ar: "فروع في المملكة" }}
        />

        {/* Image 2 */}
        <ImageCard
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80"
          alt="Physiotherapy session"
        />
      </div>
    </section>
  );
}

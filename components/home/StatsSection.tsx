"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Star, MapPin, UserRound, Activity, LucideIcon } from "lucide-react";
import { Counter } from "@/components/common/Counter";

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
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill={i < full ? "#1F2937" : "none"}
          stroke="#1F2937"
          strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span className="text-base font-bold ml-1 text-slate-800">
        <Counter end={value} decimals={1} />
      </span>
    </div>
  );
}

function StatCard({ icon, value, suffix = "", label, sub, decimals = 0, noBackground = false, className = "", locale }: StatCardProps) {
  const Icon = iconMap[icon];
  const isRating = icon === "star";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.1 }}
      whileHover={{ y: -5, boxShadow: "0 12px 28px -5px rgba(0,0,0,0.09)" }}
      className={`rounded-2xl flex flex-col items-center justify-center gap-2 min-h-[180px] p-8 transition-shadow duration-300 ${
        noBackground ? "bg-transparent" : "bg-[#F1F5F9]"
      } ${className}`}
    >
      {isRating ? (
        <>
          <StarRating value={value} locale={locale} />
          {sub && (
            <p className="text-sm text-center leading-relaxed" style={{ color: "#6B7280" }}>
              {locale === "ar" ? sub.ar : sub.en}
            </p>
          )}
        </>
      ) : (
        <>
          {Icon && (
            <div className="mb-1">
              <Icon size={40} style={{ color: "var(--color-brand-purple)" }} strokeWidth={1.25} />
            </div>
          )}
          <span className="font-bold text-[36px] md:text-[40px] leading-tight text-black tabular-nums">
            <Counter end={value} decimals={decimals} />
            {suffix}
          </span>
          {label && (
            <span className="text-base font-medium text-black mt-0.5">
              {locale === "ar" ? label.ar : label.en}
            </span>
          )}
        </>
      )}
    </motion.div>
  );
}

function ImageCard({ src, alt = "PhysioTrio", className = "" }: ImageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className={`rounded-2xl overflow-hidden min-h-[180px] relative cursor-pointer transition-transform duration-300 ${className}`}
    >
      <Image src={src} alt={alt} fill className="object-cover" />
    </motion.div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function StatsSection({ locale }: { locale: string }) {
  const isAr = locale === "ar";

  return (
    <section className="bg-white py-12 md:py-24 px-4 md:px-6 overflow-x-hidden">
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">

        {/* ── Row 1 ── */}

        {/* Title card — spans 2 cols */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="bg-[var(--color-dark-surface)] rounded-[20px] p-6 md:p-8 flex flex-col justify-center col-span-1 sm:col-span-2 min-h-[160px] md:min-h-[200px]"
        >
          <h2 className="text-white font-bold text-[28px] md:text-[32px] leading-tight mb-3">
            {isAr ? "رحلتنا بالأرقام" : "Our Journey in Numbers"}
          </h2>
          <p className="text-white/70 text-base leading-relaxed">
            {isAr
              ? "من الرياض إلى مكة، نمت فيزيوتريو لتصبح شبكة العلاج الطبيعي الأكثر ثقة في المملكة، بدعم من مجموعة برجيل القابضة."
              : "From Riyadh to Makkah, PhysioTrio has grown into Saudi Arabia's most trusted physiotherapy network — backed by Burjeel Holdings."}
          </p>
        </motion.div>

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
          value={36}
          suffix="+"
          label={{ en: "Expert Therapists", ar: "معالج متخصص" }}
        />

        {/* ── Row 2 ── */}

        {/* Years of experience */}
        <StatCard
          locale={locale}
          icon="activity"
          value={13}
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
            en: "Based on 500+ Google reviews\nPatients across KSA love our care",
            ar: "بناءً على أكثر من 500 تقييم\nمرضانا في المملكة يثقون بخدماتنا",
          }}
        />

        {/* Branches */}
        <StatCard
          locale={locale}
          icon="map-pin"
          value={2}
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

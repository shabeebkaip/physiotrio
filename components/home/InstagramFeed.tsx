"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ExternalLink, Play } from "lucide-react";
import type { InstagramAsset } from "@/lib/utils/getInstagramAssets";

// ── Instagram icon (not in this lucide-react version) ────────────────────────

function IgIcon({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// ── Supplementary images (shown when folder has fewer than 9 assets) ──────────

const supplementary: InstagramAsset[] = [
  { type: "image", src: "https://physiotherabia.com/wp-content/uploads/2023/08/Sports-Rehabilitation.jpg" },
  { type: "image", src: "https://physiotherabia.com/wp-content/uploads/2023/11/Nuro-Rehab-Package-2-1.jpg" },
  { type: "image", src: "https://physiotherabia.com/wp-content/uploads/2023/06/1000x325_Walk-Bot.jpg" },
  { type: "image", src: "https://physiotherabia.com/wp-content/uploads/2023/11/INVIDUAL-SESSION-300x300-1.jpg" },
  { type: "image", src: "https://physiotherabia.com/wp-content/uploads/2023/11/Occupational-Therapy_Sensory-Room-Session-1.jpg" },
  { type: "image", src: "https://physiotherabia.com/wp-content/uploads/2025/08/Home-Physio.png" },
  { type: "image", src: "https://physiotherabia.com/wp-content/uploads/2023/11/display-pic-1.jpg" },
  { type: "image", src: "https://physiotherabia.com/wp-content/uploads/2023/07/B-PH03-1.jpg" },
  { type: "image", src: "https://physiotherabia.com/wp-content/uploads/2025/11/WhatsApp-Image-2025-10-28-at-9.54.18-AM-3.jpeg" },
];

// ── Video tile ────────────────────────────────────────────────────────────────

function VideoTile({ src }: { src: string }) {
  return (
    <div className="relative w-full h-full">
      <video
        src={src}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play()}
        onMouseLeave={(e) => {
          const v = e.currentTarget as HTMLVideoElement;
          v.pause();
          v.currentTime = 0;
        }}
      />
      {/* Play indicator — fades when video plays */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0"
        style={{ background: "rgba(0,0,0,0.28)" }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.92)" }}
        >
          <Play size={20} style={{ color: "var(--color-brand-purple)" }} fill="currentColor" />
        </div>
      </div>
    </div>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────────

interface InstagramFeedProps {
  locale: string;
  /** Passed from the server component after reading public/instagram/ */
  localPosts: InstagramAsset[];
}

// ── Main component ────────────────────────────────────────────────────────────

export function InstagramFeed({ locale, localPosts }: InstagramFeedProps) {
  const isAr = locale === "ar";

  // Local assets first, then fill up to 9 with supplementary
  const grid = [
    ...localPosts,
    ...supplementary,
  ].slice(0, 9);

  const localCount = localPosts.length;

  return (
    <section className="py-14 sm:py-20" style={{ background: "var(--color-surface-light)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-10 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <IgIcon size={20} color="var(--color-brand-purple)" />
              <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: "var(--color-brand-purple)" }}>
                {isAr ? "تابع رحلتنا" : "Follow Our Journey"}
              </h2>
            </div>
            <a
              href="https://www.instagram.com/physiotrio/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-semibold hover:underline"
              style={{ color: "var(--color-brand-green)" }}
            >
              <Heart size={14} fill="currentColor" />
              @physiotrio
            </a>
          </div>

          <a
            href="https://www.instagram.com/physiotrio/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border-2 transition-all hover:scale-105"
            style={{ borderColor: "var(--color-brand-purple)", color: "var(--color-brand-purple)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--color-brand-purple)";
              (e.currentTarget as HTMLElement).style.color = "white";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "var(--color-brand-purple)";
            }}
          >
            <IgIcon size={15} />
            {isAr ? "تابعنا على انستغرام" : "Follow @physiotrio"}
          </a>
        </motion.div>

        {/* 3×3 grid */}
        <div className="grid grid-cols-3 gap-1 sm:gap-2">
          {grid.map((post, i) => (
            <motion.a
              key={i}
              href="https://www.instagram.com/physiotrio/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden rounded-lg sm:rounded-xl group"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              {post.type === "video" ? (
                <VideoTile src={post.src} />
              ) : (
                <Image
                  src={post.src}
                  alt="PhysioTrio Instagram"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 25vw"
                  unoptimized={post.src.startsWith("http")}
                />
              )}

              {/* Hover overlay for image tiles */}
              {post.type === "image" && (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ background: "rgba(var(--color-brand-purple-rgb),0.72)" }}
                >
                  <Heart size={24} color="white" fill="white" />
                  <ExternalLink size={14} color="rgba(255,255,255,0.8)" />
                </div>
              )}

              {/* Badge on real local posts */}
              {i < localCount && post.type === "image" && (
                <div
                  className="absolute top-2 left-2 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.9)" }}
                >
                  <IgIcon size={10} color="var(--color-brand-purple)" />
                </div>
              )}
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <p className="text-center mt-5 text-xs sm:text-sm font-light" style={{ color: "#9CA3AF" }}>
          {isAr
            ? "تابعنا على انستغرام للحصول على نصائح يومية وتحديثات العيادة"
            : "Follow us on Instagram for daily tips and clinic updates"}
        </p>
      </div>
    </section>
  );
}

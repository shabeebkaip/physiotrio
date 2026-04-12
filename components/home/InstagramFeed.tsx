"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ExternalLink } from "lucide-react";

interface InstagramFeedProps {
  locale: string;
}

const fallbackImages = [
  {
    src: "https://physiotherabia.com/wp-content/uploads/2023/08/Sports-Rehabilitation.jpg",
    alt: "Sports Physiotherapy at PhysioTrio",
    url: "https://www.instagram.com/physiotrio/",
  },
  {
    src: "https://physiotherabia.com/wp-content/uploads/2023/11/display-pic-1.jpg",
    alt: "PhysioTrio Clinic Session",
    url: "https://www.instagram.com/physiotrio/",
  },
  {
    src: "https://physiotherabia.com/wp-content/uploads/2023/11/Nuro-Rehab-Package-2-1.jpg",
    alt: "Neurological Rehabilitation at PhysioTrio",
    url: "https://www.instagram.com/physiotrio/",
  },
  {
    src: "https://physiotherabia.com/wp-content/uploads/2025/08/Home-Physio.png",
    alt: "Home Physiotherapy Service",
    url: "https://www.instagram.com/physiotrio/",
  },
  {
    src: "https://physiotherabia.com/wp-content/uploads/2023/11/INVIDUAL-SESSION-300x300-1.jpg",
    alt: "Individual Physiotherapy Session",
    url: "https://www.instagram.com/physiotrio/",
  },
  {
    src: "https://physiotherabia.com/wp-content/uploads/2023/06/1000x325_Walk-Bot.jpg",
    alt: "Lokomat Robotic Rehabilitation",
    url: "https://www.instagram.com/physiotrio/",
  },
  {
    src: "https://physiotherabia.com/wp-content/uploads/2023/07/B-PH03-1.jpg",
    alt: "PhysioTrio Clinic",
    url: "https://www.instagram.com/physiotrio/",
  },
  {
    src: "https://physiotherabia.com/wp-content/uploads/2025/11/WhatsApp-Image-2025-10-28-at-9.54.18-AM-3.jpeg",
    alt: "PhysioTrio Partnership with Bupa Arabia",
    url: "https://www.instagram.com/physiotrio/",
  },
  {
    src: "https://physiotherabia.com/wp-content/uploads/2023/11/Occupational-Therapy_Sensory-Room-Session-1.jpg",
    alt: "Pediatric Therapy Sensory Room",
    url: "https://www.instagram.com/physiotrio/",
  },
];

export function InstagramFeed({ locale }: InstagramFeedProps) {
  return (
    <section className="py-20" style={{ background: "#f8fafb" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-3xl font-extrabold mb-1" style={{ color: "#077688" }}>
              {locale === "ar" ? "تابع رحلتنا" : "Follow Our Journey"}
            </h2>
            <a
              href="https://www.instagram.com/physiotrio/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-base font-semibold hover:underline"
              style={{ color: "#4caf50" }}
            >
              <Heart size={18} />
              @physiotrio
            </a>
          </div>
          <a
            href="https://www.instagram.com/physiotrio/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border transition-all hover:scale-105"
            style={{ borderColor: "#077688", color: "#077688" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#4caf50";
              (e.currentTarget as HTMLElement).style.borderColor = "#4caf50";
              (e.currentTarget as HTMLElement).style.color = "white";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.borderColor = "#077688";
              (e.currentTarget as HTMLElement).style.color = "#077688";
            }}
          >
            <Heart size={16} />
            {locale === "ar" ? "تابعنا على انستغرام ←" : "Follow @physiotrio →"}
          </a>
        </motion.div>

        {/* 3×3 Grid */}
        <div className="grid grid-cols-3 gap-1 sm:gap-2">
          {fallbackImages.map((img, i) => (
            <motion.a
              key={i}
              href={img.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden rounded-lg group"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 33vw, 25vw"
                unoptimized
              />
              {/* Hover overlay */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{ background: "rgba(7,118,136,0.75)" }}
              >
                <Heart size={28} color="white" />
                <span className="text-white text-xs font-semibold text-center px-2">
                  {locale === "ar" ? "عرض على انستغرام" : "View on Instagram"}
                </span>
                <ExternalLink size={14} color="rgba(255,255,255,0.7)" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom caption */}
        <p className="text-center mt-6 text-sm font-light" style={{ color: "#888" }}>
          {locale === "ar"
            ? "تابعنا على انستغرام للحصول على نصائح يومية وتحديثات العيادة"
            : "Follow us on Instagram for daily tips and clinic updates"}
        </p>
      </div>
    </section>
  );
}

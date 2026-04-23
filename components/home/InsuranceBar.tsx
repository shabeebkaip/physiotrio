"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") gsap.registerPlugin(useGSAP);

interface InsuranceBarProps {
  label: string;
}

const insurers = [
  "Bupa Arabia",
  "Tawuniya",
  "MedNet",
  "AXA Cooperative",
  "NEXT by AXA",
  "Al Rajhi Takaful",
  "GIG Gulf",
  "Daman",
  "Oman Insurance",
  "Walaa",
];

export function InsuranceBar({ label }: InsuranceBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;
    const totalWidth = marquee.scrollWidth / 2;
    gsap.to(marquee, {
      x: `-=${totalWidth}`,
      duration: 38,
      ease: "none",
      repeat: -1,
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="border-y border-gray-100 bg-white py-8 overflow-hidden"
    >
      {/* Label */}
      <p className="text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-400 mb-6">
        {label}
      </p>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        <div ref={marqueeRef} className="flex items-center gap-12 w-max">
          {[...insurers, ...insurers].map((name, i) => (
            <span
              key={i}
              className="text-sm font-medium text-gray-400 whitespace-nowrap px-2"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

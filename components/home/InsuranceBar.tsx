"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

interface InsuranceBarProps { label: string; }

const insurers = [
  "Bupa Arabia", "Tawuniya", "MedNet", "AXA Cooperative",
  "NEXT by AXA", "Al Rajhi Takaful", "GIG Gulf", "Daman",
  "Oman Insurance", "Walaa",
];

export function InsuranceBar({ label }: InsuranceBarProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".ins-inner", {
      opacity: 0, y: 20, duration: 0.6, ease: "power2.out",
      scrollTrigger: { trigger: ref.current, start: "top 90%", toggleActions: "play none none none" },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className="relative overflow-hidden py-8"
      style={{ background: "#fff", borderTop: "1px solid rgba(136,7,114,0.09)", borderBottom: "1px solid rgba(136,7,114,0.09)" }}>
      <div className="ins-inner">
        {/* Label */}
        <p className="text-center text-xs font-bold uppercase tracking-[0.22em] mb-5" style={{ color: "rgba(136,7,114,0.50)" }}>
          {label}
        </p>

        {/* Marquee */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #fff, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #fff, transparent)" }} />

          <div className="flex gap-10 w-max animate-marquee" style={{ animationDuration: "28s" }}>
            {[...insurers, ...insurers].map((name, i) => (
              <div key={i} className="flex items-center gap-3 whitespace-nowrap">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black shrink-0"
                  style={{ background: "rgba(136,7,114,0.07)", color: "#880772" }}>
                  {name.charAt(0)}
                </div>
                <span className="text-sm font-semibold" style={{ color: "#4a6b59" }}>{name}</span>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(136,7,114,0.18)" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

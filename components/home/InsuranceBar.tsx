"use client";

import { useRef } from "react";

interface InsuranceBarProps {
  label: string;
}

const insurers = [
  "Bupa Arabia", "Tawuniya", "MedNet", "AXA Cooperative",
  "NEXT by AXA", "Al Rajhi Takaful", "GIG Gulf", "Daman",
  "Oman Insurance", "Walaa"
];

export function InsuranceBar({ label }: InsuranceBarProps) {
  return (
    <div
      className="relative py-5 overflow-hidden"
      style={{ background: "white", borderTop: "1px solid rgba(var(--color-brand-purple-rgb),0.08)", borderBottom: "1px solid rgba(var(--color-brand-purple-rgb),0.08)" }}
    >
      <div className="max-w-7xl mx-auto px-6 mb-3">
        <p
          className="text-xs uppercase tracking-widest text-center font-semibold"
          style={{ color: "rgba(var(--color-brand-purple-rgb),0.45)" }}
        >
          {label}
        </p>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, white, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, white, transparent)" }}
        />

        <div
          className="flex gap-12 animate-marquee hover:[animation-play-state:paused] w-max"
          style={{ animationDuration: "28s" }}
        >
          {[...insurers, ...insurers].map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-3 whitespace-nowrap"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{ background: "rgba(var(--color-brand-purple-rgb),0.08)", color: "var(--color-brand-purple)" }}
              >
                {name.charAt(0)}
              </div>
              <span
                className="text-sm font-semibold"
                style={{ color: "#7a9aaa" }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

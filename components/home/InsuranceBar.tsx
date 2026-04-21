"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

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
    // Entrance animation
    gsap.from(".ins-outer", {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 95%",
        toggleActions: "play none none none",
      },
    });

    // Aurora Background Animation
    gsap.to(".aurora-circle", {
      x: "random(-20, 20)",
      y: "random(-20, 20)",
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        each: 1,
        from: "random",
      },
    });

    // GSAP Marquee (much smoother than CSS)
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const totalWidth = marquee.scrollWidth / 2;
    const duration = 40; // Adjust speed

    const loop = gsap.to(marquee, {
      x: `-=${totalWidth}`,
      duration: duration,
      ease: "none",
      repeat: -1,
    });

    // Pause on hover
    const handleEnter = () => gsap.to(loop, { timeScale: 0.2, duration: 0.5 });
    const handleLeave = () => gsap.to(loop, { timeScale: 1, duration: 0.5 });

    marquee.addEventListener("mouseenter", handleEnter);
    marquee.addEventListener("mouseleave", handleLeave);

    return () => {
      marquee.removeEventListener("mouseenter", handleEnter);
      marquee.removeEventListener("mouseleave", handleLeave);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-8 overflow-hidden bg-transparent">
      {/* Aurora Background Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="aurora-circle absolute -top-1/2 -left-1/4 w-96 h-96 bg-brand-purple/20 blur-[120px] rounded-full" />
        <div className="aurora-circle absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-brand-green/20 blur-[120px] rounded-full" />
      </div>

      <div className="">
        <div className="ins-outer relative">
          {/* Main Glass Container */}
          <div 
            className="relative overflow-hidden py-10 px-8 "
            style={{ boxShadow: "0 20px 50px rgba(0,0,0,0.05)" }}
          >
            {/* Label */}
            <div className="text-center mb-8 relative z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] py-2 px-4 rounded-full bg-brand-purple/5 text-brand-purple/60 border border-brand-purple/10">
                {label}
              </span>
            </div>

            {/* GSAP Marquee Container */}
            <div className="relative overflow-hidden">
              {/* Fade masks */}
              <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-white via-transparent to-transparent" />
              <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-white via-transparent to-transparent" />

              <div ref={marqueeRef} className="flex gap-16 items-center w-max cursor-pointer">
                {[...insurers, ...insurers].map((name, i) => (
                  <div key={i} className="group flex items-center gap-4 py-2 px-6 rounded-2xl transition-all duration-300 hover:bg-white/50">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black shrink-0 transition-transform duration-500 group-hover:rotate-[360deg] shadow-lg"
                      style={{ 
                        background: "linear-gradient(135deg, var(--color-brand-purple) 0%, var(--color-brand-purple-light) 100%)", 
                        color: "#fff" 
                      }}>
                      {name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold tracking-tight text-physio-dark/80 group-hover:text-brand-purple transition-colors">
                        {name}
                      </span>
                      <div className="h-0.5 w-0 group-hover:w-full bg-brand-purple/30 transition-all duration-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Decorative rings around the container */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[150%] border border-brand-purple/5 rounded-[100px] pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
  value: string;
  label: string;
}

interface StatsStripProps {
  stats: StatItem[];
}

function CountUp({ target, duration = 1800 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

const icons = ["🏥", "👨‍⚕️", "😊", "⚡"];

export function StatsStrip({ stats }: StatsStripProps) {
  const statsData = [
    { raw: 3,     suffix: "",  label: stats[0]?.label || "Branches across KSA", icon: icons[0] },
    { raw: 50,    suffix: "+", label: stats[1]?.label || "Expert Therapists",    icon: icons[1] },
    { raw: 10000, suffix: "+", label: stats[2]?.label || "Patients Treated",     icon: icons[2] },
    { raw: 9,     suffix: "",  label: stats[3]?.label || "Speciality Services",  icon: icons[3] },
  ];

  return (
    <section className="py-14" style={{ background: "white", borderTop: "1px solid rgba(7,118,136,0.07)", borderBottom: "1px solid rgba(7,118,136,0.07)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {statsData.map((stat, i) => (
            <motion.div
              key={i}
              className="relative flex flex-col items-center text-center px-6 py-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              {/* Vertical divider */}
              {i < statsData.length - 1 && (
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2 h-14 w-px hidden lg:block"
                  style={{ background: "rgba(7,118,136,0.1)" }}
                />
              )}

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
                style={{ background: "rgba(7,118,136,0.06)" }}
              >
                {stat.icon}
              </div>

              {/* Number */}
              <div
                className="text-4xl md:text-5xl font-black tabular-nums mb-1"
                style={{ color: "#077688", lineHeight: 1 }}
              >
                <CountUp target={stat.raw} />
                {stat.suffix}
              </div>

              {/* Label */}
              <p className="text-sm font-medium mt-1" style={{ color: "#7a9aaa" }}>
                {stat.label}
              </p>

              {/* Underline accent */}
              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full"
                style={{ background: "linear-gradient(90deg, #077688, #4caf50)" }}
                initial={{ width: 0 }}
                whileInView={{ width: 40 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

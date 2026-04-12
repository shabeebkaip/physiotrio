"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const done = sessionStorage.getItem("physiotrio-loaded");
      if (done) {
        setShow(false);
        return;
      }
      const timer = setTimeout(() => {
        setShow(false);
        sessionStorage.setItem("physiotrio-loaded", "1");
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ background: "#0d0820" }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            {/* Animated SVG logo */}
            <svg viewBox="0 0 120 120" width="120" height="120" className="mb-6">
              {/* Figure body */}
              <motion.path
                d="M52,28 C38,30 28,42 28,58 C28,70 36,78 48,78 C52,78 56,76 58,73"
                fill="none"
                stroke="#4caf50"
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              {/* Leaf */}
              <motion.path
                d="M58,73 C64,64 66,50 60,40 C56,34 48,31 45,36 C42,41 44,51 51,56 C56,59 60,60 58,73 Z"
                fill="#4caf50"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7, ease: "backOut" }}
                style={{ transformOrigin: "center" }}
              />
              {/* Arm */}
              <motion.path
                d="M45,36 C50,29 60,26 68,31"
                fill="none"
                stroke="#4caf50"
                strokeWidth="5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 1.0 }}
              />
              {/* Head */}
              <motion.circle
                cx="72"
                cy="20"
                r="9"
                fill="#077688"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 1.3, type: "spring", stiffness: 400 }}
                style={{ transformOrigin: "72px 20px" }}
              />
            </svg>

            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <span className="text-3xl font-black tracking-tight" style={{ color: "#077688" }}>
                PhysioTrio
              </span>
              <span className="text-xs tracking-widest mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                PHYSIOTHERAPY CENTER
              </span>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="mt-8 h-0.5 rounded-full overflow-hidden"
              style={{ width: "160px", background: "rgba(255,255,255,0.1)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #077688, #4caf50)" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

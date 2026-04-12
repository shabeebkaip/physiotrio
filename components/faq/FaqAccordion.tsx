"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FAQ } from "@/lib/data/faqs";

interface FaqCategory {
  id: string;
  label: { en: string; ar: string };
}

interface FaqAccordionProps {
  faqs: FAQ[];
  categories: FaqCategory[];
  locale: string;
}

export function FaqAccordion({ faqs, categories, locale }: FaqAccordionProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = activeCategory === "all" ? faqs : faqs.filter((f) => f.category === activeCategory);

  return (
    <div>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => { setActiveCategory(cat.id); setOpenId(null); }}
            className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
            style={{
              background: activeCategory === cat.id ? "#077688" : "white",
              color: activeCategory === cat.id ? "white" : "#555",
              border: "1px solid",
              borderColor: activeCategory === cat.id ? "#077688" : "#e0e0e0",
            }}
          >
            {locale === "ar" ? cat.label.ar : cat.label.en}
          </button>
        ))}
      </div>

      {/* Accordion */}
      <div className="space-y-3">
        {filtered.map((faq) => (
          <div
            key={faq.id}
            className="bg-white rounded-2xl overflow-hidden transition-all"
            style={{
              boxShadow: "0 2px 16px rgba(7,118,136,0.06)",
              border: "1px solid",
              borderColor: openId === faq.id ? "rgba(7,118,136,0.2)" : "transparent",
            }}
          >
            <button
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              className="w-full flex items-start justify-between gap-4 p-6"
              style={{ textAlign: locale === "ar" ? "right" : "left" }}
            >
              <span className="font-semibold text-sm leading-snug" style={{ color: "#0d0820" }}>
                {locale === "ar" ? faq.question.ar : faq.question.en}
              </span>
              <ChevronDown
                size={18}
                className="flex-shrink-0 transition-transform duration-200"
                style={{
                  color: "#077688",
                  transform: openId === faq.id ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>
            {openId === faq.id && (
              <div className="px-6 pb-6">
                <p className="text-sm font-light leading-relaxed" style={{ color: "#555" }}>
                  {locale === "ar" ? faq.answer.ar : faq.answer.en}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

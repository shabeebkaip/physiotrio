"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, Send, MessageCircle } from "lucide-react";

interface Message {
  id: string;
  type: "bot" | "user";
  text: string;
}

interface ChatbotWidgetProps {
  locale: string;
}

const botResponses: Record<string, { en: string; ar: string }> = {
  book: {
    en: "Great! You can book an appointment online in under 3 minutes. Which branch would you like to visit — Riyadh or Makkah?",
    ar: "رائع! يمكنك حجز موعد عبر الإنترنت في أقل من 3 دقائق. أي فرع تريد زيارته — الرياض أم مكة المكرمة؟",
  },
  branch: {
    en: "We have 2 active branches:\n📍 Riyadh — Al Olaya District\n📍 Makkah — Ibrahim Al Khalil Road\n🚧 Dammam — Coming Soon\n\nCall: 800 100 0091",
    ar: "لدينا فرعان نشطان:\n📍 الرياض — حي العليا\n📍 مكة المكرمة — طريق إبراهيم الخليل\n🚧 الدمام — قريباً\n\nاتصل: 800 100 0091",
  },
  insurance: {
    en: "We accept: Bupa Arabia, Tawuniya, MedNet, AXA, NEXT, Al Rajhi Takaful, GIG Gulf, Daman, Oman Insurance, and Walaa. Bring your card to your appointment!",
    ar: "نقبل: بوبا العربية، التعاونية، ميدنت، اكسا، نكست، الراجحي للتكافل، GIG الخليج، ضمان، التأمين العماني، وولاء.",
  },
  services: {
    en: "We offer 9 specialties: Physiotherapy, Sports Physio, Neurological Rehab (with Lokomat®), Pediatric, Geriatric, Women's Health, Manual Therapy, Hydrotherapy, and Device-Based Therapy.",
    ar: "نقدم 9 تخصصات: العلاج الطبيعي، رياضي، عصبي (بلوكومات®)، أطفال، مسنون، صحة المرأة، يدوي، مائي، وبالأجهزة.",
  },
  hours: {
    en: "🕐 Opening Hours:\nSun–Thu: 8:00 AM – 9:00 PM\nFri–Sat: 10:00 AM – 6:00 PM\n\nBoth Riyadh and Makkah branches.",
    ar: "🕐 أوقات العمل:\nالأحد–الخميس: ٨:٠٠ ص – ٩:٠٠ م\nالجمعة–السبت: ١٠:٠٠ ص – ٦:٠٠ م",
  },
  default: {
    en: "I'm here to help! You can ask me about booking, our branches, services, insurance, or opening hours. Or click a quick option below.",
    ar: "أنا هنا للمساعدة! يمكنك السؤال عن الحجز أو الفروع أو الخدمات أو التأمين أو أوقات العمل.",
  },
};

const quickChips = [
  { key: "book", en: "Book Appointment", ar: "احجز موعداً" },
  { key: "branch", en: "Branch Info", ar: "معلومات الفرع" },
  { key: "services", en: "Services", ar: "الخدمات" },
  { key: "insurance", en: "Insurance", ar: "التأمين" },
];

function detectIntent(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes("book") || lower.includes("appointment") || lower.includes("حجز") || lower.includes("موعد")) return "book";
  if (lower.includes("branch") || lower.includes("location") || lower.includes("فرع") || lower.includes("عنوان")) return "branch";
  if (lower.includes("insurance") || lower.includes("تأمين")) return "insurance";
  if (lower.includes("service") || lower.includes("خدمة") || lower.includes("علاج")) return "services";
  if (lower.includes("hour") || lower.includes("time") || lower.includes("open") || lower.includes("ساعة") || lower.includes("وقت")) return "hours";
  return "default";
}

export function ChatbotWidget({ locale }: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "greeting",
      type: "bot",
      text: locale === "ar"
        ? "مرحباً! أنا مساعدك في فيزيوتريو. كيف يمكنني مساعدتك؟"
        : "Hello! I'm your PhysioTrio assistant. How can I help?",
    },
  ]);
  const [input, setInput] = useState("");
  const [showNotif, setShowNotif] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => setShowNotif(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), type: "user", text };
    const intent = detectIntent(text);
    const response = botResponses[intent];
    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      type: "bot",
      text: locale === "ar" ? response.ar : response.en,
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      {/* Closed state button */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-2">
        {/* Notification tooltip */}
        <AnimatePresence>
          {showNotif && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="px-4 py-2 rounded-xl text-sm text-white font-medium shadow-lg"
              style={{ background: "var(--color-dark-surface)", maxWidth: "200px" }}
            >
              {locale === "ar" ? "مرحباً! كيف يمكنني مساعدتك؟" : "Hi! How can I help you?"}
              <div className="absolute bottom-0 right-5 translate-y-1/2 w-3 h-3 rotate-45" style={{ background: "var(--color-dark-surface)" }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main button */}
        <motion.button
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg relative"
          style={{ background: "var(--color-brand-purple)" }}
          onClick={() => { setIsOpen(!isOpen); setShowNotif(false); }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2.8, type: "spring" }}
          aria-label={locale === "ar" ? "افتح المساعد" : "Open assistant"}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X size={24} color="white" />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <MessageCircle size={24} color="white" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Green notification dot */}
          {!isOpen && (
            <span className="absolute top-1 right-1 w-3 h-3 rounded-full border-2 border-white" style={{ background: "var(--color-brand-green)" }}>
              <span className="absolute inset-0 rounded-full animate-pulse-ring" style={{ background: "rgba(var(--color-brand-green-rgb),0.5)" }} />
            </span>
          )}
        </motion.button>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-[9998] w-80 sm:w-96 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
            style={{
              background: "var(--color-dark-surface)",
              height: "500px",
              border: "1px solid rgba(var(--color-brand-purple-rgb),0.2)",
            }}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{ background: "var(--color-brand-purple)" }}
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm" style={{ background: "rgba(255,255,255,0.2)" }}>
                P
              </div>
              <div className="flex-1">
                <p className="text-white font-bold text-sm">PhysioTrio Assistant</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: "var(--color-brand-green)" }} />
                  <span className="text-xs text-white/70">{locale === "ar" ? "متصل الآن" : "Online now"}</span>
                </div>
              </div>
              <a href="tel:8001000091" className="text-white/70 hover:text-white text-xs font-semibold">
                800 100 0091
              </a>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line"
                    style={{
                      background: msg.type === "user" ? "var(--color-brand-green)" : "rgba(var(--color-brand-purple-rgb),0.2)",
                      color: "white",
                      borderBottomRightRadius: msg.type === "user" ? "4px" : undefined,
                      borderBottomLeftRadius: msg.type === "bot" ? "4px" : undefined,
                    }}
                  >
                    {msg.text}
                    {msg.type === "bot" && msg.id === "greeting" && (
                      <div className="mt-3">
                        <Link
                          href={`/${locale}/book/riyadh`}
                          className="inline-block mt-1 px-3 py-1.5 rounded-full text-xs font-bold"
                          style={{ background: "var(--color-brand-purple)", color: "white" }}
                        >
                          {locale === "ar" ? "احجز الآن →" : "Book Now →"}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick chips */}
            <div className="px-3 py-2 flex flex-wrap gap-1.5" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              {quickChips.map((chip) => (
                <button
                  key={chip.key}
                  onClick={() => sendMessage(locale === "ar" ? chip.ar : chip.en)}
                  className="text-xs px-3 py-1 rounded-full font-semibold transition-all hover:scale-105"
                  style={{ border: "1px solid rgba(var(--color-brand-purple-rgb),0.4)", color: "rgba(255,255,255,0.8)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--color-brand-green)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--color-brand-green)";
                    (e.currentTarget as HTMLElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(var(--color-brand-purple-rgb),0.4)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)";
                  }}
                >
                  {locale === "ar" ? chip.ar : chip.en}
                </button>
              ))}
            </div>

            {/* Input */}
            <div
              className="flex items-center gap-2 px-3 py-3"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder={locale === "ar" ? "اكتب رسالة..." : "Type a message..."}
                className="flex-1 text-sm px-3 py-2 rounded-xl outline-none text-white placeholder-white/40"
                style={{ background: "rgba(255,255,255,0.08)" }}
                dir={locale === "ar" ? "rtl" : "ltr"}
              />
              <button
                onClick={() => sendMessage(input)}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 flex-shrink-0"
                style={{ background: "var(--color-brand-green)" }}
                aria-label="Send"
              >
                <Send size={16} color="white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

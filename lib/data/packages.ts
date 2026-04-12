export interface Package {
  id: string;
  slug: string;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  sessions: number;
  validityDays?: number;
  price?: number;
  originalPrice?: number;
  currency?: string;
  category: string;
  branch: string;
  featured: boolean;
  tamaraEligible: boolean;
  tabbyEligible: boolean;
  image?: string;
  privateService?: boolean;
  badge?: { en: string; ar: string };
}

export const packages: Package[] = [
  {
    id: "acl-stage1",
    slug: "acl-rehabilitation-stage-1",
    name: { en: "ACL Rehabilitation Program — Stage 1", ar: "برنامج إعادة تأهيل الرباط الصليبي — المرحلة الأولى" },
    description: {
      en: "Structured ACL recovery program designed for the initial post-surgery phase. Focuses on pain management, swelling reduction, and early mobility restoration.",
      ar: "برنامج منظم للتعافي من إصابة الرباط الصليبي مصمم لمرحلة ما بعد الجراحة الأولية.",
    },
    sessions: 12, validityDays: 60, category: "Sports Rehabilitation",
    branch: "all", featured: true, tamaraEligible: true, tabbyEligible: true,
    image: "https://physiotherabia.com/wp-content/uploads/2023/08/Sports-Rehabilitation.jpg",
    badge: { en: "Most Popular", ar: "الأكثر طلباً" },
  },
  {
    id: "knee-rehab",
    slug: "knee-rehabilitation-program",
    name: { en: "Knee Rehabilitation Program", ar: "برنامج إعادة تأهيل الركبة" },
    description: {
      en: "Comprehensive knee rehabilitation for post-surgical patients, meniscus tears, and chronic knee conditions.",
      ar: "إعادة تأهيل شاملة للركبة لمرضى ما بعد الجراحة وتمزق الغضروف الهلالي.",
    },
    sessions: 10, validityDays: 45, category: "Orthopedic",
    branch: "all", featured: true, tamaraEligible: true, tabbyEligible: true,
    image: "https://physiotherabia.com/wp-content/uploads/2023/11/display-pic-1.jpg",
  },
  {
    id: "low-back-pain",
    slug: "low-back-pain-program",
    name: { en: "Low Back Pain Program", ar: "برنامج آلام أسفل الظهر" },
    description: {
      en: "Targeted program for chronic and acute lower back pain combining manual therapy, IDD therapy, and exercise rehabilitation.",
      ar: "برنامج مستهدف لآلام أسفل الظهر المزمنة والحادة يجمع بين العلاج اليدوي وعلاج IDD.",
    },
    sessions: 8, validityDays: 30, category: "Spine",
    branch: "all", featured: true, tamaraEligible: true, tabbyEligible: true,
    image: "https://physiotherabia.com/wp-content/uploads/2023/11/INVIDUAL-SESSION-300x300-1.jpg",
  },
  {
    id: "neck-pain",
    slug: "neck-pain-program",
    name: { en: "Neck Pain Program", ar: "برنامج آلام الرقبة" },
    description: {
      en: "Evidence-based neck pain treatment combining manual therapy, postural correction, and targeted exercises.",
      ar: "علاج آلام الرقبة القائم على الأدلة يجمع بين العلاج اليدوي وتصحيح الوضعية.",
    },
    sessions: 8, validityDays: 30, category: "Spine",
    branch: "all", featured: false, tamaraEligible: true, tabbyEligible: false,
    image: "https://physiotherabia.com/wp-content/uploads/2023/11/INVIDUAL-SESSION-300x300-1.jpg",
  },
  {
    id: "womens-health-pelvic",
    slug: "womens-health-pelvic-rehabilitation",
    name: { en: "Women's Health — Pelvic Muscle Rehabilitation", ar: "صحة المرأة — إعادة تأهيل عضلات قاع الحوض" },
    description: {
      en: "Specialized pelvic floor rehabilitation program for women — addressing dysfunction, post-natal recovery, and pelvic pain.",
      ar: "برنامج متخصص لإعادة تأهيل قاع الحوض للنساء — معالجة الخلل الوظيفي والتعافي بعد الولادة.",
    },
    sessions: 10, validityDays: 60, category: "Women's Health",
    branch: "all", featured: true, tamaraEligible: true, tabbyEligible: true,
    image: "https://physiotherabia.com/wp-content/uploads/2023/11/display-pic-1.jpg",
    privateService: true,
  },
  {
    id: "neuro-lokomat-12",
    slug: "lokomat-neuro-rehabilitation-12-sessions",
    name: { en: "Lokomat® Neuro-Rehabilitation — 12 Sessions", ar: "إعادة التأهيل العصبي بلوكومات® — 12 جلسة" },
    description: {
      en: "Robotic-assisted gait training using the Lokomat® system. 12-session intensive neurological rehabilitation program.",
      ar: "تدريب على المشي بمساعدة الروبوت باستخدام نظام لوكومات®. برنامج مكثف لإعادة التأهيل العصبي.",
    },
    sessions: 12, validityDays: 60, category: "Neurological",
    branch: "riyadh", featured: true, tamaraEligible: true, tabbyEligible: true,
    image: "https://physiotherabia.com/wp-content/uploads/2023/06/1000x325_Walk-Bot.jpg",
    badge: { en: "Premium Tech", ar: "تقنية متقدمة" },
  },
  {
    id: "shoulder-rehab",
    slug: "shoulder-rehabilitation-program",
    name: { en: "Shoulder Rehabilitation Program", ar: "برنامج إعادة تأهيل الكتف" },
    description: {
      en: "Comprehensive shoulder rehabilitation for frozen shoulder, rotator cuff injuries, and post-surgical recovery.",
      ar: "إعادة تأهيل شاملة للكتف لحالات الكتف المتجمد وإصابات الكفة المدورة.",
    },
    sessions: 10, validityDays: 45, category: "Orthopedic",
    branch: "all", featured: false, tamaraEligible: false, tabbyEligible: true,
    image: "https://physiotherabia.com/wp-content/uploads/2023/11/display-pic-1.jpg",
  },
  {
    id: "recovery-plus",
    slug: "recovery-package-plus",
    name: { en: "Recovery Package+", ar: "باقة ريكفري بلس" },
    description: {
      en: "Enhanced recovery package for post-operative patients combining physiotherapy sessions with advanced modalities.",
      ar: "باقة تعافي محسّنة لمرضى ما بعد الجراحة تجمع جلسات العلاج الطبيعي مع الوسائل المتقدمة.",
    },
    sessions: 15, validityDays: 90, category: "Recovery",
    branch: "all", featured: true, tamaraEligible: true, tabbyEligible: true,
    image: "https://physiotherabia.com/wp-content/uploads/2023/11/Nuro-Rehab-Package-2-1.jpg",
    badge: { en: "Best Value", ar: "أفضل قيمة" },
  },
  {
    id: "performance",
    slug: "performance-package",
    name: { en: "Performance Package", ar: "باقة تحسين الأداء الرياضي" },
    description: {
      en: "Sports performance enhancement program combining VO2 MAX testing, gait analysis, and targeted training.",
      ar: "برنامج تعزيز الأداء الرياضي يجمع اختبار VO2 MAX وتحليل المشية والتدريب المستهدف.",
    },
    sessions: 8, validityDays: 30, category: "Sports",
    branch: "riyadh", featured: false, tamaraEligible: false, tabbyEligible: false,
    image: "https://physiotherabia.com/wp-content/uploads/2023/08/Sports-Rehabilitation.jpg",
  },
];

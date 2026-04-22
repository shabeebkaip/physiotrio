export interface Service {
  id: string;
  slug: string;
  name: { en: string; ar: string };
  description?: { en: string; ar: string };
  shortDesc: { en: string; ar: string };
  conditions: { en: string[]; ar: string[] };
  targetPatients: { en: string; ar: string };
  durationMinutes: number;
  sessionFrequency?: { en: string; ar: string };
  branches: string[];
  icon: string;
  featured: boolean;
  image?: string;
  privateService?: boolean;
  femaleTheraplists?: boolean;
}

export const services: Service[] = [
  {
    id: "1",
    slug: "physiotherapy",
    name: { en: "Physiotherapy", ar: "العلاج الطبيعي" },
    shortDesc: {
      en: "Evidence-based physical therapy for pain relief, mobility, and recovery.",
      ar: "علاج طبيعي قائم على الأدلة لتخفيف الألم وتحسين الحركة والتعافي.",
    },
    conditions: {
      en: ["Back & neck pain", "Joint injuries", "Post-surgical recovery", "Muscle strains", "Chronic pain management"],
      ar: ["آلام الظهر والرقبة", "إصابات المفاصل", "التعافي بعد الجراحة", "شد العضلات", "إدارة الألم المزمن"],
    },
    durationMinutes: 60,
    sessionFrequency: { en: "2–3× per week", ar: "٢–٣ مرات أسبوعياً" },
    targetPatients: {
      en: "All ages — from acute injuries to chronic conditions",
      ar: "جميع الأعمار — من الإصابات الحادة إلى الحالات المزمنة",
    },
    branches: ["riyadh", "makkah"],
    icon: "/images/home/expert.svg",
    featured: true,
    image: "https://physiotherabia.com/wp-content/uploads/2023/11/INVIDUAL-SESSION-300x300-1.jpg",
  },
  {
    id: "2",
    slug: "sports-physiotherapy",
    name: { en: "Sports Physiotherapy", ar: "علاج طبيعي رياضي" },
    shortDesc: {
      en: "Specialized care for athletes — injury recovery, prevention, and peak performance.",
      ar: "رعاية متخصصة للرياضيين — التعافي من الإصابات والوقاية منها وتحقيق الأداء الأمثل.",
    },
    conditions: {
      en: ["ACL rehabilitation", "Meniscus tears", "Shoulder injuries", "Tennis elbow", "Ankle sprains", "Performance optimization"],
      ar: ["إعادة تأهيل الرباط الصليبي", "تمزق الغضروف الهلالي", "إصابات الكتف", "كوع التنس", "التواء الكاحل", "تحسين الأداء"],
    },
    durationMinutes: 60,
    sessionFrequency: { en: "3–4× per week", ar: "٣–٤ مرات أسبوعياً" },
    targetPatients: {
      en: "Athletes, gym-goers, sports enthusiasts, active lifestyle patients",
      ar: "الرياضيون ومرتادو الصالات الرياضية ومحبو الأنشطة البدنية",
    },
    branches: ["riyadh", "makkah"],
    icon: "/images/home/sport.svg",
    featured: false,
    image: "https://physiotherabia.com/wp-content/uploads/2023/08/Sports-Rehabilitation.jpg",
  },
  {
    id: "3",
    slug: "neurological-rehabilitation",
    name: { en: "Neurological Rehabilitation", ar: "إعادة التأهيل العصبي" },
    shortDesc: {
      en: "Advanced neuro rehab using robotic technology including Lokomat® for stroke and brain injury recovery.",
      ar: "إعادة التأهيل العصبي المتقدمة باستخدام تقنية الروبوت بما في ذلك لوكومات® للتعافي من السكتة الدماغية.",
    },
    conditions: {
      en: ["Stroke recovery", "Spinal cord injuries", "Traumatic brain injury", "Parkinson's disease", "Multiple sclerosis", "Neuromuscular disorders"],
      ar: ["التعافي من السكتة الدماغية", "إصابات الحبل الشوكي", "إصابات الدماغ الرضحية", "مرض باركنسون", "التصلب المتعدد"],
    },
    durationMinutes: 60,
    sessionFrequency: { en: "3–5× per week", ar: "٣–٥ مرات أسبوعياً" },
    targetPatients: {
      en: "Post-stroke, neurological condition patients, spinal cord injury patients",
      ar: "مرضى ما بعد السكتة الدماغية ومرضى الحالات العصبية",
    },
    branches: ["riyadh", "makkah"],
    icon: "/images/home/neuro.svg",
    featured: false,
    image: "https://physiotherabia.com/wp-content/uploads/2023/11/Nuro-Rehab-Package-2-1.jpg",
  },
  {
    id: "4",
    slug: "pediatric-physiotherapy",
    name: { en: "Pediatric Physiotherapy", ar: "العلاج الطبيعي للأطفال" },
    shortDesc: {
      en: "Specialized therapy for children — developmental support, cerebral palsy, and sensory needs.",
      ar: "علاج متخصص للأطفال — دعم النمو والشلل الدماغي والاحتياجات الحسية.",
    },
    conditions: {
      en: ["Developmental delays", "Cerebral palsy", "Sensory processing disorders", "Autism spectrum", "Muscle tone disorders", "Coordination difficulties"],
      ar: ["تأخر النمو", "الشلل الدماغي", "اضطرابات المعالجة الحسية", "طيف التوحد", "اضطرابات توتر العضلات"],
    },
    durationMinutes: 45,
    sessionFrequency: { en: "2–3× per week", ar: "٢–٣ مرات أسبوعياً" },
    targetPatients: {
      en: "Children ages 0–18, parent-referred cases",
      ar: "الأطفال من الولادة حتى 18 سنة، الحالات المحولة من الوالدين",
    },
    branches: ["riyadh", "makkah"],
    icon: "/images/home/child.svg",
    featured: false,
    image: "https://physiotherabia.com/wp-content/uploads/2023/11/Occupational-Therapy_Sensory-Room-Session-1.jpg",
  },
  {
    id: "5",
    slug: "geriatric-physiotherapy",
    name: { en: "Geriatric Physiotherapy", ar: "العلاج الطبيعي لكبار السن" },
    shortDesc: {
      en: "Gentle, effective therapy for seniors — improving mobility, balance, and independence.",
      ar: "علاج لطيف وفعال لكبار السن — تحسين الحركة والتوازن والاستقلالية.",
    },
    conditions: {
      en: ["Fall prevention", "Arthritis management", "Osteoporosis", "Post-fracture recovery", "Mobility limitations", "Balance disorders"],
      ar: ["الوقاية من السقوط", "إدارة التهاب المفاصل", "هشاشة العظام", "التعافي من الكسور", "محدودية الحركة", "اضطرابات التوازن"],
    },
    durationMinutes: 45,
    sessionFrequency: { en: "2× per week", ar: "مرتان أسبوعياً" },
    targetPatients: {
      en: "Seniors 60+, family-referred elderly patients, home care eligible",
      ar: "كبار السن فوق 60 عاماً، المرضى المسنون المحولون من العائلة",
    },
    branches: ["riyadh", "makkah"],
    icon: "/images/home/old.svg",
    featured: false,
    image: "https://physiotherabia.com/wp-content/uploads/2025/08/Home-Physio.png",
  },
  {
    id: "6",
    slug: "womens-health",
    name: { en: "Women's Health Program", ar: "برنامج صحة المرأة" },
    shortDesc: {
      en: "Dedicated women's health physiotherapy — pelvic floor, pre/postnatal, and pain management.",
      ar: "علاج طبيعي متخصص لصحة المرأة — قاع الحوض وما قبل وبعد الولادة وإدارة الألم.",
    },
    conditions: {
      en: ["Pelvic floor dysfunction", "Pre/postnatal rehabilitation", "Pelvic pain", "Incontinence", "Diastasis recti", "Lymphedema"],
      ar: ["خلل وظيفي في قاع الحوض", "إعادة التأهيل قبل وبعد الولادة", "آلام الحوض", "سلس البول", "تباعد عضلة البطن", "الوذمة اللمفية"],
    },
    durationMinutes: 60,
    sessionFrequency: { en: "1–2× per week", ar: "١–٢ مرة أسبوعياً" },
    targetPatients: {
      en: "Women of all ages, pregnant women, new mothers, pelvic health patients",
      ar: "النساء من جميع الأعمار، الحوامل، الأمهات الجدد، مرضى صحة الحوض",
    },
    branches: ["riyadh", "makkah"],
    icon: "/images/home/women.svg",
    featured: false,
    image: "https://physiotherabia.com/wp-content/uploads/2023/11/display-pic-1.jpg",
    privateService: true,
    femaleTheraplists: true,
  },
  {
    id: "7",
    slug: "manual-therapy",
    name: { en: "Manual Therapy", ar: "العلاج اليدوي" },
    shortDesc: {
      en: "Hands-on spinal manipulation, joint mobilization, and soft tissue techniques for deep relief.",
      ar: "تقنيات يدوية للعمود الفقري وتحريك المفاصل والأنسجة الرخوة للراحة العميقة.",
    },
    conditions: {
      en: ["Chronic back pain", "Neck pain", "Joint stiffness", "Headaches", "Postural dysfunction", "Frozen shoulder"],
      ar: ["آلام الظهر المزمنة", "آلام الرقبة", "تصلب المفاصل", "الصداع", "خلل وظيفي في الوضعية", "تجميد الكتف"],
    },
    durationMinutes: 45,
    sessionFrequency: { en: "1–2× per week", ar: "١–٢ مرة أسبوعياً" },
    targetPatients: {
      en: "Chronic pain patients, back and neck pain sufferers",
      ar: "مرضى الألم المزمن، المعانون من آلام الظهر والرقبة",
    },
    branches: ["riyadh", "makkah"],
    icon: "/images/home/manual.svg",
    featured: false,
    image: "https://physiotherabia.com/wp-content/uploads/2023/11/INVIDUAL-SESSION-300x300-1.jpg",
  },
  {
    id: "8",
    slug: "hydrotherapy",
    name: { en: "Hydrotherapy", ar: "العلاج المائي" },
    shortDesc: {
      en: "Water-based therapy using buoyancy and resistance to reduce pain and restore strength.",
      ar: "علاج مائي يستخدم الطفو والمقاومة لتخفيف الألم واستعادة القوة.",
    },
    conditions: {
      en: ["Musculoskeletal injuries", "Arthritis", "Post-surgical recovery", "Chronic pain", "Neurological conditions", "Obesity-related mobility issues"],
      ar: ["إصابات الجهاز العضلي الهيكلي", "التهاب المفاصل", "التعافي بعد الجراحة", "الألم المزمن", "الحالات العصبية"],
    },
    durationMinutes: 45,
    sessionFrequency: { en: "2–3× per week", ar: "٢–٣ مرات أسبوعياً" },
    targetPatients: {
      en: "Patients requiring low-impact rehabilitation, arthritis, elderly",
      ar: "المرضى الذين يحتاجون إلى إعادة تأهيل منخفض التأثير، التهاب المفاصل، كبار السن",
    },
    branches: ["riyadh"],
    icon: "/images/home/hydro.svg",
    featured: false,
    image: "https://physiotherabia.com/wp-content/uploads/2023/11/display-pic-1.jpg",
  },
  {
    id: "9",
    slug: "device-based-therapy",
    name: { en: "Advanced Device-Based Therapy", ar: "العلاج المتقدم بالأجهزة" },
    shortDesc: {
      en: "Cutting-edge rehabilitation technology — Lokomat®, Shockwave, CryoTherapy, IDD, and more.",
      ar: "تقنية إعادة التأهيل المتطورة — لوكومات® وموجات الصدمة والعلاج بالتبريد والمزيد.",
    },
    conditions: {
      en: ["Neurological mobility impairment", "Chronic tendinopathy", "Spinal decompression", "Sports performance", "Post-surgical swelling"],
      ar: ["ضعف الحركة العصبي", "اعتلال الأوتار المزمن", "ضغط العمود الفقري", "الأداء الرياضي", "التورم بعد الجراحة"],
    },
    durationMinutes: 30,
    sessionFrequency: { en: "2–3× per week", ar: "٢–٣ مرات أسبوعياً" },
    targetPatients: {
      en: "Technology-seeking patients, chronic conditions, sports rehab, neuro patients",
      ar: "المرضى الباحثون عن التكنولوجيا، الحالات المزمنة، إعادة التأهيل الرياضي",
    },
    branches: ["riyadh", "makkah"],
    icon: "/images/home/advan.svg",
    featured: false,
    image: "https://physiotherabia.com/wp-content/uploads/2023/06/1000x325_Walk-Bot.jpg",
  },
];

export interface Therapist {
  id: string;
  name: { en: string; ar: string };
  title: { en: string; ar: string };
  specializations: string[];
  branches: string[];
  languages: string[];
  bio: { en: string; ar: string };
  yearsExp: number;
  rating: number;
  initials: string;
  image?: string | null;
}

export const therapists: Therapist[] = [
  {
    id: "1",
    name: { en: "Abdullah Mohammed Al Khuzaim", ar: "عبدالله محمد الخزيم" },
    title: { en: "Physical Therapist", ar: "معالج طبيعي" },
    specializations: ["physiotherapy", "manual-therapy", "sports-physiotherapy"],
    branches: ["riyadh"],
    languages: ["Arabic", "English"],
    yearsExp: 5,
    rating: 4.9,
    initials: "AK",
    image: "https://physiotherabia.com/wp-content/uploads/2025/11/%D8%AA%D8%B5%D9%85%D9%8A%D9%85-%D8%A8%D8%AF%D9%88%D9%86-%D8%B9%D9%86%D9%88%D8%A7%D9%86-3.jpg",
    bio: {
      en: "Specialist physical therapist with expertise in musculoskeletal rehabilitation and sports injury management.",
      ar: "معالج طبيعي متخصص في إعادة تأهيل الجهاز العضلي الهيكلي وإدارة الإصابات الرياضية.",
    },
  },
  {
    id: "2",
    name: { en: "Sultan Baheethem", ar: "سلطان بهيثم" },
    title: { en: "Physical Therapist", ar: "معالج طبيعي" },
    specializations: ["physiotherapy", "geriatric-physiotherapy"],
    branches: ["riyadh"],
    languages: ["Arabic", "English"],
    yearsExp: 4,
    rating: 4.8,
    initials: "SB",
    image: "https://physiotherabia.com/wp-content/uploads/2025/11/%D8%AA%D8%B5%D9%85%D9%8A%D9%85-%D8%A8%D8%AF%D9%88%D9%86-%D8%B9%D9%86%D9%88%D8%A7%D9%86-10.jpg",
    bio: {
      en: "Dedicated physical therapist with a focus on geriatric care and mobility restoration.",
      ar: "معالج طبيعي متفانٍ مع التركيز على رعاية كبار السن واستعادة الحركة.",
    },
  },
  {
    id: "3",
    name: { en: "Ezzat Ibrahim", ar: "عزت إبراهيم" },
    title: { en: "Senior Physical Therapist", ar: "معالج طبيعي أول" },
    specializations: ["neurological-rehabilitation", "device-based-therapy", "sports-physiotherapy"],
    branches: ["riyadh", "makkah"],
    languages: ["Arabic", "English"],
    yearsExp: 10,
    rating: 5.0,
    initials: "EI",
    image: "https://physiotherabia.com/wp-content/uploads/2025/11/%D8%AA%D8%B5%D9%85%D9%8A%D9%85-%D8%A8%D8%AF%D9%88%D9%86-%D8%B9%D9%86%D9%88%D8%A7%D9%86-4-1.jpg",
    bio: {
      en: "Senior therapist specializing in neurological rehabilitation and advanced robotic-assisted therapy including Lokomat® training.",
      ar: "معالج أول متخصص في إعادة التأهيل العصبي والعلاج المتقدم بمساعدة الروبوت بما في ذلك تدريب لوكومات®.",
    },
  },
  {
    id: "4",
    name: { en: "Abdulwahab Atiyah Al-Qurashi", ar: "عبدالوهاب عطية القرشي" },
    title: { en: "Physical Therapist", ar: "معالج طبيعي" },
    specializations: ["manual-therapy", "physiotherapy", "womens-health"],
    branches: ["makkah"],
    languages: ["Arabic"],
    yearsExp: 6,
    rating: 4.9,
    initials: "AQ",
    image: "https://physiotherabia.com/wp-content/uploads/2025/11/%D8%AA%D8%B5%D9%85%D9%8A%D9%85-%D8%A8%D8%AF%D9%88%D9%86-%D8%B9%D9%86%D9%88%D8%A7%D9%86-9.jpg",
    bio: {
      en: "Experienced therapist specializing in manual therapy techniques and patient-centered rehabilitation in Makkah.",
      ar: "معالج متمرس متخصص في تقنيات العلاج اليدوي وإعادة التأهيل المتمحورة حول المريض في مكة المكرمة.",
    },
  },
  {
    id: "5",
    name: { en: "Fatima Al-Rashidi", ar: "فاطمة الراشدي" },
    title: { en: "Women's Health Specialist", ar: "أخصائية صحة المرأة" },
    specializations: ["womens-health", "physiotherapy"],
    branches: ["riyadh", "makkah"],
    languages: ["Arabic", "English"],
    yearsExp: 7,
    rating: 4.9,
    initials: "FR",
    image: null,
    bio: {
      en: "Specialist in women's health physiotherapy with extensive experience in pelvic floor rehabilitation and postnatal care.",
      ar: "متخصصة في العلاج الطبيعي لصحة المرأة مع خبرة واسعة في إعادة تأهيل قاع الحوض وما بعد الولادة.",
    },
  },
  {
    id: "6",
    name: { en: "Mohammed Al-Harbi", ar: "محمد الحربي" },
    title: { en: "Sports Physiotherapy Specialist", ar: "أخصائي العلاج الطبيعي الرياضي" },
    specializations: ["sports-physiotherapy", "manual-therapy", "device-based-therapy"],
    branches: ["riyadh"],
    languages: ["Arabic", "English"],
    yearsExp: 8,
    rating: 4.8,
    initials: "MH",
    image: null,
    bio: {
      en: "Sports physiotherapy specialist working with professional athletes and sports teams across Saudi Arabia.",
      ar: "أخصائي علاج طبيعي رياضي يعمل مع الرياضيين المحترفين والأندية الرياضية في المملكة.",
    },
  },
  {
    id: "7",
    name: { en: "Nora Al-Otaibi", ar: "نورة العتيبي" },
    title: { en: "Pediatric Physiotherapist", ar: "معالجة طبيعية للأطفال" },
    specializations: ["pediatric-physiotherapy", "neurological-rehabilitation"],
    branches: ["riyadh", "makkah"],
    languages: ["Arabic", "English"],
    yearsExp: 5,
    rating: 4.9,
    initials: "NO",
    image: null,
    bio: {
      en: "Pediatric physiotherapy specialist with a gentle, child-friendly approach. Expertise in developmental delays and cerebral palsy.",
      ar: "أخصائية علاج طبيعي للأطفال بأسلوب لطيف وصديق للطفل. خبرة في تأخر النمو والشلل الدماغي.",
    },
  },
  {
    id: "8",
    name: { en: "Khalid Al-Dossari", ar: "خالد الدوسري" },
    title: { en: "Rehabilitation Technology Specialist", ar: "أخصائي تقنية إعادة التأهيل" },
    specializations: ["device-based-therapy", "neurological-rehabilitation", "hydrotherapy"],
    branches: ["riyadh"],
    languages: ["Arabic", "English", "Urdu"],
    yearsExp: 9,
    rating: 4.7,
    initials: "KD",
    image: null,
    bio: {
      en: "Expert in advanced rehabilitation technologies including Lokomat®, Shockwave, and hydrotherapy protocols.",
      ar: "خبير في تقنيات إعادة التأهيل المتقدمة بما في ذلك لوكومات® وموجات الصدمة وبروتوكولات العلاج المائي.",
    },
  },
];

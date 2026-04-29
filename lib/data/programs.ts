export interface ProgramService {
  en: string;
  ar: string;
}

export interface Program {
  id: string;
  slug: string;
  category: "rehabilitation" | "package" | "womens-health" | "neurological";
  title: { en: string; ar: string };
  tagline: { en: string; ar: string };
  overview: { en: string; ar: string };
  description: { en: string; ar: string } | null;
  includes: { en: string; ar: string }[];
  services: { en: string; ar: string }[];
  result: { en: string; ar: string };
  icon: string;
}

export const programs: Program[] = [
  {
    id: "1",
    slug: "acl-rehabilitation",
    category: "rehabilitation",
    title: {
      en: "ACL Rehabilitation Program",
      ar: "برنامج إعادة تأهيل الرباط الصليبي (ACL)",
    },
    tagline: {
      en: "Regain your strength... Return to movement with confidence",
      ar: "استرجع قوتك... وارجع لحركتك بثقة.",
    },
    overview: {
      en: "An ACL tear significantly affects knee stability, especially in athletes and highly active individuals.",
      ar: "تمزق الرباط الصليبي الأمامي (ACL) يؤثر بشكل كبير على ثبات الركبة، خاصة لدى الرياضيين والأشخاص ذوي النشاط العالي.",
    },
    description: {
      en: "Our specialized therapy program is carefully designed to support you through recovery, whether after injury or surgery, with a treatment plan that begins with a thorough assessment and is tailored to your condition and goals. Whether you are a professional athlete or just want to regain stable walking, we guide you step by step until you safely return to your normal life.",
      ar: "برنامجنا العلاجي المتخصص مصمم بعناية ليدعمك خلال رحلة التعافي، سواء بعد الإصابة أو الجراحة، بخطة تبدأ بتقييم شامل ومصممة حسب حالتك وهدفك. سواء كنت رياضيًا محترفًا أو ترغب في استعادة المشي بثبات، نرافقك خطوة بخطوة حتى تعود لحياتك الطبيعية بأمان.",
    },
    includes: [
      { en: "Comprehensive assessment of the knee and movement", ar: "تقييم شامل لحالة الركبة والحركة" },
      { en: "Pain and swelling relief", ar: "تخفيف الألم والتورم" },
      { en: "Strengthening muscles around the joint and enhancing stability", ar: "تقوية العضلات المحيطة بالمفصل وتعزيز الثبات" },
      { en: "Gradual and safe return to sports or daily activities", ar: "تأهيل تدريجي وآمن للعودة للنشاط" },
      { en: "Exercises tailored to your condition", ar: "تمارين مخصصة لحالتك" },
      { en: "Online follow-up to monitor progress", ar: "متابعة أونلاين لمراقبة التقدم" },
    ],
    services: [
      { en: "Specialized one-on-one physiotherapy sessions", ar: "جلسات علاج طبيعي فردية متخصصة" },
      { en: "Comprehensive functional rehabilitation of the knee", ar: "تأهيل وظيفي شامل للركبة" },
    ],
    result: {
      en: "Return to normal movement with stability and confidence",
      ar: "العودة للحركة الطبيعية بثبات وثقة",
    },
    icon: "activity",
  },
  {
    id: "2",
    slug: "meniscus-rehabilitation",
    category: "rehabilitation",
    title: {
      en: "Meniscus Rehabilitation Program",
      ar: "برنامج إعادة تأهيل الغضروف الهلالي",
    },
    tagline: {
      en: "Protect your knee... Regain your movement with comfort and stability",
      ar: "احمِ ركبتك... واسترجع حركتك براحة وثبات",
    },
    overview: {
      en: "Meniscus injuries are among the most common knee injuries, affecting flexibility and comfort. We offer a complete rehabilitation program tailored to your needs.",
      ar: "إصابات الغضروف الهلالي من أكثر إصابات الركبة شيوعًا وتؤثر على المرونة والراحة. نقدم برنامجًا تأهيليًا متكاملًا حسب احتياجك.",
    },
    description: null,
    includes: [
      { en: "Detailed knee assessment", ar: "تقييم مفصل للركبة" },
      { en: "Strengthening and mobility exercises", ar: "تمارين تقوية وتحسين الحركة" },
      { en: "Rehabilitation for daily and sports activities", ar: "تأهيل للحياة اليومية والرياضة" },
      { en: "Preventive strategies", ar: "استراتيجيات وقائية" },
      { en: "Remote follow-up", ar: "متابعة عن بعد" },
    ],
    services: [
      { en: "Advanced physiotherapy sessions", ar: "جلسات علاج طبيعي متقدمة" },
      { en: "Functional rehabilitation", ar: "تأهيل وظيفي" },
    ],
    result: {
      en: "Return to movement comfortably and confidently",
      ar: "العودة للحركة بثبات وراحة",
    },
    icon: "bone",
  },
  {
    id: "3",
    slug: "lower-back-pain-rehabilitation",
    category: "rehabilitation",
    title: {
      en: "Lower Back Pain Rehabilitation Program",
      ar: "برنامج إعادة تأهيل آلام أسفل الظهر",
    },
    tagline: {
      en: "Relieve your back... Return to your normal life with comfort and confidence",
      ar: "ريح ظهرك... وارجع لحياتك براحة وثقة",
    },
    overview: {
      en: "Has lower back pain become part of your daily life? We designed this program to restore mobility and improve quality of life.",
      ar: "هل أصبح ألم الظهر جزءًا من يومك؟ صممنا هذا البرنامج لاستعادة الحركة وتحسين جودة الحياة.",
    },
    description: null,
    includes: [
      { en: "Comprehensive assessment", ar: "تقييم شامل" },
      { en: "Pain management and manual therapy", ar: "إدارة الألم والعلاج اليدوي" },
      { en: "Core strengthening exercises", ar: "تمارين تقوية العضلات الأساسية" },
      { en: "Posture correction", ar: "تصحيح الوضعية" },
      { en: "Customized exercises", ar: "تمارين مخصصة" },
    ],
    services: [
      { en: "Specialized physiotherapy sessions", ar: "جلسات متخصصة" },
      { en: "Functional rehabilitation", ar: "تأهيل وظيفي" },
    ],
    result: {
      en: "Return to life pain-free and confident",
      ar: "العودة للحياة بدون ألم وبثقة",
    },
    icon: "spine",
  },
  {
    id: "4",
    slug: "womens-health-pelvic-floor",
    category: "womens-health",
    title: {
      en: "Women's Health – Pelvic Floor Program",
      ar: "برنامج صحة المرأة – تأهيل عضلات الحوض",
    },
    tagline: {
      en: "Strength from within... Support for every woman",
      ar: "قوة من الداخل... دعم لكل امرأة",
    },
    overview: {
      en: "Pelvic floor issues are common but treatable.",
      ar: "مشاكل عضلات الحوض شائعة ولكن قابلة للعلاج.",
    },
    description: null,
    includes: [
      { en: "Pelvic floor assessment", ar: "تقييم عضلات الحوض" },
      { en: "Targeted exercises", ar: "تمارين مخصصة" },
      { en: "Postpartum care", ar: "رعاية ما بعد الولادة" },
      { en: "Bladder control improvement", ar: "تحسين التحكم" },
      { en: "Private and professional care", ar: "رعاية باحترافية وخصوصية" },
      { en: "Remote support and follow-up", ar: "دعم ومتابعة" },
    ],
    services: [
      { en: "Women's physiotherapy sessions", ar: "جلسات علاج طبيعي نسائي" },
      { en: "Functional rehabilitation", ar: "تأهيل وظيفي" },
    ],
    result: {
      en: "Better comfort, control, and quality of life",
      ar: "راحة وتحكم وجودة حياة أفضل",
    },
    icon: "heart",
  },
  {
    id: "5",
    slug: "neck-pain",
    category: "package",
    title: {
      en: "Neck Pain Package",
      ar: "برنامج علاج آلام الرقبة",
    },
    tagline: {
      en: "A comprehensive program to treat neck pain and restore mobility",
      ar: "برنامج متكامل لعلاج آلام الرقبة واستعادة الحركة",
    },
    overview: {
      en: "A comprehensive program designed to treat neck pain caused by strain, disc issues, or poor posture, aiming to reduce pain and improve mobility.",
      ar: "برنامج علاجي متكامل لعلاج آلام الرقبة الناتجة عن الإجهاد، الانزلاق الغضروفي، أو مشاكل القوام، بهدف تقليل الألم وتحسين الحركة.",
    },
    description: null,
    includes: [
      { en: "Electromagnetic Therapy", ar: "العلاج بالمجال الكهرومغناطيسي" },
      { en: "Rehabilitation Exercises", ar: "تمارين التأهيل" },
      { en: "Physiotherapy Sessions", ar: "جلسات العلاج الطبيعي" },
    ],
    services: [
      { en: "Physiotherapy Sessions", ar: "جلسات العلاج الطبيعي" },
      { en: "Electromagnetic Therapy", ar: "العلاج بالمجال الكهرومغناطيسي" },
      { en: "Rehabilitation Exercises", ar: "تمارين التأهيل" },
    ],
    result: {
      en: "Pain Reduction · Improved Neck Mobility · Posture Correction",
      ar: "تقليل الألم · تحسين حركة الرقبة · تصحيح القوام",
    },
    icon: "neck",
  },
  {
    id: "6",
    slug: "low-back-pain-package",
    category: "package",
    title: {
      en: "Low Back Pain Program Package",
      ar: "برنامج آلام أسفل الظهر",
    },
    tagline: {
      en: "Root cause treatment and improved core stability",
      ar: "علاج السبب الجذري وتحسين استقرار العضلات",
    },
    overview: {
      en: "A specialized program for acute and chronic low back pain focusing on root cause treatment and improving core stability.",
      ar: "برنامج متخصص لعلاج آلام أسفل الظهر الحادة والمزمنة مع التركيز على علاج السبب الجذري وتحسين استقرار العضلات.",
    },
    description: null,
    includes: [
      { en: "Electromagnetic Therapy", ar: "العلاج بالمجال الكهرومغناطيسي" },
      { en: "Rehabilitation Exercises", ar: "تمارين التأهيل" },
      { en: "Physiotherapy Sessions", ar: "جلسات العلاج الطبيعي" },
    ],
    services: [
      { en: "Physiotherapy Sessions", ar: "جلسات العلاج الطبيعي" },
      { en: "Electromagnetic Therapy", ar: "العلاج بالمجال الكهرومغناطيسي" },
      { en: "Rehabilitation Exercises", ar: "تمارين التأهيل" },
    ],
    result: {
      en: "Pain Relief · Core Strengthening · Functional Movement Improvement",
      ar: "تخفيف الألم · تقوية عضلات الجذع · تحسين الحركة الوظيفية",
    },
    icon: "layers",
  },
  {
    id: "7",
    slug: "hip-pain",
    category: "package",
    title: {
      en: "Hip Pain Program Package",
      ar: "برنامج آلام الورك",
    },
    tagline: {
      en: "Restore hip joint function, reduce pain, improve mobility",
      ar: "إعادة تأهيل مفصل الورك وتحسين الحركة وتقليل الألم",
    },
    overview: {
      en: "A targeted rehabilitation program to restore hip joint function, reduce pain, and improve mobility.",
      ar: "برنامج يركز على إعادة تأهيل مفصل الورك وتحسين الحركة وتقليل الألم الناتج عن الإصابات أو الخشونة.",
    },
    description: null,
    includes: [
      { en: "Rehabilitation Exercises", ar: "تمارين التأهيل" },
      { en: "Physiotherapy Sessions", ar: "جلسات العلاج الطبيعي" },
      { en: "Electromagnetic Therapy", ar: "العلاج بالمجال الكهرومغناطيسي" },
    ],
    services: [
      { en: "Physiotherapy Sessions", ar: "جلسات العلاج الطبيعي" },
      { en: "Electromagnetic Therapy", ar: "العلاج بالمجال الكهرومغناطيسي" },
      { en: "Rehabilitation Exercises", ar: "تمارين التأهيل" },
    ],
    result: {
      en: "Improved Joint Mobility · Pain Reduction · Better Walking Mechanics",
      ar: "تحسين حركة المفصل · تقليل الألم · تحسين نمط المشي",
    },
    icon: "person-standing",
  },
  {
    id: "8",
    slug: "shoulder-rehabilitation",
    category: "rehabilitation",
    title: {
      en: "Shoulder Rehabilitation Program",
      ar: "برنامج تأهيل الكتف",
    },
    tagline: {
      en: "Restore shoulder strength and full range of motion",
      ar: "استعادة قوة الكتف ومدى الحركة الكامل",
    },
    overview: {
      en: "A rehabilitation program for shoulder injuries such as tears, inflammation, and stiffness to restore strength and function.",
      ar: "برنامج تأهيلي لعلاج إصابات الكتف مثل التمزقات، الالتهابات، أو التيبس مع استعادة القوة والوظيفة.",
    },
    description: null,
    includes: [
      { en: "Rehabilitation Exercises", ar: "تمارين التأهيل" },
      { en: "Physiotherapy Sessions", ar: "جلسات العلاج الطبيعي" },
      { en: "Electromagnetic Therapy", ar: "العلاج بالمجال الكهرومغناطيسي" },
    ],
    services: [
      { en: "Physiotherapy Sessions", ar: "جلسات العلاج الطبيعي" },
      { en: "Electromagnetic Therapy", ar: "العلاج بالمجال الكهرومغناطيسي" },
      { en: "Rehabilitation Exercises", ar: "تمارين التأهيل" },
    ],
    result: {
      en: "Increased Range of Motion · Strength Restoration · Pain Reduction",
      ar: "زيادة مدى الحركة · استعادة القوة · تقليل الألم",
    },
    icon: "dumbbell",
  },
  {
    id: "9",
    slug: "knee-osteoarthritis",
    category: "package",
    title: {
      en: "Knee Osteoarthritis (OA) Program",
      ar: "برنامج خشونة الركبة",
    },
    tagline: {
      en: "Manage knee OA, improve mobility, and reduce pain",
      ar: "علاج خشونة الركبة وتحسين الوظيفة الحركية وتقليل الألم",
    },
    overview: {
      en: "A specialized program for managing knee osteoarthritis, improving mobility, and reducing pain.",
      ar: "برنامج متخصص لعلاج خشونة الركبة وتحسين الوظيفة الحركية وتقليل الألم.",
    },
    description: null,
    includes: [
      { en: "Rehabilitation Exercises", ar: "تمارين التأهيل" },
      { en: "Physiotherapy Sessions", ar: "جلسات العلاج الطبيعي" },
      { en: "Electromagnetic Therapy", ar: "العلاج بالمجال الكهرومغناطيسي" },
    ],
    services: [
      { en: "Physiotherapy Sessions", ar: "جلسات العلاج الطبيعي" },
      { en: "Electromagnetic Therapy", ar: "العلاج بالمجال الكهرومغناطيسي" },
      { en: "Rehabilitation Exercises", ar: "تمارين التأهيل" },
    ],
    result: {
      en: "Pain Management · Improved Mobility · Muscle Strengthening",
      ar: "التحكم بالألم · تحسين الحركة · تقوية العضلات المحيطة",
    },
    icon: "gauge",
  },
  {
    id: "10",
    slug: "tennis-elbow",
    category: "package",
    title: {
      en: "Tennis Elbow Program",
      ar: "برنامج مرفق التنس",
    },
    tagline: {
      en: "Treat tendon inflammation and restore arm function",
      ar: "علاج التهاب أوتار المرفق واستعادة وظيفة الذراع",
    },
    overview: {
      en: "A program designed to treat tendon inflammation in the elbow and restore arm function.",
      ar: "برنامج لعلاج التهاب أوتار المرفق وتقليل الألم واستعادة وظيفة الذراع.",
    },
    description: null,
    includes: [
      { en: "Rehabilitation Exercises", ar: "تمارين التأهيل" },
      { en: "Physiotherapy Sessions", ar: "جلسات العلاج الطبيعي" },
      { en: "Shockwave Therapy", ar: "العلاج بالموجات التصادمية" },
    ],
    services: [
      { en: "Physiotherapy Sessions", ar: "جلسات العلاج الطبيعي" },
      { en: "Shockwave Therapy", ar: "العلاج بالموجات التصادمية" },
      { en: "Rehabilitation Exercises", ar: "تمارين التأهيل" },
    ],
    result: {
      en: "Pain Reduction · Tendon Healing Stimulation · Improved Grip Strength",
      ar: "تقليل الألم · تحفيز التئام الأوتار · تحسين قوة القبضة",
    },
    icon: "zap",
  },
  {
    id: "11",
    slug: "womens-health-rehabilitation",
    category: "womens-health",
    title: {
      en: "Women's Health Rehabilitation Program",
      ar: "برنامج تأهيل صحة المرأة",
    },
    tagline: {
      en: "Specialized care for pelvic floor, postnatal recovery, and pregnancy-related pain",
      ar: "رعاية متخصصة لقاع الحوض وما بعد الولادة وآلام الحمل",
    },
    overview: {
      en: "A specialized program addressing pelvic floor dysfunction, postnatal recovery, and pregnancy-related pain.",
      ar: "برنامج متخصص لصحة المرأة يشمل مشاكل قاع الحوض، ما بعد الولادة، وآلام الحمل.",
    },
    description: null,
    includes: [
      { en: "Physiotherapy Sessions", ar: "جلسات العلاج الطبيعي" },
      { en: "Electromagnetic Therapy", ar: "العلاج بالمجال الكهرومغناطيسي" },
    ],
    services: [
      { en: "Physiotherapy Sessions", ar: "جلسات العلاج الطبيعي" },
      { en: "Electromagnetic Therapy", ar: "العلاج بالمجال الكهرومغناطيسي" },
    ],
    result: {
      en: "Pelvic Floor Strengthening · Pain Relief · Improved Functional Health",
      ar: "تقوية عضلات قاع الحوض · تخفيف الألم · تحسين الوظيفة العامة",
    },
    icon: "heart-pulse",
  },
  {
    id: "12",
    slug: "neurological-rehabilitation",
    category: "neurological",
    title: {
      en: "Neurological Rehabilitation Program",
      ar: "برنامج التأهيل العصبي",
    },
    tagline: {
      en: "Restore movement, balance, and independence after neurological conditions",
      ar: "استعادة الحركة والتوازن والاستقلالية بعد الحالات العصبية",
    },
    overview: {
      en: "A rehabilitation program for neurological conditions such as stroke, spinal cord injuries, and balance disorders.",
      ar: "برنامج تأهيلي للحالات العصبية مثل السكتة الدماغية، إصابات الحبل الشوكي، واضطرابات التوازن.",
    },
    description: null,
    includes: [
      { en: "Physiotherapy Sessions", ar: "جلسات العلاج الطبيعي" },
      { en: "Neurological Rehabilitation Exercises", ar: "تمارين التأهيل العصبي" },
      { en: "Balance & Gait Training", ar: "تدريب التوازن والمشي" },
      { en: "Functional Training", ar: "التدريب الوظيفي" },
    ],
    services: [
      { en: "Physiotherapy Sessions", ar: "جلسات العلاج الطبيعي" },
      { en: "Neurological Rehabilitation Exercises", ar: "تمارين التأهيل العصبي" },
      { en: "Balance & Gait Training", ar: "تدريب التوازن والمشي" },
      { en: "Functional Training", ar: "التدريب الوظيفي" },
    ],
    result: {
      en: "Improved Balance · Restored Movement · Increased Functional Independence",
      ar: "تحسين التوازن · استعادة الحركة · زيادة الاستقلالية الوظيفية",
    },
    icon: "brain",
  },
];

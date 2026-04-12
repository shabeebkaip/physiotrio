export interface RehabTech {
  id: string;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  conditions: { en: string[]; ar: string[] };
  image?: string;
}

export const rehabTechnologies: RehabTech[] = [
  {
    id: "lokomat",
    name: { en: "Lokomat® Robotic System", ar: "نظام لوكومات® الروبوتي" },
    description: {
      en: "The Lokomat® is an advanced robotic-assisted gait training device designed to help patients regain their walking abilities. It provides customized support and assistance, enabling patients to improve their mobility and independence.",
      ar: "لوكومات® هو جهاز تدريب متقدم على المشي بمساعدة الروبوت مصمم لمساعدة المرضى على استعادة قدرتهم على المشي.",
    },
    conditions: {
      en: ["Stroke", "Spinal cord injury", "Traumatic brain injury", "Neurological conditions"],
      ar: ["السكتة الدماغية", "إصابات الحبل الشوكي", "إصابات الدماغ الرضحية", "الحالات العصبية"],
    },
    image: "https://physiotherabia.com/wp-content/uploads/2023/06/1000x325_Walk-Bot.jpg",
  },
  {
    id: "gait-analysis",
    name: { en: "Gait Analysis — BE G6 Sensor", ar: "تحليل المشية — مستشعر BE G6" },
    description: {
      en: "Cutting-edge gait analysis technology that captures detailed biomechanical data to optimize rehabilitation plans and track performance improvements.",
      ar: "تقنية تحليل المشية المتطورة التي تلتقط بيانات ميكانيكية حيوية مفصلة لتحسين خطط إعادة التأهيل.",
    },
    conditions: {
      en: ["Movement disorders", "Sports performance", "Post-surgical recovery"],
      ar: ["اضطرابات الحركة", "الأداء الرياضي", "التعافي بعد الجراحة"],
    },
    image: "https://physiotherabia.com/wp-content/uploads/2023/07/Gait-Analysis-Lab-–-BE-G6-Sensor-2.jpg",
  },
  {
    id: "hbot",
    name: { en: "Sigma 40 Hyperbaric Chamber (HBOT)", ar: "غرفة سيغما 40 للأكسجين عالي الضغط" },
    description: {
      en: "A revolutionary treatment delivering pressurized oxygen to promote healing and recovery. Accelerates healing, reduces inflammation, and enhances overall well-being.",
      ar: "علاج ثوري يوصل الأكسجين المضغوط لتعزيز الشفاء والتعافي. يسرّع الشفاء ويقلل الالتهابات.",
    },
    conditions: {
      en: ["Post-surgical recovery", "Wound healing", "Sports injuries", "Neurological conditions"],
      ar: ["التعافي بعد الجراحة", "التئام الجروح", "الإصابات الرياضية", "الحالات العصبية"],
    },
  },
  {
    id: "hydrotherapy",
    name: { en: "Hydrotherapy Pool", ar: "حوض العلاج المائي" },
    description: {
      en: "Hydrotherapy utilizes the buoyancy, resistance, and soothing properties of water to improve circulation, reduce pain, and promote relaxation.",
      ar: "يستخدم العلاج المائي خصائص الطفو والمقاومة والتهدئة للماء لتحسين الدورة الدموية وتقليل الألم.",
    },
    conditions: {
      en: ["Musculoskeletal injuries", "Arthritis", "Post-surgical recovery", "Chronic pain"],
      ar: ["إصابات الجهاز العضلي الهيكلي", "التهاب المفاصل", "التعافي بعد الجراحة", "الألم المزمن"],
    },
    image: "https://physiotherabia.com/wp-content/uploads/2023/11/display-pic-1.jpg",
  },
  {
    id: "cryotherapy",
    name: { en: "Cryotherapy Chamber", ar: "غرفة العلاج بالتبريد" },
    description: {
      en: "Whole-body cryotherapy using extreme cold temperatures to reduce inflammation, accelerate recovery, and enhance athletic performance.",
      ar: "علاج بالتبريد لكامل الجسم باستخدام درجات حرارة منخفضة للغاية لتقليل الالتهابات وتسريع التعافي.",
    },
    conditions: {
      en: ["Sports injuries", "Inflammation", "Pain management", "Recovery optimization"],
      ar: ["الإصابات الرياضية", "الالتهابات", "إدارة الألم", "تحسين التعافي"],
    },
  },
  {
    id: "shockwave",
    name: { en: "Shockwave Therapy", ar: "علاج موجة الصدمة" },
    description: {
      en: "Non-invasive acoustic wave therapy that stimulates healing in tendons, muscles, and connective tissue — effective for chronic conditions.",
      ar: "علاج بالموجات الصوتية غير جراحي يحفز الشفاء في الأوتار والعضلات والنسيج الضام.",
    },
    conditions: {
      en: ["Chronic tendinopathy", "Plantar fasciitis", "Calcific tendinitis", "Bone healing"],
      ar: ["اعتلال الأوتار المزمن", "التهاب اللفافة الأخمصية", "التهاب الوتر الكلسي", "التئام العظام"],
    },
  },
  {
    id: "idd",
    name: { en: "IDD Therapy", ar: "علاج IDD" },
    description: {
      en: "Targeted spinal decompression therapy that gently stretches the spine to relieve pressure on discs and nerves.",
      ar: "علاج ضغط العمود الفقري المستهدف الذي يمد العمود الفقري بلطف لتخفيف الضغط على الأقراص والأعصاب.",
    },
    conditions: {
      en: ["Disc herniation", "Sciatica", "Degenerative disc disease", "Chronic back pain"],
      ar: ["الانزلاق الغضروفي", "عرق النسا", "مرض القرص التنكسي", "آلام الظهر المزمنة"],
    },
  },
  {
    id: "alterg",
    name: { en: "Antigravity Treadmill (AlterG)", ar: "جهاز المشي ضد الجاذبية (ألتر جي)" },
    description: {
      en: "NASA-derived technology that reduces body weight during walking and running, enabling earlier rehabilitation with less pain and risk.",
      ar: "تقنية مستوحاة من ناسا تقلل وزن الجسم أثناء المشي والجري، مما يتيح إعادة التأهيل المبكرة.",
    },
    conditions: {
      en: ["Post-surgical recovery", "Obesity", "Neurological conditions", "Sports rehab"],
      ar: ["التعافي بعد الجراحة", "السمنة", "الحالات العصبية", "إعادة التأهيل الرياضي"],
    },
  },
  {
    id: "spider-cage",
    name: { en: "Spider Cage", ar: "قفص العنكبوت" },
    description: {
      en: "A versatile rehabilitation tool providing a safe environment for functional training, improving balance, coordination, and physical performance.",
      ar: "أداة إعادة تأهيل متعددة الاستخدامات توفر بيئة آمنة للتدريب الوظيفي وتحسين التوازن والتنسيق.",
    },
    conditions: {
      en: ["Balance disorders", "Neurological conditions", "Sports performance"],
      ar: ["اضطرابات التوازن", "الحالات العصبية", "الأداء الرياضي"],
    },
  },
  {
    id: "sensory-room",
    name: { en: "Sensory Room", ar: "غرفة الحسية" },
    description: {
      en: "Specially designed therapeutic environments for patients with sensory processing disorders — calming, structured, and evidence-based.",
      ar: "بيئات علاجية مصممة خصيصاً للمرضى المصابين باضطرابات المعالجة الحسية — هادئة ومنظمة وقائمة على الأدلة.",
    },
    conditions: {
      en: ["Sensory processing disorders", "Autism spectrum", "Neurological conditions"],
      ar: ["اضطرابات المعالجة الحسية", "طيف التوحد", "الحالات العصبية"],
    },
    image: "https://physiotherabia.com/wp-content/uploads/2023/11/Occupational-Therapy_Sensory-Room-Session-1.jpg",
  },
];

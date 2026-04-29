export interface FAQ {
  id: string;
  question: { en: string; ar: string };
  answer: { en: string; ar: string };
  category: string;
}

export const faqCategories = [
  { id: "all", label: { en: "All", ar: "الكل" } },
  { id: "general", label: { en: "General", ar: "عام" } },
  { id: "booking", label: { en: "Booking", ar: "الحجز" } },
  { id: "insurance", label: { en: "Insurance", ar: "التأمين" } },
  { id: "treatment", label: { en: "Treatment", ar: "العلاج" } },
  { id: "payment", label: { en: "Payment", ar: "الدفع" } },
  { id: "homecare", label: { en: "Home Care", ar: "الرعاية المنزلية" } }
];

export const faqs: FAQ[] = [
  {
    id: "f1",
    category: "general",
    question: { en: "What is PhysioTrio?", ar: "ما هو فيزيوتريو؟" },
    answer: { en: "PhysioTrio is a premium physiotherapy center operating under Burjeel Arabia, one of the GCC's largest healthcare groups. We offer specialized physiotherapy services across Riyadh and Makkah.", ar: "فيزيوتريو هو مركز علاج طبيعي متميز يعمل تحت مظلة بورجيل القابضة، إحدى أكبر مجموعات الرعاية الصحية في منطقة الخليج. نقدم خدماتنا في الرياض ومكة المكرمة." }
  },
  {
    id: "f2",
    category: "booking",
    question: { en: "How do I book an appointment?", ar: "كيف أحجز موعداً؟" },
    answer: { en: "You can book online through our website in under 3 minutes, call our branch directly, or WhatsApp us. Online booking requires OTP mobile verification for your security.", ar: "يمكنك الحجز عبر الإنترنت من خلال موقعنا الإلكتروني في أقل من 3 دقائق، أو الاتصال بفرعنا مباشرة، أو مراسلتنا عبر واتساب." }
  },
  {
    id: "f3",
    category: "insurance",
    question: { en: "Which insurance providers do you accept?", ar: "ما شركات التأمين التي تقبلونها؟" },
    answer: { en: "We accept Bupa Arabia, Tawuniya, MedNet, AXA Cooperative, NEXT by AXA, Al Rajhi Takaful, GIG Gulf, Daman, Oman Insurance, and Walaa. Contact us to verify your specific coverage.", ar: "نقبل بوبا العربية، التعاونية، ميدنت، اكسا التعاونية، نكست بواسطة اكسا، الراجحي للتكافل، جي آي جي الخليج، ضمان، التأمين العماني، وولاء." }
  },
  {
    id: "f4",
    category: "treatment",
    question: { en: "How long is a typical physiotherapy session?", ar: "كم تستغرق جلسة العلاج الطبيعي عادةً؟" },
    answer: { en: "Session duration varies by service: most sessions are 45–75 minutes. Your first session includes an assessment and takes about 60–90 minutes. Your therapist will advise on frequency and duration for your specific condition.", ar: "تتفاوت مدة الجلسة حسب الخدمة: معظم الجلسات تستغرق 45–75 دقيقة. تتضمن جلستك الأولى تقييماً وتستغرق حوالي 60–90 دقيقة." }
  },
  {
    id: "f5",
    category: "payment",
    question: { en: "What payment methods do you accept?", ar: "ما طرق الدفع التي تقبلونها؟" },
    answer: { en: "We accept Visa, Mastercard, Mada, Apple Pay, STC Pay. For packages, you can split payments using Tamara or Tabby BNPL. Cash is also accepted at branches.", ar: "نقبل فيزا وماستركارد وبطاقة مدى وApple Pay وSTC Pay. للباقات، يمكنك تقسيم المدفوعات باستخدام تمارا أو تابي." }
  },
  {
    id: "f6",
    category: "homecare",
    question: { en: "Do you offer home visit physiotherapy?", ar: "هل تقدمون زيارات العلاج الطبيعي المنزلية؟" },
    answer: { en: "Yes! We offer home care physiotherapy in Riyadh and Makkah. A licensed therapist visits your home with all necessary equipment. Book through our Home Care page.", ar: "نعم! نقدم العلاج الطبيعي المنزلي في الرياض ومكة المكرمة. يزور معالج مرخص منزلك بجميع المعدات اللازمة." }
  },
  {
    id: "f7",
    category: "booking",
    question: { en: "Can I cancel or reschedule my appointment?", ar: "هل يمكنني إلغاء موعدي أو إعادة جدولته؟" },
    answer: { en: "Yes, you can cancel or reschedule up to 24 hours before your appointment without any charges. Contact our branch directly or use WhatsApp.", ar: "نعم، يمكنك الإلغاء أو إعادة الجدولة حتى 24 ساعة قبل موعدك دون أي رسوم." }
  },
  {
    id: "f8",
    category: "treatment",
    question: { en: "Do I need a referral from a doctor?", ar: "هل أحتاج إلى إحالة من طبيب؟" },
    answer: { en: "No referral is needed for most services. You can book directly with us. However, some insurance providers may require a referral for coverage — check with your insurer.", ar: "لا تحتاج إلى إحالة لمعظم الخدمات. يمكنك الحجز مباشرة معنا. ومع ذلك، قد تتطلب بعض شركات التأمين إحالة للتغطية." }
  },
  {
    id: "f9",
    category: "general",
    question: { en: "Are your therapists MOH-licensed?", ar: "هل معالجوكم مرخصون من وزارة الصحة؟" },
    answer: { en: "Yes, all PhysioTrio physiotherapists are fully licensed by the Saudi Ministry of Health (MOH) and hold internationally recognized qualifications.", ar: "نعم، جميع معالجي فيزيوتريو مرخصون بالكامل من وزارة الصحة السعودية ويحملون مؤهلات معترفاً بها دولياً." }
  },
  {
    id: "f10",
    category: "general",
    question: { en: "What languages do your therapists speak?", ar: "ما اللغات التي يتحدثها معالجوكم؟" },
    answer: { en: "Our therapists are fluent in Arabic and English. Some also speak additional languages including French and Urdu. All patient communication can be conducted in Arabic.", ar: "معالجونا يتحدثون بطلاقة العربية والإنجليزية. بعضهم يتحدث لغات إضافية أيضاً منها الفرنسية والأردية." }
  }
];

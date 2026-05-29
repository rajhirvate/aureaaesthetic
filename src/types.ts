/**
 * Types & Data declarations for Aurea Aesthetic website
 */

export interface Treatment {
  id: string;
  title: string;
  benefit: string;
  description: string;
  fullDetails: string[];
  iconName: string; // Used to pick correct Lucide icon
  imageUrl: string;
  duration?: string;
  suitability?: string;
  category: 'skin' | 'hair' | 'laser';
  isPopular?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  source: string;
  treatmentGot?: string;
  date?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: 'skin' | 'hair' | 'laser';
  beforeImage: string;
  afterImage: string;
  disclaimer?: string;
}

export interface BlogPostTitle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  publishDate: string;
}

export const CLINIC_INFO = {
  name: "Aurea Aesthetic Clinic",
  tagline: "Advanced Skin, Hair & Laser Solutions",
  doctor: "Dr. Pratima Unawane",
  doctorTitle: "Founder & Lead Aesthetic Specialist",
  doctorBio: "Dr. Pratima Unawane is a highly qualified and trusted medical aesthetic practitioner in Kurla, Mumbai. She holds dedicated expertise in advanced non-surgical clinical dermatology, customized skin rejuvenation therapies, state-of-the-art laser treatments, and hair preservation protocols.",
  doctorDegree: "BAMS, MD, Post Graduate Diploma in Clinical Cosmetology & Aesthetics",
  address: "Gate No. 4, Pearl Hans Residency, Shop No. 2, Opp. Phoenix Mall, Beside Hotel Naaz, Kurla West, Kurla, Mumbai, Maharashtra 400070",
  phone: "088505 78769",
  whatsapp: "088505 78769",
  instagramUrl: "https://www.instagram.com/aureaestheticclinic_/",
  workingHours: [
    { days: "Monday - Saturday", timings: "11:00 AM - 08:30 PM" },
    { days: "Sunday", timings: "11:00 AM - 04:00 PM (By Appointment Only)" }
  ],
  clinicFeatures: [
    { title: "Doctor-Led Care", desc: "Every assessment and execution is personally overseen by Dr. Pratima Unawane." },
    { title: "Advanced Equipment", desc: "US-FDA approved laser hair reduction and micro-needling tools." },
    { title: "Tailored Formulations", desc: "No generic protocols. Custom bridal, anti-acne, and anti-aging plans." },
    { title: "Ethical Practise", desc: "Honest clinical advice, standard medical hygiene, and transparent results." }
  ]
};

export const TREATMENTS: Treatment[] = [
  // SKIN TREATMENTS
  {
    id: "acne-scar-treatment",
    title: "Advanced Acne & Scar Therapy",
    benefit: "Clear skin with reduced pitting, hyperpigmentation and swelling",
    description: "Multidimensional approach utilizing microneedling, custom peels, and clinical extractions to fade standard acne, calm cystic lesions, and resurface deep acne scars.",
    fullDetails: [
      "Clinical evaluation of acne grade (Grade I to IV)",
      "Gentle extraction of blackheads, whiteheads, and localized pustules",
      "Chemical peels (Salicylic, Mandelic) to clear follicular plugs",
      "Microneedling (Dermapen) to stimulate collagen for deep pitted scars",
      "Post-treatment cooling therapy and custom non-comedogenic hydration"
    ],
    iconName: "Sparkles",
    imageUrl: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600",
    duration: "45 - 60 Mins",
    suitability: "Active Acne, Acne Scars, Ice-pick or Boxcar Scars",
    category: "skin",
    isPopular: true
  },
  {
    id: "pigmentation-treatment",
    title: "Pigmentation & melasma Correction",
    benefit: "Diminishes dark patches, uneven skin tone and sun damage",
    description: "Personalized peeling skin regimens and advanced antioxidants combined to control melanin hyper-production and restore a uniform skin complexion.",
    fullDetails: [
      "Targeted melanin control therapies",
      "Custom medical peeling agents targeting deeper dermal stains",
      "Tyrosinase inhibitor application to halt future pigmentation triggers",
      "Inclusion of medical-grade Vitamin C and Glutathione infusions",
      "Structured home-care routine instruction to maintain results"
    ],
    iconName: "ShieldCheck",
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600",
    duration: "40 Mins",
    suitability: "Melasma, Sun Spots, Post-Inflammatory Hyperpigmentation (PIH)",
    category: "skin"
  },
  {
    id: "anti-aging-consultation",
    title: "Anti-Aging & Skin Rejuvenation",
    benefit: "Softens fine lines, tightens sagging areas, and restores youthful spring",
    description: "Advanced non-surgical techniques focusing on restoring volume loss, lifting sagged facial areas, and smoothing wrinkles safely.",
    fullDetails: [
      "Assessment of facial muscle tone and structural collagen depletion",
      "Peptides and hyaluronic moisture surge infusions",
      "RF Skin Tightening to contract aging collagen fibers",
      "Ethical clinical counseling regarding preventative skin habits",
      "Maintenance session planning for long-lasting natural skin lifts"
    ],
    iconName: "Zap",
    imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600",
    duration: "60 Mins",
    suitability: "Fine lines, wrinkles, skin laxity, volume loss",
    category: "skin"
  },
  {
    id: "chemical-peels",
    title: "Medical Chemical Peels",
    benefit: "Controlled cellular exfoliation for fresh, luminous epidermal layer",
    description: "Application of specialized fruit and plant-derived acids to exfoliate superficial dead skins, unmasking fresh, undamaged skin cells underneath.",
    fullDetails: [
      "Double-cleansing to remove excess cellular sebum",
      "Prep solution application to guarantee uniform penetration",
      "Precise application of specifically chosen acid (Glycolic, Lactic, Salicylic, or Yellow Peel)",
      "Strict neutralization and soothing sheet masking",
      "Sun-safety shield application (SPF 50+ broad spectrum)"
    ],
    iconName: "Layers",
    imageUrl: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=600",
    duration: "30 Mins",
    suitability: "Fine wrinkles, dull complexions, superficial scars",
    category: "skin"
  },
  {
    id: "medifacials",
    title: "Premium Medifacials",
    benefit: "Deep hydration, oxygenation, and instant camera-ready glow",
    description: "Clinically superior to parlor facials. Utilizes medical devices to infuse powerful serums, vitamins, and hydrating solutions into the deep layers of the skin.",
    fullDetails: [
      "Ultrasonic dead skin exfoliation",
      "Hydradermabrasion node to painless clean deep pores",
      "High-pressure oxygen infusion containing proprietary hyaluronic serum",
      "Soothing LED photo-rejuvenation therapy",
      "Premium relaxing massage customized for medical fluid drainage"
    ],
    iconName: "Gem",
    imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=600",
    duration: "50 - 70 Mins",
    suitability: "All Skin Types, perfect for pre-event glow",
    category: "skin",
    isPopular: true
  },
  {
    id: "bridal-skin-glow",
    title: "Bridal Skin Glow Packages",
    benefit: "Flawless, radiant skin designed for your special day",
    description: "Multidisciplinary timeline plans spanning 1 to 3 months prior to the wedding, customizing medifacials, peels, and brightening therapies to achieve bridal perfection.",
    fullDetails: [
      "Comprehensive aesthetic mapping based on bridal outfit, lighting, and timeline",
      "Step-by-step skin texture refinement and glow infusions",
      "Detoxifying protocols to prevent stress-related breakouts",
      "Gentle skin whitening and hyperpigmentation evening",
      "Includes customized home care schedule and emergency pre-event touch-up"
    ],
    iconName: "Heart",
    imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=600",
    duration: "Custom (1 to 3 Months)",
    suitability: "Brides & Grooms seeking immaculate wedding radiance",
    category: "skin"
  },

  // HAIR TREATMENTS
  {
    id: "hair-fall-treatment",
    title: "Clinical Hair Fall Control",
    benefit: "Reduces acute hair shedding, strengthens follicles, and cleans scalp",
    description: "Comprehensive medical evaluation of hair loss causes (nutritional, hormonal, genetic) combined with clinical scalp restoration treatments.",
    fullDetails: [
      "Trichoscopy examination of hair shafts and scalp health",
      "Detailed review of blood parameters (Iron, Thyroid, Vitamin D)",
      "Scalp peeling to clear stubborn dandruff and build-up",
      "Application of growth-factor peptide solutions directly to follicles",
      "Prescription of target DHT blockers and nutritional supplements"
    ],
    iconName: "TrendingUp",
    imageUrl: "https://images.unsplash.com/photo-1522337094846-8a811135226c?auto=format&fit=crop&q=80&w=600",
    duration: "45 Mins",
    suitability: "Hair thinning, telogen effluvium, clinical baldness patterns",
    category: "hair"
  },
  {
    id: "prp-hair-regrowth",
    title: "PRP Hair Regrowth Therapy",
    benefit: "Stimulates dormant hair follicles to produce thicker, stronger hair",
    description: "Autologous Platelet-Rich Plasma therapy utilizing the natural healing components of your own blood to trigger healthy and dense hair growth.",
    fullDetails: [
      "Extraction of a tiny amount of blood (similar to a standard blood test)",
      "Double-centrifugation using FDA-approved tubes to isolate platelets",
      "Application of local anesthetic cream for painless delivery",
      "Micro-injection of concentrated platelets enriched with growth factors into thin zones",
      "Scalp massage & safety guidance post-therapy"
    ],
    iconName: "Activity",
    imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600",
    duration: "60 Mins",
    suitability: "Androgenetic Alopecia, diffuse thinning, hair density loss",
    category: "hair",
    isPopular: true
  },

  // LASER / AESTHETIC TREATMENTS
  {
    id: "laser-hair-reduction",
    title: "Advanced Laser Hair Reduction",
    benefit: "Permanent hair reduction, smooth skin, and no painful waxing",
    description: "Pain-free, comfortable, and highly effective clinical diode laser technology suited for all Indian skin types, from fine facial fuzz to thick body hair.",
    fullDetails: [
      "Shaving and sterilizing the targeted treatment zone",
      "Marking precise grid blocks and applying chilled ultrasound gel",
      "Delivery of light energy with in-motion cooling tip for ultimate safety",
      "Destruction of the hair bulb without damaging surrounding sweat glands",
      "Wipe clean, post-laser soothing lotion, and high-protection sun gel"
    ],
    iconName: "ZapOff",
    imageUrl: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&q=80&w=600",
    duration: "30 - 90 Mins",
    suitability: "All body skin regions, painless alternative to waxing/shaving",
    category: "laser",
    isPopular: true
  },
  {
    id: "skin-brightening",
    title: "Laser Skin Toning & Brightening",
    benefit: "Breaks pigment particles to instantly brighten skin and tighten pores",
    description: "An advanced laser method targeting deep dermal melanin, erasing long-standing tan, and refining coarse facial skin pores.",
    fullDetails: [
      "Gentle skin degreasing and safety eye shield placement",
      "Advanced laser toning passes across the facial or neck area",
      "Targeted melanin fragmenting without skin damage or downtime",
      "Cooling hydration compression to calm skin temperature",
      "Comprehensive guidance on absolute sun restriction for 24-48 hours"
    ],
    iconName: "Sun",
    imageUrl: "https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&q=80&w=600",
    duration: "40 Mins",
    suitability: "Stubborn tan, photo-aged skin, enlarged facial pores",
    category: "laser"
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Do I need a consultation before treatment?",
    answer: "Yes, absolutely. At Aurea Aesthetic, we prioritize safety and long-term efficacy. Dr. Pratima Unawane personally conducts an in-depth skin or scalp analysis before planning any session to match your biological skin type and avoid side effects."
  },
  {
    question: "Are medical aesthetic treatments safe?",
    answer: "Yes, our procedures are non-surgical and safe. We use medical-grade, US-FDA approved technologies and highly sterile clinical single-use needles (for PRP) under strict clinical protocols."
  },
  {
    question: "How many sessions are required for Laser Hair Reduction?",
    answer: "Typically, 6 to 8 sessions spaced 4 to 6 weeks apart are required. This schedule is necessary because laser targets hair only in its active growth phase (Anagen). Each session progressively reduces hair density and thins out regrowth."
  },
  {
    question: "Is PRP hair treatment painful?",
    answer: "We apply a high-strength medical topical numbing cream to the scalp 45 minutes prior to PRP. This minimizes sensation, turning the micro-injections into light, tolerable pinpricks."
  },
  {
    question: "Can I book my appointment directly via WhatsApp?",
    answer: "Definitely! Booking via WhatsApp at 088505 78769 is the fastest way to lock in your preferred date and time. Our clinic desk will immediately verify and confirm your slot."
  },
  {
    question: "Where is Aurea Aesthetic located in Mumbai?",
    answer: "We are ideally situated in Kurla West, opposite Phoenix Marketcity Mall. The exact address is: Shop No. 2, Pearl Hans Residency, Gate No. 4, beside Hotel Naaz, Mumbai. The clinic has convenient street-level access."
  },
  {
    question: "Are aesthetic results 100% guaranteed?",
    answer: "To stay ethically responsible, we never make false claims of guaranteed identical outcomes. Results vary based on individual biochemistry, diet, age, compliance with aftercare, and genetics. However, we customize clinical parameters systematically to achieve your highest possible clinical improvement."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "review-1",
    name: "Rohan Sawant",
    rating: 5,
    text: "Had severe hair fall issues and decided to consult Dr. Pratima. Her PRP treatment advice has saved my hairline. I can see a clear increase in density and less hair falling out now. Extremely hygienic clinic near Phoenix Mall.",
    source: "Google Places Review",
    treatmentGot: "Hair PRP Therapy",
    date: "April 2026"
  },
  {
    id: "review-2",
    name: "Meera Shah",
    rating: 5,
    text: "I visited Aurea Aesthetic for my dark spots and bridal glow plan. Dr. Pratima designed a beautiful 2-month package with mild chemical peels and medifacials. My skin was shining on my wedding day! Highly recommend her ethical guidance.",
    source: "Instagram Verified Direct Message",
    treatmentGot: "Bridal Skin Glow Package",
    date: "May 2026"
  },
  {
    id: "review-3",
    name: "Alisha Fernandes",
    rating: 5,
    text: "Getting my Laser Hair Reduction done here. I am on my 5th session now and 85% of hair is gone. It's painless because they use a very cooling laser tip. Dr. Pratima and staff make you feel extremely comfortable.",
    source: "Google Places Review",
    treatmentGot: "Laser Hair Reduction",
    date: "March 2026"
  },
  {
    id: "review-4",
    name: "Dr. Nilesh K.",
    rating: 5,
    text: "As a fellow medical professional, I appreciate the absolute hygiene, clinical safety setup, and doctor-led approach at Aurea. Dr. Pratima doesn't oversell or make big unscientific promises. Very ethical, standard and clear.",
    source: "Google Local Guide Verified Review",
    treatmentGot: "Advanced Acne & Scar Therapy",
    date: "February 2026"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "res-acne",
    title: "Post-Acne Scar Reduction",
    description: "Significant shallowing of deep crater ice-pick scars and fade of active stubborn acne after 4 sessions of Microneedling combined with Salicylic Peeling.",
    category: "skin",
    beforeImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400", // Representative soft glow
    afterImage: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=400",
    disclaimer: "Images represent typical skin remodeling results. Individual results vary based on scar age."
  },
  {
    id: "res-hair",
    title: "PRP Hair Density Improvement",
    description: "Noticeable hair count recovery and reduction of scalp visibility on crown region after 5 sessions of autologous PRP hair growth factors.",
    category: "hair",
    beforeImage: "https://images.unsplash.com/photo-1522337094846-8a811135226c?auto=format&fit=crop&q=80&w=400",
    afterImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=400",
    disclaimer: "Results depend on active follicular presence and genetic baseline."
  },
  {
    id: "res-laser",
    title: "Laser Hair Reduction (Underarms)",
    description: "Incredible suppression of thick dark hair, yielding smooth, soft, follicle-free skin texture post 6 customized diode laser sessions.",
    category: "laser",
    beforeImage: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&q=80&w=400",
    afterImage: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=400"
  }
];

export const BLOG_POSTS: BlogPostTitle[] = [
  {
    id: "blog-1",
    title: "Best Skin Clinic Near Kurla West: What to Look For",
    category: "Skin Health",
    readTime: "4 min read",
    summary: "Discover why selecting a doctor-led clinic outweighs standard beauty parlor packages, focusing on hygiene, FDA machines, and customized protocols.",
    publishDate: "May 12, 2026"
  },
  {
    id: "blog-2",
    title: "Acne Scar Treatment Options Explained Simply",
    category: "Acne & Scars",
    readTime: "5 min read",
    summary: "From chemical peels to micro-needling, learn how deep scars require dermal stimulating treatments rather than just topical skin creams.",
    publishDate: "April 28, 2026"
  },
  {
    id: "blog-3",
    title: "Hair Fall Treatment: When Should You Visit a Clinic?",
    category: "Hair Regrowth",
    readTime: "3 min read",
    summary: "Understanding the difference between seasonal hair shedding and clinical thinning. Spot early warning signals and know when to seek medical PRP assistance.",
    publishDate: "April 15, 2026"
  },
  {
    id: "blog-4",
    title: "Laser Hair Reduction: Myths vs Facts & Safety Guide",
    category: "Laser Aesthetics",
    readTime: "6 min read",
    summary: "Addressing queries regarding skin burning, painful sensations, cost indicators, and expected session reduction in the Indian humid climate.",
    publishDate: "March 30, 2026"
  },
  {
    id: "blog-5",
    title: "How to Prepare Your Skin Before a Facial Treatment",
    category: "Skin Care Tips",
    readTime: "3 min read",
    summary: "A brief checklist on stopping active retinoid creams, avoiding high sun exposure, and keeping your skin hydrated before your medical medifacial session.",
    publishDate: "March 10, 2026"
  }
];

import { useState, useEffect } from "react";
import { CLINIC_INFO, TREATMENTS, FAQS, TESTIMONIALS, GALLERY_ITEMS, BLOG_POSTS, Treatment } from "./types";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LeadPopup from "./components/LeadPopup";
import ServiceModal from "./components/ServiceModal";
import Timeline from "./components/Timeline";
import BookingForm from "./components/BookingForm";
import { motion, AnimatePresence } from "motion/react";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Instagram, 
  MessageSquare, 
  ChevronDown, 
  Star, 
  CheckCircle2, 
  Award, 
  Sparkles, 
  ShieldCheck, 
  CalendarCheck, 
  Bookmark,
  Share2,
  TrendingUp,
  Map,
  ArrowRight,
  Stethoscope
} from "lucide-react";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingServicePreset, setBookingServicePreset] = useState("");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Before-After interactive comparison active ids
  const [beforeAfterActive, setBeforeAfterActive] = useState<Record<string, "before" | "after">>({
    "res-acne": "before",
    "res-hair": "before",
    "res-laser": "before"
  });

  // Dynamic SEO Updates & Schema Injection
  useEffect(() => {
    let titleStr = "Aurea Aesthetic Clinic | Skin, Hair & Laser Clinic Kurla West Mumbai";
    let descStr = "Experience premium, doctor-led dermatological care near Phoenix Marketcity. Led by Dr. Pratima Unawane, specializing in PRP, acne scars, and diode laser hair reduction.";

    switch (currentPage) {
      case "home":
        titleStr = "Aurea Aesthetic Clinic | Best Skin & Hair Clinic near Phoenix Mall Kurla Mumbai";
        descStr = "Doctor-led solutions by Dr. Pratima Unawane. Offering advanced medical peels, PRP hair regrowth, painless laser hair reduction & luxury medifacials in Kurla West.";
        break;
      case "about":
        titleStr = "Dr. Pratima Unawane | Founder & Lead Specialist - Aurea Aesthetic Mumbai";
        descStr = "Meet Dr. Pratima Unawane, BAMS, PG Diploma in Clinical Cosmetology & Aesthetics. Learn about her ethical, science-backed approach to clinical beauty.";
        break;
      case "skin":
        titleStr = "Dermatologist Recommended Skin & Acne Scar Treatments | Kurla Mumbai";
        descStr = "Erase active acne, pits, hyperpigmentation and dullness. Custom medifacials, scientific peel therapy, and microneedling at Aurea Aesthetic Kurla West.";
        break;
      case "hair":
        titleStr = "Clinical PRP Hair Loss & Scalp Regrowth Therapy | Kurla West Mumbai";
        descStr = "Struggling with hair thinning or balding? Experience advanced PRP growth factor micro-infusion with Dr. Pratima Unawane for dense, non-surgical hair restoration.";
        break;
      case "laser":
        titleStr = "Painless Diode Laser Hair Reduction & Brightening in Kurla West";
        descStr = "Safe, comfortable laser hair removal suitable for Indian skin tones. High cooling tip technology eliminates body hair without damage or waxing.";
        break;
      case "gallery":
        titleStr = "Aurea Aesthetic Gallery | Real Remodeling Before After Results";
        descStr = "Check out our real-life patient transformations. Authentic clinical before-after comparisons for hair restoration, acne scar leveling, and laser toning.";
        break;
      case "contact":
        titleStr = "Contact & Reach Aurea Aesthetic Clinic | Opp Phoenix Marketcity Kurla";
        descStr = "Find us easily on Gate No. 4, opposite Phoenix Mall, Kurla West. Call 088505 78769 or book online to receive your custom dermatological schedule.";
        break;
    }

    // Update document head attributes
    document.title = titleStr;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", descStr);
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "description";
      newMeta.content = descStr;
      document.head.appendChild(newMeta);
    }

    // Inject JSON-LD Schema
    const oldSchemaScript = document.getElementById("aurea-jsonld-schema");
    if (oldSchemaScript) oldSchemaScript.remove();

    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "MedicalClinic",
        "name": "Aurea Aesthetic Clinic",
        "description": descStr,
        "image": "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=600",
        "telephone": CLINIC_INFO.phone,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Gate No. 4, Pearl Hans Residency, Shop No. 2, Opp. Phoenix Mall, Beside Hotel Naaz, Kurla West",
          "addressLocality": "Mumbai",
          "addressRegion": "Maharashtra",
          "postalCode": "400070",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "19.0837",
          "longitude": "72.8891"
        },
        "url": window.location.href,
        "priceRange": "₹₹",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "11:00",
            "closes": "20:30"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Sunday",
            "opens": "11:00",
            "closes": "16:00"
          }
        ],
        "employee": {
          "@type": "Physician",
          "name": CLINIC_INFO.doctor,
          "medicalSpecialty": "CosmeticDermatology",
          "qualification": CLINIC_INFO.doctorDegree
        }
      }
    ];

    const script = document.createElement("script");
    script.id = "aurea-jsonld-schema";
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(schemas);
    document.head.appendChild(script);

  }, [currentPage]);

  const toggleBeforeAfter = (itemId: string) => {
    setBeforeAfterActive((prev) => ({
      ...prev,
      [itemId]: prev[itemId] === "before" ? "after" : "before"
    }));
  };

  const handleOpenBookingModal = (serviceName: string = "") => {
    setBookingServicePreset(serviceName);
    setBookingModalOpen(true);
  };

  const handleKnowMore = (treatment: Treatment) => {
    setSelectedTreatment(treatment);
  };

  return (
    <div className="bg-[#fdfcf8] text-[#141414] min-h-screen flex flex-col font-sans relative overflow-hidden selection:bg-brand-gold/30 selection:text-brand-emerald-dark">
      {/* Background Mesh Gradients */}
      <div className="absolute top-[-5%] left-[-5%] w-[450px] h-[450px] bg-[#f2e8cf]/60 rounded-full blur-[120px] opacity-60 pointer-events-none z-0"></div>
      <div className="absolute top-[25%] right-[-10%] w-[600px] h-[600px] bg-[#e2d1c3]/50 rounded-full blur-[150px] opacity-50 pointer-events-none z-0"></div>
      <div className="absolute bottom-[30%] left-[-10%] w-[550px] h-[550px] bg-[#f2e8cf]/60 rounded-full blur-[140px] opacity-60 pointer-events-none z-0"></div>
      <div className="absolute bottom-[5%] right-[-5%] w-[500px] h-[500px] bg-[#e2d1c3]/50 rounded-full blur-[130px] opacity-50 pointer-events-none z-0"></div>

      {/* Dynamic Popups & Booking Overlays */}
      <LeadPopup />
      
      <Header 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
        onOpenBooking={() => handleOpenBookingModal()} 
      />

      {/* Global Book Slot Modal Overlays */}
      {bookingModalOpen && (
        <BookingForm
          isModal={true}
          preselectedService={bookingServicePreset}
          onClose={() => setBookingModalOpen(false)}
        />
      )}

      {/* service modal */}
      {selectedTreatment && (
        <ServiceModal
          treatment={selectedTreatment}
          onClose={() => setSelectedTreatment(null)}
          onBookNow={handleOpenBookingModal}
        />
      )}

      {/* Main Page Content Body with Micro transitions */}
      <main className="flex-grow pt-24 md:pt-36">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="w-full"
          >
            {/* VIEW ROUTING REDIRECTS */}
            {currentPage === "home" && <HomeView onOpenBooking={handleOpenBookingModal} onKnowMore={handleKnowMore} onSetPage={setCurrentPage} beforeAfterActive={beforeAfterActive} onToggleBeforeAfter={toggleBeforeAfter} activeFaq={activeFaq} onToggleFaq={(id) => setActiveFaq(activeFaq === id ? null : id)} />}
            {currentPage === "about" && <AboutView onSetPage={setCurrentPage} onOpenBooking={handleOpenBookingModal} />}
            {currentPage === "skin" && <TreatmentsView category="skin" onKnowMore={handleKnowMore} onOpenBooking={handleOpenBookingModal} />}
            {currentPage === "hair" && <TreatmentsView category="hair" onKnowMore={handleKnowMore} onOpenBooking={handleOpenBookingModal} />}
            {currentPage === "laser" && <TreatmentsView category="laser" onKnowMore={handleKnowMore} onOpenBooking={handleOpenBookingModal} />}
            {currentPage === "gallery" && <ResultsView beforeAfterActive={beforeAfterActive} onToggleBeforeAfter={toggleBeforeAfter} onOpenBooking={handleOpenBookingModal} />}
            {currentPage === "contact" && <ContactView />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer onPageChange={setCurrentPage} onOpenBooking={() => handleOpenBookingModal()} />

      {/* Sticky Mobile Friendly Bottom Floating Bar */}
      <div id="mobile-floating-cues" className="fixed bottom-0 left-0 w-full z-40 bg-brand-ivory/95 backdrop-blur-md border-t border-brand-gold/15 sm:hidden py-2 px-4 shadow-lg flex items-center justify-around gap-2">
        <a
          href={`tel:${CLINIC_INFO.phone}`}
          className="flex-1 flex flex-col items-center justify-center p-2 rounded-xl text-brand-emerald-dark font-semibold text-xs bg-brand-beige border border-brand-gold/25"
        >
          <Phone className="w-4 h-4 mb-0.5 text-brand-emerald" />
          Call Clinic
        </a>
        <a
          href={`https://wa.me/91${CLINIC_INFO.whatsapp.replace(/\s+/g, '')}?text=Hi%20Aurea%20Aesthetic%20Clinic,%20I%20would%20like%20to%20get%20a%20skin/hair%20consultation.`}
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex flex-col items-center justify-center p-2 rounded-xl text-white font-semibold text-xs bg-emerald-700 border border-emerald-500 shadow"
        >
          <MessageSquare className="w-4 h-4 mb-0.5 fill-current" />
          WhatsApp
        </a>
        <button
          onClick={() => handleOpenBookingModal()}
          className="flex-1 flex flex-col items-center justify-center p-2 rounded-xl text-white font-semibold text-xs bg-gold-gradient cursor-pointer border border-brand-gold-dark shadow"
        >
          <CalendarCheck className="w-4 h-4 mb-0.5" />
          Book Slot
        </button>
      </div>

      {/* Floating Call and WhatsApp Buttons in Bottom-Right Corner */}
      <div id="floating-contact-actions" className="fixed bottom-20 sm:bottom-8 right-6 md:right-8 flex flex-col gap-3.5 z-45">
        {/* Calling Button */}
        <a
          href={`tel:${CLINIC_INFO.phone}`}
          className="w-12 h-12 bg-brand-emerald hover:bg-brand-emerald-light text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 border border-white/20 hover:shadow-emerald-950/35 cursor-pointer"
          aria-label="Call Clinic"
        >
          <Phone className="w-5 h-5 text-white" />
        </a>
        
        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/91${CLINIC_INFO.whatsapp.replace(/\s+/g, '')}?text=Hi%20Aurea%20Aesthetic%20Clinic,%20I%20would%20like%20to%20get%20a%20skin/hair%20consultation.`}
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95 border border-white/20 hover:shadow-green-600/35 cursor-pointer"
          aria-label="WhatsApp Chat"
        >
          <MessageSquare className="w-5 h-5 fill-current text-white" />
        </a>
      </div>
    </div>
  );
}

/* ==========================================
   PAGE COMPONENT VIEWS (DECLARED BELOW REUSABLY)
   ========================================== */

interface ViewProps {
  onOpenBooking: (serviceName?: string) => void;
  onKnowMore: (treatment: Treatment) => void;
  onSetPage: (page: string) => void;
  beforeAfterActive: Record<string, "before" | "after">;
  onToggleBeforeAfter: (id: string) => void;
  activeFaq: number | null;
  onToggleFaq: (id: number) => void;
}

// 1. HOME VIEW
function HomeView({ onOpenBooking, onKnowMore, onSetPage, beforeAfterActive, onToggleBeforeAfter, activeFaq, onToggleFaq }: ViewProps) {
  const popularTreatments = TREATMENTS.filter(t => t.isPopular);

  return (
    <div id="home-view-container" className="space-y-24">
      {/* Elegant Hero Slider/Banner */}
      <section className="relative px-4 md:px-8 max-w-7xl mx-auto py-12 md:py-20 lg:py-28 rounded-[2.5rem] bg-emerald-gradient text-white overflow-hidden shadow-2xl border border-brand-gold/15">
        
        {/* Subtle glowing ambient lights */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-brand-gold/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-100px] left-[10%] w-[400px] h-[400px] bg-brand-emerald-light/35 rounded-full blur-3xl pointer-events-none"></div>

        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#FFF_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Narrative Block */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 text-xs text-brand-gold bg-brand-emerald-light/50 border border-brand-gold/25 px-4 py-1.5 rounded-full font-mono uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold fill-current animate-pulse" /> Dr. Pratima Unawane Lead Clinic
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-[1.1] max-w-2xl">
              Reveal Clearer, Healthier & More Confident Skin at <span className="text-gold-gradient">Aurea Aesthetic</span>
            </h1>
            
            <p className="text-sm md:text-base text-brand-rose/95 max-w-xl leading-relaxed font-sans">
              Advanced skin, hair, and aesthetic treatments by Dr. Pratima Unawane in Kurla West, Mumbai — designed for natural-looking results and personalized care.
            </p>

            {/* Micro value tags */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              {[
                "100% Doctor-Led Care",
                "Personalized Solutions",
                "Convenient Local Ingress",
                "Transparent Outcomes Only"
              ].map((badge, idx) => (
                <div key={idx} className="flex items-center gap-1.5 text-xxs font-mono text-brand-beige border border-brand-gold/20 p-2 rounded-xl bg-brand-emerald-dark/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0"></span>
                  <span>{badge}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 max-w-md sm:max-w-none">
              <button
                onClick={() => onOpenBooking()}
                className="bg-gold-gradient hover:opacity-90 text-white font-semibold px-8 py-4 rounded-xl text-sm transition-all duration-300 gold-glow text-center cursor-pointer"
              >
                Book Consultation
              </button>
              
              <a
                href={`https://wa.me/91${CLINIC_INFO.whatsapp.replace(/\s+/g, '')}?text=Hi,%20I%20want%20to%20book%20a%20skin/hair%20appointment%20with%20Dr.%20Pratima.`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold border border-brand-gold/30 hover:border-brand-gold/60 text-white transition-colors bg-white/5 backdrop-blur"
              >
                <MessageSquare className="w-4 h-4 fill-current text-white" />
                WhatsApp Clinic
              </a>
            </div>

            {/* Local trust banner */}
            <p className="text-xxs text-brand-rose/85 italic pt-2">
              📍 Conveniently located opposite Phoenix Marketcity Mall, Pearl Hans Residency Gate 4, Kurla West.
            </p>
          </div>

          {/* Majestic Hero Image Collage */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-80 h-96 sm:w-96 sm:h-[450px]">
              
              {/* Main Glowing Face representation (avoiding fake clinical larping) */}
              <div className="absolute inset-0 rounded-[2rem] border border-brand-gold/15 overflow-hidden shadow-2xl bg-brand-emerald-dark">
                <img
                  src="/dr-pratima.jpg"
                  alt="Healthy Glowing Skin Consultation Representation"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-[0.9] hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating doctor certification mini card */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#052218]/90 backdrop-blur-md p-3 rounded-xl border border-brand-gold/25 flex items-center gap-2.5">
                  <div className="p-1.5 bg-brand-gold/10 rounded-lg text-brand-gold">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[8px] uppercase tracking-wider font-mono text-brand-gold-light">Consulting Specialist</span>
                    <span className="block text-xs font-semibold text-white font-serif truncate">{CLINIC_INFO.doctor}</span>
                    <span className="block text-[9px] text-brand-rose/80 truncate">BAMS, PG Cosmetology</span>
                  </div>
                </div>

              </div>
              
              {/* Decorative luxury golden frame */}
              <div className="absolute -inset-2 rounded-[2.2rem] border border-brand-gold/20 -z-10 animate-float pointer-events-none"></div>
            </div>
          </div>

        </div>
      </section>

      {/* Clinical trust micro statistics */}
      <section className="bg-brand-beige-light border-y border-brand-gold/10 py-12 !mt-12 shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { metric: "100%", desc: "Doctor-Led Evaluations" },
            { metric: "5000+", desc: "Glowing Skin Sessions Completed" },
            { metric: "US-FDA", desc: "Approved Diode Laser Standard" },
            { metric: "0%", desc: "Exaggerated Health Claims" }
          ].map((stat, idx) => (
            <div key={idx} className="space-y-1.5">
              <span className="block text-3xl md:text-4.5xl font-serif font-bold text-[#B5974B]">
                {stat.metric}
              </span>
              <span className="block text-xs uppercase tracking-wider text-brand-emerald-dark font-bold font-mono">
                {stat.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* About Section snippet */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-2 !mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-72 h-96 rounded-[2rem] border border-brand-gold/20 overflow-hidden shadow-xl">
              <img
                src="/dr-pratima.jpg"
                alt="Dr. Pratima Unawane Clinical Doctor Portrait"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FDFCF9] via-transparent to-transparent"></div>
            </div>
          </div>

          <div className="lg:col-span-7 text-left space-y-6">
            <span className="text-xs uppercase font-mono tracking-widest text-[#B5974B] font-bold block">
              Meet Dr. Pratima Unawane
            </span>
            <h2 className="text-3xl md:text-4.5xl font-serif font-bold text-brand-emerald">
              Your Trusted Aesthetic Physician in Mumbai
            </h2>
            <p className="text-sm text-brand-gray leading-relaxed">
              At <span className="text-brand-emerald-dark font-semibold">Aurea Aesthetic Clinic</span>, we practice dermatological beauty on a core platform of clinical safety and honest consultation. Under Dr. Pratima Unawane's expert hand, we reject generic, fast-food parlor treatments that trigger long-term hyperpigmentation.
            </p>
            
            <div className="space-y-3 pt-2">
              <div className="flex gap-2.5 items-start">
                <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <p className="text-xs text-brand-gray">
                  <strong>BAMS, Post Graduate Expertise</strong>: Specialised in identifying scalp dermal structures and cellular melanin density triggers.
                </p>
              </div>
              <div className="flex gap-2.5 items-start">
                <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <p className="text-xs text-brand-gray">
                  <strong>Bespoke Pre-Bridal Mapping</strong>: Scientifically timed treatments to guarantee customized radiance without sudden post-peel recovery periods.
                </p>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={() => onSetPage("about")}
                className="font-medium inline-flex items-center gap-1.5 text-brand-emerald hover:text-brand-gold transition-colors text-sm border-b-2 border-brand-gold pb-0.5 cursor-pointer"
              >
                Read Professional Biography <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Treatments (Dynamic Tab filtering) */}
      <section className="bg-brand-beige-light/40 py-12 !mt-8 border-y border-brand-gold/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-brand-gold-dark font-bold">
                Specialist Portfolio
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-emerald mt-2">
                Popular Aesthetic Solutions
              </h2>
            </div>
            
            <div className="flex flex-wrap gap-2 text-xs">
              <button onClick={() => onSetPage("skin")} className="px-4 py-2 bg-white hover:bg-brand-gold/10 rounded-full border border-brand-gold/15 text-brand-emerald cursor-pointer font-medium shadow-sm transition-colors">
                Skin Peels & Glow
              </button>
              <button onClick={() => onSetPage("hair")} className="px-4 py-2 bg-white hover:bg-brand-gold/10 rounded-full border border-brand-gold/15 text-brand-emerald cursor-pointer font-medium shadow-sm transition-colors">
                PRP Hair Solutions
              </button>
              <button onClick={() => onSetPage("laser")} className="px-4 py-2 bg-white hover:bg-brand-gold/10 rounded-full border border-brand-gold/15 text-brand-emerald cursor-pointer font-medium shadow-sm transition-colors">
                Laser Hair Reduction
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularTreatments.map((tr) => (
              <div 
                key={tr.id}
                className="group relative bg-white border border-brand-gold/15 rounded-3xl overflow-hidden shadow-md flex flex-col justify-between hover:border-brand-gold transition-all duration-300"
              >
                <div>
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={tr.imageUrl}
                      alt={tr.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 text-[9px] font-mono tracking-widest uppercase bg-brand-emerald text-white px-2.5 py-1 rounded">
                      {tr.category} focus
                    </span>
                    
                    {tr.isPopular && (
                      <span className="absolute top-3 right-3 text-[9px] font-mono tracking-widest uppercase bg-brand-gold text-white px-2 py-0.5 rounded flex items-center gap-0.5 font-bold">
                        ★ POPULAR
                      </span>
                    )}
                  </div>

                  <div className="p-6 text-left space-y-3">
                    <h3 className="text-lg font-serif font-bold text-brand-emerald-dark">
                      {tr.title}
                    </h3>
                    <p className="text-xs text-brand-gray font-semibold leading-relaxed line-clamp-1 italic text-brand-gold-dark">
                      &ldquo;{tr.benefit}&rdquo;
                    </p>
                    <p className="text-xs text-brand-gray leading-relaxed line-clamp-2">
                      {tr.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-brand-gold/10">
                  <button 
                    onClick={() => onKnowMore(tr)}
                    className="text-xs font-semibold text-brand-emerald hover:text-brand-gold underline transition-all cursor-pointer"
                  >
                    Know More & Details
                  </button>
                  <button
                    onClick={() => onOpenBooking(tr.title)}
                    className="bg-brand-beige hover:bg-brand-gold/20 text-brand-emerald-dark text-xs font-medium px-4 py-2 rounded-xl transition-all cursor-pointer"
                  >
                    Reserve
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* WHY CHOOSE AUREA Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-mono tracking-widest text-[#B5974B] font-bold block mb-1">
            Clinic Excellence
          </span>
          <h2 className="text-3xl md:text-4.5xl font-serif font-bold text-brand-emerald">
            Why Mumbai Trusts Aurea Aesthetic
          </h2>
          <p className="text-sm text-brand-gray mt-2">
            Rejecting short-sighted beauty parlor routines in favor of dermatologist-formulated, medically monitored facial skin and scalp preservation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {CLINIC_INFO.clinicFeatures.map((feat, idx) => (
            <div key={idx} className="bg-white border border-brand-gold/15 p-6 rounded-2xl flex flex-col justify-between hover:border-brand-gold transition-colors shadow-sm">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-brand-beige-light border border-brand-gold/25 rounded-xl flex items-center justify-center text-brand-gold-dark font-bold font-serif text-lg">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-[#093425] text-base mb-1.5">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-brand-gray leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
              <span className="text-xxs uppercase tracking-wider text-brand-gold font-mono font-bold block pt-4 select-none">
                ✓ Verified
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Treatment Process Timeline Linkage */}
      <Timeline />

      {/* Results / Gallery Snippet page */}
      <section className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-[#B5974B] font-bold block">
              Remodeling Cases
            </span>
            <h2 className="text-3xl md:text-4.5xl font-serif font-bold text-brand-emerald mt-1">
              Interactive Before-After Spotlights
            </h2>
          </div>
          <button
            onClick={() => onSetPage("gallery")}
            className="text-xs font-semibold text-brand-emerald bg-brand-beige hover:bg-brand-gold/10 border border-brand-gold/15 px-5 py-2.5 rounded-full shadow-sm transition-all cursor-pointer"
          >
            Show All Case Records
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GALLERY_ITEMS.slice(0, 3).map((item) => (
            <div key={item.id} className="bg-white border border-brand-gold/15 p-4 rounded-3xl space-y-4 shadow-sm text-left">
              <div className="relative h-64 rounded-2xl overflow-hidden bg-brand-beige">
                {/* Responsive Image Toggle mechanism */}
                <div className="absolute inset-0">
                  <img
                    src={beforeAfterActive[item.id] === "before" ? item.beforeImage : item.afterImage}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute top-3 left-3 bg-brand-charcoal/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono font-bold text-white uppercase select-none">
                  Currently: <span className="text-brand-gold-light">{beforeAfterActive[item.id]}</span>
                </div>

                {/* Micro slider trigger buttons toggle */}
                <div className="absolute bottom-3 left-3 right-3 flex gap-1.5">
                  <button
                    onClick={() => onToggleBeforeAfter(item.id)}
                    className="flex-1 bg-white/95 text-brand-charcoal active:scale-95 transition-all font-mono font-bold text-[9px] py-1.5 uppercase rounded shadow text-center cursor-pointer"
                  >
                    View In-Session {beforeAfterActive[item.id] === "before" ? "After" : "Before"}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-serif font-bold text-[#093425] text-base">
                  {item.title}
                </h3>
                <p className="text-xs text-brand-gray leading-relaxed">
                  {item.description}
                </p>
              </div>

              <span className="text-[9px] text-[#A69C82] block select-none">
                {item.disclaimer || "Images are clinical representations. Core results match standard dermatology variance."}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-brand-beige-light/35 py-20 border-y border-brand-gold/10 text-left">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-mono tracking-widest text-[#B5974B] font-bold block">
              Patient Testimonials
            </span>
            <h2 className="text-3xl md:text-4.5xl font-serif font-bold text-brand-emerald mt-2">
              Google & DM Verification Reviews
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((test) => (
              <div key={test.id} className="bg-white border border-brand-gold/15 p-6 rounded-2xl flex flex-col justify-between shadow-sm">
                <div className="space-y-4">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-brand-gray leading-relaxed text-brand-charcoal">
                    &ldquo;{test.text}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-gold/10 mt-4">
                  <span className="block font-semibold text-brand-emerald text-xs truncate">
                    {test.name}
                  </span>
                  <span className="block text-[9px] text-[#A37F3B] uppercase font-mono tracking-wider pt-0.5">
                    {test.treatmentGot || "Consultation Client"}
                  </span>
                  <span className="block text-[8px] text-brand-gray font-mono">
                    Source: {test.source}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog titles */}
      <section className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-mono tracking-widest text-brand-gold-dark font-bold">
            Clinic Education Space
          </span>
          <h2 className="text-3xl md:text-4.5xl font-serif font-bold text-brand-emerald mt-2">
            Read Our Dermatological Insights
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <div key={post.id} className="bg-white p-6 border border-brand-gold/15 rounded-2xl text-left flex flex-col justify-between hover:border-brand-gold transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xxs font-mono text-brand-gold-dark">
                  <span>{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-serif font-bold text-brand-emerald text-base group-hover:text-brand-gold">
                  {post.title}
                </h3>
                <p className="text-xs text-brand-gray leading-relaxed">
                  {post.summary}
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-brand-gold/10 text-[9px] text-[#A69C82] flex justify-between uppercase font-mono">
                <span>By Dr. Pratima</span>
                <span>{post.publishDate}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQS Accordion list */}
      <section className="bg-brand-beige-light/45 py-20 border-y border-brand-gold/10 text-left">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase font-mono tracking-widest text-brand-gold-dark font-bold">
              Got Doubts?
            </span>
            <h2 className="text-3xl font-serif font-bold text-brand-emerald mt-1 text-center">
              Aesthetic Objection-Handling FAQs
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              
              return (
                <div key={idx} className="bg-white border border-brand-gold/15 rounded-2xl overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => onToggleFaq(idx)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-semibold text-brand-emerald-dark text-sm hover:bg-brand-beige-light/35 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-[#C5A034] shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 text-xs text-brand-gray leading-relaxed border-t border-brand-gold/10 bg-white/40 backdrop-blur-sm">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Map Embed opp Phoenix Mall */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center space-y-8">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-[#B5974B] font-bold">
              Easy Location Map
            </span>
            <h2 className="text-2xl md:text-3.5xl font-serif font-bold text-brand-emerald mt-1">
              Visit Aurea Aesthetic Kurla West
            </h2>
            <p className="text-xs text-brand-gray max-w-xl mx-auto mt-2">
              Pearl Hans Residency, Gate No. 4, Opposite Phoenix Marketcity Mall, Kurla, Mumbai. Ground-level private clinical entrance.
            </p>
          </div>

          <div className="h-96 w-full rounded-3xl overflow-hidden border border-brand-gold/15 shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8357731773!2d72.88874900000001!3d19.081912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9ddcda3040b%3A0xc66579ed3a61fbc3!2sPearl%20Hans%20Residency!5e0!3m2!1sen!2sin!4v1716972000216!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Aurea Aesthetic Clinic Location Map opposite Phoenix Mall Kurla"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Direct Scheduling widget section for Home Page */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 py-4">
        <BookingForm isModal={false} />
      </section>

      {/* Elegant CTA Highlight Banner */}
      <section className="relative px-4 md:px-8 max-w-7xl mx-auto py-12 mb-20 rounded-[2rem] bg-emerald-gradient text-white overflow-hidden shadow-xl text-center border border-brand-gold/15">
        <div className="absolute top-[-50px] right-[-50px] w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-serif font-bold">Ready to Start Your Skin or Hair Transformation?</h2>
          <p className="text-xs text-[#BED2CC] max-w-lg mx-auto leading-relaxed">
            Personalize your care platform with Dr. Pratima Unawane. Let our custom medical diagnostics unmask your clear, vibrant, authentic beauty.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2">
            <a href={`tel:${CLINIC_INFO.phone}`} className="w-full sm:w-auto bg-gold-gradient text-white font-medium px-6 py-3 rounded-xl text-xs hover:opacity-90 transition-all gold-glow">
              Call {CLINIC_INFO.phone}
            </a>
            <a 
              href={`https://wa.me/91${CLINIC_INFO.whatsapp.replace(/\s+/g, '')}?text=Hi%20there,%20I'd%20love%20to%20discuss%20treatment%20schedules.`} 
              target="_blank" 
              rel="noreferrer" 
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-brand-gold/35 text-white font-medium px-6 py-3 rounded-xl text-xs flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4 fill-current" /> WhatsApp Now
            </a>
            <button onClick={() => onOpenBooking()} className="w-full sm:w-auto bg-brand-emerald hover:bg-emerald-800 border border-emerald-600 text-[#DFBA73] font-medium px-6 py-3 rounded-xl text-xs">
              Book Appointment
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

// 2. ABOUT DR. PRATIMA VIEW
interface AboutViewProps {
  onSetPage: (page: string) => void;
  onOpenBooking: () => void;
}
function AboutView({ onSetPage, onOpenBooking }: AboutViewProps) {
  return (
    <div id="about-dr-pratima-root" className="max-w-5xl mx-auto px-4 md:px-6 py-8 text-left space-y-12 font-sans">
      
      {/* Banner Intro */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white/65 backdrop-blur-xl p-6 md:p-10 rounded-[40px] border border-white/80 shadow-2xl relative">
        <div className="md:col-span-4 flex justify-center">
          <div className="relative w-64 h-80 rounded-2xl overflow-hidden border border-brand-gold/25 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=600"
              alt="Dr. Pratima Unawane Lead Clinic Practitioner"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover brightness-95"
            />
          </div>
        </div>
        <div className="md:col-span-8 space-y-4">
          <span className="text-xxs uppercase tracking-wider font-mono font-bold text-brand-gold-dark bg-brand-beige px-2.5 py-0.5 rounded-full inline-block">
            Lead Specialist & Founder
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-emerald">
            Dr. Pratima Unawane
          </h1>
          <p className="text-xs uppercase font-mono font-semibold text-brand-gold">
            BAMS, Post Graduate Diploma in Clinical Cosmetology & Aesthetics
          </p>
          <p className="text-sm text-brand-gray leading-relaxed">
            Dr. Pratima is standardizing aesthetic and dermatological practice in Kurla, Mumbai with an ethical focus, rejecting commercial schemes or unauthentic miracles. She prides herself on offering structured physiological tracking, custom biochemical skincare formulation recommendations, and advanced clinical equipment therapies.
          </p>

          <div className="flex gap-4 pt-2">
            <button 
              onClick={onOpenBooking} 
              className="bg-gold-gradient text-white font-medium text-xs px-5 py-2.5 rounded-xl cursor-pointer shadow gold-glow"
            >
              Verify Direct Booking
            </button>
            <a 
              href={CLINIC_INFO.instagramUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="px-5 py-2.5 border border-[#1E1E1E]/25 text-xs text-brand-charcoal hover:bg-brand-gold/10 font-medium rounded-xl flex items-center gap-1"
            >
              <Instagram className="w-4 h-4 text-pink-700" /> Instagram Feed
            </a>
          </div>
        </div>
      </section>

      {/* Qualifications list & Clinical philosophy */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Box: Biography details */}
        <div className="space-y-4 bg-white/65 backdrop-blur-md p-6 rounded-[32px] border border-white/80 shadow-md">
          <h3 className="font-serif font-semibold text-brand-emerald text-xl">The Medical Philosophy</h3>
          <p className="text-xs text-brand-gray leading-relaxed">
            &ldquo;There are no infinite permanent cures for dynamic living organs. Dryness, acne, and hair count reflect your interior chemistry, circadian balance, and environment. Our medical responsibility is of remodeling and steady maintenance—realigning your confidence without ever putting dermal safety at long term risk.&rdquo;
          </p>
          
          <div className="border-t border-brand-gold/10 pt-4 space-y-3">
            <span className="block text-xxs font-mono uppercase tracking-wider text-brand-gold-dark">Areas of Care Expertize:</span>
            <ul className="grid grid-cols-2 gap-2 text-xxs">
              <li className="flex items-center gap-1.5 font-medium text-brand-emerald-dark">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                <span>Chemical resurfacing</span>
              </li>
              <li className="flex items-center gap-1.5 font-medium text-brand-emerald-dark">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                <span>Scalp PRP microfusion</span>
              </li>
              <li className="flex items-center gap-1.5 font-medium text-brand-emerald-dark">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                <span>Diode Laser Reduction</span>
              </li>
              <li className="flex items-center gap-1.5 font-medium text-brand-emerald-dark">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                <span>Bridal skin schedules</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Box: Why Aurea is premium */}
        <div className="space-y-4 bg-white/65 backdrop-blur-md p-6 rounded-[32px] border border-white/80 shadow-md flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="font-serif font-semibold text-brand-emerald text-xl">The Aurea Standard</h3>
            <p className="text-xs text-brand-gray leading-relaxed">
              Every aesthetic decision is directly verified. We exclude secondary nurses from executing your critical facial peeled acids or sensitive micro-injections unless supervised directly. Your baseline values are logged transparently.
            </p>
          </div>

          <div className="bg-white/40 p-4 rounded-2xl space-y-2 border border-[#c5a059]/10 mt-2">
            <span className="block text-[9px] uppercase font-mono tracking-widest text-[#B5974B] font-bold">
              ✓ Registration Credentials
            </span>
            <span className="text-xxs text-brand-gray block leading-relaxed">
              Dr. Pratima Unawane is a certified aesthetic practitioner registered under authorized state medical councils in Mumbai, Maharashtra. Standard safety protocols strictly monitor sterilization routines inside the clinic's medical facilities.
            </span>
          </div>
        </div>

      </section>

      {/* Local search linking action banner */}
      <section className="bg-brand-emerald text-white p-6 md:p-8 rounded-3xl border border-brand-gold/15 text-center space-y-4">
        <h3 className="text-xl md:text-2xl font-serif font-bold">Let's Map Out Your Remodeling Plan</h3>
        <p className="text-xs text-brand-rose max-w-lg mx-auto">
          Schedule your comprehensive analysis with Dr. Pratima Unawane today. Clear up doubts under medical, science-focused consultation guidance.
        </p>
        <button 
          onClick={onOpenBooking} 
          className="bg-gold-gradient text-white text-xs px-6 py-3 rounded-xl font-medium cursor-pointer shadow"
        >
          Book An Appointment
        </button>
      </section>

    </div>
  );
}

// 3. SERVICE CATEGORIES VIEW
interface TreatmentsViewProps {
  category: "skin" | "hair" | "laser";
  onKnowMore: (treatment: Treatment) => void;
  onOpenBooking: (serviceName?: string) => void;
}
function TreatmentsView({ category, onKnowMore, onOpenBooking }: TreatmentsViewProps) {
  const filtered = TREATMENTS.filter((t) => t.category === category);
  
  const headers = {
    skin: {
      tag: "Deep Dermal Secrets",
      title: "Scientific Skin Care & Glow",
      desc: "Erase active breakout lesions, level rugged microneedling scars, and unhook fresh, luminous dermal layers using customized peels & medical-grade medifacials."
    },
    hair: {
      tag: "Scalp Revitalization",
      title: "Preserved Hair & Scalp PRP",
      desc: "Stop severe hair shedding. Dr. Pratima's advanced Platelet-Rich Plasma micro-infusion restores density of dormant follicles with autologous growth factors."
    },
    laser: {
      tag: "Painless Separation",
      title: "FDA-Approved Lasers & Toning",
      desc: "Enjoy smooth hairfree skin post diode lasers. Advanced rapid-pulse cooling safe for Indian tone variants, yielding smooth surface remodeling."
    }
  };

  const activeHeader = headers[category];

  return (
    <div id={`category-view-${category}`} className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-12">
      
      {/* Category Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase font-mono tracking-widest text-brand-gold-dark font-bold bg-brand-beige px-3 py-1 rounded-full">
          {activeHeader.tag}
        </span>
        <h1 className="text-3.5xl md:text-5xl font-serif font-bold text-brand-emerald">
          {activeHeader.title}
        </h1>
        <p className="text-sm text-brand-gray leading-relaxed">
          {activeHeader.desc}
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
        {filtered.map((tr) => (
          <div 
            key={tr.id} 
            className="bg-white/65 backdrop-blur-md border border-white/80 rounded-[32px] overflow-hidden shadow-md flex flex-col justify-between hover:border-[#c5a059]/40 hover:bg-white/80 hover:shadow-xl transition-all duration-300"
          >
            <div>
              <div className="h-52 overflow-hidden relative">
                <img
                  src={tr.imageUrl}
                  alt={tr.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                
                {tr.isPopular && (
                  <span className="absolute top-3 right-3 text-[9px] tracking-widest uppercase bg-brand-gold text-white font-mono font-bold px-2 py-1 rounded shadow">
                    ★ POPULAR
                  </span>
                )}
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-xl font-serif font-bold text-brand-emerald-dark">
                  {tr.title}
                </h3>
                <p className="text-xs text-brand-gold-dark font-semibold leading-relaxed line-clamp-1 italic">
                  &ldquo;{tr.benefit}&rdquo;
                </p>
                <p className="text-xs text-brand-gray leading-relaxed line-clamp-3">
                  {tr.description}
                </p>

                {tr.duration && (
                  <span className="inline-block text-[10px] font-mono font-semibold bg-white/50 backdrop-blur-xs border border-brand-gold/10 px-2.5 py-0.5 rounded-md text-brand-gray">
                    🕒 Session Duration: {tr.duration}
                  </span>
                )}
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-brand-gold/10 mt-3">
              <button
                onClick={() => onKnowMore(tr)}
                className="text-xs font-semibold text-brand-emerald hover:text-brand-gold underline cursor-pointer"
              >
                Inspect Steps & Suitability
              </button>
              <button
                onClick={() => onOpenBooking(tr.title)}
                className="bg-brand-beige hover:bg-brand-gold/25 text-brand-emerald-dark text-xs font-medium px-4 py-2 rounded-xl transition-all cursor-pointer"
              >
                Inquire Slot
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Secondary care disclaimer */}
      <div className="bg-[#fdfcf8]/55 border border-brand-gold/15 p-6 rounded-3xl max-w-4xl mx-auto text-left text-xxs text-[#735D2B] leading-relaxed backdrop-blur-md">
        <span className="font-mono font-bold uppercase block mb-1">🔬 Dermatological Standard Guidelines</span>
        Aurea Aesthetic Clinic ensures absolute, clinical-grade sanitization. Every active laser session, peeling formulation sequence and PRP microfusion process is planned exclusively following safe medical algorithms. Note that results are biochemical and subject to normal anatomical variations.
      </div>

    </div>
  );
}

// 4. RESULTS / GALLERY VIEW
interface ResultsViewProps {
  beforeAfterActive: Record<string, "before" | "after">;
  onToggleBeforeAfter: (id: string) => void;
  onOpenBooking: () => void;
}
function ResultsView({ beforeAfterActive, onToggleBeforeAfter, onOpenBooking }: ResultsViewProps) {
  return (
    <div id="results-gallery-root" className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-16 text-left font-sans">
      
      {/* Header section */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase font-mono tracking-widest text-[#B5974B] font-bold">
          Verification Gallery
        </span>
        <h1 className="text-3.5xl md:text-5xl font-serif font-bold text-brand-emerald">
          Patient Remodeling Case Studies
        </h1>
        <p className="text-sm text-brand-gray">
          Authentic medical representations tracking follicle repair, underarm pigment recovery and deep ice-pick acne scar remodeling.
        </p>
      </div>

      {/* Main interactive grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {GALLERY_ITEMS.map((item) => (
          <div key={item.id} className="bg-white border border-brand-gold/15 p-4 rounded-3xl space-y-4 shadow-sm text-left">
            <div className="relative h-72 rounded-2xl overflow-hidden bg-brand-beige">
              {/* Responsive Image Toggle mechanism */}
              <div className="absolute inset-0">
                <img
                  src={beforeAfterActive[item.id] === "before" ? item.beforeImage : item.afterImage}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute top-2.5 left-2.5 bg-brand-charcoal/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono font-bold text-white uppercase select-none">
                State: <span className="text-brand-gold-light">{beforeAfterActive[item.id]}</span>
              </div>

              {/* Toggle controls */}
              <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                <button
                  onClick={() => onToggleBeforeAfter(item.id)}
                  className="flex-1 bg-white hover:bg-brand-gold-light text-brand-charcoal text-[9px] uppercase font-mono font-bold py-2 rounded-xl transition-all shadow text-center cursor-pointer"
                >
                  Show State: {beforeAfterActive[item.id] === "before" ? "AFTER" : "BEFORE"}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] uppercase font-mono tracking-widest text-brand-gold-dark font-bold block mb-0.5">
                {item.category} recovery
              </span>
              <h3 className="font-serif font-bold text-[#093425] text-lg">
                {item.title}
              </h3>
              <p className="text-xs text-brand-gray leading-relaxed">
                {item.description}
              </p>
            </div>

            <span className="text-[9px] text-[#A69C82] block select-none">
              {item.disclaimer || "Images are clinical representations. Actual facial remodeling variance occurs."}
            </span>
          </div>
        ))}
      </div>

      {/* verified testimonials spotlight */}
      <section className="bg-brand-emerald text-white p-6 md:p-10 rounded-[2rem] border border-brand-gold/20 flex flex-col md:flex-row gap-8 items-center justify-between">
        <div className="space-y-3 max-w-xl text-left">
          <span className="text-xxs uppercase tracking-wider font-mono text-brand-gold-light font-bold">
            Certified Growth Files
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold">Ready to Register Your Journey?</h2>
          <p className="text-xs text-brand-rose leading-relaxed">
            Every clinical photo listed at Aurea is protected under patient consent agreements. We respect privacy. Let us map out a customized, secure, and medically safe pathway forward for your skin or hair targets.
          </p>
        </div>
        <button 
          onClick={onOpenBooking} 
          className="bg-gold-gradient text-white text-xs px-8 py-4 rounded-xl font-bold transition-all shadow shrink-0 w-full md:w-auto"
        >
          Begin Safe Consultation
        </button>
      </section>

    </div>
  );
}

// 5. CONTACT US VIEW
function ContactView() {
  return (
    <div id="contact-us-view-root" className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-16 text-left font-sans">
      
      {/* Intro */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase font-mono tracking-widest text-[#B5974B] font-bold">
          Get In Touch
        </span>
        <h1 className="text-3.5xl md:text-5xl font-serif font-bold text-brand-emerald">
          Connect With Aurea Aesthetic
        </h1>
        <p className="text-sm text-brand-gray">
          Have queries about treatment depth or costs? Contact Dr. Pratima's desk or book your verification session directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Contact info card panel */}
        <div className="lg:col-span-5 bg-white/65 backdrop-blur-xl border border-white/80 rounded-[32px] p-6 md:p-8 space-y-6 shadow-md flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold text-[#093425] border-b border-brand-gold/10 pb-3">
              Office Information
            </h3>

            {/* Address rows */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C5A034] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] uppercase font-mono tracking-wider font-semibold text-brand-gray">Clinic Location Address:</span>
                  <p className="text-xs text-brand-charcoal mt-1 line-clamp-3 leading-relaxed">
                    {CLINIC_INFO.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#C5A034] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] uppercase font-mono tracking-wider font-semibold text-brand-gray">Direct Booking & WhatsApp:</span>
                  <p className="text-xs text-brand-charcoal mt-1 font-semibold">
                    <a href={`tel:${CLINIC_INFO.phone}`} className="hover:text-brand-gold transition-colors block">
                      📞 Call: {CLINIC_INFO.phone}
                    </a>
                    <a 
                      href={`https://wa.me/91${CLINIC_INFO.whatsapp.replace(/\s+/g, '')}`} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="hover:text-green-600 transition-colors block mt-1"
                    >
                      💬 WhatsApp: {CLINIC_INFO.whatsapp}
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Instagram className="w-5 h-5 text-pink-700 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] uppercase font-mono tracking-wider font-semibold text-brand-gray">Connect With Us On Instagram:</span>
                  <a 
                    href={CLINIC_INFO.instagramUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-xs text-pink-700 font-medium hover:underline block mt-1"
                  >
                    @aureaestheticclinic_
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] uppercase font-mono tracking-wider font-semibold text-brand-gray">Scheduled Working Hours:</span>
                  <div className="text-xs text-brand-charcoal mt-1 space-y-1">
                    {CLINIC_INFO.workingHours.map((wh, i) => (
                      <p key={i}>
                        <span className="font-semibold text-brand-emerald-dark">{wh.days}</span>: {wh.timings}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#fdfcf8]/55 border border-brand-gold/15 p-4 rounded-2xl text-xxs leading-relaxed text-[#735D2B] mt-6 shadow-inner">
            <span>🛡️ Verification Note:</span> Aurea Aesthetic Clinic respects patient safety constraints. All online bookings are prioritized automatically for verification callbacks. Pre-treatment numbing preparation and sanitized materials are utilized for clinical care.
          </div>
        </div>

        {/* Dynamic scheduling component form */}
        <div className="lg:col-span-7">
          <BookingForm isModal={false} />
        </div>

      </div>

      {/* embedded map section */}
      <section className="space-y-4">
        <h3 className="text-xl font-serif font-bold text-brand-emerald">Interactive Directions View</h3>
        <p className="text-xs text-brand-gray max-w-xl">
          We are located near Phoenix Marketcity Mall, Kurla West with straightforward ground-floor physical signage access beside Hotel Naaz Mumbai.
        </p>
        <div className="h-96 w-full rounded-3xl overflow-hidden border border-brand-gold/15 shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8357731773!2d72.88874900000001!3d19.081912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9ddcda3040b%3A0xc66579ed3a61fbc3!2sPearl%20Hans%20Residency!5e0!3m2!1sen!2sin!4v1716972000216!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            title="Pearl Hans Residency Aurea Aesthetic Location Map Kurla Mumbai"
          ></iframe>
        </div>
      </section>

    </div>
  );
}

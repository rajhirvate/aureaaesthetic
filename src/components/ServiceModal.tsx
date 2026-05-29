import { X, Sparkles, Clock, CheckCircle, Smartphone, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Treatment, CLINIC_INFO } from "../types";

interface ServiceModalProps {
  treatment: Treatment | null;
  onClose: () => void;
  onBookNow: (serviceName?: string) => void;
}

export default function ServiceModal({ treatment, onClose, onBookNow }: ServiceModalProps) {
  if (!treatment) return null;

  return (
    <AnimatePresence>
      <div id="service-modal-overlay" className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-brand-charcoal/40 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl overflow-y-auto max-h-[90vh] rounded-[40px] bg-white/75 backdrop-blur-2xl text-brand-charcoal shadow-2xl border border-white"
        >
          {/* Hero Banner inside the Modal */}
          <div className="relative h-48 md:h-64 w-full overflow-hidden">
            <img
              src={treatment.imageUrl}
              alt={treatment.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-black/10"></div>
            
            {/* Close Cross icon */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-brand-emerald transition-colors cursor-pointer"
              aria-label="Close treatment details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Float badge */}
            {treatment.isPopular && (
              <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 text-xxs tracking-wider uppercase font-mono font-bold bg-brand-emerald text-brand-gold bg-gold-gradient px-3 py-1 rounded-full text-white shadow-md">
                <Sparkles className="w-3 h-3 text-white fill-current animate-pulse" /> Popular Therapy
              </span>
            )}

            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] tracking-widest uppercase font-mono bg-brand-gold-dark/95 text-white px-2.5 py-1 rounded-md mb-2 inline-block">
                {treatment.category} therapy
              </span>
              <h3 className="text-2xl md:text-3.5xl font-serif font-bold text-brand-emerald text-white drop-shadow-md">
                {treatment.title}
              </h3>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            
            {/* Quick Specs bar */}
            <div className="grid grid-cols-2 gap-3 pb-5 border-b border-brand-gold/15 text-xs text-brand-gray">
              {treatment.duration && (
                <div className="flex items-center gap-2 bg-white/40 p-3 rounded-2xl border border-white/60 shadow-sm backdrop-blur-sm">
                  <Clock className="w-4 h-4 text-brand-gold shrink-0" />
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider font-mono text-brand-gray/80">Average Session</span>
                    <span className="font-semibold text-brand-emerald-dark text-sm">{treatment.duration}</span>
                  </div>
                </div>
              )}
              {treatment.suitability && (
                <div className="flex items-center gap-2 bg-white/40 p-3 rounded-2xl border border-white/60 shadow-sm backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 text-brand-gold shrink-0" />
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider font-mono text-brand-gray/80">Best Suited For</span>
                    <span className="font-semibold text-brand-emerald-dark text-xs truncate max-w-[180px] block">{treatment.suitability}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Core Benefit and Description */}
            <div className="space-y-2">
              <span className="text-xs uppercase font-mono tracking-widest text-[#B5974B] font-semibold block">
                Primary Benefit Focus
              </span>
              <p className="text-sm font-semibold text-brand-emerald leading-relaxed italic bg-emerald-50/50 p-3 rounded-lg border-l-4 border-brand-emerald">
                &ldquo;{treatment.benefit}&rdquo;
              </p>
              <p className="text-xs leading-relaxed text-brand-gray pt-2">
                {treatment.description}
              </p>
            </div>

            {/* Detailed treatment workflow */}
            <div className="space-y-3">
              <span className="text-xs uppercase font-mono tracking-widest text-[#B5974B] font-semibold block">
                Step-by-Step Clinical Procedure
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {treatment.fullDetails.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs bg-white/40 backdrop-blur-sm p-3 rounded-xl border border-white/60 hover:bg-white/60 hover:border-brand-gold/30 transition-all shadow-sm">
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-brand-charcoal">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ethical Clinical Note */}
            <div className="text-xxs bg-[#f2e8cf]/25 border border-brand-gold/15 p-4 rounded-2xl leading-relaxed text-[#735D2B] space-y-1.5 shadow-inner backdrop-blur-sm">
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-brand-gold-dark block">
                🔬 Professional Care Mandate
              </span>
              <p>
                Aurea Aesthetic Clinic ensures absolute, clinical-grade sanitization. This is a licensed, physician-led therapy conducted personally by Dr. Pratima Unawane. Some mild post-therapy redness is standard and resolves in hours. Sunscreen application post-therapy is highly mandated for optimal remodeling.
              </p>
            </div>

            {/* Immersive Trigger actions */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  onBookNow(treatment.title);
                  onClose();
                }}
                className="flex-1 bg-gold-gradient text-white font-semibold py-3.5 rounded-xl text-sm transition-all duration-300 gold-glow gold-glow-hover flex items-center justify-center gap-2 cursor-pointer"
              >
                Book Priority Session
              </button>
              
              <div className="flex gap-2.5">
                <a
                  href={`tel:${CLINIC_INFO.phone}`}
                  className="p-3.5 bg-brand-beige text-brand-emerald-dark rounded-xl hover:bg-brand-gold hover:text-white transition-all w-12 h-12 flex items-center justify-center"
                  aria-label="Call clinic desk"
                >
                  <Smartphone className="w-5 h-5" />
                </a>
                <a
                  href={`https://wa.me/91${CLINIC_INFO.whatsapp.replace(/\s+/g, '')}?text=Hi,%20I'm%20interested%20in%20the%20${encodeURIComponent(treatment.title)}%20treatment%20at%20Aurea%20Aesthetic.`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-600 hover:text-white transition-all w-12 h-12 flex items-center justify-center border border-emerald-200"
                  aria-label="Inquire on WhatsApp"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                </a>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

import { CLINIC_INFO } from "../types";
import { Phone, MessageSquare, Instagram, MapPin, Clock, ShieldAlert, Award } from "lucide-react";

interface FooterProps {
  onPageChange: (page: string) => void;
  onOpenBooking: () => void;
}

export default function Footer({ onPageChange, onOpenBooking }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (pageId: string) => {
    onPageChange(pageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="main-footer" className="bg-brand-emerald-dark text-white pt-16 pb-8 border-t border-brand-gold/20 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand & Tagline column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-1">
            <span className="text-2xl font-serif font-semibold tracking-wider text-brand-gold-light">AUREA</span>
            <span className="text-xs tracking-[0.25em] font-light text-brand-gold self-end mb-1 ml-1">AESTHETIC</span>
          </div>
          <p className="text-xs text-[#BED2CC] leading-relaxed">
            Led by <span className="text-brand-gold-light font-medium">{CLINIC_INFO.doctor}</span>, Aurea Aesthetic Clinic is Mumbai's premier clinical choice for natural-looking cosmetic excellence, doctor-personalized dermatology and hair preservation solutions.
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Award className="w-5 h-5 text-brand-gold" />
            <span className="text-xxs tracking-wider uppercase font-mono text-[#D1B464]">Certified Aesthetic Practitioner</span>
          </div>
          
          <div className="flex items-center gap-4 mt-1">
            <a 
              href={CLINIC_INFO.instagramUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 rounded-full bg-brand-emerald-light hover:bg-brand-gold hover:text-brand-emerald transition-all text-white"
              aria-label="Instagram Link"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href={`https://wa.me/91${CLINIC_INFO.whatsapp.replace(/\s+/g, '')}`} 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 rounded-full bg-brand-emerald-light hover:bg-[#25D366] transition-all text-white"
              aria-label="WhatsApp Link"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
            </a>
          </div>
        </div>

        {/* Quick Navigate Index */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs uppercase font-mono tracking-widest text-[#D1B464] border-b border-[#164E3E] pb-2 font-semibold">
            Quick Navigation
          </h4>
          <ul className="flex flex-col gap-2.5 text-sm text-[#BED2CC]">
            <li>
              <button 
                onClick={() => handleLinkClick("home")} 
                className="hover:text-brand-gold transition-colors text-left cursor-pointer"
              >
                Home Portfolio
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLinkClick("about")} 
                className="hover:text-brand-gold transition-colors text-left cursor-pointer"
              >
                Meet Dr. Pratima Unawane
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLinkClick("skin")} 
                className="hover:text-brand-gold transition-colors text-left cursor-pointer"
              >
                Skin Secrets & Medifacials
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLinkClick("hair")} 
                className="hover:text-brand-gold transition-colors text-left cursor-pointer"
              >
                Scalp & PRP Therapy
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLinkClick("laser")} 
                className="hover:text-brand-gold transition-colors text-left cursor-pointer"
              >
                FDA Laser Hair Reduction
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLinkClick("gallery")} 
                className="hover:text-brand-gold transition-colors text-left cursor-pointer"
              >
                Results & Testimonials
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleLinkClick("contact")} 
                className="hover:text-brand-gold transition-colors text-left cursor-pointer"
              >
                Locate / Appointment
              </button>
            </li>
          </ul>
        </div>

        {/* Treatment services links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs uppercase font-mono tracking-widest text-[#D1B464] border-b border-[#164E3E] pb-2 font-semibold">
            Expert Treatment Focus
          </h4>
          <ul className="flex flex-col gap-2 text-xs text-[#BED2CC]">
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
              <span>Acne scar microneedling</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
              <span>FDA Diode Laser Hair Reduction</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
              <span>Platelet-Rich Plasma scalp PRP</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
              <span>Melasma peeling therapy</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
              <span>Pre-Bridal Glow Plans</span>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
              <span>Collagen skin rejuvenation medifacial</span>
            </li>
          </ul>
        </div>

        {/* Real Address and timings */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs uppercase font-mono tracking-widest text-[#D1B464] border-b border-[#164E3E] pb-2 font-semibold">
            Clinic Contact Details
          </h4>
          <div className="flex flex-col gap-3 text-xs text-[#BED2CC] leading-relaxed">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
              <span>{CLINIC_INFO.address}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-brand-gold shrink-0" />
              <a href={`tel:${CLINIC_INFO.phone}`} className="hover:text-brand-gold font-medium">
                {CLINIC_INFO.phone}
              </a>
            </p>
            <div className="flex flex-col gap-1.5 pt-2 border-t border-[#164E3E]">
              <span className="flex items-center gap-2 text-brand-gold-light font-medium uppercase font-mono text-[10px]">
                <Clock className="w-3.5 h-3.5" /> Timings
              </span>
              {CLINIC_INFO.workingHours.map((wh, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-white font-medium">{wh.days}:</span>
                  <span>{wh.timings}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-12 pt-8 border-t border-[#164E3E] flex flex-col gap-6">
        

        {/* Footer Base Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xxs text-[#90ACA3] font-mono tracking-wide">
          <span>
            © {currentYear} {CLINIC_INFO.name}. All Medical Rights Reserved.
          </span>
          <div className="flex gap-4">
            <span>Dr. Pratima Unawane (Mumbai Registration)</span>
            <span className="h-3 w-px bg-[#164E3E]" />
            <span className="cursor-pointer hover:text-brand-gold" onClick={onOpenBooking}>
              Privacy & Consent
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

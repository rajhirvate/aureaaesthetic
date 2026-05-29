import { useState, useEffect } from "react";
import { CLINIC_INFO } from "../types";
import { Phone, MessageSquare, Instagram, Menu, X, MapPin, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onOpenBooking: () => void;
}

export default function Header({ currentPage, onPageChange, onOpenBooking }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Dr. Pratima" },
    { id: "skin", label: "Skin Secrets" },
    { id: "hair", label: "Hair Restoration" },
    { id: "laser", label: "Laser Treatments" },
    { id: "gallery", label: "Before & After" },
    { id: "contact", label: "Contact Us" }
  ];

  const handleNavClick = (pageId: string) => {
    onPageChange(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header 
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/60 backdrop-blur-xl border-b border-white/80 shadow-md py-3" 
          : "bg-white/25 backdrop-blur-md border-b border-[#c5a059]/15 py-4"
      }`}
    >
      {/* Mini top ribbon for trust cues */}
      <div className="hidden md:flex border-b border-brand-gold/10 pb-2 mb-2 px-6 max-w-7xl mx-auto items-center justify-between text-xs text-brand-gray">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-brand-gold" />
            Pearl Hans Residency, Kurla West, Mumbai (Opp. Phoenix Mall)
          </span>
          <span className="h-3 w-px bg-brand-gold/20"></span>
          <span className="flex items-center gap-1 font-medium text-brand-emerald">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
            Doctor-Led & Medically Safe Clinic
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a 
            href={`tel:${CLINIC_INFO.phone}`} 
            className="flex items-center gap-1 hover:text-brand-gold transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            {CLINIC_INFO.phone}
          </a>
          <a 
            href={CLINIC_INFO.instagramUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1 hover:text-brand-gold transition-colors text-pink-700 font-medium"
          >
            <Instagram className="w-3.5 h-3.5" />
            @aureaestheticclinic_
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Brand Logo and Title */}
        <div 
          onClick={() => handleNavClick("home")}
          className="cursor-pointer flex flex-col justify-start"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-serif font-semibold tracking-wider text-brand-emerald">AUREA</span>
            <span className="text-sm tracking-[0.25em] font-light text-brand-gold self-end mb-0.5 ml-1">AESTHETIC</span>
          </div>
          <span className="text-[9px] tracking-widest text-[#8F815C] uppercase font-mono font-medium -mt-0.5">
            Skin • Hair • Laser • Dr. Pratima Unawane
          </span>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm font-medium tracking-wide transition-all relative py-1 hover:text-brand-gold-dark cursor-pointer ${
                currentPage === item.id 
                  ? "text-brand-emerald font-semibold" 
                  : "text-brand-charcoal/80"
              }`}
            >
              {item.label}
              {currentPage === item.id && (
                <motion.div 
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold"
                  transition={{ type: "smooth", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Call to action shortcuts */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenBooking}
            className="bg-gold-gradient text-white shadow shadow-brand-gold/30 hover:opacity-90 font-medium text-xs px-4 py-2 rounded-full transition-all duration-300 gold-glow-hover cursor-pointer"
          >
            Book Appointment
          </button>
        </div>

        {/* Hamburger Menu (Mobile/Tablet) */}
        <div className="flex items-center lg:hidden gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-brand-emerald focus:outline-none cursor-pointer"
            aria-label="Expand menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#fdfcf8]/90 backdrop-blur-xl border-t border-brand-gold/15 mt-3 shadow-inner"
          >
            <div className="px-4 py-6 flex flex-col gap-3 font-sans">
              <span className="text-[10px] uppercase font-mono tracking-widest text-brand-gold text-center block mb-2 border-b border-brand-gold/10 pb-1">
                Clinic Sections
              </span>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left py-2.5 px-3 rounded-lg text-sm transition-colors cursor-pointer ${
                    currentPage === item.id 
                      ? "bg-brand-gold/15 text-brand-emerald-dark font-medium border-l-4 border-brand-gold" 
                      : "text-brand-charcoal hover:bg-brand-beige-light"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-brand-gold/15">
                <a
                  href={`tel:${CLINIC_INFO.phone}`}
                  className="flex items-center justify-center gap-1.5 py-3 text-xs font-semibold text-brand-emerald-dark bg-brand-beige rounded-lg text-center"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call Clinic
                </a>
                <a
                  href={`https://wa.me/91${CLINIC_INFO.whatsapp.replace(/\s+/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-3 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg text-center shadow"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-current" />
                  WhatsApp
                </a>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full text-center bg-gold-gradient text-white font-medium py-3 rounded-lg text-xs mt-1 shadow-md"
              >
                Book Priority Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

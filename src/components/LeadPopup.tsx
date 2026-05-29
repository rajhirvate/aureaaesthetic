import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { X, Send, CheckCircle, Sparkles, Phone, User, Tag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TREATMENTS } from "../types";

export default function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
  });

  useEffect(() => {
    // Check if user already saw or closed it this session
    const hasSeen = sessionStorage.getItem("aurea_lead_popup_seen");
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("aurea_lead_popup_seen", "true");
      }, 5000); // Trigger exactly after 5 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setLoading(true);
    // Simulate API callback
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      // Automatically close after 3.5 seconds on successful booking
      setTimeout(() => {
        setIsOpen(false);
      }, 3500);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="lead-overlay" className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-brand-charcoal/60 backdrop-blur-md">
          {/* Main Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className="relative w-full max-w-md overflow-hidden rounded-[36px] bg-white/75 backdrop-blur-2xl text-brand-charcoal shadow-2xl border border-white"
          >
            {/* Top decorative gold line */}
            <div className="h-1.5 bg-gold-gradient w-full"></div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-brand-beige/50 text-brand-emerald-dark hover:bg-brand-gold/25 transition-colors cursor-pointer"
              aria-label="Dismiss window"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Inner Content spacing */}
            <div className="p-6 md:p-8">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  
                  {/* Headline Group */}
                  <div className="text-center mb-2">
                    <div className="inline-flex items-center gap-1.5 text-xs text-brand-gold-dark font-mono font-semibold uppercase tracking-widest bg-brand-beige px-2.5 py-0.5 rounded-full mb-1">
                      <Sparkles className="w-3.5 h-3.5" /> Special Offer Inside
                    </div>
                    <h3 className="text-2xl font-serif font-semibold text-brand-emerald mt-1">
                      Book Your Skin & Hair Consultation
                    </h3>
                    <p className="text-xs text-brand-gray mt-1 leading-relaxed">
                      Leave your connection details to request a certified callback from Dr. Pratima's desk. Elevate your confidence naturally.
                    </p>
                  </div>

                  {/* Input - Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="popup-name" className="text-xs font-semibold text-brand-charcoal select-none flex items-center gap-1">
                      <User className="w-3 h-3 text-brand-gold" /> Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="popup-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Priyanjali Sharma"
                      className="w-full px-3.5 py-2.5 text-sm bg-white/55 backdrop-blur-sm border border-brand-gold/30 focus:border-[#c5a059] focus:bg-white/85 focus:outline-none rounded-xl text-brand-charcoal placeholder-brand-gray/50 transition-colors"
                    />
                  </div>

                  {/* Input - Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="popup-phone" className="text-xs font-semibold text-brand-charcoal select-none flex items-center gap-1">
                      <Phone className="w-3 h-3 text-brand-gold" /> Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="popup-phone"
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 098765 43210"
                      className="w-full px-3.5 py-2.5 text-sm bg-white/55 backdrop-blur-sm border border-brand-gold/30 focus:border-[#c5a059] focus:bg-white/85 focus:outline-none rounded-xl text-brand-charcoal placeholder-brand-gray/50 transition-colors"
                    />
                  </div>

                  {/* Input - Email (Optional) */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="popup-email" className="text-xs font-semibold text-brand-charcoal select-none">
                      Email Address <span className="text-xs text-brand-gray font-normal">(Optional)</span>
                    </label>
                    <input
                      id="popup-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. name@example.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-white/55 backdrop-blur-sm border border-brand-gold/30 focus:border-[#c5a059] focus:bg-white/85 focus:outline-none rounded-xl text-brand-charcoal placeholder-brand-gray/50 transition-colors"
                    />
                  </div>

                  {/* Input - Service Interested In */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="popup-service" className="text-xs font-semibold text-brand-charcoal select-none flex items-center gap-1">
                      <Tag className="w-3 h-3 text-brand-gold" /> Service of Interest
                    </label>
                    <select
                      id="popup-service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 text-sm bg-white/55 backdrop-blur-sm border border-brand-gold/30 focus:border-[#c5a059] focus:bg-white/85 focus:outline-none rounded-xl text-brand-charcoal transition-colors cursor-pointer"
                    >
                      <option value="">-- Choose Treatment --</option>
                      {TREATMENTS.map((tr) => (
                        <option key={tr.id} value={tr.title}>
                          {tr.title} ({tr.category.toUpperCase()})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gold-gradient text-white py-3 rounded-lg text-sm font-semibold tracking-wide flex items-center justify-center gap-2 hover:opacity-95 transition-opacity disabled:opacity-50 mt-2 focus:ring-2 focus:ring-brand-gold/30 gold-glow cursor-pointer"
                  >
                    {loading ? (
                      <span className="flex items-center gap-1">
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4m2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Securing Call Slot...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Request Callback
                      </>
                    )}
                  </button>
                  <span className="text-[10px] text-center text-brand-gray block select-none">
                    🔒 SSL Encrypted & Secure. Your details never shared.
                  </span>
                </form>
              ) : (
                /* Success Message State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center flex flex-col items-center justify-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border-2 border-emerald-300 animate-bounce">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-serif font-semibold text-brand-emerald">
                    Callback Registered!
                  </h4>
                  <div className="text-xs text-brand-gray max-w-xs leading-relaxed space-y-2">
                    <p>
                      Thank you, <span className="font-semibold text-brand-charcoal">{formData.name}</span>.
                    </p>
                    <p>
                      Dr. Pratima's booking desk at <span className="text-brand-gold-dark font-medium">Aurea Aesthetic</span> has reserved a consultation callback for you at <span className="font-medium text-brand-charcoal">{formData.phone}</span>.
                    </p>
                    <p className="text-[10px] text-brand-gold border-t border-brand-gold/15 pt-2">
                      We will connect with you shortly. Prepare to glow!
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { TREATMENTS, CLINIC_INFO } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Calendar, 
  Clock, 
  Check, 
  User, 
  Phone, 
  Tag, 
  MessageSquare,
  Sparkles,
  Award
} from "lucide-react";

interface BookingFormProps {
  isModal?: boolean;
  preselectedService?: string;
  onClose?: () => void;
}

export default function BookingForm({ isModal = false, preselectedService = "", onClose }: BookingFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSlotCategory, setSelectedSlotCategory] = useState<"morning" | "afternoon" | "evening">("afternoon");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: preselectedService || "",
    preferredDate: "",
    preferredTime: "",
    message: ""
  });

  // Pre-fill if preselected changes
  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const timeSlots = {
    morning: ["11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM"],
    afternoon: ["02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"],
    evening: ["05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM"]
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.preferredDate || !formData.preferredTime) {
      alert("Please enter all required fields.");
      return;
    }

    setLoading(true);
    // Simulate booking save
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      // Save in localStorage as history
      const prevBookingsStr = localStorage.getItem("aurea_booking_history") || "[]";
      try {
        const history = JSON.parse(prevBookingsStr);
        history.push({
          ...formData,
          createdAt: new Date().toISOString(),
          status: "Pending Desk Confirmation"
        });
        localStorage.setItem("aurea_booking_history", JSON.stringify(history));
      } catch (e) {
        console.error("Local storage booking log error:", e);
      }
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      service: "",
      preferredDate: "",
      preferredTime: "",
      message: ""
    });
    setSubmitted(false);
  };

  const formContent = (
    <div className="space-y-6">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Header styling specifically when inline or modal */}
          {!isModal && (
            <div className="border-b border-brand-gold/15 pb-4 mb-2">
              <span className="flex items-center gap-1 text-brand-gold-dark text-[10px] uppercase tracking-widest font-mono font-bold">
                <Award className="w-3.5 h-3.5" /> Instant Direct Reservation
              </span>
              <h3 className="text-xl md:text-2xl font-serif font-semibold text-brand-emerald mt-1">
                Book Your Priority Consultation Slot
              </h3>
              <p className="text-xxs text-brand-gray mt-1">
                Enter your details below to request a prioritized date. Zero online prepayment required.
              </p>
            </div>
          )}

          {/* Input: Full Name & Phone Number (Side by side on tablet/desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="booking-name" className="text-xs font-semibold text-brand-charcoal flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-brand-gold" /> Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="booking-name"
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Priyanjali Sharma"
                className="w-full px-3.5 py-2.5 text-sm bg-white/55 backdrop-blur-sm border border-brand-gold/25 focus:border-[#c5a059] focus:bg-white/85 focus:outline-none rounded-xl text-brand-charcoal transition-colors shadow-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="booking-phone" className="text-xs font-semibold text-brand-charcoal flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-brand-gold" /> Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                id="booking-phone"
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="e.g. 088505 78769"
                className="w-full px-3.5 py-2.5 text-sm bg-white/55 backdrop-blur-sm border border-brand-gold/25 focus:border-[#c5a059] focus:bg-white/85 focus:outline-none rounded-xl text-brand-charcoal transition-colors shadow-sm"
              />
            </div>
          </div>

          {/* Row 2: Selected Treatment Dropdown */}
          <div className="space-y-1.5">
            <label htmlFor="booking-service" className="text-xs font-semibold text-brand-charcoal flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-brand-gold" /> Desired Treatment Category
            </label>
            <select
              id="booking-service"
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className="w-full px-3 py-2.5 text-sm bg-white/55 backdrop-blur-sm border border-brand-gold/25 focus:border-[#c5a059] focus:bg-white/85 focus:outline-none rounded-xl text-brand-charcoal transition-colors cursor-pointer shadow-sm"
            >
              <option value="">General Consultation (Skin / Hair / Anti-Aging)</option>
              {TREATMENTS.map((t) => (
                <option key={t.id} value={t.title}>
                  {t.title} ({t.category.toUpperCase()})
                </option>
              ))}
              <option value="Custom Bridal Plan">Pre-Bridal Clinical Package</option>
              <option value="Other / Inquire Area">Other Custom Inquiries</option>
            </select>
          </div>

          {/* Row 3: Booking Date & Time slot */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="booking-date" className="text-xs font-semibold text-brand-charcoal flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-brand-gold" /> Preferred Date <span className="text-red-500">*</span>
              </label>
              <input
                id="booking-date"
                type="date"
                name="preferredDate"
                required
                min={new Date().toISOString().split("T")[0]} // No booking backwards in time
                value={formData.preferredDate}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 text-sm bg-white/55 backdrop-blur-sm border border-brand-gold/25 focus:border-[#c5a059] focus:bg-white/85 focus:outline-none rounded-xl text-brand-charcoal transition-colors shadow-sm"
              />
            </div>

            {/* Timings selector */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-brand-charcoal flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-brand-gold" /> Select Time Slot <span className="text-red-500">*</span>
              </span>
              <div className="relative">
                <select
                  id="booking-time"
                  name="preferredTime"
                  required
                  value={formData.preferredTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 text-sm bg-white/55 backdrop-blur-sm border border-brand-gold/25 focus:border-[#c5a059] focus:bg-white/85 focus:outline-none rounded-xl text-brand-charcoal transition-colors cursor-pointer shadow-sm"
                >
                  <option value="">-- Choose Slot --</option>
                  <optgroup label="Morning Shift (11:00 AM - 01:30 PM)">
                    {timeSlots.morning.map((ts) => <option key={ts} value={ts}>{ts}</option>)}
                  </optgroup>
                  <optgroup label="Afternoon Shift (02:00 PM - 04:30 PM)">
                    {timeSlots.afternoon.map((ts) => <option key={ts} value={ts}>{ts}</option>)}
                  </optgroup>
                  <optgroup label="Evening Shift (05:00 PM - 08:30 PM)">
                    {timeSlots.evening.map((ts) => <option key={ts} value={ts}>{ts}</option>)}
                  </optgroup>
                </select>
              </div>
            </div>
          </div>

          {/* Message Area */}
          <div className="space-y-1.5">
            <label htmlFor="booking-message" className="text-xs font-semibold text-brand-charcoal flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-brand-gold" /> Message / Specific Concerns <span className="text-xxs font-normal text-brand-gray">(Optional)</span>
            </label>
            <textarea
              id="booking-message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell Dr. Pratima about any specific skin sensitivities or hair-fall duration..."
              className="w-full px-3.5 py-2.5 text-sm bg-white/55 backdrop-blur-sm border border-brand-gold/25 focus:border-[#c5a059] focus:bg-white/85 focus:outline-none rounded-xl text-brand-charcoal placeholder-brand-gray/50 resize-y transition-colors shadow-sm"
            ></textarea>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold-gradient text-white font-medium py-3 rounded-xl transition-all duration-300 gold-glow gold-glow-hover flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4m2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Allocating Clinical Slot...
              </span>
            ) : (
              <>
                <Calendar className="w-4 h-4" /> Book Consultation
              </>
            )}
          </button>

          <p className="text-[10px] text-center text-brand-gray leading-relaxed max-w-xs mx-auto">
            By booking, you reserve top priority queue access. Dr. Pratima's desk will text/call to verify before finalizing.
          </p>
        </form>
      ) : (
        /* Success Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8 space-y-6"
        >
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border-2 border-emerald-200 mx-auto animate-pulse">
            <Check className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-brand-gold-dark bg-brand-beige px-3 py-1 rounded-full">
              Reservation Success
            </span>
            <h4 className="text-2xl font-serif font-bold text-brand-emerald">
              Consultation Scheduled!
            </h4>
          </div>

          <div className="bg-brand-beige-light p-4 rounded-2xl border border-brand-gold/15 max-w-sm mx-auto text-xs text-brand-gray text-left space-y-2">
            <div className="flex justify-between border-b border-brand-gold/10 pb-1.5 font-bold text-brand-emerald-dark text-sm">
              <span>Patient Name</span>
              <span>{formData.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Treatment Focus</span>
              <span className="font-semibold text-brand-emerald-dark">{formData.service || "General Consultation"}</span>
            </div>
            <div className="flex justify-between">
              <span>Requested Day</span>
              <span className="font-semibold text-brand-emerald-dark">{formData.preferredDate}</span>
            </div>
            <div className="flex justify-between">
              <span>Selected Slot</span>
              <span className="font-semibold text-brand-emerald-dark">{formData.preferredTime}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-brand-gold/10 text-xxs text-brand-gold-dark font-mono font-bold">
              <span>Booking Status</span>
              <span>PENDING CONFIRMATION</span>
            </div>
          </div>

          <p className="text-xxs text-brand-gray max-w-xs mx-auto">
            Aurea Aesthetic Desk is matching doctors schedule, you will receive a call/WhatsApp text confirmation within 15-30 minutes at <span className="font-bold text-brand-charcoal">{formData.phone}</span>.
          </p>

          <button
            onClick={handleReset}
            className="text-xs font-semibold text-brand-emerald bg-brand-beige hover:bg-brand-gold/30 px-5 py-2.5 rounded-xl transition-all cursor-pointer inline-block"
          >
            Create Another Appointment
          </button>
        </motion.div>
      )}
    </div>
  );

  // If we require Modal wrapping behavior
  if (isModal) {
    return (
      <AnimatePresence>
        <div id="booking-modal-overlay" className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-brand-charcoal/40 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-lg bg-white/75 backdrop-blur-2xl text-brand-charcoal rounded-[40px] overflow-hidden shadow-2xl border border-white"
          >
            {/* Top gold bar */}
            <div className="h-1.5 w-full bg-gold-gradient"></div>

            {/* Dismiss Cross */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-brand-beige/50 hover:bg-brand-gold/20 text-brand-emerald-dark transition-colors cursor-pointer"
              aria-label="Close form window"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Main content padding */}
            <div className="p-6 md:p-8 overflow-y-auto max-h-[85vh]">
              
              {/* Inside Modal Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-1.5 text-xxs text-brand-gold-dark font-mono font-semibold uppercase tracking-widest bg-brand-beige px-2.5 py-0.5 rounded-full mb-1">
                  <Sparkles className="w-3.5 h-3.5" /> Luxury Experience
                </div>
                <h3 className="text-xl md:text-2.5xl font-serif font-bold text-brand-emerald">
                  Book Your Consultation
                </h3>
                <p className="text-xs text-brand-gray mt-1 max-w-sm mx-auto">
                  Reserve a personalized examination with Dr. Pratima Unawane at our premium Kurla West Clinic.
                </p>
              </div>

              {formContent}
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  // Otherwise return standard layout for Inline placements
  return (
    <div className="p-6 md:p-8 bg-white/60 backdrop-blur-xl border border-white/80 rounded-[40px] shadow-2xl relative">
      {formContent}
    </div>
  );
}

import { useState, ComponentType } from "react";
import { motion } from "motion/react";
import { 
  UserRoundCheck, 
  SearchCode, 
  ClipboardList, 
  Sparkles, 
  ShieldCheck, 
  CalendarHeart,
  ChevronRight
} from "lucide-react";

interface Step {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
  icon: ComponentType<{ className?: string }>;
  clinicalFocus: string;
}

export default function Timeline() {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps: Step[] = [
    {
      id: 1,
      title: "1. Premium Consultation",
      subtitle: "One-on-One Dr. Consultation",
      desc: "Begin with a relaxing personal session with Dr. Pratima Unawane. Talk openly about your skin or hair insecurities, previous clinic treatments, skincare budget or lifestyle factors.",
      icon: UserRoundCheck,
      clinicalFocus: "Discuss targets, medical history, clinical concerns"
    },
    {
      id: 2,
      title: "2. Deep Skin & Hair Analysis",
      subtitle: "Scientific Scalp & Tissue Mapping",
      desc: "Dr. Pratima evaluates your dermal layer or scalp thickness under specialized trichoscopy/dermal lights, finding underlying issues like invisible sun scars or clogged hair sebum.",
      icon: SearchCode,
      clinicalFocus: "Melanin level check, active follicle integrity"
    },
    {
      id: 3,
      title: "3. Personalized Treatment Plan",
      subtitle: "Bespoke Prescription Blueprint",
      desc: "We draft a personalized clinic routine with step-by-step timelines (1 to 3 months). We match standard concentration balances to guarantee optimal results with zero unscientific guarantees.",
      icon: ClipboardList,
      clinicalFocus: "Exact chemical formulation mapping & sessions"
    },
    {
      id: 4,
      title: "4. The Clinical Session",
      subtitle: "Soothing FDA Treatment Execution",
      desc: "Unwind inside our ultra-clean, quiet private clinic rooms. Treatments occur under strict sanitary protocols, using premium chilling lasers or micro-injection tools for maximum comfort.",
      icon: Sparkles,
      clinicalFocus: "FDA-approved equipment, zero speed-running"
    },
    {
      id: 5,
      title: "5. Safe Aftercare Guidance",
      subtitle: "Home-Care Protective Shields",
      desc: "What we do in the clinic is 50%; aftercare is the other 50%. You exit with a written, step-by-step morning and evening schedule, custom protective barrier creams, and UV filter suggestions.",
      icon: ShieldCheck,
      clinicalFocus: "Moisturization, strictly prescribed retinoid pause"
    },
    {
      id: 6,
      title: "6. Managed Follow-Up",
      subtitle: "Milestone Glow Evaluations",
      desc: "We track your skin and hair remodeling process periodically. Dr. Pratima reviews your renewal progress and dials in future formula adjustments dynamically.",
      icon: CalendarHeart,
      clinicalFocus: "Texture changes, before-after high-definition check"
    }
  ];

  return (
    <section id="treatment-timeline" className="py-20 bg-transparent text-brand-charcoal relative overflow-hidden font-sans">
      
      {/* Background elegant circles/mesh */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-brand-gold-light/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-brand-rose/25 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-mono tracking-widest text-brand-gold-dark font-bold bg-brand-beige px-3 py-1 rounded-full">
            Our Care Standard
          </span>
          <h2 className="text-3xl md:text-4.5xl font-serif font-bold text-brand-emerald mt-3">
            The Aurea Remedial Journey
          </h2>
          <p className="text-sm text-brand-gray mt-2 leading-relaxed">
            Standardizing medical excellence step-by-step. How we partner with you to reveal fresh, luminous confidence safely and ethically.
          </p>
        </div>

        {/* Dynamic Dual-Layout Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left panel - Interactive list */}
          <div className="lg:col-span-5 flex flex-col gap-3.5 order-2 lg:order-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[#B5974B] font-bold block mb-1">
              Select Steps to Inspect:
            </span>
            {steps.map((step) => {
              const StepIcon = step.icon;
              const isActive = activeStep === step.id;
              
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`w-full text-left p-4 rounded-2xl flex items-center gap-4 transition-all border cursor-pointer ${
                    isActive
                      ? "bg-brand-emerald text-white border-brand-emerald shadow-lg shadow-brand-emerald/10 scale-[1.01]"
                      : "bg-white/45 backdrop-blur-md text-brand-charcoal border-brand-gold/15 hover:border-brand-gold hover:bg-white/60"
                  }`}
                  aria-label={`Step ${step.id}: ${step.title}`}
                >
                  <div className={`p-2.5 rounded-xl shrink-0 ${
                    isActive ? "bg-brand-gold/20 text-brand-gold-light" : "bg-brand-beige text-brand-emerald"
                  }`}>
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-sm tracking-wide font-medium truncate ${isActive ? "text-[#EFECE1]" : "text-brand-charcoal"}`}>
                      {step.title}
                    </h3>
                    <p className={`text-xs mt-0.5 truncate ${isActive ? "text-brand-rose/90" : "text-brand-gray"}`}>
                      {step.subtitle}
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform shrink-0 ${
                    isActive ? "text-brand-gold rotate-90" : "text-brand-gray/50"
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right panel - Immersive Interactive Box detailing the step */}
          <div className="lg:col-span-7 order-1 lg:order-2 self-stretch">
            {steps.map((step) => {
              if (step.id !== activeStep) return null;
              const StepIcon = step.icon;
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="h-full bg-white/60 backdrop-blur-xl border border-white/80 rounded-[40px] p-6 md:p-10 shadow-xl flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    {/* Header Group */}
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-white/40 border border-[#c5a059]/20 rounded-2xl text-brand-gold-dark">
                        <StepIcon className="className w-8 h-8 text-brand-gold-dark" />
                      </div>
                      <div>
                        <span className="text-xxs uppercase tracking-widest font-mono text-brand-gold-dark font-bold">
                          Phase {step.id} of 6
                        </span>
                        <h3 className="text-2xl font-serif font-bold text-brand-emerald">
                          {step.subtitle}
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm text-brand-gray leading-relaxed pt-2">
                      {step.desc}
                    </p>
                    
                    {/* Focus details bullet */}
                    <div className="bg-white/40 border border-brand-gold/15 p-4 rounded-xl">
                      <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-brand-emerald block mb-1">
                        🔬 Clinical Scope & Focus
                      </span>
                      <span className="text-xs text-brand-gray">
                        {step.clinicalFocus}
                      </span>
                    </div>
                  </div>

                  <div className="pt-8 flex items-center justify-between border-t border-brand-gold/10 mt-6 text-xxs text-brand-gray uppercase tracking-widest font-mono">
                    <span>Aurea Medical Protocol</span>
                    <span>Confidence Restored</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

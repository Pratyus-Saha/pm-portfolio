"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

type FormData = {
  name: string;
  role: string;
  message: string;
  email: string;
};

const STEP_LABELS = {
  1: "01 / INTRO",
  2: "02 / ENQUIRY",
  3: "03 / DETAILS",
  4: "04 / SENT"
};

export function ContactClientWrapper() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    role: "",
    message: "",
    email: "",
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step === 1 && (!formData.name || !formData.role)) return;
    if (step === 2 && !formData.message) return;
    setStep((step + 1) as 1 | 2 | 3 | 4);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;

    setIsSubmitting(true);
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    
    if (!accessKey) {
      console.warn("Missing NEXT_PUBLIC_WEB3FORMS_KEY. Simulating successful submission.");
      setTimeout(() => {
        setIsSubmitting(false);
        setStep(4);
      }, 1500);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New Portfolio Enquiry from ${formData.name}`,
          from_name: formData.name,
          name: formData.name,
          email: formData.email,
          role_or_linkedin: formData.role,
          message: formData.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStep(4);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Error sending message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1300px] overflow-hidden rounded-[32px] md:rounded-[48px] bg-[#fdfdfd] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-[var(--line)]">
      <div className="grid lg:grid-cols-2 min-h-[700px]">
        
        {/* Left Side: Image */}
        <div className="relative hidden lg:block h-full bg-[#1a1a1a]">
          <Image 
            src="/images/contact/hero.png"
            alt="Contact Hero"
            fill
            className="object-cover opacity-90"
            priority
          />
          {/* Step Pill */}
          <div className="absolute bottom-10 left-10 rounded-full bg-black/40 backdrop-blur-md px-6 py-2 border border-white/10">
            <span className="text-xs font-bold tracking-widest text-white/90">
              {STEP_LABELS[step]}
            </span>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex flex-col p-8 md:p-16 lg:p-20">
          
          {step === 4 ? (
            <div className="flex h-full flex-col items-center justify-center text-center animate-in fade-in duration-700">
              <CheckCircle2 size={64} className="text-green-500 mb-6" />
              <h2 className="text-4xl font-serif text-foreground mb-4">Message Sent</h2>
              <p className="text-lg text-foreground/70 max-w-sm">
                Thank you for reaching out, {formData.name.split(' ')[0] || "there"}. I'll get back to you shortly.
              </p>
            </div>
          ) : (
            <>
              {/* Progress Bar */}
              <div className="mb-16 flex h-[2px] w-full max-w-[240px] bg-black/10">
                <div 
                  className="h-full bg-black transition-all duration-500 ease-out" 
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>

              <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }} className="flex flex-col flex-1">
                
                {/* STEP 1: Intro */}
                {step === 1 && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex-1">
                    <h2 className="text-[3rem] font-serif leading-none tracking-tight text-foreground">The Prelude</h2>
                    <p className="mt-4 text-[1.1rem] text-foreground/60">Before we begin, tell us who is behind the vision.</p>
                    
                    <div className="mt-12 flex flex-col gap-8">
                      <div>
                        <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-foreground/50">Full Name *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Jane Doe"
                          value={formData.name}
                          onChange={(e) => updateField('name', e.target.value)}
                          className="w-full rounded-[16px] border border-[var(--line)] bg-transparent p-5 text-lg outline-none transition-all focus:border-foreground focus:ring-1 focus:ring-foreground"
                        />
                      </div>
                      <div>
                        <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-foreground/50">Current Role or LinkedIn</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Founder / Art Director"
                          value={formData.role}
                          onChange={(e) => updateField('role', e.target.value)}
                          className="w-full rounded-[16px] border border-[var(--line)] bg-transparent p-5 text-lg outline-none transition-all focus:border-foreground focus:ring-1 focus:ring-foreground"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Enquiry */}
                {step === 2 && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex-1">
                    <h2 className="text-[3rem] font-serif leading-none tracking-tight text-foreground">The Enquiry</h2>
                    <p className="mt-4 text-[1.1rem] text-foreground/60">What are we building or solving together?</p>
                    
                    <div className="mt-12">
                      <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-foreground/50">Your Message *</label>
                      <textarea 
                        required
                        placeholder="I'm looking for a product leader to help scale our..."
                        value={formData.message}
                        onChange={(e) => updateField('message', e.target.value)}
                        className="h-[220px] w-full resize-none rounded-[16px] border border-[var(--line)] bg-transparent p-5 text-lg outline-none transition-all focus:border-foreground focus:ring-1 focus:ring-foreground"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 3: Details */}
                {step === 3 && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex-1">
                    <h2 className="text-[3rem] font-serif leading-none tracking-tight text-foreground">The Details</h2>
                    <p className="mt-4 text-[1.1rem] text-foreground/60">Where should I send my response?</p>
                    
                    <div className="mt-12">
                      <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-foreground/50">Email Address *</label>
                      <input 
                        type="email" 
                        required
                        placeholder="jane@company.com"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className="w-full rounded-[16px] border border-[var(--line)] bg-transparent p-5 text-lg outline-none transition-all focus:border-foreground focus:ring-1 focus:ring-foreground"
                      />
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-16 border-t border-[var(--line)] pt-8 flex items-center justify-between">
                  {step > 1 ? (
                    <button 
                      type="button" 
                      onClick={() => setStep((step - 1) as 1 | 2 | 3)}
                      className="text-sm font-semibold uppercase tracking-wider text-foreground/50 hover:text-foreground transition-colors"
                    >
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <button 
                      type="submit"
                      disabled={(step === 1 && (!formData.name || !formData.role)) || (step === 2 && !formData.message)}
                      className="group flex items-center gap-3 rounded-full bg-black px-8 py-4 text-sm font-semibold tracking-wider text-white transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                    >
                      CONTINUE <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  ) : (
                    <button 
                      type="submit"
                      disabled={isSubmitting || !formData.email}
                      className="group flex items-center gap-3 rounded-full bg-black px-8 py-4 text-sm font-semibold tracking-wider text-white transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                    >
                      {isSubmitting ? (
                        <><Loader2 size={18} className="animate-spin" /> SENDING...</>
                      ) : (
                        <>SEND MESSAGE <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" /></>
                      )}
                    </button>
                  )}
                </div>

              </form>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "motion/react";
import { Brain, MessageSquare, Route, ShieldCheck, Sparkles, Target, Zap } from "lucide-react";
import { FadeIn } from "@/components/fade-in";
import { AboutPortrait } from "@/components/about-portrait";
import { TypographicStamp } from "@/components/typographic-stamp";

const values = [
  {
    icon: Brain,
    title: "Structured thinking",
    copy: "I like messy problems, but I do not like leaving them messy. I break them into users, incentives, constraints, risks, and measurable bets.",
    size: "large",
    color: "bg-blue-50/50"
  },
  {
    icon: ShieldCheck,
    title: "Trust-first AI",
    copy: "For AI products, I care about grounding and responsible framing.",
    size: "small",
    color: "bg-purple-50/50"
  },
  {
    icon: Route,
    title: "Practical scoping",
    copy: "I prefer MVPs that test the riskiest assumption over roadmaps that look complete but validate nothing.",
    size: "small",
    color: "bg-orange-50/50"
  },
  {
    icon: MessageSquare,
    title: "Clear communication",
    copy: "My product docs are written to align engineering, design, and business decisions without hiding the tradeoffs.",
    size: "medium",
    color: "bg-green-50/50"
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8f5ef] pb-32 pt-32 overflow-x-hidden">
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="px-6 md:px-12 lg:px-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <FadeIn direction="up">
              <div className="relative">
                <span className="mb-4 inline-block rounded-full bg-foreground px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-background">
                  The Mindset
                </span>
                <h1 className="hero-condensed mt-4 text-[clamp(4rem,12vw,9rem)] leading-[0.8] text-foreground tracking-tighter">
                  CLARITY.<br/>TRUST.<br/>EXECUTION.
                </h1>
                <p className="mt-12 text-2xl leading-relaxed text-foreground/80 max-w-2xl font-medium italic">
                  "I don't just build products; I build bridges between complex problems and practical, human-centric solutions."
                </p>
                <div className="mt-16 flex flex-wrap gap-12 items-center">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Current Focus</span>
                    <span className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <Sparkles size={16} className="text-[#6b72e1]" /> AI-Driven Product Strategy
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Location</span>
                    <span className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <Target size={16} className="text-[#6b72e1]" /> IIIT Ranchi, India
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.2} className="relative hidden lg:block">
              <div className="sticky top-40">
                <AboutPortrait />
                <TypographicStamp className="absolute -bottom-8 -right-8 scale-90" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 2. MODERN BENTO GRID SECTION */}
      <section className="mt-40 px-6 md:px-12 lg:px-24">
        <div className="mx-auto max-w-[1400px]">
          <FadeIn>
            <h2 className="hero-condensed text-6xl md:text-8xl text-foreground/20 uppercase tracking-tighter">
              Operating Principles
            </h2>
          </FadeIn>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">
            {/* Bento Card 1: Large */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="md:col-span-2 md:row-span-2 rounded-[40px] bg-white p-10 md:p-16 border border-black/5 shadow-[0_4px_30px_rgba(0,0,0,0.02)] flex flex-col justify-between group"
            >
              <div className="flex justify-between items-start">
                <div className="h-16 w-16 rounded-3xl bg-blue-50 flex items-center justify-center text-[#6b72e1] group-hover:scale-110 transition-transform duration-500">
                  <Brain size={32} />
                </div>
                <Zap size={24} className="text-foreground/10" />
              </div>
              <div>
                <h3 className="text-4xl font-bold tracking-tight text-foreground">Structured Thinking</h3>
                <p className="mt-6 text-xl text-foreground/60 leading-relaxed max-w-xl">
                  I like messy problems, but I do not like leaving them messy. I break them into users, incentives, constraints, risks, and measurable bets.
                </p>
              </div>
            </motion.div>

            {/* Bento Card 2: Small */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="rounded-[40px] bg-[#6b72e1] p-8 text-white flex flex-col justify-between"
            >
              <ShieldCheck size={28} />
              <div>
                <h3 className="text-2xl font-bold tracking-tight">Trust-first AI</h3>
                <p className="mt-3 text-sm text-white/80 leading-relaxed">
                  For AI products, I care about grounding, source tracing, and responsible framing.
                </p>
              </div>
            </motion.div>

            {/* Bento Card 3: Small */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="rounded-[40px] bg-white p-8 border border-black/5 shadow-[0_4px_30px_rgba(0,0,0,0.02)] flex flex-col justify-between"
            >
              <Route size={28} className="text-[#6b72e1]" />
              <div>
                <h3 className="text-2xl font-bold tracking-tight">Practical Scoping</h3>
                <p className="mt-3 text-sm text-foreground/60 leading-relaxed">
                  I prefer MVPs that test the riskiest assumption over roadmaps that validate nothing.
                </p>
              </div>
            </motion.div>

            {/* Bento Card 4: Horizontal Medium */}
            <motion.div 
              whileHover={{ y: -8 }}
              className="md:col-span-3 rounded-[40px] bg-paper border border-black/5 p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 group"
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <MessageSquare size={24} className="text-[#6b72e1]" />
                  <h3 className="text-3xl font-bold tracking-tight">Clear Communication</h3>
                </div>
                <p className="text-lg text-foreground/60 leading-relaxed max-w-2xl">
                  My product docs are written to align engineering, design, and business decisions without hiding the tradeoffs.
                </p>
              </div>
              <div className="h-[100px] w-full md:w-[300px] rounded-2xl bg-white/50 border border-black/5 flex items-center justify-center italic text-sm text-foreground/40 font-medium">
                Decision logic {">"} Roadmaps
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. FINAL PHILOSOPHY SECTION */}
      <section className="mt-40 px-6 md:px-12 lg:px-24 pb-20">
        <div className="mx-auto max-w-[1400px] text-center">
          <FadeIn>
            <div className="inline-block h-1 w-24 bg-[#6b72e1] mb-12" />
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.1]">
              Treating constraints as product inputs, not excuses.
            </h2>
            <div className="mt-16 flex flex-col sm:flex-row justify-center gap-4">
              <div className="rounded-full border border-black/10 px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-all cursor-default">
                Product Leader
              </div>
              <div className="rounded-full border border-black/10 px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-all cursor-default">
                Builder
              </div>
              <div className="rounded-full border border-black/10 px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-all cursor-default">
                IIITian
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}

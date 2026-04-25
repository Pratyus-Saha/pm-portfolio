import type { Metadata } from "next";
import { Brain, MessageSquare, Route, ShieldCheck } from "lucide-react";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "About",
  description: "Operating style, product principles, and collaboration approach.",
};

const values = [
  {
    icon: Brain,
    title: "Structured thinking",
    copy: "I like messy problems, but I do not like leaving them messy. I break them into users, incentives, constraints, risks, and measurable bets.",
  },
  {
    icon: ShieldCheck,
    title: "Trust-first AI",
    copy: "For AI products, I care about grounding, source tracing, responsible framing, and making uncertainty visible.",
  },
  {
    icon: Route,
    title: "Practical scoping",
    copy: "I prefer MVPs that test the riskiest assumption over roadmaps that look complete but validate nothing.",
  },
  {
    icon: MessageSquare,
    title: "Clear communication",
    copy: "My product docs are written to align engineering, design, and business decisions without hiding the tradeoffs.",
  },
];

export default function AboutPage() {
  return (
    <main className="pt-28">
      <Section eyebrow="About" title="A product builder focused on clarity, trust, and practical execution.">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <p className="text-2xl leading-10 text-foreground/72">
            I am a Computer Science student at IIIT Ranchi focused on product management and AI-driven solutions for
            real user problems.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="rounded-[24px] border border-[var(--line)] bg-paper p-6">
                <value.icon size={22} aria-hidden="true" />
                <h2 className="mt-8 text-2xl font-semibold">{value.title}</h2>
                <p className="mt-4 text-sm leading-6 text-foreground/68">{value.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Section eyebrow="Principles" title="The product habits I try to bring into every project." tone="secondary">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            "Start with the user behavior, not the feature idea.",
            "Make the decision logic explicit enough that others can challenge it.",
            "Treat constraints as product inputs, not excuses.",
          ].map((item) => (
            <div key={item} className="rounded-[24px] border border-[var(--line)] bg-paper/70 p-6 text-xl leading-8">
              {item}
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}

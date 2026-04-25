import type { Metadata } from "next";
import { Download } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { Section } from "@/components/section";
import { siteConfig } from "@/lib/site/config";

export const metadata: Metadata = {
  title: "Resume",
  description: "Recruiter-friendly resume summary for Pratyus Saha.",
};

const experience = [
  {
    title: "AstroCure",
    role: "Founder and Product Lead",
    date: "Aug 2025 - Present",
    summary:
      "Defined an AI-powered astrology intelligence platform focused on calculation transparency, source-backed insights, and eliminating fear-based manipulation.",
  },
  {
    title: "DocuMind",
    role: "Product Lead and Co-Builder",
    date: "Jan 2026 - Present",
    summary:
      "Designed a dual-mode legal and research document intelligence product using RAG-grounded outputs, clause extraction, risk scoring, and citations.",
  },
  {
    title: "Clericdigital",
    role: "Founder and Product Lead",
    date: "Jun 2025 - Jan 2026",
    summary:
      "Interviewed SMB owners, mapped workflow pain, and prototyped AI automation workflows to reduce repetitive manual work.",
  },
  {
    title: "EdTech School Operations MVP",
    role: "Product Innovator",
    date: "Mar 2024",
    summary:
      "Researched school operations in Tier-2 towns and pivoted after discovering smartphone literacy constraints in the target user base.",
  },
];

const skills = [
  "User research",
  "Problem framing",
  "PRDs",
  "Market research",
  "Roadmapping",
  "Prioritization",
  "AI product thinking",
  "RAG systems",
  "KPI tracking",
  "Stakeholder communication",
  "OpenAI API",
  "LangChain",
];

export default function ResumePage() {
  return (
    <main className="pt-28">
      <Section eyebrow="Resume" title="Computer Science foundation with product ownership across AI-first products.">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="h-fit rounded-[28px] border border-[var(--line)] bg-secondary p-6 lg:sticky lg:top-28">
            <p className="text-2xl font-semibold">{siteConfig.name}</p>
            <p className="mt-3 text-sm leading-6 text-foreground/65">
              B.Tech Computer Science and Engineering, IIIT Ranchi. CGPA 8.30 / 10.
            </p>
            <a
              href={siteConfig.resumePath}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-[#353535]"
            >
              <Download size={15} aria-hidden="true" />
              Download PDF
            </a>
            <ButtonLink href="/contact" variant="outline" className="mt-3 w-full">
              Contact
            </ButtonLink>
          </aside>
          <div>
            <div className="space-y-4">
              {experience.map((item) => (
                <article key={item.title} className="rounded-[24px] border border-[var(--line)] bg-paper p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-semibold">{item.title}</h2>
                      <p className="mt-2 text-sm text-foreground/60">{item.role}</p>
                    </div>
                    <p className="rounded-full border border-[var(--line)] px-3 py-1 text-xs">{item.date}</p>
                  </div>
                  <p className="mt-6 text-sm leading-6 text-foreground/70">{item.summary}</p>
                </article>
              ))}
            </div>
            <div className="mt-10 rounded-[24px] border border-[var(--line)] bg-accent p-6">
              <h2 className="text-2xl font-semibold">Skills</h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-paper px-3 py-1.5 text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}

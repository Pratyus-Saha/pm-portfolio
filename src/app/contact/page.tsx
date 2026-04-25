import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { Section } from "@/components/section";
import { siteConfig } from "@/lib/site/config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact details for Pratyus Saha.",
};

export default function ContactPage() {
  return (
    <main className="pt-28">
      <Section eyebrow="Contact" title="For PM roles, founder conversations, or AI product work.">
        <div className="grid gap-4 md:grid-cols-3">
          <a
            href={`mailto:${siteConfig.email}`}
            className="rounded-[24px] border border-[var(--line)] bg-paper p-6 transition-colors hover:bg-secondary"
          >
            <Mail size={22} aria-hidden="true" />
            <p className="mt-8 text-sm text-foreground/55">Email</p>
            <p className="mt-2 text-xl font-semibold">{siteConfig.email}</p>
          </a>
          <a
            href={`tel:${siteConfig.phone.replaceAll("-", "")}`}
            className="rounded-[24px] border border-[var(--line)] bg-paper p-6 transition-colors hover:bg-secondary"
          >
            <Phone size={22} aria-hidden="true" />
            <p className="mt-8 text-sm text-foreground/55">Phone</p>
            <p className="mt-2 text-xl font-semibold">{siteConfig.phone}</p>
          </a>
          <div className="rounded-[24px] border border-[var(--line)] bg-secondary p-6">
            <p className="text-sm text-foreground/55">Links</p>
            <div className="mt-8 flex flex-col gap-3">
              <ButtonLink href={siteConfig.linkedin} external>
                LinkedIn
              </ButtonLink>
              <ButtonLink href={siteConfig.github} variant="outline" external>
                GitHub
              </ButtonLink>
              <ButtonLink href={siteConfig.resumePath} variant="outline">
                Resume PDF
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navItems, siteConfig } from "@/lib/site/config";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-secondary px-6 py-12">
      <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[1.3fr_0.7fr]">
        <div>
          <p className="text-3xl font-semibold md:text-5xl">Let&apos;s build with sharper product judgment.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${siteConfig.email}`}
              className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-[#353535]"
            >
              Email Pratyus
            </a>
            <a
              href={siteConfig.resumePath}
              className="rounded-full border border-[var(--line)] px-5 py-3 text-sm font-medium transition-colors hover:bg-accent"
            >
              Download resume
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <div className="flex flex-wrap gap-2 md:justify-end">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-[var(--line)] px-4 py-2 text-sm transition-colors hover:bg-accent"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium underline"
          >
            LinkedIn <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <p className="text-sm text-foreground/60">Built as a content-driven product portfolio.</p>
        </div>
      </div>
    </footer>
  );
}

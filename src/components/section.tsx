import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  eyebrow,
  title,
  children,
  className,
  tone = "default",
}: {
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
  tone?: "default" | "secondary" | "accent";
}) {
  return (
    <section
      className={cn(
        "px-6 py-20 md:py-30",
        tone === "secondary" && "bg-secondary",
        tone === "accent" && "bg-accent",
        className
      )}
    >
      <div className="mx-auto max-w-[1200px]">
        {(eyebrow || title) && (
          <div className="mb-12 grid gap-6 border-t border-[var(--line)] pt-8 md:grid-cols-[0.65fr_1.35fr]">
            {eyebrow && <p className="text-sm font-medium uppercase">{eyebrow}</p>}
            {title && <h2 className="text-4xl font-semibold leading-none md:text-6xl">{title}</h2>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href">;

export function ButtonLink({
  href,
  children,
  variant = "solid",
  external,
  className,
  ...props
}: ButtonLinkProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors",
    variant === "solid"
      ? "bg-foreground text-background hover:bg-[#353535]"
      : "border border-[var(--line)] hover:bg-accent",
    className
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {children}
        <ArrowUpRight size={15} aria-hidden="true" />
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}

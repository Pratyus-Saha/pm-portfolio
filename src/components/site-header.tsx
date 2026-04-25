"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { navItems, siteConfig } from "@/lib/site/config";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-5 md:px-6">
      <nav className="mx-auto flex max-w-[1500px] items-center justify-between gap-3 rounded-full border border-[rgba(26,26,26,0.10)] bg-paper/96 px-4 py-3 shadow-[0_14px_40px_rgba(26,26,26,0.05)]">
        <Link
          href="/"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-base font-semibold text-background transition-colors hover:bg-[#2f2f2f]"
        >
          PS
        </Link>
        <div className="flex min-w-0 flex-1 items-center justify-center gap-1 overflow-x-auto px-2">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap rounded-full px-5 py-3 text-sm font-medium transition-colors hover:bg-secondary",
                  active && "bg-foreground text-background"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <a
          href={siteConfig.linkedin}
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-2 rounded-full bg-foreground px-7 py-3 text-sm font-medium text-background transition-colors hover:bg-[#2f2f2f] sm:flex"
        >
          LinkedIn
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}

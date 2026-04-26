"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/site/config";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-5 md:px-6">
      <nav className="mx-auto flex w-max items-center justify-between gap-3 rounded-full border border-[rgba(26,26,26,0.10)] bg-paper/96 px-3 py-2.5 shadow-[0_14px_40px_rgba(26,26,26,0.05)]">
        <Link 
          href="/" 
          className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-foreground shadow-sm transition-transform hover:scale-105"
          aria-label="Home"
        >
          <span className="text-[13px] font-bold tracking-[0.1em] text-background ml-[2px] group-hover:opacity-80 transition-opacity">
            PS
          </span>
        </Link>
        <div className="flex min-w-0 flex-1 items-center justify-center gap-1 overflow-x-auto px-2">
          {navItems.filter(item => item.label !== "Contact").map((item) => {
            const active =
              item.href === "/"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap rounded-full px-4 py-2 text-[0.9rem] text-foreground/80 font-medium transition-colors hover:bg-secondary",
                  active && "bg-transparent text-foreground font-semibold"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <Link
          href="/contact"
          className="flex items-center justify-center rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-colors hover:bg-[#2f2f2f]"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}

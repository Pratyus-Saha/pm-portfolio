import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

function Callout({ children }: ComponentPropsWithoutRef<"div">) {
  return (
    <div className="my-8 rounded-[24px] border border-[var(--line)] bg-secondary p-6 text-base leading-7">
      {children}
    </div>
  );
}

function Decision({ children }: ComponentPropsWithoutRef<"div">) {
  return (
    <div className="my-8 rounded-[24px] bg-foreground p-6 text-background">
      <p className="mb-3 text-sm font-medium uppercase text-background/65">Decision</p>
      <div className="text-base leading-7">{children}</div>
    </div>
  );
}

function Figure({ children, className }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("my-8 rounded-[24px] bg-accent p-6", className)}>{children}</div>;
}

function ImagePlaceholder({
  children,
  className,
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "my-8 flex min-h-[220px] items-center justify-center rounded-[24px] border border-dashed border-[var(--line)] bg-paper p-6 text-sm text-foreground/65",
        className
      )}
    >
      {children ?? "Image placeholder. Add file to /public/images/projects/<slug>/ and reference it in MDX."}
    </div>
  );
}

export const mdxComponents = {
  Callout,
  Decision,
  Figure,
  ImagePlaceholder,
};

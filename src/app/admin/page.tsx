import Link from "next/link";
import { FileText, LayoutDashboard, PencilRuler, Settings } from "lucide-react";

const cards = [
  {
    icon: LayoutDashboard,
    title: "Overview",
    copy: "Quick access to site content, drafts, and updates.",
  },
  {
    icon: FileText,
    title: "Content",
    copy: "Manage artifacts and project pages (coming next).",
  },
  {
    icon: PencilRuler,
    title: "Drafts",
    copy: "Work-in-progress edits and notes (coming next).",
  },
  {
    icon: Settings,
    title: "Settings",
    copy: "Site-wide configuration (coming next).",
  },
];

export default function AdminPage() {
  return (
    <main className="px-6 pb-20 pt-28 md:px-8 md:pb-28 md:pt-36">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/75">
              Admin
            </p>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h1 className="hero-condensed text-[clamp(3rem,6vw,5rem)] leading-[0.9] tracking-tight text-foreground">
                Dashboard
              </h1>
              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  className="rounded-full border border-[var(--line)] bg-paper/80 px-5 py-2.5 text-sm font-semibold text-foreground/85 transition-colors hover:bg-secondary"
                >
                  Back to site
                </Link>
                <Link
                  href="/?edit=1"
                  className="rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-[#2f2f2f]"
                >
                  Open edit mode
                </Link>
              </div>
            </div>
            <p className="max-w-[70ch] text-[1.05rem] leading-relaxed text-foreground/70">
              This is a lightweight admin landing page. Next steps can include a
              protected route, content CRUD, and a simple CMS flow wired into
              your existing content modules.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {cards.map((card) => (
              <div
                key={card.title}
                className="rounded-[24px] border border-[var(--line)] bg-paper/70 p-6"
              >
                <card.icon size={22} aria-hidden="true" />
                <h2 className="mt-8 text-2xl font-semibold">{card.title}</h2>
                <p className="mt-4 text-sm leading-6 text-foreground/68">
                  {card.copy}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-[28px] border border-[var(--line)] bg-white p-6 shadow-[0_4px_40px_rgba(0,0,0,0.03)] md:p-8">
            <h2 className="text-xl font-semibold text-foreground">
              Quick actions
            </h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <Link
                href="/artifacts?edit=1"
                className="rounded-[18px] border border-[rgba(26,26,26,0.08)] bg-paper px-5 py-4 text-sm font-semibold text-foreground/85 transition-colors hover:bg-secondary"
              >
                Edit artifacts listing
              </Link>
              <Link
                href="/work?edit=1"
                className="rounded-[18px] border border-[rgba(26,26,26,0.08)] bg-paper px-5 py-4 text-sm font-semibold text-foreground/85 transition-colors hover:bg-secondary"
              >
                Edit projects listing
              </Link>
              <Link
                href="/about?edit=1"
                className="rounded-[18px] border border-[rgba(26,26,26,0.08)] bg-paper px-5 py-4 text-sm font-semibold text-foreground/85 transition-colors hover:bg-secondary"
              >
                Edit about page
              </Link>
            </div>
            <p className="mt-4 text-sm leading-6 text-foreground/60">
              Tip: the links above open existing pages with `edit=1` so you can
              reuse your current authoring flow.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}


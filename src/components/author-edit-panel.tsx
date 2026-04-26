import type { ReactNode } from "react";
import { Pencil, Plus, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/types/content";

export function AuthorEditPanel({
  project,
  scope = "project",
  className,
}: {
  project?: Project;
  scope?: "project" | "listing" | "artifact";
  className?: string;
}) {
  const isPrd = scope === "artifact";
  const collection = isPrd ? "prds" : "case-studies";
  
  const editLink = project 
    ? `/admin/#/collections/${collection}/entries/${isPrd && project.prd ? project.prd.slug : project.slug}` 
    : `/admin/#/collections/${collection}`;
    
  const addLink = `/admin/#/collections/${collection}/new`;

  const title = "Author mode: CMS Editing";

  return (
    <aside
      className={`rounded-[24px] border border-[var(--line)] bg-accent/80 p-5 text-sm leading-6 text-foreground/82 ${className ?? ""}`}
      id="author-panel"
    >
      <p className="text-xs font-medium uppercase tracking-wide">CMS Admin Controls</p>
      <h3 className="mt-2 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-foreground/70">
        You can now edit all content, metrics, tags, and images visually using the CMS dashboard.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project && (
          <Link href={editLink} target="_blank" className="inline-flex items-center gap-1 rounded-full border border-[var(--line)] bg-paper px-3 py-1.5 hover:bg-background transition-colors">
            <Pencil size={14} /> Edit This Entry
          </Link>
        )}
        <Link href={addLink} target="_blank" className="inline-flex items-center gap-1 rounded-full border border-[var(--line)] bg-paper px-3 py-1.5 hover:bg-background transition-colors">
          <Plus size={14} /> Add New Entry
        </Link>
        <Link href="/admin" target="_blank" className="inline-flex items-center gap-1 rounded-full border border-[var(--line)] bg-paper px-3 py-1.5 hover:bg-background transition-colors">
          <ExternalLink size={14} /> Open Full CMS
        </Link>
      </div>
      <p className="mt-4 text-xs text-foreground/70">
        Edit mode is hidden unless <code>?edit=true</code> is present. In production you can lock it with{" "}
        <code>AUTHOR_EDIT_TOKEN</code> and <code>?key=...</code>.
      </p>
    </aside>
  );
}

import type { ReactNode } from "react";
import { Pencil, Plus, Upload } from "lucide-react";
import type { Project } from "@/types/content";
import { getProjectAuthorPaths } from "@/lib/content/edit-mode";

export function AuthorEditPanel({
  project,
  scope = "project",
  className,
}: {
  project?: Project;
  scope?: "project" | "listing" | "artifact";
  className?: string;
}) {
  const paths = project ? getProjectAuthorPaths(project) : null;

  const title =
    scope === "listing"
      ? "Author mode: project publishing workflow"
      : scope === "artifact"
        ? "Author mode: PRD editing"
        : "Author mode: case-study editing";

  const firstStep: ReactNode =
    scope === "listing" ? (
      <li>Create an MDX file in <code>/content/case-studies/</code> and name it with your post slug.</li>
    ) : (
      <li>
        Edit the MDX content directly:
        <code className="ml-2">{scope === "artifact" ? paths?.prdPath : paths?.caseStudyPath}</code>
      </li>
    );

  return (
    <aside
      className={`rounded-[24px] border border-[var(--line)] bg-accent/80 p-5 text-sm leading-6 text-foreground/82 ${className ?? ""}`}
      id="author-panel"
    >
      <p className="text-xs font-medium uppercase tracking-wide">Private author mode</p>
      <h3 className="mt-2 text-xl font-semibold">{title}</h3>
      <ul className="mt-4 list-disc pl-5">
        {firstStep}
        <li>
          Add or update metadata in <code>{paths?.jsonPath ?? "/data/projects.json"}</code>.
        </li>
        {scope !== "artifact" && (
          <li>
            For new images, drop files into <code>{paths?.imageDir ?? "/public/images/projects/<slug>/"}</code>.
          </li>
        )}
      </ul>
      <div className="mt-5 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1 rounded-full border border-[var(--line)] bg-paper px-3 py-1.5">
          <Pencil size={14} /> Edit
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-[var(--line)] bg-paper px-3 py-1.5">
          <Plus size={14} /> Add New Project
        </span>
        <span className="inline-flex items-center gap-1 rounded-full border border-[var(--line)] bg-paper px-3 py-1.5">
          <Upload size={14} /> Upload Image
        </span>
      </div>
      <p className="mt-4 text-xs text-foreground/70">
        Edit mode is hidden unless <code>?edit=true</code> is present. In production you can lock it with{" "}
        <code>AUTHOR_EDIT_TOKEN</code> and <code>?key=...</code>.
      </p>
    </aside>
  );
}

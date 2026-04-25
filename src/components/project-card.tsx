import Link from "next/link";
import { ArrowUpRight, Pencil } from "lucide-react";
import { TagList } from "@/components/tag-list";
import type { Project } from "@/types/content";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  editMode = false,
}: {
  project: Project;
  editMode?: boolean;
}) {
  return (
    <article className="group flex min-h-[420px] flex-col justify-between rounded-[28px] border border-[var(--line)] bg-paper p-6 transition duration-200 hover:-translate-y-1 hover:bg-secondary">
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-foreground/60">{project.domain}</p>
            <h3 className="mt-4 text-3xl font-semibold leading-none md:text-5xl">
              <Link href={`/work/${project.slug}`} className="underline-offset-8 hover:underline">
                {project.title}
              </Link>
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {editMode && (
              <Link
                href={`/work/${project.slug}?edit=true#author-panel`}
                className="inline-flex rounded-full border border-[var(--line)] p-3 transition-colors hover:bg-accent"
                aria-label={`Edit ${project.title}`}
              >
                <Pencil size={15} aria-hidden="true" />
              </Link>
            )}
            <Link
              href={`/work/${project.slug}`}
              className="rounded-full border border-[var(--line)] p-3 transition-colors group-hover:bg-foreground group-hover:text-background"
              aria-label={`Read ${project.title}`}
            >
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <p className="mt-6 max-w-xl text-lg leading-8 text-foreground/72">{project.summary}</p>
        {!project.coverImage && (
          <p className="mt-4 rounded-full bg-secondary px-3 py-1 text-xs text-foreground/65">
            Image placeholder: add files in <code>/public/images/projects/{project.slug}/</code>
          </p>
        )}
      </div>
      <div className="mt-10">
        <div className="mb-6 grid gap-3 border-t border-[var(--line)] pt-6 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase text-foreground/50">Decision focus</p>
            <p className="mt-2 text-sm leading-6">{project.decisionFocus}</p>
          </div>
          <div>
            <p className="text-xs uppercase text-foreground/50">Outcome</p>
            <p className="mt-2 text-sm leading-6">{project.outcome}</p>
          </div>
        </div>
        <TagList tags={project.tags.slice(0, 4)} />
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={`/work/${project.slug}`}
            className={cn(
              "rounded-full border border-[var(--line)] px-3 py-1.5 text-xs transition-colors hover:bg-accent"
            )}
          >
            Case Study
          </Link>
          {project.prd ? (
            <Link
              href={`/artifacts/${project.prd.slug}`}
              className="rounded-full border border-[var(--line)] px-3 py-1.5 text-xs transition-colors hover:bg-accent"
            >
              PRD
            </Link>
          ) : (
            <span className="rounded-full border border-dashed border-[var(--line)] px-3 py-1.5 text-xs text-foreground/55">
              PRD Coming Soon
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

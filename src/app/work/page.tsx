import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { AuthorEditPanel } from "@/components/author-edit-panel";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { getProjects } from "@/lib/content/projects";
import { isEditMode } from "@/lib/content/edit-mode";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies showing product thinking, tradeoffs, AI strategy, and measurable product judgment.",
};

type WorkPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function WorkPage({ searchParams }: WorkPageProps) {
  const projects = getProjects();
  const params = searchParams ? await searchParams : undefined;
  const editMode = isEditMode(params);

  return (
    <main className="pt-28">
      <Section
        eyebrow="Case studies"
        title="Strategic deep dives into problem framing, architectural tradeoffs, and high-impact execution."
      >
        {editMode && (
          <div className="mb-6 flex flex-col gap-4">
            <Link
              href="/admin/#/collections/case-studies/new"
              target="_blank"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--line)] bg-paper px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              <Plus size={14} aria-hidden="true" />
              Add New Project
            </Link>
            <AuthorEditPanel scope="listing" />
          </div>
        )}
        <div className="grid gap-4 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} editMode={editMode} />
          ))}
        </div>
      </Section>
    </main>
  );
}

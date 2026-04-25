import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { AuthorEditPanel } from "@/components/author-edit-panel";
import { ArtifactCard } from "@/components/artifact-card";
import { Section } from "@/components/section";
import { getArtifacts } from "@/lib/content/projects";
import { isEditMode } from "@/lib/content/edit-mode";

export const metadata: Metadata = {
  title: "Artifacts",
  description: "PRDs and product documents that show product judgment, scope, and decision-making.",
};

type ArtifactsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ArtifactsPage({ searchParams }: ArtifactsPageProps) {
  const artifacts = getArtifacts();
  const params = searchParams ? await searchParams : undefined;
  const editMode = isEditMode(params);

  return (
    <main className="pt-28">
      <Section eyebrow="Artifacts" title="PRDs and strategy documents that prove the thinking behind the work.">
        {editMode && (
          <div className="mb-6 flex flex-col gap-4">
            <Link
              href="/artifacts?edit=true#author-panel"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--line)] bg-paper px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              <Plus size={14} aria-hidden="true" />
              Add New PRD
            </Link>
            <AuthorEditPanel scope="artifact" />
          </div>
        )}
        <div className="grid gap-4 md:grid-cols-2">
          {artifacts.map((artifact) => (
            <ArtifactCard key={artifact.slug} artifact={artifact} editMode={editMode} />
          ))}
        </div>
      </Section>
    </main>
  );
}

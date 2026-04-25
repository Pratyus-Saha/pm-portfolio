import Link from "next/link";
import { FileText, Pencil } from "lucide-react";
import { TagList } from "@/components/tag-list";
import type { Artifact } from "@/types/content";

export function ArtifactCard({
  artifact,
  editMode = false,
}: {
  artifact: Artifact;
  editMode?: boolean;
}) {
  return (
    <article className="group flex h-full flex-col justify-between rounded-[24px] border border-[var(--line)] bg-paper p-6 transition duration-200 hover:-translate-y-1 hover:bg-secondary">
      <div>
        <div className="mb-8 flex items-center justify-between">
          <span className="rounded-full bg-accent p-3">
            <FileText size={18} aria-hidden="true" />
          </span>
          <div className="flex items-center gap-2">
            {editMode && (
              <Link
                href={`/artifacts/${artifact.slug}?edit=true#author-panel`}
                className="inline-flex rounded-full border border-[var(--line)] px-3 py-1 text-xs transition-colors hover:bg-accent"
              >
                <Pencil size={13} aria-hidden="true" />
              </Link>
            )}
            <span className="rounded-full border border-[var(--line)] px-3 py-1 text-xs">{artifact.type}</span>
          </div>
        </div>
        <h3 className="text-2xl font-semibold leading-tight">
          <Link href={`/artifacts/${artifact.slug}`} className="underline-offset-8 hover:underline">
            {artifact.title}
          </Link>
        </h3>
        <p className="mt-4 text-sm leading-6 text-foreground/68">{artifact.summary}</p>
      </div>
      <div className="mt-8">
        <p className="mb-4 text-xs uppercase text-foreground/50">Decision proof</p>
        <p className="mb-6 text-sm leading-6">{artifact.decisionFocus}</p>
        <TagList tags={artifact.tags.slice(0, 3)} />
      </div>
    </article>
  );
}

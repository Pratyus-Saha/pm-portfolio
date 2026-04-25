import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Download } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { TagList } from "@/components/tag-list";
import { AuthorEditPanel } from "@/components/author-edit-panel";
import { isEditMode } from "@/lib/content/edit-mode";
import {
  getAllPrdSlugs,
  getArtifact,
  getArtifactContent,
  getArtifacts,
  getProjectForArtifact,
} from "@/lib/content/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function uniq(values: string[]) {
  return Array.from(new Set(values));
}

export function generateStaticParams() {
  const prdSlugs = getAllPrdSlugs();
  const artifactSlugs = getArtifacts().map((artifact) => artifact.slug);
  return uniq([...prdSlugs, ...artifactSlugs]).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const artifact = getArtifact(slug);

  if (!artifact) {
    return { title: "PRD" };
  }

  return {
    title: artifact.title,
    description: artifact.summary,
  };
}

export default async function ArtifactPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const artifact = getArtifact(slug);
  const paramsQuery = searchParams ? await searchParams : undefined;
  const editMode = isEditMode(paramsQuery);

  if (!artifact) {
    return (
      <main className="pt-28">
        <section className="px-6 py-20">
          <div className="mx-auto max-w-[960px] rounded-[28px] border border-[var(--line)] bg-paper p-8">
            <p className="text-sm font-medium uppercase">PRD</p>
            <h1 className="mt-6 text-5xl font-semibold leading-none">Coming Soon</h1>
            <p className="mt-6 text-lg leading-8 text-foreground/70">
              This PRD route is not mapped in <code>/data/projects.json</code> yet.
            </p>
            {editMode && <AuthorEditPanel scope="artifact" className="mt-8" />}
          </div>
        </section>
      </main>
    );
  }

  const source = getArtifactContent(artifact.slug);
  const project = getProjectForArtifact(artifact);

  return (
    <main className="pt-28">
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <p className="text-sm font-medium uppercase">{artifact.type}</p>
            <h1 className="mt-6 text-[3.6rem] font-semibold leading-[0.95] md:text-[6rem]">{artifact.title}</h1>
            <p className="mt-8 max-w-3xl text-2xl leading-10 text-foreground/70">{artifact.subtitle}</p>
          </div>
          <aside className="h-fit rounded-[28px] border border-[var(--line)] bg-secondary p-6 lg:sticky lg:top-28">
            <p className="text-sm leading-6 text-foreground/70">{artifact.summary}</p>
            <div className="mt-6 border-t border-[var(--line)] pt-6">
              <p className="text-xs uppercase text-foreground/50">Decision focus</p>
              <p className="mt-2 text-sm leading-6">{artifact.decisionFocus}</p>
            </div>
            {project && (
              <ButtonLink href={`/work/${project.slug}`} variant="outline" className="mt-6 w-full">
                View case study
              </ButtonLink>
            )}
            {artifact.downloadable && (
              <a
                href={artifact.downloadable}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-[#353535]"
              >
                <Download size={15} aria-hidden="true" />
                Download source doc
              </a>
            )}
            <div className="mt-6">
              <TagList tags={artifact.tags} />
            </div>
            {editMode && project && <AuthorEditPanel project={project} scope="artifact" className="mt-6" />}
          </aside>
        </div>
      </section>

      <section className="px-6 pb-24">
        <article className="prose-portfolio mx-auto max-w-[760px]">
          {source ? (
            <MDXRemote source={source} components={mdxComponents} />
          ) : (
            <div className="rounded-[24px] border border-dashed border-[var(--line)] bg-paper p-7">
              <p className="text-sm font-medium uppercase">PRD</p>
              <h2 className="mt-4 border-none pt-0">Coming Soon</h2>
              <p className="mt-4 text-base leading-7 text-foreground/70">
                PRD metadata exists, but the MDX post has not been written yet.
              </p>
              <p className="mt-3 text-sm text-foreground/70">
                Create <code>/content/prds/{artifact.slug}.mdx</code> to publish it.
              </p>
            </div>
          )}
        </article>
      </section>
    </main>
  );
}

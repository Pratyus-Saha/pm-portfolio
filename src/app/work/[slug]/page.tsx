import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ButtonLink } from "@/components/button-link";
import { MetricGrid } from "@/components/metric-card";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { ProjectCard } from "@/components/project-card";
import { TagList } from "@/components/tag-list";
import { AuthorEditPanel } from "@/components/author-edit-panel";
import { isEditMode } from "@/lib/content/edit-mode";
import {
  getAllCaseStudySlugs,
  getProject,
  getProjectByCaseStudySlug,
  getProjectContent,
  getProjects,
  getRelatedProjects,
} from "@/lib/content/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function uniq(values: string[]) {
  return Array.from(new Set(values));
}

export function generateStaticParams() {
  const caseStudySlugs = getAllCaseStudySlugs();
  const projectSlugs = getProjects().map((project) => project.slug);
  const projectCaseStudySlugs = getProjects().map((project) => project.caseStudySlug);

  return uniq([...caseStudySlugs, ...projectSlugs, ...projectCaseStudySlugs]).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug) ?? getProjectByCaseStudySlug(slug);

  if (!project) {
    return { title: "Case Study" };
  }

  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug) ?? getProjectByCaseStudySlug(slug);
  const paramsQuery = searchParams ? await searchParams : undefined;
  const editMode = isEditMode(paramsQuery);

  if (!project) {
    return (
      <main className="pt-28">
        <section className="px-6 py-20">
          <div className="mx-auto max-w-[960px] rounded-[28px] border border-[var(--line)] bg-paper p-8">
            <p className="text-sm font-medium uppercase">Case study</p>
            <h1 className="mt-6 text-5xl font-semibold leading-none">Coming Soon</h1>
            <p className="mt-6 text-lg leading-8 text-foreground/70">
              This route exists, but no project metadata has been added yet.
            </p>
            {editMode && <AuthorEditPanel scope="listing" className="mt-8" />}
          </div>
        </section>
      </main>
    );
  }

  const source = getProjectContent(project.caseStudySlug);
  const related = getRelatedProjects(project);

  return (
    <main className="pt-28">
      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <p className="text-sm font-medium uppercase">{project.domain}</p>
              <h1 className="mt-6 max-w-5xl text-[3.8rem] font-semibold leading-[0.92] md:text-[6rem]">
                {project.title}
              </h1>
              <p className="mt-8 max-w-3xl text-2xl leading-10 text-foreground/70">{project.subtitle}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                {project.prd ? (
                  <ButtonLink href={`/artifacts/${project.prd.slug}`}>Read PRD</ButtonLink>
                ) : (
                  <span className="rounded-full border border-dashed border-[var(--line)] px-5 py-3 text-sm text-foreground/60">
                    PRD Coming Soon
                  </span>
                )}
                <ButtonLink href="/work" variant="outline">
                  Back to Work
                </ButtonLink>
              </div>
            </div>
            <aside className="h-fit rounded-[28px] border border-[var(--line)] bg-secondary p-6 lg:sticky lg:top-28">
              <dl className="grid gap-6">
                {[
                  ["Role", project.role],
                  ["Timeline", project.timeline],
                  ["Team", project.team],
                  ["Problem", project.problem],
                ].map(([label, value]) => (
                  <div key={label} className="border-b border-[var(--line)] pb-5 last:border-0 last:pb-0">
                    <dt className="text-xs uppercase text-foreground/50">{label}</dt>
                    <dd className="mt-2 text-sm leading-6">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6">
                <TagList tags={project.skills} />
              </div>
              {editMode && <AuthorEditPanel project={project} className="mt-6" />}
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-accent px-6 py-16">
        <div className="mx-auto max-w-[1200px]">
          <MetricGrid metrics={project.metrics} />
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.28fr_0.72fr]">
          <div className="hidden lg:block">
            <div className="sticky top-32 rounded-[24px] border border-[var(--line)] bg-paper p-5">
              <p className="text-sm font-medium">Case study</p>
              <p className="mt-3 text-sm leading-6 text-foreground/60">
                Structured around snapshot, problem, discovery, decisions, tradeoffs, execution, impact, and learnings.
              </p>
            </div>
          </div>
          <article className="prose-portfolio max-w-[760px]">
            {source ? (
              <MDXRemote source={source} components={mdxComponents} />
            ) : (
              <div className="rounded-[24px] border border-dashed border-[var(--line)] bg-paper p-7">
                <p className="text-sm font-medium uppercase">Case study</p>
                <h2 className="mt-4 border-none pt-0">Coming Soon</h2>
                <p className="mt-4 text-base leading-7 text-foreground/70">
                  This project is already listed in <code>/data/projects.json</code>, but its MDX post is missing.
                </p>
                <p className="mt-3 text-sm text-foreground/70">
                  Create <code>/content/case-studies/{project.caseStudySlug}.mdx</code> to publish the full article.
                </p>
              </div>
            )}
          </article>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-secondary px-6 py-20">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-10 border-t border-[var(--line)] pt-8">
              <p className="text-sm font-medium uppercase">Related work</p>
              <h2 className="mt-4 text-4xl font-semibold md:text-6xl">Another product decision story.</h2>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {related.map((item) => (
                <ProjectCard key={item.slug} project={item} editMode={editMode} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Brain, Gauge, ShieldCheck } from "lucide-react";
import { AuthorEditPanel } from "@/components/author-edit-panel";
import { ArtifactCard } from "@/components/artifact-card";
import { ButtonLink } from "@/components/button-link";
import { FadeIn } from "@/components/fade-in";
import { MetricGrid } from "@/components/metric-card";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { isEditMode } from "@/lib/content/edit-mode";
import { getFeaturedArtifacts, getFeaturedProjects } from "@/lib/content/projects";
import { siteConfig } from "@/lib/site/config";

const proofMetrics = [
  { value: "2", label: "Flagship AI products", context: "AstroCure and DocuMind anchor the portfolio." },
  { value: "60", label: "Documents validated", context: "DocuMind tested across legal and research documents." },
  { value: "8.30", label: "CSE CGPA", context: "IIIT Ranchi, B.Tech Computer Science." },
];

const principles = [
  {
    icon: Brain,
    title: "Frame the real problem",
    copy: "I separate surface feature requests from the deeper user, market, and incentive problems shaping behavior.",
  },
  {
    icon: ShieldCheck,
    title: "Design for trust",
    copy: "My AI product work emphasizes source tracing, responsible framing, and reducing user harm in ambiguous domains.",
  },
  {
    icon: Gauge,
    title: "Prioritize for proof",
    copy: "I scope MVPs around the smallest product experience that can validate the riskiest belief.",
  },
];

type HomePageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const projects = getFeaturedProjects();
  const artifacts = getFeaturedArtifacts();
  const params = searchParams ? await searchParams : undefined;
  const editMode = isEditMode(params);

  return (
    <main>
      <section className="px-6 pb-20 pt-34 md:px-8 md:pb-28 md:pt-42">
        <div className="mx-auto max-w-[1500px]">
          <FadeIn>
            <div className="grid min-h-[calc(100vh-190px)] items-center gap-y-10 lg:grid-cols-[1fr_minmax(360px,460px)_1fr] lg:gap-x-8">
              <div className="order-2 flex flex-col justify-center self-center text-left lg:order-1">
                <p className="text-base font-medium uppercase tracking-[0.16em] text-foreground/72 md:text-lg">
                  {siteConfig.name}
                </p>
                <h1 className="hero-condensed mt-5 text-[clamp(4.8rem,9vw,8.7rem)] leading-[0.83] text-foreground">
                  PRODUCT
                </h1>
              </div>
              <div className="order-1 flex items-center justify-center lg:order-2 lg:-translate-y-4">
                <div className="relative w-full max-w-[460px] rounded-[28px] border border-[rgba(26,26,26,0.06)] bg-[#f3eee7] p-4 shadow-[0_24px_70px_rgba(26,26,26,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_34px_90px_rgba(26,26,26,0.11)]">
                  <div className="relative aspect-[0.73] overflow-hidden rounded-[24px] bg-[#f0ebe3]">
                    <Image
                      src="/images/profile/pratyus-saha.png"
                      alt="Portrait of Pratyus Saha"
                      fill
                      priority
                      className="object-contain object-bottom transition duration-500 hover:scale-[1.02]"
                      sizes="(min-width: 1024px) 460px, 88vw"
                    />
                  </div>
                </div>
              </div>
              <div className="order-3 flex flex-col justify-center self-center text-left lg:pl-2">
                <h2 className="hero-condensed text-[clamp(4.8rem,9vw,8.7rem)] leading-[0.83] text-foreground">
                  MANAGER
                </h2>
                <p className="mt-6 max-w-[24rem] text-[1.05rem] leading-8 text-foreground/66 md:text-[1.12rem]">
                  I build digital products that solve real problems and create real impact.
                </p>
                <Link
                  href="/work"
                  className="mt-11 inline-flex w-fit items-center gap-4 text-[1.08rem] font-medium text-foreground transition-opacity hover:opacity-70"
                >
                  <span>View my work</span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background">
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </span>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Section eyebrow="Proof" title="Signals recruiters can scan quickly." tone="secondary">
        <MetricGrid metrics={proofMetrics} />
      </Section>

      <Section eyebrow="Featured work" title="Two flagship product stories, built around decisions.">
        {editMode && <AuthorEditPanel scope="listing" className="mb-6" />}
        <div className="grid gap-4 lg:grid-cols-2">
          {projects.map((project, index) => (
            <FadeIn key={project.slug} delay={index * 0.08}>
              <ProjectCard project={project} editMode={editMode} />
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section eyebrow="Operating model" title="How I move from ambiguity to product clarity." tone="accent">
        <div className="grid gap-4 md:grid-cols-3">
          {principles.map((principle) => (
            <div key={principle.title} className="rounded-[24px] border border-[var(--line)] bg-paper/70 p-6">
              <principle.icon size={24} aria-hidden="true" />
              <h3 className="mt-8 text-2xl font-semibold">{principle.title}</h3>
              <p className="mt-4 text-sm leading-6 text-foreground/68">{principle.copy}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Artifacts" title="Product documents as evidence, not attachments.">
        <div className="grid gap-4 md:grid-cols-2">
          {artifacts.map((artifact) => (
            <ArtifactCard key={artifact.slug} artifact={artifact} editMode={editMode} />
          ))}
        </div>
      </Section>

      <Section tone="secondary">
        <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <p className="text-sm font-medium uppercase">About</p>
            <h2 className="mt-6 text-4xl font-semibold leading-none md:text-6xl">
              I build products by making the hidden decision logic visible.
            </h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-foreground/70">
              My work sits at the intersection of user research, AI systems, product strategy, and practical tradeoffs.
              I care most about problems where users need clarity before they can act.
            </p>
            <ButtonLink href="/about" variant="outline" className="mt-8">
              Read operating style
              <ArrowUpRight size={15} aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </Section>
    </main>
  );
}

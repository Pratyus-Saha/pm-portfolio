import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Brain, Gauge, Hand, ShieldCheck, Globe, Mail, MessageCircle, FileText } from "lucide-react";
import { AuthorEditPanel } from "@/components/author-edit-panel";
import { ArtifactCard } from "@/components/artifact-card";
import { ButtonLink } from "@/components/button-link";
import { FadeIn } from "@/components/fade-in";
import { ProjectCard } from "@/components/project-card";
import { Section } from "@/components/section";
import { isEditMode } from "@/lib/content/edit-mode";
import { getFeaturedArtifacts, getFeaturedProjects } from "@/lib/content/projects";
import { siteConfig } from "@/lib/site/config";



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
      <section className="px-6 pb-20 pt-32 md:px-8 md:pb-28 md:pt-40">
        <div className="mx-auto max-w-[1500px]">
          <FadeIn>
            <div className="flex min-h-[calc(100vh-160px)] flex-col items-center justify-center">
              <div className="relative flex w-full max-w-[1200px] flex-col items-center lg:flex-row lg:justify-center">
                
                {/* Left Column Text */}
                <div className="z-10 flex flex-col items-center text-center lg:absolute lg:left-0 lg:items-start lg:text-left lg:-translate-x-12">
                  <p className="mb-1 text-sm font-semibold uppercase tracking-[0.2em] text-foreground/80 lg:mb-2 lg:pl-2">
                    Pratyus Saha
                  </p>
                  <h1 className="hero-condensed text-[clamp(4.5rem,10vw,10.5rem)] leading-[0.85] text-foreground tracking-tight">
                    PRODUCT
                  </h1>
                </div>

                {/* Center Image */}
                <div className="relative z-0 mx-auto mt-12 w-full max-w-[400px] lg:mt-0">
                  {/* Top Right Dot */}
                  <div className="absolute -right-2 -top-6 h-4 w-4 rounded-full bg-[#6b72e1]" />
                  
                  {/* Portrait */}
                  <div className="relative aspect-[0.7] w-full overflow-hidden rounded-[32px] bg-[#e6e2db]">
                    <Image
                      src="/images/profile/pratyus-saha.png"
                      alt="Portrait of Pratyus Saha"
                      fill
                      priority
                      className="object-cover object-bottom transition duration-500 hover:scale-[1.02]"
                      sizes="(min-width: 1024px) 400px, 90vw"
                    />
                  </div>

                  {/* Bottom Left Hand Badge */}
                  <div className="absolute -bottom-8 -left-10 flex h-[100px] w-[100px] items-center justify-center rounded-full bg-[#6b72e1] text-white shadow-[0_20px_40px_rgba(107,114,225,0.3)] transition-transform hover:scale-105">
                    <Hand size={42} strokeWidth={2.5} />
                  </div>
                </div>

                {/* Right Column Text */}
                <div className="z-10 mt-16 flex flex-col items-center text-center lg:absolute lg:right-0 lg:mt-0 lg:items-end lg:text-right lg:translate-x-12">
                  <h2 className="hero-condensed text-[clamp(4.5rem,10vw,10.5rem)] leading-[0.85] text-foreground tracking-tight">
                    MANAGER
                  </h2>
                  <p className="mt-4 max-w-[280px] text-[1.05rem] leading-relaxed text-foreground/70 lg:mt-5 lg:max-w-[300px]">
                    I build digital products that solve real problems and create real impact.
                  </p>
                </div>
              </div>

              {/* Toggle Placeholder */}
              <div className="mt-24 flex h-8 w-14 items-center rounded-full bg-[#6b72e1] p-[3px] shadow-sm cursor-pointer transition-transform hover:scale-105">
                <div className="h-[26px] w-[26px] rounded-full bg-white shadow-sm transition-transform" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>



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

      <section className="px-6 py-20 md:px-8 md:py-32 bg-white rounded-[40px] mx-4 my-8 md:mx-8 shadow-[0_4px_40px_rgba(0,0,0,0.03)] border border-[rgba(26,26,26,0.05)]">
        <div className="mx-auto max-w-[1200px]">
          <FadeIn>
            <div className="grid gap-16 lg:grid-cols-[1fr_420px] lg:gap-24 items-center">
              {/* Left Column */}
              <div>
                <h2 className="hero-condensed text-[clamp(4rem,8vw,6rem)] leading-[0.85] text-foreground tracking-tight">
                  ABOUT ME
                </h2>
                <p className="mt-6 text-[1.1rem] leading-relaxed text-foreground/70 max-w-[500px]">
                  Hi, I'm Pratyus — a product manager and builder passionate about crafting meaningful and impactful digital products.
                </p>

                {/* Metrics */}
                <div className="mt-12 grid grid-cols-3 gap-4 md:gap-6">
                  <div>
                    <p className="hero-condensed text-[3.5rem] leading-none text-[#6b72e1]">2<span className="text-3xl">+</span></p>
                    <p className="mt-2 text-sm font-bold text-foreground">Years of PM Experience</p>
                  </div>
                  <div>
                    <p className="hero-condensed text-[3.5rem] leading-none text-[#6b72e1]">4</p>
                    <p className="mt-2 text-sm font-bold text-foreground">Flagship Products</p>
                  </div>
                  <div>
                    <p className="hero-condensed text-[3.5rem] leading-none text-[#6b72e1]">60<span className="text-3xl">+</span></p>
                    <p className="mt-2 text-sm font-bold text-foreground">Documents Validated</p>
                  </div>
                </div>

                {/* Contact Row */}
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-[var(--line)] pb-8">
                  <div>
                    <p className="text-sm font-bold text-foreground">Call Today :</p>
                    <p className="mt-1 text-foreground/70">{siteConfig.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Email :</p>
                    <p className="mt-1 text-foreground/70">{siteConfig.email}</p>
                  </div>
                </div>

                {/* Social & CTA */}
                <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-6">
                    <a href={siteConfig.github} target="_blank" rel="noreferrer" className="text-foreground transition-colors hover:text-[#6b72e1]"><MessageCircle size={24} strokeWidth={2.5} /></a>
                    <a href={siteConfig.github} target="_blank" rel="noreferrer" className="text-foreground transition-colors hover:text-[#6b72e1]"><Globe size={24} strokeWidth={2.5} /></a>
                    <a href={siteConfig.linkedin} target="_blank" rel="noreferrer" className="text-foreground transition-colors hover:text-[#6b72e1]"><FileText size={24} strokeWidth={2.5} /></a>
                    <a href={`mailto:${siteConfig.email}`} className="text-foreground transition-colors hover:text-[#6b72e1]"><Mail size={24} strokeWidth={2.5} /></a>
                  </div>
                  <ButtonLink href="/about" variant="outline" className="rounded-full border-[#6b72e1] px-8 py-3 text-[#6b72e1] hover:bg-[#6b72e1] hover:text-white uppercase tracking-wider font-semibold text-sm transition-all duration-300">
                    MY STORY
                  </ButtonLink>
                </div>
              </div>

              {/* Right Column */}
              <div className="relative mx-auto w-full max-w-[420px]">
                {/* Floating dot */}
                <div className="absolute -left-12 top-1/2 h-[18px] w-[18px] -translate-y-1/2 rounded-full bg-[#6b72e1]" />
                
                {/* Tilted Portrait */}
                <div className="relative aspect-[0.75] w-full overflow-hidden rounded-[32px] bg-[#e6e2db] transform rotate-2 transition-transform hover:rotate-0 duration-500 shadow-xl">
                  <Image
                    src="/images/profile/pratyus-saha.png"
                    alt="Portrait of Pratyus Saha"
                    fill
                    className="object-cover object-bottom"
                    sizes="(min-width: 1024px) 420px, 90vw"
                  />
                </div>
              </div>
            </div>

            {/* Toggle Placeholder */}
            <div className="mt-20 flex justify-center">
              <div className="flex h-[30px] w-[52px] items-center rounded-full bg-[#6b72e1] p-[3px] shadow-sm cursor-pointer transition-transform hover:scale-105">
                <div className="h-6 w-6 rounded-full bg-white shadow-sm transition-transform" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}

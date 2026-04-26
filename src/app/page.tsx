import Image from "next/image";
import Link from "next/link";
import { HeroPortrait } from "@/components/hero-portrait";
import { AboutPortrait } from "@/components/about-portrait";
import { ArrowUpRight, FileText, Globe, Mail, MessageCircle, Sparkles, Users, Target, PenTool, Rocket, RefreshCcw } from "lucide-react";
import { Counter } from "@/components/counter";
import { AnimatedGreeting } from "@/components/animated-greeting";
import { AuthorEditPanel } from "@/components/author-edit-panel";
import { ArtifactCard } from "@/components/artifact-card";
import { ButtonLink } from "@/components/button-link";
import { FadeIn } from "@/components/fade-in";
import { ProjectCarousel } from "@/components/project-carousel";
import { Section } from "@/components/section";
import { isEditMode } from "@/lib/content/edit-mode";
import { getFeaturedArtifacts, getFeaturedProjects } from "@/lib/content/projects";
import { siteConfig } from "@/lib/site/config";



const principles = [
  {
    icon: Users,
    title: "Start with the User",
    copy: "Talk directly to the people using your product. Find out exactly what they want to achieve and where they get stuck. Base your decisions on these conversations instead of guessing what they need.",
    tags: ["USER RESEARCH", "EMPATHY", "INTERVIEWS", "INSIGHTS", "DISCOVERY"],
  },
  {
    icon: Target,
    title: "Define the Core Problem",
    copy: "Identify the exact problem you have to solve. Review the long list of feature requests, then set it aside. Focus on fixing the single issue that actually improves the business and helps your users.",
    tags: ["PROBLEM FRAMING", "STRATEGY", "FOCUS", "PRIORITIZATION", "ROOT CAUSE"],
  },
  {
    icon: PenTool,
    title: "Design the Right Solution",
    copy: "Shape your work around actual user needs and your team's technical limits. Keep the interface simple to use. Ensure the product works today while leaving room for future updates.",
    tags: ["SYSTEMS DESIGN", "UX", "ARCHITECTURE", "SIMPLICITY", "SCALABILITY"],
  },
  {
    icon: Rocket,
    title: "Prioritize for Impact",
    copy: "Test your idea quickly. Build the smallest possible version of your product that still gets the job done. This approach lets you confirm the concept works before your team spends six months writing code.",
    tags: ["MVP", "VALIDATION", "SPEED", "EXECUTION", "LEAN"],
  },
  {
    icon: RefreshCcw,
    title: "Execute, Learn, Iterate",
    copy: "Release your work to the public early. Look at your daily active user numbers and read the direct feedback. Make your next round of changes based entirely on how people actually interact with the software.",
    tags: ["DATA-DRIVEN", "FEEDBACK LOOP", "METRICS", "ITERATION", "GROWTH"],
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
                
                {/* Left Column Text (Sits beside image) */}
                <div className="z-20 flex flex-col items-center text-center lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2 lg:items-start lg:text-left lg:-translate-x-0 xl:-translate-x-4">
                  <p className="mb-2 text-2xl font-bold uppercase tracking-[0.2em] text-foreground/80 lg:absolute lg:-top-10 lg:left-2 lg:mb-0 lg:whitespace-nowrap">
                    Pratyus Saha
                  </p>
                  <h1 className="hero-condensed text-[clamp(3.5rem,8vw,8rem)] leading-[0.8] text-foreground tracking-tight drop-shadow-sm">
                    PRODUCT
                  </h1>
                </div>

                {/* Center Image */}
                <HeroPortrait />

                {/* Right Column Text (Sits beside image) */}
                <div className="z-20 mt-16 flex flex-col items-center text-center lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:mt-0 lg:items-end lg:text-right lg:translate-x-4 xl:translate-x-8">
                  <h2 className="hero-condensed text-[clamp(3.5rem,8vw,8rem)] leading-[0.8] text-foreground tracking-tight drop-shadow-sm">
                    MANAGER
                  </h2>
                  <p className="mt-4 max-w-[280px] text-[1.2rem] leading-relaxed text-foreground/75 lg:absolute lg:-bottom-20 lg:right-0 lg:mt-0 lg:max-w-[360px]">
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
        <FadeIn delay={0.1}>
          <ProjectCarousel projects={projects} editMode={editMode} />
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <div className="mt-16 flex justify-center">
            <ButtonLink 
              href="/work" 
              variant="solid" 
              className="group relative overflow-hidden rounded-full bg-foreground text-background px-10 py-4 text-base font-medium tracking-wide transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(26,26,26,0.3)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                View all featured work
                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </ButtonLink>
          </div>
        </FadeIn>
      </Section>

      <section className="relative bg-[#0a0a0a] py-40 overflow-clip rounded-[40px] mx-4 my-16 md:mx-8">
        <div className="relative z-20 mx-auto max-w-[1200px] px-6 text-center mb-32">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50 mb-4">Operating Model</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-[1.1]">
            How I move from ambiguity to product clarity.
          </h2>
        </div>

        {/* Sticky Background Text */}
        <div className="sticky top-1/3 flex w-full items-center justify-center pointer-events-none opacity-10 px-4">
          <h2 className="hero-condensed text-[clamp(4rem,10.5vw,14rem)] font-black leading-[0.8] text-white tracking-tight whitespace-nowrap scale-y-[1.8] origin-center">
            PRODUCT PHILOSOPHY
          </h2>
        </div>

        {/* Stacking Cards Container */}
        <div className="relative z-10 mx-auto -mt-[20vh] max-w-[800px] px-6 pb-40">
          {principles.map((principle, index) => {
            const rotateClasses = ['-rotate-[2deg]', 'rotate-[1.5deg]', '-rotate-[1deg]', 'rotate-[2deg]', '-rotate-[1.5deg]'];
            const rotateClass = rotateClasses[index % rotateClasses.length];
            const topOffset = 150 + (index * 40); // Staggered stickiness: 150px, 190px, 230px, 270px, 310px
            
            return (
              <div 
                key={principle.title}
                className={`sticky mb-40 w-full rounded-[24px] bg-white p-10 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:scale-[1.02] ${rotateClass}`}
                style={{ top: `${topOffset}px` }}
              >
                <div className="flex flex-col gap-8">
                  <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-black">
                    {principle.title}
                  </h3>
                  <div className="h-[1px] w-full bg-black/10" />
                  <p className="text-lg md:text-xl leading-relaxed text-black/70 max-w-2xl">
                    {principle.copy}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {principle.tags.map(tag => (
                      <span key={tag} className="rounded-full border border-black/15 px-4 py-2 text-xs font-bold uppercase tracking-wider text-black hover:bg-black hover:text-white transition-colors cursor-default">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Section eyebrow="Artifacts" title="Product documents as evidence, not attachments.">
        <div className="grid gap-4 md:grid-cols-2">
          {artifacts.map((artifact) => (
            <ArtifactCard key={artifact.slug} artifact={artifact} editMode={editMode} />
          ))}
        </div>
      </Section>

      {/* ABOUT ME SECTION - REDESIGNED */}
      <section className="relative overflow-hidden px-4 py-24 md:px-8 md:py-40">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 -z-10 bg-white">
          <div className="absolute -left-[10%] -top-[10%] h-[500px] w-[500px] animate-[pulse_8s_ease-in-out_infinite] rounded-full bg-[#6b72e1]/10 blur-[120px]" />
          <div className="absolute -right-[5%] bottom-[0%] h-[400px] w-[400px] animate-[pulse_10s_ease-in-out_infinite_1s] rounded-full bg-[#8e94f2]/10 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-[1300px]">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24 items-start">
            
            {/* Left Content Column */}
            <div className="relative">
              <FadeIn>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#6b72e1]/20 bg-[#6b72e1]/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#6b72e1]">
                  <Sparkles size={14} />
                  <span>The Builder Story</span>
                </div>
                
                <h2 className="hero-condensed mt-8 text-[clamp(4.5rem,10vw,8rem)] leading-[0.8] text-foreground tracking-tight">
                  ABOUT ME
                </h2>

                <div className="mt-12 space-y-8">
                  <div className="relative rounded-[32px] border border-white/40 bg-white/30 p-8 md:p-10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.02)]">
                    <p className="text-xl md:text-2xl leading-relaxed text-foreground/80 font-medium">
                      Hi, I'm Pratyus — a product manager and builder obsessed with the intersection of <span className="text-foreground">human experience</span> and <span className="text-foreground">scalable engineering</span>.
                    </p>
                  </div>

                  {/* High-Impact Metrics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="rounded-[24px] bg-[#6b72e1] p-6 text-white shadow-lg shadow-[#6b72e1]/20 transition-transform hover:scale-[1.03]">
                      <div className="flex items-baseline gap-1">
                        <span className="hero-condensed text-5xl leading-none"><Counter value={2} /></span>
                        <span className="text-2xl font-bold">+</span>
                      </div>
                      <p className="mt-3 text-xs font-bold uppercase tracking-widest opacity-80">Years Experience</p>
                    </div>
                    
                    <div className="rounded-[24px] border border-[var(--line)] bg-white/50 p-6 backdrop-blur-md transition-transform hover:scale-[1.03]">
                      <div className="flex items-baseline gap-1 text-foreground">
                        <span className="hero-condensed text-5xl leading-none"><Counter value={4} /></span>
                      </div>
                      <p className="mt-3 text-xs font-bold uppercase tracking-widest text-foreground/60">Flagship Products</p>
                    </div>

                    <div className="rounded-[24px] border border-[var(--line)] bg-white/50 p-6 backdrop-blur-md transition-transform hover:scale-[1.03]">
                      <div className="flex items-baseline gap-1 text-foreground">
                        <span className="hero-condensed text-5xl leading-none"><Counter value={60} /></span>
                        <span className="text-2xl font-bold">+</span>
                      </div>
                      <p className="mt-3 text-xs font-bold uppercase tracking-widest text-foreground/60">Docs Validated</p>
                    </div>
                  </div>
                </div>

                {/* Refined Contact Info */}
                <div className="mt-16 flex flex-wrap items-center gap-x-12 gap-y-8 border-t border-[var(--line)] pt-12">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">Direct Line</p>
                    <p className="mt-2 text-lg font-bold text-foreground">{siteConfig.phone}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">Email Correspondence</p>
                    <p className="mt-2 text-lg font-bold text-foreground">{siteConfig.email}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    {[
                      { icon: MessageCircle, href: siteConfig.github },
                      { icon: Globe, href: siteConfig.github },
                      { icon: FileText, href: siteConfig.linkedin },
                      { icon: Mail, href: `mailto:${siteConfig.email}` }
                    ].map((social, i) => (
                      <a 
                        key={i}
                        href={social.href} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="group flex h-12 w-12 items-center justify-center rounded-full border border-[var(--line)] bg-white transition-all hover:scale-110 hover:border-[#6b72e1] hover:text-[#6b72e1]"
                      >
                        <social.icon size={20} />
                      </a>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Sticky Portrait Column */}
            <div className="lg:sticky lg:top-32">
              <FadeIn delay={0.2}>
                <div className="relative">
                  <div className="absolute -inset-4 -z-10 rounded-[40px] bg-gradient-to-tr from-[#6b72e1]/10 to-transparent blur-2xl" />
                  <AboutPortrait />
                  <div className="mt-12 flex justify-center">
                    <ButtonLink 
                      href="/about" 
                      className="group flex items-center gap-3 rounded-full bg-[#1c1c1c] px-10 py-5 text-sm font-bold uppercase tracking-widest text-white transition-all hover:scale-105 hover:bg-black shadow-xl"
                    >
                      <span>The Full Story</span>
                      <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </ButtonLink>
                  </div>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

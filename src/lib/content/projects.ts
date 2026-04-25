import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Artifact, Project } from "@/types/content";

const contentRoot = path.join(process.cwd(), "content");

function getMdxSlugs(relativeDir: string) {
  const dirPath = path.join(contentRoot, relativeDir);
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  return fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
    .sort();
}

function readMdx(relativeDir: string, slug: string) {
  const filePath = path.join(contentRoot, relativeDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return fs.readFileSync(filePath, "utf8");
}

function parseProjectFrontmatter(fileContents: string): Project {
  const { data } = matter(fileContents);
  
  // Create a base project object, handling defaults for arrays and metrics
  return {
    slug: data.slug || "",
    title: data.title || "",
    subtitle: data.subtitle || "",
    domain: data.domain || "",
    type: data.type || "Case Study",
    status: data.status || "draft",
    featured: Boolean(data.featured),
    role: data.role || "",
    timeline: data.timeline || "",
    team: data.team || "",
    summary: data.summary || "",
    problem: data.problem || "",
    decisionFocus: data.decisionFocus || "",
    outcome: data.outcome || "",
    metrics: data.metrics || [],
    skills: data.skills || [],
    tags: data.tags || [],
    coverImage: data.coverImage,
    caseStudySlug: data.slug || "",
    relatedProjects: data.relatedProjects || [],
    prd: undefined // This will be populated later if prdSlug exists
  };
}

export function getProjects(): Project[] {
  const slugs = getMdxSlugs("case-studies");
  const projects = slugs.map((slug) => {
    const fileContents = readMdx("case-studies", slug);
    if (!fileContents) return null;
    
    const { data } = matter(fileContents);
    const project = parseProjectFrontmatter(fileContents);
    
    // Attach PRD if prdSlug exists
    if (data.prdSlug) {
      const prdContents = readMdx("prds", data.prdSlug);
      if (prdContents) {
        const prdData = matter(prdContents).data;
        project.prd = {
          slug: prdData.slug || data.prdSlug,
          title: prdData.title || "",
          subtitle: prdData.subtitle || "",
          summary: prdData.summary || "",
          decisionFocus: prdData.decisionFocus || "",
          downloadable: prdData.downloadable,
          tags: prdData.tags || [],
        };
      }
    }
    
    return project;
  }).filter((p): p is Project => p !== null);

  return projects
    .filter((project) => project.status === "published")
    .sort((a, b) => Number(b.featured) - Number(a.featured));
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((project) => project.featured);
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}

export function getProjectByCaseStudySlug(caseStudySlug: string) {
  return getProjects().find((project) => project.caseStudySlug === caseStudySlug);
}

export function getProjectContent(caseStudySlug: string) {
  const content = readMdx("case-studies", caseStudySlug);
  if (!content) return null;
  const { content: markdownBody } = matter(content);
  return markdownBody;
}

export function getAllCaseStudySlugs() {
  return getMdxSlugs("case-studies");
}

export function getRelatedProjects(project: Project): Project[] {
  return project.relatedProjects
    .map((slug) => getProject(slug))
    .filter((related): related is Project => Boolean(related));
}

export function getArtifacts(): Artifact[] {
  return getProjects()
    .filter((project) => Boolean(project.prd))
    .map((project) => ({
      slug: project.prd!.slug,
      title: project.prd!.title,
      subtitle: project.prd!.subtitle,
      type: "PRD",
      status: project.status,
      featured: project.featured,
      projectSlug: project.slug,
      summary: project.prd!.summary,
      decisionFocus: project.prd!.decisionFocus,
      downloadable: project.prd!.downloadable,
      tags: project.prd!.tags,
    }));
}

export function getFeaturedArtifacts(): Artifact[] {
  return getArtifacts().filter((artifact) => artifact.featured);
}

export function getArtifact(slug: string): Artifact | undefined {
  return getArtifacts().find((artifact) => artifact.slug === slug);
}

export function getArtifactContent(slug: string) {
  const content = readMdx("prds", slug);
  if (!content) return null;
  const { content: markdownBody } = matter(content);
  return markdownBody;
}

export function getAllPrdSlugs() {
  return getMdxSlugs("prds");
}

export function getProjectForArtifact(artifact: Artifact) {
  return getProject(artifact.projectSlug);
}

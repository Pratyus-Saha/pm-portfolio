import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import type { Artifact, Project } from "@/types/content";

const dataRoot = path.join(process.cwd(), "data");
const contentRoot = path.join(process.cwd(), "content");

const metricSchema = z.object({
  value: z.string(),
  label: z.string(),
  context: z.string().optional(),
});

const prdSchema = z.object({
  slug: z.string(),
  title: z.string(),
  subtitle: z.string(),
  summary: z.string(),
  decisionFocus: z.string(),
  downloadable: z.string().optional(),
  tags: z.array(z.string()),
});

const projectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  subtitle: z.string(),
  domain: z.string(),
  type: z.string(),
  status: z.enum(["published", "draft"]),
  featured: z.boolean(),
  role: z.string(),
  timeline: z.string(),
  team: z.string(),
  summary: z.string(),
  problem: z.string(),
  decisionFocus: z.string(),
  outcome: z.string(),
  metrics: z.array(metricSchema),
  skills: z.array(z.string()),
  tags: z.array(z.string()),
  coverImage: z.string().optional(),
  caseStudySlug: z.string(),
  prd: prdSchema.optional(),
  relatedProjects: z.array(z.string()),
});

const projectsSchema = z.array(projectSchema);

function readJson<T>(relativePath: string, schema: z.ZodSchema<T>): T {
  const filePath = path.join(dataRoot, relativePath);
  return schema.parse(JSON.parse(fs.readFileSync(filePath, "utf8")));
}

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

export function getProjects(): Project[] {
  return readJson("projects.json", projectsSchema)
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
  return readMdx("case-studies", caseStudySlug);
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
  return readMdx("prds", slug);
}

export function getAllPrdSlugs() {
  return getMdxSlugs("prds");
}

export function getProjectForArtifact(artifact: Artifact) {
  return getProject(artifact.projectSlug);
}

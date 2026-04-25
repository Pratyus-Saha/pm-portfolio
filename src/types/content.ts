export type Metric = {
  value: string;
  label: string;
  context?: string;
};

export type ContentStatus = "published" | "draft";

export type ProjectPrd = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  decisionFocus: string;
  downloadable?: string;
  tags: string[];
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  domain: string;
  type: string;
  status: ContentStatus;
  featured: boolean;
  role: string;
  timeline: string;
  team: string;
  summary: string;
  problem: string;
  decisionFocus: string;
  outcome: string;
  metrics: Metric[];
  skills: string[];
  tags: string[];
  coverImage?: string;
  caseStudySlug: string;
  prd?: ProjectPrd;
  relatedProjects: string[];
};

export type Artifact = {
  slug: string;
  title: string;
  subtitle: string;
  type: string;
  status: ContentStatus;
  featured: boolean;
  projectSlug: string;
  summary: string;
  decisionFocus: string;
  downloadable?: string;
  tags: string[];
};

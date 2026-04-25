import type { Project } from "@/types/content";

type SearchParams = Record<string, string | string[] | undefined>;

const authorToken = process.env.AUTHOR_EDIT_TOKEN;

function asString(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export function isEditMode(searchParams?: SearchParams) {
  if (!searchParams) {
    return false;
  }

  const edit = asString(searchParams.edit);
  if (edit !== "true") {
    return false;
  }

  // In local development, query-flag edit mode is available by default.
  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  if (!authorToken) {
    return false;
  }

  return asString(searchParams.key) === authorToken;
}

export function getProjectAuthorPaths(project: Project) {
  return {
    jsonPath: "/data/projects.json",
    caseStudyPath: `/content/case-studies/${project.caseStudySlug}.mdx`,
    prdPath: project.prd ? `/content/prds/${project.prd.slug}.mdx` : null,
    imageDir: `/public/images/projects/${project.slug}/`,
  };
}

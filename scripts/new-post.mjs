import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dataPath = path.join(root, "data", "projects.json");
const caseStudiesDir = path.join(root, "content", "case-studies");
const prdsDir = path.join(root, "content", "prds");
const imagesDir = path.join(root, "public", "images", "projects");

function parseArgs(argv) {
  const result = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) {
      continue;
    }

    const key = arg.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      result[key] = true;
      continue;
    }
    result[key] = next;
    i += 1;
  }
  return result;
}

function toTitle(input) {
  return input
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function printHelp() {
  console.log(`
Create a new case-study post and project entry.

Usage:
  npm run new:post -- --slug my-project
  npm run new:post -- --slug my-project --title "My Project"
  npm run new:post -- --slug my-project --with-prd
  npm run new:post -- --slug my-project --domain "AI Product"

Options:
  --slug       Required kebab-case slug (example: user-research-hub)
  --title      Optional display title (defaults to slug title case)
  --domain     Optional domain label (default: General)
  --with-prd   Also create a PRD entry and /content/prds/<slug>-prd.mdx
  --help       Show this help
`);
}

const args = parseArgs(process.argv.slice(2));

if (args.help) {
  printHelp();
  process.exit(0);
}

const slug = args.slug;
if (!slug || typeof slug !== "string") {
  console.error("Missing required --slug argument.");
  printHelp();
  process.exit(1);
}

if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error("Slug must be kebab-case: lowercase letters, numbers, and hyphens only.");
  process.exit(1);
}

if (!fs.existsSync(dataPath)) {
  console.error(`Cannot find ${dataPath}.`);
  process.exit(1);
}

const title = typeof args.title === "string" ? args.title : toTitle(slug);
const domain = typeof args.domain === "string" ? args.domain : "General";
const withPrd = Boolean(args["with-prd"]);

const projects = JSON.parse(fs.readFileSync(dataPath, "utf8"));
if (!Array.isArray(projects)) {
  console.error("data/projects.json must contain an array.");
  process.exit(1);
}

if (projects.some((project) => project.slug === slug)) {
  console.error(`Project with slug "${slug}" already exists in data/projects.json.`);
  process.exit(1);
}

const caseStudySlug = slug;
const prdSlug = `${slug}-prd`;

const newProject = {
  slug,
  title,
  subtitle: "Short one-line value proposition for this project.",
  domain,
  type: "Case Study",
  status: "published",
  featured: false,
  role: "Your role",
  timeline: "MMM YYYY - MMM YYYY",
  team: "Team context",
  summary: "2-3 line summary that explains the project and why it matters.",
  problem: "What user/business problem did you solve?",
  decisionFocus: "What key product decision defined this work?",
  outcome: "What changed after launch or validation?",
  metrics: [
    {
      value: "X",
      label: "Metric headline",
      context: "Add context for this metric."
    }
  ],
  skills: ["Skill one", "Skill two"],
  tags: ["AI Product", "Case Study"],
  coverImage: `/images/projects/${slug}/cover.png`,
  caseStudySlug,
  relatedProjects: []
};

if (withPrd) {
  newProject.prd = {
    slug: prdSlug,
    title: `${title} PRD`,
    subtitle: "Product requirements and execution strategy.",
    summary: "What this PRD covers and why it matters.",
    decisionFocus: "What product choices this PRD proves.",
    downloadable: "",
    tags: ["PRD", "Strategy"]
  };
}

projects.push(newProject);
fs.writeFileSync(dataPath, `${JSON.stringify(projects, null, 2)}\n`, "utf8");

fs.mkdirSync(caseStudiesDir, { recursive: true });
const caseStudyPath = path.join(caseStudiesDir, `${caseStudySlug}.mdx`);
if (!fs.existsSync(caseStudyPath)) {
  fs.writeFileSync(
    caseStudyPath,
    `## Snapshot

Add a concise overview of the project, your role, and the outcome.

## Problem

Describe the user and business problem.

## Context

Explain constraints, stakeholders, and market conditions.

## Discovery

Capture research signals and what changed your perspective.

## Decisions

<Decision>
Write the most important product decision and why it was made.
</Decision>

## Tradeoffs

What did you choose not to do, and why?

## Execution

Outline the delivery approach and collaboration model.

## Impact

Add quantitative and qualitative outcomes.

## Learnings

Summarize what you would keep and what you would change.
`,
    "utf8"
  );
}

if (withPrd) {
  fs.mkdirSync(prdsDir, { recursive: true });
  const prdPath = path.join(prdsDir, `${prdSlug}.mdx`);
  if (!fs.existsSync(prdPath)) {
    fs.writeFileSync(
      prdPath,
      `## Problem

Describe the core user and business problem.

## Goals

- Goal 1
- Goal 2

## Non-goals

- Non-goal 1
- Non-goal 2

## Users

Define primary users and segments.

## Requirements

- Requirement 1
- Requirement 2

## Success Metrics

- Metric 1
- Metric 2

## Risks

- Risk 1
- Risk 2

## Launch Considerations

Outline rollout assumptions and launch dependencies.

## Reflection

Document key product lessons.
`,
      "utf8"
    );
  }
}

const projectImageDir = path.join(imagesDir, slug);
fs.mkdirSync(projectImageDir, { recursive: true });

console.log(`Created project entry in: ${path.relative(root, dataPath)}`);
console.log(`Case study MDX: ${path.relative(root, caseStudyPath)}`);
if (withPrd) {
  console.log(`PRD MDX: ${path.relative(root, path.join(prdsDir, `${prdSlug}.mdx`))}`);
}
console.log(`Image directory: ${path.relative(root, projectImageDir)}`);

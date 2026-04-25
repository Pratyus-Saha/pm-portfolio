# PM Portfolio

Content-driven product portfolio built with Next.js and MDX.

## Content Structure

- `data/projects.json`
- `content/case-studies/*.mdx`
- `content/prds/*.mdx`

Each project entry in `data/projects.json` maps to:

- a required `caseStudySlug` for case-study MDX
- an optional `prd` object for PRD MDX

## Create a New Post (One Command)

```bash
npm run new:post -- --slug my-new-project
```

Optional flags:

```bash
npm run new:post -- --slug my-new-project --title "My New Project" --domain "AI Product" --with-prd
```

This command will:

1. Append a starter entry to `data/projects.json`
2. Create `content/case-studies/<slug>.mdx`
3. Optionally create `content/prds/<slug>-prd.mdx`
4. Create `public/images/projects/<slug>/`

## Local Development

```bash
npm run dev
```

Open `http://localhost:3000`.

## Author Edit Mode

Use private author mode to surface edit controls:

- Local development: append `?edit=true`
- Production: set `AUTHOR_EDIT_TOKEN` and use `?edit=true&key=<token>`
# Pratyus-PM-Portfolio

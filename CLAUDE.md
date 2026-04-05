# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

AI Digest — Russian-language automatic news digest blog covering AI, ML, and LLMs. Built as a course project for **Claude Code Basics** (an 8-step course evolving a blank template into an automated publication pipeline).

## Commands

```bash
npm run dev      # Dev server on localhost:4321
npm run build    # Production build → dist/
npm run preview  # Preview production build
```

No test, lint, or format scripts are configured.

## Architecture

**Astro 6** static site with content collections. TypeScript (strict), MDX support.

- **Pages** (`src/pages/`): Astro file-based routing. Homepage, about, blog listing, blog slugs, RSS feed at `/rss.xml`.
- **Content** (`src/content/blog/`): Blog posts as Markdown/MDX, loaded via Astro glob loader. Schema defined in `src/content.config.ts`.
- **Layouts** (`src/layouts/`): `BlogPost.astro` wraps each article with hero image, metadata, and prose styling.
- **Components** (`src/components/`): `BaseHead.astro` (metadata/OG), `Header.astro` (nav), `Footer.astro`. Shared across all pages.
- **Constants** (`src/consts.ts`): Site title and description.
- **Styles** (`src/styles/global.css`): Bear Blog-derived styles, Atkinson font.
- **Assets** (`src/assets/`, `public/fonts/`): Placeholder images, Atkinson font files.

### Blog Post Frontmatter

Posts in `src/content/blog/` require this frontmatter:

```yaml
title: string        # required
description: string  # required
pubDate: Date        # required
heroImage: Image     # optional
source: URL          # optional — original article link
tags: string[]       # optional, defaults to []
updatedDate: Date    # optional
```

## Conventions

- **Language:** UI text and blog content are in Russian. Commit messages use Russian with conventional commit prefixes (e.g., `init:`, `chore:`).
- **Deployment target:** Vercel. The `site` URL in `astro.config.mjs` is currently `https://example.com` and must be updated for production.

## Known Issues

- Homepage (`src/pages/index.astro`) still has default Astro starter content — not yet customized for the AI Digest theme.
- HTML `lang` attributes are `"en"` but content is Russian — should be `"ru"`.

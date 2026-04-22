# Typenorm Media — CLAUDE.md

## Project
Typenorm Media is the publishing layer of Typenorm: an **Astro-based editorial site** for UX articles, digests, and structured teardowns.

Goal: ship high-signal content that builds authority and a repeatable content engine.

---

## Stack
- **Astro** (static site, content-first)
- **TypeScript**
- **Vercel** (deployment)
```bash
npm run dev      # dev server
npm run build    # production build
npm run preview  # preview production build locally
```

---

## Audience
- Product Designers, UX Researchers, Product Managers, CX/Support leads, QA, Product Analysts
- Founders and CPOs who care about clarity, conversion, and measurable UX outcomes
- Readers are fluent in UX vocabulary: heuristics, IA, flows, design systems, A/B tests

**Primary language:** English.
Translations (RU/PT) may follow — English is always the source of truth.

---

## Content types

| Type | Description | Length |
|---|---|---|
| **Article** | Long-form UX thinking + practical frameworks | 1,500–5,000 words |
| **Digest** | "3 cases a day" / weekly roundups — quick, structured, shareable | Short |
| **Teardown** | Flow-based critique: PLP→PDP, onboarding, checkout, pricing, etc. | Medium–long |
| **Benchmark** | Lightweight pattern comparisons across products/industries | Medium |

---

## Writing rules
- Tone: confident, pragmatic, no fluff, no clickbait
- Facts first — opinions only when clearly labeled as interpretation
- Default structure: **TL;DR → context → analysis → actionable takeaways**
- Prefer artifacts over prose where possible: checklists, rubrics, templates, "quick wins vs big bets"
- Always cite sources for news and cases; never copy text verbatim
- Titles must be honest and specific — describe exactly what the piece delivers

---

## Code rules (site/config work)
- Read existing Astro config and content collections before proposing structural changes
- Prefer editing existing files over creating new ones
- Don't refactor or reorganize unless explicitly asked
- Content schema changes require updating all affected `.md`/`.mdx` files — check before touching schema
- No inline styles; use the established CSS/design tokens

---

## Content file conventions
- New content goes in the correct `src/content/[type]/` directory
- Frontmatter must be complete and valid against the collection schema before committing
- Slugs: `kebab-case`, descriptive, no dates in the slug
- If adding images: place in `public/images/[type]/[slug]/`, reference by relative path

---

## What to do when asked to write content
1. Confirm the content type (article / digest / teardown / benchmark)
2. Confirm target length and any specific angle or thesis
3. If ambiguous: ask **one clarifying question** before drafting
4. Follow the writing rules above — structure, tone, citations
5. Output frontmatter + body together, ready to drop into the content directory

---

## Git
- Commit messages: `type: description` — types: `feat` `fix` `content` `refactor` `chore` `docs`
- Use `content:` for new articles, `fix:` for copy corrections, `chore:` for schema/config
- Only commit when explicitly asked. Never push without an explicit command.

---

## Hard limits
- No fake placeholder content committed to main
- No client data, confidential metrics, or proprietary screenshots in the repo
- No secrets in env vars exposed to the client
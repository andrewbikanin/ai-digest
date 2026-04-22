# Storybook conventions

## Setup

Framework: `@storybook/html-vite` (Storybook 8)
Run: `npm run storybook` → http://localhost:6006
Build: `npm run build-storybook`

## Why html-vite, not astro-storybook

All components in `src/components/` are Astro SSR components. They depend on
`Astro.url`, `Astro.props`, and Astro's scoped-style compiler — none of which
run in a browser environment. Stories are therefore written as HTML strings
that mirror the rendered output, not as Astro component imports.

## Story file conventions

- One story file per component: `src/components/Foo.stories.ts`
- Format: CSF3 (Component Story Format 3), named exports only
- No default story — every story should have a meaningful name

## Writing a story

```ts
import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/MyComponent',
  parameters: { layout: 'centered' }, // or 'fullscreen' for full-width components
};
export default meta;

export const Default: StoryObj = {
  render: () => `<div class="my-component">...</div>`,
};
```

## Handling scoped styles

Astro scopes component styles with hashed class names at build time. In stories,
copy only the CSS rules the story actually needs into a `<style>` block inside
the `render` string. Define the styles once as a module-level `const STYLES`
string and prepend it to every render call.

Global CSS tokens (`--accent`, `--gray`, etc.) are available automatically via
`preview.ts` importing `src/styles/global.css`.

## Naming stories

Use the active state / variant as the name, not the component name:
- `HomeActive`, `DigestActive` — not `Default1`, `Default2`
- `Inactive`, `Active`, `Group` — not `Story1`, `Story2`

## When to add a story

Add a story when a component has:
- More than one visual state (e.g. active/inactive link)
- A layout that needs to be verified at different viewports
- Props that meaningfully change appearance

Skip stories for purely functional components (e.g. `BaseHead.astro` renders
only `<head>` meta tags — nothing to show in a canvas).

## Viewport testing

Use the Storybook viewport toolbar to verify components at 375px (mobile) and
1200px (desktop). The 720px breakpoint is where the site collapses the
social-links in the header.

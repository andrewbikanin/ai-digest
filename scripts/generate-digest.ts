import { tavily } from '@tavily/core';
import Anthropic from '@anthropic-ai/sdk';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLISHED_PATH = join(__dirname, 'published-urls.json');

const TOPICS = [
  { query: 'UX research usability testing user experience', tags: ['ux-research'] },
  { query: 'product design interaction design system UI patterns', tags: ['product-design'] },
  { query: 'AI artificial intelligence UX design copilot', tags: ['ai-ux'] },
  { query: 'design industry hiring layoffs agency design leadership', tags: ['design-industry'] },
];

interface Story {
  title: string;
  url: string;
  content: string;
  score: number;
  tags: string[];
}

function loadPublished(): string[] {
  return JSON.parse(readFileSync(PUBLISHED_PATH, 'utf8'));
}

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60);
}

async function search(tavilyClient: ReturnType<typeof tavily>): Promise<Story[]> {
  const results = await Promise.all(
    TOPICS.map(async (topic) => {
      const res = await tavilyClient.search(topic.query, {
        topic: 'news',
        timeRange: 'day',
        maxResults: 5,
      });
      return res.results.map((r) => ({
        title: r.title,
        url: r.url,
        content: r.content,
        score: r.score,
        tags: topic.tags,
      }));
    })
  );
  return results.flat();
}

function selectStories(all: Story[], published: string[]): Story[] {
  const fresh = all.filter((r) => !published.includes(r.url));
  fresh.sort((a, b) => b.score - a.score);

  const selected: Story[] = [];
  const usedTags = new Set<string>();

  for (const story of fresh) {
    if (selected.length >= 3) break;
    if (!usedTags.has(story.tags[0])) {
      selected.push(story);
      usedTags.add(story.tags[0]);
    }
  }

  for (const story of fresh) {
    if (selected.length >= 3) break;
    if (!selected.includes(story)) selected.push(story);
  }

  return selected;
}

async function writePost(anthropic: Anthropic, story: Story, pubDate: string): Promise<string> {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1500,
    system: `You are a UX editorial writer for Typenorm Media. Style: confident, pragmatic, concise — no fluff, no clickbait. Audience: product designers, UX researchers, product managers.

Output ONLY a valid Markdown file starting with YAML frontmatter (---). No code fences around the output.`,
    messages: [
      {
        role: 'user',
        content: `Write a digest post about this story.

Title: ${story.title}
Source URL: ${story.url}
Snippet: ${story.content}

Frontmatter fields required: title, description (1–2 sentences), pubDate (${pubDate}), tags (${JSON.stringify(story.tags)}), source (${story.url})
Body structure: ## TL;DR → ## Context → ## Analysis → ## Takeaways (bullet list)
Length: 300–500 words. Never copy text verbatim. Cite the source in the body.`,
      },
    ],
  });

  const block = response.content[0];
  return block.type === 'text' ? block.text : '';
}

async function main() {
  const tavilyClient = tavily({ apiKey: process.env.TAVILY_API_KEY });
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const published = loadPublished();
  const pubDate = new Date().toISOString().split('T')[0];

  console.log('Searching for stories...');
  const all = await search(tavilyClient);
  const selected = selectStories(all, published);

  if (selected.length === 0) {
    console.log('No new stories found.');
    return;
  }

  console.log(`Selected ${selected.length} stories. Generating posts...`);
  const newUrls: string[] = [];

  for (const story of selected) {
    const slug = toSlug(story.title);
    const outputPath = join(ROOT, 'src/content/blog', `${slug}.md`);

    if (existsSync(outputPath)) {
      console.log(`Skip (exists): ${slug}`);
      continue;
    }

    const markdown = await writePost(anthropic, story, pubDate);
    writeFileSync(outputPath, markdown);
    newUrls.push(story.url);
    console.log(`Created: src/content/blog/${slug}.md`);
  }

  if (newUrls.length > 0) {
    writeFileSync(PUBLISHED_PATH, JSON.stringify([...published, ...newUrls], null, 2) + '\n');
    console.log(`Done. ${newUrls.length} post(s) generated.`);
  } else {
    console.log('No new posts written.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

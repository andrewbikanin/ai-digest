import type { Meta, StoryObj } from '@storybook/html';

const STYLES = `<style>
  .card { display: block; }

  .card__link {
    display: block;
    text-decoration: none;
    transition: transform 120ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  .card__link:active { transform: scale(0.98); }

  .card__image-wrap {
    overflow: hidden;
    border-radius: 12px;
    margin-bottom: 0.5rem;
  }

  .card__image {
    display: block;
    width: 100%;
    border-radius: 12px;
    transition:
      transform 200ms cubic-bezier(0.23, 1, 0.32, 1),
      box-shadow 200ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  .card__title {
    margin: 0;
    color: rgb(var(--black));
    line-height: 1.2;
    transition: color 160ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  .card__date {
    margin: 0;
    color: rgb(var(--gray));
  }

  .card__desc {
    margin: 0.5rem 0 0;
    color: rgb(var(--gray));
    font-size: 0.875em;
    line-height: 1.5;
  }

  .card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    list-style: none;
    margin: 0.75rem 0 0;
    padding: 0;
  }

  .card__tag {
    font-size: 0.75em;
    font-weight: 600;
    color: rgb(var(--gray));
    background: rgb(var(--gray-light));
    border-radius: 4px;
    padding: 2px 8px;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  @media (hover: hover) and (pointer: fine) {
    .card__link:hover .card__image {
      transform: translateY(-4px);
      box-shadow: 0 2px 6px rgba(96,115,159,0.25), 0 8px 24px rgba(96,115,159,0.33), 0 16px 32px rgba(96,115,159,0.33);
    }
    .card__link:hover .card__title {
      color: var(--accent);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .card__link, .card__image, .card__title, .card__date { transition: none; }
  }
</style>`;

const meta: Meta = {
  title: 'Components/ArticleCard',
  parameters: { layout: 'padded' },
};
export default meta;

export const Default: StoryObj = {
  name: 'No image',
  render: () => `${STYLES}
<div style="width: 340px;">
  <article class="card">
    <a href="#" class="card__link">
      <h4 class="card__title">The invisible details that make great UX</h4>
      <p class="card__date">Apr 22, 2026</p>
    </a>
  </article>
</div>`,
};

export const WithDescription: StoryObj = {
  name: 'With description',
  render: () => `${STYLES}
<div style="width: 340px;">
  <article class="card">
    <a href="#" class="card__link">
      <h4 class="card__title">The invisible details that make great UX</h4>
      <p class="card__date">Apr 22, 2026</p>
      <p class="card__desc">How a thousand barely audible voices all singing in tune produce something stunning — and why most teams stop at "good enough."</p>
    </a>
  </article>
</div>`,
};

export const WithTags: StoryObj = {
  name: 'With tags',
  render: () => `${STYLES}
<div style="width: 340px;">
  <article class="card">
    <a href="#" class="card__link">
      <h4 class="card__title">The invisible details that make great UX</h4>
      <p class="card__date">Apr 22, 2026</p>
      <p class="card__desc">How a thousand barely audible voices all singing in tune produce something stunning.</p>
      <ul class="card__tags">
        <li class="card__tag">ux</li>
        <li class="card__tag">design systems</li>
        <li class="card__tag">craft</li>
      </ul>
    </a>
  </article>
</div>`,
};

export const WithImage: StoryObj = {
  name: 'With image',
  render: () => `${STYLES}
<div style="width: 340px;">
  <article class="card">
    <a href="#" class="card__link">
      <div class="card__image-wrap">
        <div class="card__image" style="background: rgb(229,233,240); aspect-ratio: 2/1;"></div>
      </div>
      <h4 class="card__title">The invisible details that make great UX</h4>
      <p class="card__date">Apr 22, 2026</p>
    </a>
  </article>
</div>`,
};

export const Featured: StoryObj = {
  name: 'Featured (full-width)',
  parameters: { layout: 'fullscreen' },
  render: () => `${STYLES}
<style>
  .card--featured .card__title { font-size: 2.369rem; line-height: 1.1; }
  .card--featured .card__image-wrap { margin-bottom: 1rem; }
</style>
<div style="max-width: 720px; margin: 2rem auto; padding: 0 1rem; text-align: center;">
  <article class="card card--featured">
    <a href="#" class="card__link">
      <div class="card__image-wrap">
        <div class="card__image" style="background: rgb(229,233,240); aspect-ratio: 2/1;"></div>
      </div>
      <h4 class="card__title">The invisible details that make great UX</h4>
      <p class="card__date">Apr 22, 2026</p>
    </a>
  </article>
</div>`,
};

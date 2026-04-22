import type { Meta, StoryObj } from '@storybook/html';

const STYLES = `<style>
  .sb-nav { display: inline-flex; padding: 0 .5em; background: white; box-shadow: 0 2px 8px rgba(15,18,25,.05); }
  .sb-nav a { display: inline-block; padding: 1em .5em; color: rgb(15,18,25); border-bottom: 4px solid transparent; text-decoration: none; }
  .sb-nav a.active { font-weight: bolder; border-bottom-color: var(--accent); }
</style>`;

const meta: Meta = {
  title: 'Components/HeaderLink',
  parameters: { layout: 'centered' },
};
export default meta;

export const Inactive: StoryObj = {
  render: () => `${STYLES}<nav class="sb-nav"><a href="/">Digest</a></nav>`,
};

export const Active: StoryObj = {
  render: () => `${STYLES}<nav class="sb-nav"><a href="/" class="active">Digest</a></nav>`,
};

export const Group: StoryObj = {
  name: 'Group (mixed)',
  render: () => `${STYLES}
<nav class="sb-nav">
  <a href="/">Home</a>
  <a href="/blog" class="active">Digest</a>
  <a href="/about">About</a>
</nav>`,
};

import type { Meta, StoryObj } from '@storybook/html';

const STYLES = `<style>
  .btn {
    display: inline-block;
    font-family: "Atkinson", sans-serif;
    font-size: 1em;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
    transition: color 0.2s ease, border-color 0.2s ease;
  }
  .btn--primary {
    color: var(--accent);
    border-bottom: 2px solid var(--accent);
    padding-bottom: 2px;
  }
  .btn--primary:hover {
    color: var(--accent-dark);
    border-bottom-color: var(--accent-dark);
  }
  .btn--ghost {
    color: rgb(var(--gray));
    border-bottom: 2px solid transparent;
    padding-bottom: 2px;
  }
  .btn--ghost:hover {
    color: rgb(var(--gray-dark));
    border-bottom-color: rgb(var(--gray-light));
  }
</style>`;

const meta: Meta = {
  title: 'Components/Button',
  parameters: { layout: 'centered' },
};
export default meta;

export const Primary: StoryObj = {
  render: () => `${STYLES}<a href="#" class="btn btn--primary">Browse all posts →</a>`,
};

export const PrimaryAsButton: StoryObj = {
  name: 'Primary (button element)',
  render: () => `${STYLES}<button class="btn btn--primary">Submit</button>`,
};

export const Ghost: StoryObj = {
  render: () => `${STYLES}<a href="#" class="btn btn--ghost">← Back</a>`,
};

export const Group: StoryObj = {
  name: 'Primary + Ghost together',
  render: () => `${STYLES}
<div style="display: flex; gap: 1.5em; align-items: center;">
  <a href="#" class="btn btn--primary">Browse all posts →</a>
  <a href="#" class="btn btn--ghost">← Back</a>
</div>`,
};

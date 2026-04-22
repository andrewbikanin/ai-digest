import type { Meta, StoryObj } from '@storybook/html';

const STYLES = `<style>
  .sb-footer { padding: 2em 1em 6em; background: linear-gradient(rgba(229,233,240,.5), #fff) no-repeat; color: rgb(96,115,159); text-align: center; }
</style>`;

const year = new Date().getFullYear();

const meta: Meta = {
  title: 'Components/Footer',
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Default: StoryObj = {
  render: () => `${STYLES}<footer class="sb-footer">&copy; ${year} Typenorm Media</footer>`,
};

import type { Preview } from '@storybook/html';
import '../src/styles/global.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (storyFn, context) => {
      const theme = (context.globals.theme as string) ?? 'light';
      document.documentElement.setAttribute('data-theme', theme);
      document.body.style.backgroundColor = '';
      return storyFn();
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

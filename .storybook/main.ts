import type { StorybookConfig } from "storybook-framework-qwik";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  staticDirs: ['../public'],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    '@storybook/addon-a11y',
  ],
  framework: {
    name: "storybook-framework-qwik",
    options: {},
  },
};
export default config;

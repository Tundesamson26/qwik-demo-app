import type { Meta, StoryObj } from "storybook-framework-qwik";
import { Product } from './Product';

const meta: Meta<typeof Product> = {
  component: Product,
  title: 'Components/Product',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Product>;

export const Default: Story = {};
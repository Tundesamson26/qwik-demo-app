import type { Meta, StoryObj } from "storybook-framework-qwik";
import { Dashboard } from './Dashboard';

const meta: Meta<typeof Dashboard> = {
  component: Dashboard,
  title: 'Components/Dashboard',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Dashboard>;

export const Default: Story = {};
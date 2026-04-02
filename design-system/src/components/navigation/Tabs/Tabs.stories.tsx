import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';

const defaultTabs = [
  { label: 'Overview', value: 'overview' },
  { label: 'Features', value: 'features' },
  { label: 'Pricing', value: 'pricing' },
];

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  args: {
    tabs: defaultTabs,
    activeTab: 'overview',
    onChange: () => {},
  },
};
export default meta;

type Story = StoryObj<typeof Tabs>;

export const LineVariant: Story = {
  args: {
    variant: 'line',
    tabs: defaultTabs,
    activeTab: 'overview',
  },
};

export const PillVariant: Story = {
  args: {
    variant: 'pill',
    tabs: defaultTabs,
    activeTab: 'features',
  },
};

export const WithDisabled: Story = {
  args: {
    variant: 'line',
    tabs: [
      { label: 'Overview', value: 'overview' },
      { label: 'Features', value: 'features', disabled: true },
      { label: 'Pricing', value: 'pricing' },
    ],
    activeTab: 'overview',
  },
};
